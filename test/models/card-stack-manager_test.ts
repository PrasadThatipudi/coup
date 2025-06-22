import { describe, it } from "@std/testing/bdd";
import {
  Ambassador,
  Assassin,
  Captain,
  Character,
  Contessa,
  Duke,
} from "../../src/models/characters.ts";
import CardStackManager from "../../src/models/card-stack-manager.ts";
import { assertEquals } from "@std/assert/equals";

describe("shuffleCards", () => {
  it("should shuffle cards in a stack with the given shuffler", () => {
    const shuffler = (cards: Character[]) => cards;
    const cards: Character[] = [new Duke(0), new Assassin(1)];
    const deckManager = new CardStackManager(cards, shuffler);

    deckManager.shuffleCards();

    assertEquals(deckManager.cards, cards);
  });
});

describe("drawCard", () => {
  it("should draw a card from the top of the stack", () => {
    const shuffler = (cards: Character[]) => cards;
    const cards: Character[] = [
      new Captain(0),
      new Contessa(1),
      new Ambassador(2),
    ];
    const deckManager = new CardStackManager(cards, shuffler);

    const drawnCard = deckManager.drawCard();
    assertEquals(drawnCard, new Captain(0));
    assertEquals(deckManager.cards.length, 2);
  });

  it("should return null if the stack is empty", () => {
    const shuffler = (cards: Character[]) => cards;
    const cards: Character[] = [];
    const deckManager = new CardStackManager(cards, shuffler);

    const drawnCard = deckManager.drawCard();
    assertEquals(drawnCard, null);
  });
});
