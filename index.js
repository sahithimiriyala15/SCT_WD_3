const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
const modeBtn = document.getElementById("modeBtn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let vsComputer = false;

const winConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

// Click event
cells.forEach(cell => cell.addEventListener("click", handleClick));

function handleClick(e) {
    const index = e.target.dataset.index;

    if (board[index] !== "" || !gameActive) return;

    makeMove(index, currentPlayer);

    if (checkWinner()) return;

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;

    // Computer move
    if (vsComputer && currentPlayer === "O") {
        setTimeout(computerMove, 500);
    }
}

function makeMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;
}

function checkWinner() {
    for (let condition of winConditions) {
        let [a, b, c] = condition;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusText.textContent = `Player ${board[a]} Wins!`;
            gameActive = false;
            return true;
        }
    }

    if (!board.includes("")) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
        return true;
    }

    return false;
}

// Simple AI
function computerMove() {
    let emptyCells = board
        .map((val, index) => val === "" ? index : null)
        .filter(val => val !== null);

    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    makeMove(randomIndex, "O");

    if (checkWinner()) return;

    currentPlayer = "X";
    statusText.textContent = "Player X's Turn";
}

// Restart
restartBtn.addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's Turn";

    cells.forEach(cell => cell.textContent = "");
});

// Toggle Mode
modeBtn.addEventListener("click", () => {
    vsComputer = !vsComputer;
    modeBtn.textContent = vsComputer ? "Vs Player" : "Vs Computer";
});