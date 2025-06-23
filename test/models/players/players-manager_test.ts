import { describe, it } from "@std/testing/bdd";
import PlayersManager from "../../../src/models/players/players-manager.ts";
import { assert } from "@std/assert/assert";
import Player from "../../../src/models/players/player.ts";
import { assertThrows } from "@std/assert";

describe("init", () => {
  it("should initialize players with given IDs", () => {
    const player1 = new Player("Player-1");
    const player2 = new Player("Player-2");
    const manager = PlayersManager.init(player1, player2);

    assert(manager instanceof PlayersManager);
  });

  it("should throw an error if no players are provided", () => {
    assertThrows(
      () => {
        PlayersManager.init();
      },
      Error,
      "At least two players must be provided",
    );
  });

  it("should throw an error if there is only one player", () => {
    const player1 = new Player("Player-1");
    assertThrows(
      () => {
        PlayersManager.init(player1);
      },
      Error,
      "At least two players must be provided",
    );
  });
});
