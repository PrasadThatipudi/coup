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

const makePlayerChoice = (player: Player): number => {
  const choice = prompt(`It's your turn, ${player.name}. \nChoose an action:
    1. Income
    2. Foreign Aid
    3. Coup
    4. Character Action
  Enter the number of your choice: `)?.trim();

  return parseInt(choice ?? "") ?? makePlayerChoice(player);
};

const playAction = (game: Coup, choice: number) => {
  switch (choice) {
    case 1:
      return game.income();

    case 2:
      return game.foreignAid();

    case 3:
      return game.coup(targetPlayerId);

    case 4:
      return game.characterAction(character);
  }
};

const playGameRound = (game: Coup) => {
  const currentPlayer = game.currentPlayer();

  console.log(`Current Player: ${currentPlayer.name}`);
  const choice = makePlayerChoice(currentPlayer);

  console.log(`Player ${currentPlayer.name} chose: ${choice}`);

  playAction(game, choice);
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
