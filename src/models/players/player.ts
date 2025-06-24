import { Character } from "../characters/character.ts";

class Player {
  private readonly name: string;
  private coins: number;
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

  getName(): string {
    return this.name;
  }

  getCoins(): number {
    return this.coins;
  }

  addCoins(coins: number) {
    this.coins += coins;
  }
}

export default Player;
