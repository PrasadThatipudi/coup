import { Character } from "../characters/character.ts";
import Player from "../players/player.ts";

type IdentityFunction = (cards: Character[]) => Character[];
class CardStackManager {
  private cards: Character[];
  private readonly shuffler: IdentityFunction;

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

  dealCards(players: Player[], noOfCards: number) {
    Array.from({ length: noOfCards }).forEach(() => {
      players.forEach((player) => {
        const drawnCard = this.drawCard();
        if (drawnCard) {
          player.addCard(drawnCard);
        }
      });
    });
  }
}

export default CardStackManager;
