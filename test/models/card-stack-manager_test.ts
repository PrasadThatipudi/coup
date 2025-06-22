import { describe, it } from "@std/testing/bdd";
import { Assassin, Character, Duke } from "../../src/models/characters.ts";
import CardStackManager from "../../src/models/card-stack-manager.ts";
import { assertEquals } from "@std/assert/equals";

describe("shuffleCards", () => {
  it("should shuffle cards in a stack with the given shuffler", () => {
    const shuffler = (cards: Character[]) => cards;
    const cards: Character[] = [new Duke(), new Assassin()];
    const deckManager = new CardStackManager(cards, shuffler);

    deckManager.shuffleCards();

    assertEquals(deckManager.cards, cards);
  });
});

describe("drawCard", () => {
  it("should draw a card from the top of the stack", () => {
    const shuffler = (cards: Character[]) => cards;
    const cards: Character[] = [new Duke(), new Assassin()];
    const deckManager = new CardStackManager(cards, shuffler);

    const drawnCard = deckManager.drawCard();
    assertEquals(drawnCard, new Duke());
    assertEquals(deckManager.cards.length, 1);
  });

  it("should return null if no cards are left to draw", () => {
    const shuffler = (cards: Character[]) => cards;
    const cards: Character[] = [];
    const deckManager = new CardStackManager(cards, shuffler);

    const drawnCard = deckManager.drawCard();
    assertEquals(drawnCard, null);
  });

  it("should return null if the stack is empty", () => {
    const shuffler = (cards: Character[]) => cards;
    const cards: Character[] = [];
    const deckManager = new CardStackManager(cards, shuffler);

    const drawnCard = deckManager.drawCard();
    assertEquals(drawnCard, null);
  });
});
