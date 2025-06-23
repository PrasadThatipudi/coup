import Player from "./player.ts";

export default class PlayersManager {
  private players: Map<number, Player>;

  private constructor(players: Map<number, Player> = new Map()) {
    this.players = players;
  }

  static init(...playerIds: string[]): PlayersManager {
    const players = new Map<number, Player>();

    playerIds.forEach((id, index) => players.set(index, new Player(id)));

    return new PlayersManager(players);
  }
}
