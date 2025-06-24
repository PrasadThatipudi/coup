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

  private isPlayerEligibleToCoup(): boolean {
    return this.currentPlayer().getCoins() < 7;
  }

  private isPlayerNominatedSelf(nominatedPlayerName: string): boolean {
    return this.currentPlayer().name === nominatedPlayerName;
  }

  coup(playerName: string, characterID: number) {
    if (
      this.isPlayerEligibleToCoup() || this.isPlayerNominatedSelf(playerName)
    ) {
      return null;
    }

    const targetPlayer = this.players.find(
      (player) => player.name === playerName,
    );

    if (!targetPlayer) return null;

    const discardCard = targetPlayer.discardCard(characterID);
    if (discardCard) this.rotateTurn();

    return discardCard;
  }
}

export default Coup;
