import CardStackManager from "./src/models/card-stack-manager.ts";
import Coup from "./src/models/coup.ts";
import Player from "./src/models/player.ts";

const playGameRound = (game: Coup) => {
  const currentPlayer = game.currentPlayer();

  console.log(`Current Player: ${currentPlayer.name}`);
};

const startGame = (playerIds: string[]) => {
  const players = playerIds.map((id) => new Player(id));
  const deckManager = new CardStackManager();
  const game = new Coup(players, deckManager);

  while (!game.isGameOver()) {
    playGameRound(game);
  }
};

const main = () => {
  const players = ["Player 1", "Player 2"];

  startGame(players);
};

main();
