const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 20;
let score = 0;
let direction = null;
let snake = [{ x: 9 * box, y: 10 * box }];
let food = {
  x: Math.floor(Math.random() * 24) * box,
  y: Math.floor(Math.random() * 24) * box
};

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw food
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(food.x + box/2, food.y + box/2, box / 2.5, 0, Math.PI * 2);
  ctx.fill();

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  let head = { x: snake[0].x, y: snake[0].y };
  if (direction === "LEFT") head.x -= box;
  if (direction === "UP") head.y -= box;
  if (direction === "RIGHT") head.x += box;
  if (direction === "DOWN") head.y += box;

  // Game Over condition
  if (
    head.x < 0 || head.y < 0 ||
    head.x >= canvas.width || head.y >= canvas.height ||
    snake.some((seg, i) => i !== 0 && seg.x === head.x && seg.y === head.y)
  ) {
    clearInterval(game);
    document.getElementById("gameOver").style.display = "block";
    return;
  }

  snake.unshift(head);

  // Food eaten
  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").textContent = `Score : ${score}`;
    food = {
      x: Math.floor(Math.random() * 24) * box,
      y: Math.floor(Math.random() * 24) * box
    };
  } else {
    snake.pop();
  }
}

let game = setInterval(draw, 120);
