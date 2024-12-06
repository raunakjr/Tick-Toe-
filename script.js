const boxes = document.querySelectorAll(".box");
const result = document.querySelector(".result");
const info = document.querySelector(".info");
const inputid = document.querySelector(".inputid");

const starting = document.querySelector(".starting");
let users = [];
let currentPlayer = "X";

let gameState = Array(9).fill(null); // Array to track moves

inputid.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    if (users.length == 0) {
      users[0] = e.target.value;
      e.target.value = "";
    } else {
      users[1] = e.target.value;
      e.target.value = "";
    }
  }
  if (users.length > 1) {
    info.innerHTML = `Hi, ${users[0]} and ${users[1]} `;
    starting.innerHTML = users[0] && `${users[0]} is starting the game...`;
  }
});
// Winning combinations
const winningCombinations = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal top-left to bottom-right
  [2, 4, 6], // Diagonal top-right to bottom-left
];

// Add click event to all boxes
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    console.log("clicked");
    if (!gameState[index]) {
      // Update game state
      gameState[index] = currentPlayer;
      box.textContent = currentPlayer;

      // Check for a winner
      if (checkWinner()) {
        if (currentPlayer == "X") result.textContent = `  ${users[0]} wins!`;
        else result.textContent = ` ${users[1]} wins!`;
      } else if (gameState.every((cell) => cell)) {
        result.textContent = "It's a draw!";
      } else {
        // Switch player
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  });
});

function checkWinner() {
  for (v of winningCombinations) {
    let f = 1;
    v.forEach((e) => {
      if (gameState[e] != currentPlayer) f = 0;
    });
    if (f == 1) return true;
  }
  return false;
}

// function checkWinner() {
//   return winningCombinations.some((combinations) =>
//     combinations.every((e) => gameState[e] === currentPlayer)
//   );
// }

const reset = document.querySelector(".reset");
reset.addEventListener("click", () => {
  boxes.forEach((box, index) => {
    box.innerHTML = "";
  });
  users = [];
  result.textContent = "";
  gameState = Array(9).fill(null);
  starting.innerHTML = "";
  info.innerHTML = "";
});

const darkmode = document.querySelector(".dark-mode-toggle");
const body = document.querySelector("body");
darkmode.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  info.classList.add("info-dark");
});
