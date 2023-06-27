//your code here
document.addEventListener("DOMContentLoaded", function() {
  const gameContainer = document.getElementById("gameContainer");
  const scoreElement = document.getElementById("score");

  const gridWidth = 40;
  const gridHeight = 40;
  const pixelSize = 10;

  let snake = [{x: 20, y: 20}];
  let food = getRandomFoodPosition();
  let dx = 1;
  let dy = 0;
  let score = 0;

  const gameLoop = setInterval(() => {
    clearCanvas();
    moveSnake();
    drawSnake();
    drawFood();
    checkCollision();
  }, 100);

  document.addEventListener("keydown", changeDirection);

  function changeDirection(e) {
    if (e.keyCode === 37 && dx !== 1) { // Left arrow
      dx = -1;
      dy = 0;
    } else if (e.keyCode === 38 && dy !== 1) { // Up arrow
      dx = 0;
      dy = -1;
    } else if (e.keyCode === 39 && dx !== -1) { // Right arrow
      dx = 1;
      dy = 0;
    } else if (e.keyCode === 40 && dy !== -1) { // Down arrow
      dx = 0;
      dy = 1;
    }
  }

  function clearCanvas() {
    while (gameContainer.firstChild) {
      gameContainer.firstChild.remove();
    }
  }

  function drawSnake() {
    snake.forEach(pixel => {
      const snakePixel = createPixelElement(pixel.x, pixel.y, "snakeBodyPixel");
      gameContainer.appendChild(snakePixel);
    });
  }

  function drawFood() {
    const foodPixel = createPixelElement(food.x, food.y, "food");
    gameContainer.appendChild(foodPixel);
  }

  function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      score++;
      scoreElement.textContent = score;
      food = getRandomFoodPosition();
    } else {
      snake.pop();
    }
  }

  function checkCollision() {
    const head = snake[0];
    if (
      head.x < 0 ||
      head.x >= gridWidth ||
      head.y < 0 ||
      head.y >= gridHeight ||
      snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
     
