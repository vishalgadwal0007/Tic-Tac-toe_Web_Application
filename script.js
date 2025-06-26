let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;

const board = document.getElementById('board');
const statusText = document.getElementById('status');

function drawBoard() {
  board.innerHTML = '';
  gameBoard.forEach((cell, index) => {
    const cellDiv = document.createElement('div');
    cellDiv.classList.add('cell');
    cellDiv.textContent = cell;
    cellDiv.addEventListener('click', () => makeMove(index));
    board.appendChild(cellDiv);
  });
}

function makeMove(index) {
  if (gameBoard[index] === '' && !isGameOver) {
    gameBoard[index] = currentPlayer;
    drawBoard();
    if (checkWin()) {
      statusText.textContent = `Player ${currentPlayer} Wins!`;
      isGameOver = true;
    } else if (gameBoard.every(cell => cell !== '')) {
      statusText.textContent = "It's a Draw!";
      isGameOver = true;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
  });
}

function restartGame() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  isGameOver = false;
  statusText.textContent = `Player X's Turn`;
  drawBoard();
}

drawBoard(); // initial call
