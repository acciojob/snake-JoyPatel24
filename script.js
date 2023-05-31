//your code here
document.addEventListener('DOMContentLoaded', () => {
  const gameContainer = document.getElementById('gameContainer');
  const scoreBoard = document.createElement('div');
  scoreBoard.classList.add('scoreBoard');
  scoreBoard.textContent = 'Score: 0';
  gameContainer.appendChild(scoreBoard);

  let score = 0;
  let snakeBody = [{ row: 20, col: 1 }];
  let food = { row: 0, col: 0 };
  let direction = 'right';

  function createPixel(row, col, className) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel', className);
    pixel.id = `pixel${row}-${col}`;
    gameContainer.appendChild(pixel);
  }

  function updateGame() {
    const head = { ...snakeBody[0] };
    switch (direction) {
      case 'up':
        head.row--;
        break;
      case 'down':
        head.row++;
        break;
      case 'left':
        head.col--;
        break;
      case 'right':
        head.col++;
        break;
    }

    snakeBody.unshift(head);

    if (head.row === food.row && head.col === food.col) {
      score++;
      scoreBoard.textContent = `Score: ${score}`;
      generateFood();
    } else {
      snakeBody.pop();
    }

    if (isGameOver()) {
      clearInterval(gameInterval);
      alert('Game Over');
      return;
    }

    drawGame();
  }

  function drawGame() {
    // Clear the game container
    gameContainer.innerHTML = '';
    // Create pixels for snake body
    snakeBody.forEach((pixel, index) => {
      createPixel(pixel.row, pixel.col, index === 0 ? 'snakeBodyPixel' : '');
    });
    // Create pixel for food
    createPixel(food.row, food.col, 'food');
  }

  function generateFood() {
    food.row = Math.floor(Math.random() * 20);
    food.col = Math.floor(Math.random() * 20);
  }

  function isGameOver() {
    const head = snakeBody[0];

    // Check if snake hits the wall
    if (
      head.row < 0 ||
      head.row >= 20 ||
      head.col < 0 ||
      head.col >= 20
    ) {
      return true;
    }

    // Check if snake bites itself
    for (let i = 1; i < snakeBody.length; i++) {
      if (head.row === snakeBody[i].row && head.col === snakeBody[i].col) {
        return true;
      }
    }

    return false;
  }

  generateFood();
  drawGame();

  const gameInterval = setInterval(updateGame, 100);

  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowUp':
        if (direction !== 'down') {
          direction = 'up';
        }
        break;
      case 'ArrowDown':
        if (direction !== 'up') {
          direction = 'down';
        }
        break;
      case 'ArrowLeft':
        if (direction !== 'right') {
          direction = 'left';
        }
        break;
      case 'ArrowRight':
        if (direction !== 'left') {
          direction = 'right';
        }
        break;
    }
  });
});
