document.addEventListener("DOMContentLoaded", () => {
  const colors = ["red", "green", "yellow", "blue"];
  let gameSequence = [];
  let userSequence = [];
  let level = 0;
  let started = false;

  const levelTitle = document.getElementById("level-title");
  const startButton = document.getElementById("start-btn");
  const buttons = document.querySelectorAll(".game-btn");

  const clickSound = new Audio("sounds/click.mp3");
  const gameOverSound = new Audio("sounds/game-over.mp3");

  startButton.addEventListener("click", startGame);

  function startGame() {
    if (!started) {
      startButton.style.visibility = "hidden"; // Hide the button without affecting layout
      level = 0;
      gameSequence = [];
      userSequence = [];
      started = true;
      nextSequence();
    }
  }

  function nextSequence() {
    userSequence = [];
    level++;
    levelTitle.textContent = `Level ${level}`;

    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    gameSequence.push(randomColor);

    flashButton(randomColor);
  }

  function flashButton(color) {
    let button = document.getElementById(color);
    button.classList.add("active");
    setTimeout(() => {
      button.classList.remove("active");
    }, 300);
  }

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      let userColor = this.id;
      userSequence.push(userColor);

      flashButton(userColor);
      playSound("click");
      checkAnswer(userSequence.length - 1);
    });
  });

  function playSound(type) {
    if (type === "click") {
      clickSound.play();
    } else if (type === "game-over") {
      gameOverSound.play();
    }
  }

  function checkAnswer(index) {
    if (userSequence[index] === gameSequence[index]) {
      if (userSequence.length === gameSequence.length) {
        setTimeout(nextSequence, 1000);
      }
    } else {
      levelTitle.textContent = "Game Over! Press Start to Try Again";
      playSound("game-over");
      started = false;
      startButton.style.visibility = "visible"; // Show button without shifting layout
    }
  }
});
