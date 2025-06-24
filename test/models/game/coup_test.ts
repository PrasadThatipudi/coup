import { describe, it } from "@std/testing/bdd";
import { assert, assertEquals, assertFalse, assertThrows } from "@std/assert";
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

const createPlayers = (noOfPlayers: number) =>
  Array.from({ length: noOfPlayers }, (_, i) => new Player(`Player-${i + 1}`));

describe("init", () => {
  it("should return throw an error when no of players are less than 2", () => {
    const players = createPlayers(1);
    const cards = Array.from({ length: 2 }, (_, i) => new Duke(i));
    const deckManager = new CardStackManager(cards, defaultShuffler);

    assertThrows(() => Coup.init(players, deckManager));
  });

  it("should return coup instance when there are enough players", () => {
    const players = createPlayers(2);
    const cards = Array.from({ length: 2 }, (_, i) => new Duke(i));
    const deckManager = new CardStackManager(cards, defaultShuffler);

    assert(Coup.init(players, deckManager) instanceof Coup);
  });
});

describe("isGameOver", () => {
  it("should return false when there are still players with cards", () => {
    const players = createPlayers(2);
    const deckManager = new CardStackManager([], defaultShuffler);
    const game = Coup.init(players, deckManager);

    assertFalse(game.isGameOver());
  });

  // Not accurate enough
  it("should return true when all players have lost their cards", () => {
    const players = createPlayers(1);
    const deckManager = new CardStackManager([], defaultShuffler);

    const game = new Coup(players, deckManager);

    assert(game.isGameOver());
  });
});

describe("currentPlayer", () => {
  it("should return the current player", () => {
    const players = createPlayers(2);
    const deckManager = new CardStackManager([], defaultShuffler);
    const game = Coup.init(players, deckManager);

    assertEquals(game.currentPlayer(), players[0]);
  });

  it("should return the second player when the first has done with his turn", () => {
    const players = createPlayers(2);
    const deckManager = new CardStackManager([], defaultShuffler);
    const game = Coup.init(players, deckManager);

    game.rotateTurn();

    assertEquals(game.currentPlayer(), players[1]);
  });
});

describe("rotateTurn", () => {
  it("should rotate to the next player", () => {
    const players = createPlayers(2);
    const deckManager = new CardStackManager([], defaultShuffler);
    const game = Coup.init(players, deckManager);

    game.rotateTurn();

    assertEquals(game.currentPlayer(), players[1]);
  });

  it("should rotate back to the first player after the last player", () => {
    const players = createPlayers(2);
    const deckManager = new CardStackManager([], defaultShuffler);
    const game = Coup.init(players, deckManager);

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

    const players = createPlayers(2);
    const deckManager = new CardStackManager(cards, reverseShuffler);
    const game = Coup.init(players, deckManager);

    game.distributeCards();

    assertEquals(players[0].remainingCards(), 2);
    assertEquals(players[1].remainingCards(), 2);
    assertEquals(players[0].getCards(), [new Assassin(3), new Contessa(1)]);
    assertEquals(players[1].getCards(), [new Ambassador(2), new Duke(0)]);
  });
});

describe("income", () => {
  it("should add one coin to the current player", () => {
    const players = createPlayers(2);
    const deckManager = new CardStackManager([], defaultShuffler);
    const game = Coup.init(players, deckManager);

    game.income();

    assertEquals(players[0].getCoins(), 3);
  });

  it("should rotate the turn after taking income", () => {
    const players = createPlayers(2);
    const deckManager = new CardStackManager([], defaultShuffler);
    const game = Coup.init(players, deckManager);

    assertEquals(game.currentPlayer(), players[0]);
    game.income();
    assertEquals(game.currentPlayer(), players[1]);
  });
});

describe("coup", () => {
  it("should return null if player doesn't have 7 coins", () => {
    const players = createPlayers(2);
    const cards = Array.from({ length: 6 }, (_, i) => new Duke(i));

    const deckManager = new CardStackManager(cards, defaultShuffler);
    const game = Coup.init(players, deckManager);

    game.distributeCards();

    assertEquals(game.coup("Player-2", 1), null);
  });

  it("player has 7 coins | should return discarded character card", () => {
    const players = createPlayers(2);

    players[0].addCoins(7);
    players[1].addCoins(7);

    const cards = Array.from({ length: 6 }, (_, i) => new Duke(i));
    const deckManager = new CardStackManager(cards, defaultShuffler);
    const game = Coup.init(players, deckManager);

    game.distributeCards();

    assertEquals(game.coup("Player-2", 1), new Duke(1));
    assertEquals(players[1].remainingCards(), 1);
  });

  it("should return null when player couping self", () => {
    const players = createPlayers(2);
    const cards = Array.from({ length: 6 }, (_, i) => new Duke(i));

    players[0].addCoins(7);

    const deckManager = new CardStackManager(cards, defaultShuffler);
    const game = Coup.init(players, deckManager);

    game.distributeCards();

    assertEquals(game.coup("Player-1", 1), null);
  });

  it("should rotate turn on a successful coup", () => {
    const players = createPlayers(2);
    players[0].addCoins(7);

    const cards = Array.from({ length: 6 }, (_, i) => new Duke(i));
    const deckManager = new CardStackManager(cards, defaultShuffler);
    const game = Coup.init(players, deckManager);

    game.distributeCards();

    assertEquals(game.coup("Player-2", 1), new Duke(1));
    assertEquals(players[1].remainingCards(), 1);
    assertEquals(game.currentPlayer(), players[1]);
  });

  it("should current player able to coup third player", () => {
    const players = createPlayers(3);

    players[0].addCoins(7);

    const cards = Array.from({ length: 6 }, (_, i) => new Duke(i));
    const deckManager = new CardStackManager(cards, defaultShuffler);
    const game = Coup.init(players, deckManager);

    game.distributeCards();

    assertEquals(game.coup("Player-3", 2), new Duke(2));
    assertEquals(players[2].remainingCards(), 1);
  });

  it("should return null if target player is not exist", () => {
    const players = createPlayers(2);

    players[0].addCoins(7);

    const cards = Array.from({ length: 6 }, (_, i) => new Duke(i));
    const deckManager = new CardStackManager(cards, defaultShuffler);
    const game = Coup.init(players, deckManager);

    game.distributeCards();

    assertEquals(game.coup("Player-3", 2), null);
  });
});
