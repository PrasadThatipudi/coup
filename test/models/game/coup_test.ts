import { describe, it } from "@std/testing/bdd";
import { assert, assertEquals, assertFalse } from "@std/assert";
import Coup from "../../../src/models/game/coup.ts";
import Player from "../../../src/models/players/player.ts";
import CardStackManager from "../../../src/models/cards/card-stack-manager.ts";
import { Character } from "../../../src/models/characters/character.ts";
import { Duke } from "../../../src/models/characters/duke.ts";
import { Contessa } from "../../../src/models/characters/contessa.ts";
import { Ambassador } from "../../../src/models/characters/ambassador.ts";
import { Assassin } from "../../../src/models/characters/assassin.ts";

const defaultShuffler = (cards: Character[]): Character[] => {
  return cards;
};

describe("isGameOver", () => {
  it("should return false when there are still players with cards", () => {
    const players = [new Player("Player-1"), new Player("Player-2")];
    const deckManager = new CardStackManager([], defaultShuffler);
    const game = new Coup(players, deckManager);

    assertFalse(game.isGameOver());
  });

  it("should return true when all players have lost their cards", () => {
    const players = [new Player("Player-1")];
    const deckManager = new CardStackManager([], defaultShuffler);

    const game = new Coup(players, deckManager);

    assert(game.isGameOver());
  });
});

describe("currentPlayer", () => {
  it("should return the current player", () => {
    const players = [new Player("Player-1"), new Player("Player-2")];
    const deckManager = new CardStackManager([], defaultShuffler);
    const game = new Coup(players, deckManager);

    assertEquals(game.currentPlayer(), players[0]);
  });

  it("should return the second player when the first has done with his turn", () => {
    const players = [new Player("Player-1"), new Player("Player-2")];
    const deckManager = new CardStackManager([], defaultShuffler);
    const game = new Coup(players, deckManager);

    game.rotateTurn();

    assertEquals(game.currentPlayer(), players[1]);
  });
});

describe("rotateTurn", () => {
  it("should rotate to the next player", () => {
    const players = [new Player("Player-1"), new Player("Player-2")];
    const deckManager = new CardStackManager([], defaultShuffler);
    const game = new Coup(players, deckManager);

    game.rotateTurn();

    assertEquals(game.currentPlayer(), players[1]);
  });

  it("should rotate back to the first player after the last player", () => {
    const players = [new Player("Player-1"), new Player("Player-2")];
    const deckManager = new CardStackManager([], defaultShuffler);
    const game = new Coup(players, deckManager);

    game.rotateTurn(); // to Player-2
    game.rotateTurn(); // back to Player-1

    assertEquals(game.currentPlayer(), players[0]);
  });
});

describe("distributeCards", () => {
  it("should shuffle and distribute two cards to each player", () => {
    const reverseShuffler = (cards: Character[]): Character[] =>
      cards.toReversed();

    const cards = [
      new Duke(0),
      new Contessa(1),
      new Ambassador(2),
      new Assassin(3),
    ];

    const players = [new Player("Player-1"), new Player("Player-2")];
    const deckManager = new CardStackManager(cards, reverseShuffler);
    const game = new Coup(players, deckManager);

    game.distributeCards();

    assertEquals(players[0].remainingCards(), 2);
    assertEquals(players[1].remainingCards(), 2);
    assertEquals(players[0].getCards(), [new Assassin(3), new Contessa(1)]);
    assertEquals(players[1].getCards(), [new Ambassador(2), new Duke(0)]);
  });
});

describe("income", () => {
  it("should add one coin to the current player", () => {
    const players = [new Player("Player-1")];
    const deckManager = new CardStackManager([], defaultShuffler);
    const game = new Coup(players, deckManager);

    game.income();

    assertEquals(players[0].getCoins(), 3);
  });

  it("should rotate the turn after taking income", () => {
    const player1 = new Player("Player-1");
    const player2 = new Player("Player-2");

    const players = [player1, player2];
    const deckManager = new CardStackManager([], defaultShuffler);
    const game = new Coup(players, deckManager);

    assertEquals(game.currentPlayer(), player1);
    game.income();
    assertEquals(game.currentPlayer(), player2);
  });
});
