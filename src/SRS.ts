import { Card } from "./models/deck.model";

export const srsTiming = [
  4, // 4 hours
  8, // 8 hours
  24, // 1 day
  48, // 2 days
  7 * 24, // 1 week
  2 * 7 * 24, // 2 weeks
  4 * 7 * 24, // 1 month
  4 * 4 * 7 * 24, // 4 months
];

export interface SRSCard {
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

export interface Review {}

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

  static getReview() {}

  static getLesson() {}

  static addGroup(name: string, cards: Card[]) {
    if (!this.data) this.revive();

    const id = getGroupId(name);
    const deck = cards.map(
      c =>
        ({ card: c, group: id, lastStudied: Date.now(), level: 0 } as SRSCard)
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
