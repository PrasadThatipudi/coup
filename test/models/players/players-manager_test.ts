import { describe, it } from "@std/testing/bdd";
import PlayersManager from "../../../src/models/players/players-manager.ts";
import { assert } from "@std/assert/assert";

describe("init", () => {
  it("should initialize players with given IDs", () => {
    const playerIds = ["player-1", "player-2", "player-3"];

    const manager = PlayersManager.init(...playerIds);

    assert(manager instanceof PlayersManager);
  });
});
