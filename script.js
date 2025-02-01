document.addEventListener("DOMContentLoaded", () => {
  const colors = ["red", "green", "yellow", "blue"];
  let gameSequence = []; // Stores the full sequence to be recalled
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
          level = 0;
          gameSequence = [];
          userSequence = [];
          started = true;
          nextSequence();
      }
  }

  function nextSequence() {
      userSequence = []; // Reset user input for the new level
      level++;
      levelTitle.textContent = `Level ${level}`;

      // Generate only one new random color and add it to the sequence
      let randomColor = colors[Math.floor(Math.random() * colors.length)];
      gameSequence.push(randomColor);

      // Highlight only the new color
      flashButton(randomColor);
  }

  function flashButton(color) {
      let button = document.getElementById(color);
      button.classList.add("active");
      setTimeout(() => {
          button.classList.remove("active");
      }, 300);
  }

  buttons.forEach(button => {
      button.addEventListener("click", function () {
          let userColor = this.id;
          userSequence.push(userColor);

          flashButton(userColor); // Flash on user click
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
          // If user completes the full sequence, move to the next level
          if (userSequence.length === gameSequence.length) {
              setTimeout(nextSequence, 1000);
          }
      } else {
          // Wrong input -> Game Over
          levelTitle.textContent = "Game Over! Press Start to Try Again";
          playSound("game-over"); // Play game over sound
          started = false;
      }
  }
});
