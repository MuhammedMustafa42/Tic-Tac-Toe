function resetGameStatus() {
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;
  gameOverElement.firstElementChild.innerHTML = `You won, <span id="winner-name">PLAYER NAME</span>!`;
  gameOverElement.style.display = "none";

  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
      gameBoardItemElement.textContent = "";
      gameBoardItemElement.classList.remove("disabled");
      gameBoardIndex++;
    }
  }
}

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please set custom player names for both players!");
    return;
  }

  resetGameStatus();

  activePlayerNameElement.textContent = players[activePlayer].name; //to show the name of active player at the start of the game
  gameAreaElement.style.display = "block";
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  if (event.target.tagName !== "LI" || gameIsOver) {
    //list item has to be capital "LI"
    return;
  } //to prevent the symbol replacing the board when clicking on a gap

  const selectedField = event.target;
  const selecetedColumn = selectedField.dataset.col - 1; //-1 because arrays starts from 0 and also to convert to a number from string
  const selecetedRow = selectedField.dataset.row - 1;

  if (gameData[selecetedRow][selecetedColumn] > 0) {
    alert("Please select an empty field!");
    return;
  }

  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add("disabled");

  gameData[selecetedRow][selecetedColumn] = activePlayer + 1; //+1 cause active player is 0 by default
  // console.log(gameData);

  const winnerId = checkForGameOver();
  // console.log(winnerId);

  if (winnerId !== 0) {
    endGame(winnerId);
  }

  currentRound++;
  switchPlayer();
}

function checkForGameOver() {
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 && //cause initially the values for the arrays are 0
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }

    //checking the columns for equality
    for (let i = 0; i < 3; i++) {
      if (
        gameData[0][i] > 0 && //cause initially the values for the arrays are 0
        gameData[0][i] === gameData[1][i] &&
        gameData[0][i] === gameData[2][i]
      ) {
        return gameData[0][i];
      }
    }
    //diagonal: top left to bottom right
    if (
      gameData[0][0] > 0 &&
      gameData[0][0] === gameData[1][1] &&
      gameData[1][1] === gameData[2][2]
    ) {
      return gameData[0][0];
    }

    //diagonal: bottom left to top right
    if (
      gameData[2][0] > 0 &&
      gameData[2][0] === gameData[1][1] &&
      gameData[1][1] === gameData[2][2]
    ) {
      return gameData[2][0];
    }

    if (currentRound === 9) {
      return -1;
    }
  }
  return 0;
}

//check for winner
// if (
//   gameData[0][0] > 0 && //cause initially the values for the arrays are 0
//   gameData[0][0] === gameData[0][1] &&
//   gameData[0][1] === gameData[0][2]
// ) {
//   return gameData[0][0];
// }

// if (
//   gameData[1][0] > 0 && //cause initially the values for the arrays are 0
//   gameData[1][0] === gameData[1][1] &&
//   gameData[1][1] === gameData[1][2]
// ) {
//   return gameData[1][0];
// }

// if (
//   gameData[2][0] > 0 && //cause initially the values for the arrays are 0
//   gameData[2][0] === gameData[2][1] &&
//   gameData[2][1] === gameData[2][2]
// ) {
//   return gameData[2][0];
// }
// ... and so on    or .use the for loop as shown above in checkForGameOver

function endGame(winnerId) {
  gameIsOver = true;
  gameOverElement.style.display = "block";

  if (winnerId > 0) {
    const winnerName = players[winnerId - 1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent =
      winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = `It's a draw!`;
  }
}
