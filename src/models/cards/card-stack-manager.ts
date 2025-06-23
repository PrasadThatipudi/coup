import { Character } from "../characters/character.ts";

type IdentityFunction = (cards: Character[]) => Character[];
class CardStackManager {
  cards: Character[];
  shuffler: IdentityFunction;

  constructor(cards: Character[], shuffler: IdentityFunction) {
    this.cards = cards;
    this.shuffler = shuffler;
  }

  shuffleCards() {
    this.cards = this.shuffler(this.cards);
  }

  drawCard(): Character | null {
    if (this.cards.length === 0) {
      return null;
    }

    const drawnCard = this.cards.shift()!;
    return drawnCard;
  }
}

export default CardStackManager;
