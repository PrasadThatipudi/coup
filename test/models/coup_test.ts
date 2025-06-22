import { describe, it } from "@std/testing/bdd";
import { assert, assertFalse } from "@std/assert";
import Coup from "../../src/models/coup.ts";
import Player from "../../src/models/player.ts";
import CardStackManager from "../../src/models/card-stack-manager.ts";

describe("isGameOver", () => {
  it("should return false when there are still players with cards", () => {
    const players = [new Player("Player-1"), new Player("Player-2")];
    const deckManager = new CardStackManager();
    const game = new Coup(players, deckManager);

    assertFalse(game.isGameOver());
  });

  it("should return true when all players have lost their cards", () => {
    const players = [new Player("Player-1")];
    const deckManager = new CardStackManager();

    const game = new Coup(players, deckManager);

    assert(game.isGameOver());
  });
});
