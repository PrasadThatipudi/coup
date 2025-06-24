import { Character } from "../characters/character.ts";

class Player {
  readonly name: string;
  private coins: number;
  private cards: Character[];

  constructor(name: string) {
    this.name = name;
    this.coins = 2;
    this.cards = [];
  }

  remainingCards(): number {
    return this.cards.length;
  }

  addCard(card: Character) {
    this.cards.push(card);
  }

  getCards(): Character[] {
    return [...this.cards];
  }

  getCoins(): number {
    return this.coins;
  }

  addCoins(coins: number) {
    this.coins += coins;
  }

  discardCard(characterID: number): Character | null {
    const targetCard = this.cards.find((card) => card.id === characterID) ??
      null;

    if (targetCard) {
      this.cards = this.cards.filter((card) => card !== targetCard);
    }

    return targetCard;
  }
}

export default Player;
