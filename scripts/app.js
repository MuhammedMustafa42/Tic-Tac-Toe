const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;
let gameIsOver = false;

const players = [
  {
    name: "",
    symbol: "X",
  },
  {
    name: "",
    symbol: "O",
  },
];

const playerConfigOverlayElement = document.getElementById("config-overlay");
const backdropElement = document.getElementById("backdrop");
const formElement = document.querySelector("form");
const errorsOutputElement = document.getElementById("config-errors");
const gameAreaElement = document.getElementById("active-game");
const activePlayerNameElement = document.getElementById("active-player-name");
const gameOverElement = document.getElementById("game-over");

const editPlayer1BtnElement = document.getElementById("edit-player-1");
const editPlayer2BtnElement = document.getElementById("edit-player-2");
const cancelConfigBtnElement = document.getElementById("cancel-config-btn");
const startNewGameElement = document.getElementById("start-game-btn");
// const gameFieldElements = document.querySelectorAll("#game-board li");
const gameBoardElement = document.getElementById("game-board"); //same as above

editPlayer1BtnElement.addEventListener("click", openPlayerConfig);
editPlayer2BtnElement.addEventListener("click", openPlayerConfig);
cancelConfigBtnElement.addEventListener("click", closePLayerConfig);
backdropElement.addEventListener("click", closePLayerConfig);

formElement.addEventListener("submit", savePlayerConfig);

startNewGameElement.addEventListener("click", startNewGame);

// for (const gameFieldElement of gameFieldElements) {
//   gameAreaElement.addEventListener("click", selectGameField);
// }

gameBoardElement.addEventListener("click", selectGameField); //same as above but if you click on gap it replaces the board with the symbol
