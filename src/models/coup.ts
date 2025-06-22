import CardStackManager from "./card-stack-manager.ts";
import Player from "./player.ts";

class Coup {
  players: Player[];
  deckManager: CardStackManager;

  constructor(players: Player[], deckManager: CardStackManager) {
    this.deckManager = deckManager;
    this.players = players;
  }

  private noOfRemainingPlayers(): number {
    return this.players.length;
  }

  isGameOver(): boolean {
    return this.noOfRemainingPlayers() === 1;
  }
}

export default Coup;
