import CardStackManager from "./src/models/card-stack-manager.ts";
import {
  Ambassador,
  Assassin,
  Captain,
  Character,
  Contessa,
  Duke,
} from "./src/models/characters.ts";
import Coup from "./src/models/coup.ts";
import Player from "./src/models/player.ts";

const playGameRound = (game: Coup) => {
  const currentPlayer = game.currentPlayer();

  console.log(`Current Player: ${currentPlayer.name}`);
};

const gameCards = () => [
  new Duke(0),
  new Assassin(1),
  new Captain(2),
  new Ambassador(3),
  new Contessa(4),
];

const randomShuffler = (cards: Character[]) =>
  cards.sort(() => Math.random() - 0.5);

const startGame = (playerIds: string[]) => {
  const players = playerIds.map((id) => new Player(id));
  const deckManager = new CardStackManager(gameCards(), randomShuffler);
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
