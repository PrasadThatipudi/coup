import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert/equals";
import { Character } from "../../../src/models/characters/character.ts";
import { Duke } from "../../../src/models/characters/duke.ts";
import CardStackManager from "../../../src/models/cards/card-stack-manager.ts";
import { Assassin } from "../../../src/models/characters/assassin.ts";
import { Captain } from "../../../src/models/characters/captain.ts";
import { Contessa } from "../../../src/models/characters/contessa.ts";
import { Ambassador } from "../../../src/models/characters/ambassador.ts";
import Player from "../../../src/models/players/player.ts";

describe("shuffleCards", () => {
  it("should shuffle cards in a stack with the given shuffler", () => {
    const shuffler = (cards: Character[]) => cards;
    const cards: Character[] = [new Duke(0), new Assassin(1)];
    const deckManager = new CardStackManager(cards, shuffler);

    deckManager.shuffleCards();
    assertEquals(deckManager.drawCard(), new Duke(0));
    assertEquals(deckManager.drawCard(), new Assassin(1));
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

    assertEquals(deckManager.drawCard(), new Captain(0));
    assertEquals(deckManager.drawCard(), new Contessa(1));
    assertEquals(deckManager.drawCard(), new Ambassador(2));
  });

  it("should return null if the stack is empty", () => {
    const shuffler = (cards: Character[]) => cards;
    const cards: Character[] = [];
    const deckManager = new CardStackManager(cards, shuffler);

    const drawnCard = deckManager.drawCard();
    assertEquals(drawnCard, null);
  });
});

describe("dealCards", () => {
  it("should deal cards to players", () => {
    const shuffler = (cards: Character[]) => cards;
    const cards: Character[] = [
      new Duke(0),
      new Assassin(1),
      new Captain(2),
      new Contessa(3),
      new Ambassador(4),
    ];
    const deckManager = new CardStackManager(cards, shuffler);
    const players = [new Player("Player-1"), new Player("Player-2")];

    deckManager.dealCards(players, 2);
    assertEquals(players[0].remainingCards(), 2);
    assertEquals(players[1].remainingCards(), 2);
  });
});
