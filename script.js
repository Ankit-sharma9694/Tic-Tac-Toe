const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const messageText = document.getElementById('messageText');
const winningMessage = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');

const X_CLASS = 'x';
const O_CLASS = 'o';
let circleTurn = false;

const WINNING_COMBINATIONS = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

startGame();
restartButton.addEventListener('click', startGame);

function startGame() {
  circleTurn = false;
  winningMessage.classList.remove('show');
  messageText.innerText = '';
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS, O_CLASS);
    cell.innerText = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardHover();
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? O_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    circleTurn = !circleTurn;
    setBoardHover();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.innerText = currentClass === X_CLASS ? 'X' : 'O';
}

function endGame(draw) {
  if (draw) {
    messageText.innerText = 'Draw!';
  } else {
    messageText.innerText = `${circleTurn ? 'O' : 'X'} Wins!`;
  }
  winningMessage.classList.add('show');
}

function isDraw() {
  return [...cellElements].every(cell =>
    cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
  );
}

function setBoardHover() {
  board.classList.remove(X_CLASS, O_CLASS);
  board.classList.add(circleTurn ? O_CLASS : X_CLASS);
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination =>
    combination.every(index => cellElements[index].classList.contains(currentClass))
  );
}
