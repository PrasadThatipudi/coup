import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import Player from "../../../src/models/players/player.ts";
import { Duke } from "../../../src/models/characters/duke.ts";

describe("remainingCards", () => {
  it("should return 0 by default", () => {
    const player = new Player("Player-1");

    assertEquals(player.remainingCards(), 0);
  });
});

describe("addCard", () => {
  it("should add a card to the player's hand", () => {
    const player = new Player("Player-1");
    const card = new Duke(0);

    player.addCard(card);

    assertEquals(player.remainingCards(), 1);
  });
});

describe("getCards", () => {
  it("should return the player's cards", () => {
    const player = new Player("Player-1");
    const card1 = new Duke(0);
    const card2 = new Duke(1);

    player.addCard(card1);
    player.addCard(card2);

    assertEquals(player.getCards(), [card1, card2]);
  });

  it("shouldn't return the same reference", () => {
    const player = new Player("Player-1");

    player.addCard(new Duke(0));
    player.addCard(new Duke(1));

    const cards = player.getCards();
    cards.push(new Duke(2)); // Attempt to modify the returned array

    assertEquals(player.getCards(), [new Duke(0), new Duke(1)]); // Original cards should remain unchanged
  });
});

describe("addCoins", () => {
  it("should add given no of coins to player", () => {
    const player = new Player("Player-1");

    player.addCoins(1);

    assertEquals(player.getCoins(), 3); // 2 coins by default + added coins
  });
});

describe("getName", () => {
  it("should return the player's name", () => {
    const player = new Player("Player-1");

    assertEquals(player.getName(), "Player-1");
  });
});
