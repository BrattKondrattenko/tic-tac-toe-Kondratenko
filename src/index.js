/* eslint-disable no-restricted-syntax */
let map = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const players = ['Игрок 1', 'Игрок 2'];
let currentPlayer;
const firstMoveButton = document.querySelector('.firstMoveButton');
const secondMoveButton = document.querySelector('.secondMoveButton');
const resetButton = document.querySelector('.resetButton');
const playerElements = document.getElementsByClassName('player');
const cells = document.getElementsByClassName('cell');

const checkWin = () => {
  const winningCombinations = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
  ];

  for (const combination of winningCombinations) {
    const [row1, col1] = combination[0];
    const [row2, col2] = combination[1];
    const [row3, col3] = combination[2];
    if (
      map[row1][col1] !== ''
      && map[row1][col1] === map[row2][col2]
      && map[row1][col1] === map[row3][col3]
    ) {
      return true;
    }
  }
  return false;
};

const updatePlayerElements = () => {
  for (let i = 0; i < playerElements.length; i += 1) {
    playerElements[i].innerText = players[i];
  }
};

const setFirstPlayer = () => {
  currentPlayer = 0;
  players[0] = prompt('Введите имя первого игрока:');
  players[1] = prompt('Введите имя второго игрока:');
  updatePlayerElements();
  firstMoveButton.disabled = true;
  secondMoveButton.disabled = false;
};

const setSecondPlayer = () => {
  currentPlayer = 1;
  players[0] = prompt('Введите имя первого игрока:');
  players[1] = prompt('Введите имя второго игрока:');
  updatePlayerElements();
  firstMoveButton.disabled = false;
  secondMoveButton.disabled = true;
};

const checkDraw = () => {
  for (const row of map) {
    if (row.includes('')) {
      return false;
    }
  }
  return true;
};

const resetGame = () => {
  map = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  currentPlayer = 0;
  for (let i = 0; i < cells.length; i += 1) {
    cells[i].innerText = '';
  }
};

const makeMove = (row, col) => {
  if (currentPlayer === undefined) {
    return;
  }
  const playerSymbol = currentPlayer === 0 ? 'X' : 'O';
  if (map[row][col] === '') {
    map[row][col] = playerSymbol;
    cells[row * 3 + col].innerText = playerSymbol;
    if (checkWin()) {
      alert(`${players[currentPlayer]} выиграл игру`);
      resetGame();
    } else if (checkDraw()) {
      alert('Игра закончилась вничью!');
      resetGame();
    } else {
      currentPlayer = (currentPlayer + 1) % 2;
    }
  }
};

firstMoveButton.addEventListener('click', setFirstPlayer);
secondMoveButton.addEventListener('click', setSecondPlayer);
resetButton.addEventListener('click', resetGame);

for (let i = 0; i < cells.length; i += 1) {
  cells[i].addEventListener('click', () => {
    const row = Math.floor(i / 3);
    const col = i % 3;
    makeMove(row, col);
  });
}
