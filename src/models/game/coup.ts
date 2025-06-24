import CardStackManager from "../cards/card-stack-manager.ts";
import Player from "../players/player.ts";

class Coup {
  private readonly players: Player[];
  private readonly deckManager: CardStackManager;

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

  distributeCards() {
    this.deckManager.shuffleCards();
    this.deckManager.dealCards(this.players, 2);
  }

  income() {
    const currentPlayer = this.currentPlayer();
    currentPlayer.addCoins(1);
    this.rotateTurn();
  }
}

export default Coup;
