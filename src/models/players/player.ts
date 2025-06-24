import { Character } from "../characters/character.ts";

class Player {
  private readonly name: string;
  private readonly coins: number;
  private readonly cards: Character[];

  constructor(name: string) {
    this.name = name;
    this.coins = 2;
    this.cards = [];
  }

  remainingCards(): number {
    return this.cards.length;
  }

  addCard(drawnCard: Character) {
    this.cards.push(drawnCard);
  }

  getCards(): Character[] {
    return [...this.cards];
  }
}

export default Player;
