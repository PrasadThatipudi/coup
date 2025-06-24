import CardStackManager from "./src/models/cards/card-stack-manager.ts";
import { Ambassador } from "./src/models/characters/ambassador.ts";
import { Assassin } from "./src/models/characters/assassin.ts";
import { Captain } from "./src/models/characters/captain.ts";
import { Character } from "./src/models/characters/character.ts";
import { Contessa } from "./src/models/characters/contessa.ts";
import { Duke } from "./src/models/characters/duke.ts";
import Coup from "./src/models/game/coup.ts";
import Player from "./src/models/players/player.ts";

const makePlayerChoice = (player: Player): number => {
  const choice = prompt(
    `It's your turn, ${player.name}. \nChoose an action:
    1. Income
    2. Foreign Aid
    3. Coup
    4. Character Action
  Enter the number of your choice: `,
  )?.trim();

  return parseInt(choice ?? "") ?? makePlayerChoice(player);
};

const playAction = (game: Coup, choice: number) => {
  if (choice === 1) return game.income();

  if (choice === 3) {
    const playerId = prompt("Enter player ID whom you want to coup: ");
    const characterId = prompt(`${playerId}, enter character ID to discard: `);

    game.coup(playerId, characterId);
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

const showPlayerCards = (players: Player[]) => {
  players.forEach((player) => {
    const cards = player.getCards();

    console.log(player.name.concat(": ", cards.map((c) => c.name).join(", ")));
  });
};

const startGame = (playerIds: string[]) => {
  const players = playerIds.map((id) => new Player(id));
  const deckManager = new CardStackManager(gameCards(), randomShuffler);
  const game = new Coup(players, deckManager);

  game.distributeCards();
  showPlayerCards(players);

  while (!game.isGameOver()) {
    playGameRound(game);
  }
};

const main = () => {
  const players = ["Player 1", "Player 2"];

  startGame(players);
};

main();
