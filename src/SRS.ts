import { Card } from "./models/deck.model";
import sha from "js-sha1";
import { shuffle } from "./util";

const HOUR = 1000 * 60 * 60;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;

export const srsTiming = [
  HOUR * 2, // 2 hours
  HOUR * 6, // 6 hours
  HOUR * 12, // 12 hours
  DAY, // 1 day
  DAY, // 1 day
  DAY * 2, // 2 days
  DAY * 4, // 4 days
  WEEK, // 1 week
  WEEK, // 1 week
  WEEK * 2, // 2 weeks
  MONTH, // 1 month
  MONTH * 2, // 2 months
  MONTH * 4, // 4 months
];

export interface SRSCard {
  id: string;
  card: Card;
  group: string;
  level: number;
  lastStudied: number;
}

export interface SRSGroup {
  id: string;
  name: string;
}

export interface SRSData {
  groups: SRSGroup[];
  terms: SRSCard[];
}

export interface StudyItemSolution {
  value: string[][];
  flags: string[];
}

export interface StudyItemReview {
  present: string[][][];
  solution: StudyItemSolution;
}

export interface StudyItem {
  id: string;
  reviews: StudyItemReview[];
}

function getGroupId(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "-");
}

export class SRS {
  static data: SRSData | null = null;

  static initialize() {
    this.data = {
      groups: [],
      terms: [],
    };
  }

  static revive() {
    try {
      const d = localStorage.getItem("srsdata");
      if (d) {
        this.data = JSON.parse(d) as SRSData;
      } else {
        this.initialize();
      }
    } catch {
      this.initialize();
    }
  }

  static save() {
    if (!this.data) this.revive();
    const s = JSON.stringify(this.data);
    localStorage.setItem("srsdata", s);
  }

  static getReviews() {}

  static getNumReviews() {
    if (!this.data) this.revive();

    return this.data.terms.reduce(
      (acc, term) =>
        acc +
        (term.level > -1 &&
        Date.now() > term.lastStudied + srsTiming[term.level]
          ? 1
          : 0),
      0
    );
  }

  static getLessons() {
    if (!this.data) this.revive();

    const lessons = this.data.terms.filter(term => term.level === -1);

    const queue = this.makeReviewQueue(lessons);

    return shuffle(queue);
  }

  static getNumLessons() {
    if (!this.data) this.revive();

    return this.data.terms.reduce(
      (acc, term) => acc + (term.level === -1 ? 1 : 0),
      0
    );
  }

  static learnItem(id: string) {
    const item = this.data.terms.find(c => c.id === id);
    item.level = 0;
    item.lastStudied = Date.now();
    this.save();
  }

  static makeReviewQueue(cards: SRSCard[]): StudyItem[] {
    return cards.map(card => {
      const k = Object.keys(card.card);

      const studyInstructions = card.card["&STUDY"]?.split(";") || [
          `${card.card["&FRONT"]}>${card.card["&BACK"]}`,
        ] || [card.card[k[0]], card.card[k[1]]];

      const reviews = studyInstructions.map(i => {
        const d = i.split(">");
        const present = d[0]
          .split(",")
          .map(d => card.card[d].split(";").map(a => a.split(",")));
        const solution = d[1].split(",");

        return {
          present,
          solution: {
            value: card.card[solution[0]].split(";").map(a => a.split(",")),
            flags: solution.slice(1),
          },
        } as StudyItemReview;
      });

      return { id: card.id, reviews: shuffle(reviews) } as StudyItem;
    });
  }

  static getFlashcardsFor(groups: string[]) {
    return this.data.terms
      .filter(c => groups.includes(c.group))
      .map(c => c.card);
  }

  static getGroups() {
    if (!this.data) this.revive();

    return this.data.groups;
  }

  static addGroup(name: string, cards: Card[]) {
    if (!this.data) this.revive();

    const id = getGroupId(name);
    const deck = cards.map(
      c =>
        ({
          card: c,
          group: id,
          lastStudied: 0,
          level: -1,
          id: `${id}|${sha(JSON.stringify(c))}`,
        } as SRSCard)
    );
    const group = { id, name } as SRSGroup;

    this.data.groups.push(group);
    this.data.terms.push(...deck);

    this.save();
  }

  static removeGroup(name: string) {
    if (!this.data) this.revive();

    const groupIndex = this.data.groups.findIndex(g => g.name === name);
    if (groupIndex !== -1) {
      const id = getGroupId(name);

      this.data.groups.splice(groupIndex, 1);
      this.data.terms = this.data.terms.filter(t => t.group !== id);
    }

    this.save();
  }

  static hasGroup(name: string) {
    if (!this.data) this.revive();

    return !!this.data.groups.find(g => g.name === name);
  }
}
