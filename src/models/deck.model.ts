export interface DBDeck {
  name: string;
  content: string;
}

export interface Card {
  [field: string]: string;
}

export interface Deck {
  name: string;
  cards: Card[];
}
