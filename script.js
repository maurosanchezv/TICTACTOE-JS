let scoreX = 0;
let scoreO = 0;
// Variables para el temporizador
let timer;
let timeRemaining = 100;
// Variables para el tablero
const board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
// Elementos del DOM
const scoreXElement = document.getElementById("scoreX");
const scoreOElement = document.getElementById("scoreO");
const timerElement = document.getElementById("timer");
const messageElement = document.getElementById("message");
const endMessageElement = document.getElementById("endMessage");
const endMessageTextElement = document.getElementById("endMessageText");
const gridItems = document.querySelectorAll(".grid-item");
const resetButton = document.getElementById("resetButton");

// Función para manejar clics en las celdas del tablero
function handleClick(event) {
  const index = Array.from(gridItems).indexOf(event.target);
  if (board[index] === "") {
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    if (checkWin()) {
      endGame(currentPlayer + " ha ganado");
      updateScore(currentPlayer);
      launchConfetti(); // Lanza confetti al ganar
    } else if (board.every((cell) => cell !== "")) {
      endGame("Empate");
    } else {
      switchPlayer();
    }
  }
}

// Función para cambiar de jugador
function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  messageElement.textContent = "Turno de " + currentPlayer;
}

// Función para verificar si hay un ganador
function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Filas
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columnas
    [0, 4, 8],
    [2, 4, 6], // Diagonales
  ];
  return winPatterns.some((pattern) => {
    return pattern.every((index) => board[index] === currentPlayer);
  });
}

// Función para manejar el final del juego
function endGame(message) {
  clearInterval(timer);
  endMessageTextElement.textContent = message;
  endMessageElement.classList.remove("hidden");
  gridItems.forEach((item) => item.removeEventListener("click", handleClick));
}

// Función para actualizar el marcador
function updateScore(player) {
  if (player === "X") {
    scoreX++;
    scoreXElement.textContent = scoreX;
  } else {
    scoreO++;
    scoreOElement.textContent = scoreO;
  }
}

// Función para reiniciar el juego
function resetGame() {
  board.fill("");
  gridItems.forEach((item) => {
    item.textContent = "";
    item.addEventListener("click", handleClick);
  });
  endMessageElement.classList.add("hidden");
  messageElement.textContent = "Turno de " + currentPlayer;
  startTimer();
}

// Función para iniciar el temporizador
function startTimer() {
  timeRemaining = 100;
  timerElement.textContent = timeRemaining;
  clearInterval(timer);
  timer = setInterval(() => {
    timeRemaining--;
    timerElement.textContent = timeRemaining;
    if (timeRemaining <= 0) {
      clearInterval(timer);
      endGame("Tiempo agotado");
    }
  }, 1000);
}

// Función para lanzar confetti
function launchConfetti() {
  const myCanvas = document.getElementById("confetti-canvas");
  const myConfetti = confetti.create(myCanvas, {
    resize: true,
    useWorker: true,
  });
  myConfetti({
    particleCount: 100,
    spread: 160,
    origin: { y: 0.5, x: 0.5 },
  });
}

// Añadir eventos a las celdas del tablero
gridItems.forEach((item) => item.addEventListener("click", handleClick));

// Añadir evento al botón de reiniciar juego
if (resetButton) {
  resetButton.addEventListener("click", resetGame);
} else {
  console.error("El botón de reinicio no se encontró en el DOM");
}
// Añade esto al final de tu archivo JavaScript existente

const toggleModeButton = document.getElementById("toggleMode");
const body = document.body;

toggleModeButton.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  // Opcional: Guarda la preferencia del usuario
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.setItem("darkMode", "disabled");
  }
});

// Comprueba si el usuario ya ha seleccionado el modo oscuro anteriormente
if (localStorage.getItem("darkMode") === "enabled") {
  body.classList.add("dark-mode");
}
// Iniciar el juego
resetGame();
