import CardStackManager from "./card-stack-manager.ts";
import Player from "./player.ts";

class Coup {
  players: Player[];
  deckManager: CardStackManager;

  constructor(players: Player[], deckManager: CardStackManager) {
    this.deckManager = deckManager;
    this.players = [...players];
  }

  private noOfRemainingPlayers(): number {
    return this.players.length;
  }

  rotateTurn() {
    this.players.push(this.players.shift()!);
  }

  isGameOver(): boolean {
    return this.noOfRemainingPlayers() === 1;
  }

  currentPlayer() {
    return this.players[0];
  }
}

export default Coup;
