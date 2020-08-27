import { Deck } from "./deck.model";

export interface GeneralPage {
  index: number;
  slug: string;
  title: string;
  previous: Page;
  next: Page;
}

export interface ContentPage extends GeneralPage {
  type: "content";
  content: string;
}

export interface DeckPage extends GeneralPage {
  type: "cards";
  decks: Deck[];
}

export type Page = ContentPage | DeckPage;
