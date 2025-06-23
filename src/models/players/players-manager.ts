import Player from "./player.ts";

interface PlayerInfo {
  player: Player;
  isEliminated?: boolean;
}
export default class PlayersManager {
  private players: Map<number, PlayerInfo>;

  private constructor(players: Map<number, PlayerInfo> = new Map()) {
    this.players = players;
  }

  static init(...players: Player[]): PlayersManager {
    if (players.length < 2) {
      throw new Error("At least two players must be provided");
    }

    const playerMap = new Map<number, PlayerInfo>();

    players.forEach((player, id) =>
      playerMap.set(id, { player, isEliminated: false })
    );

    return new PlayersManager(playerMap);
  }
}
