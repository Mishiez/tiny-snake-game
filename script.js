const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');

const GRID_SIZE = 20;
const TILE_COUNT = canvas.width / GRID_SIZE;

function draw() {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#eee';
  for (let i = 0; i < TILE_COUNT; i++) {
    ctx.beginPath();
    ctx.moveTo(i * GRID_SIZE, 0);
    ctx.lineTo(i * GRID_SIZE, canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * GRID_SIZE);
    ctx.lineTo(canvas.width, i * GRID_SIZE);
    ctx.stroke();
  }
}

draw();


let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let gameOver = false;

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp': if (direction.y !== 1) direction = { x: 0, y: -1 }; break;
    case 'ArrowDown': if (direction.y !== -1) direction = { x: 0, y: 1 }; break;
    case 'ArrowLeft': if (direction.x !== 1) direction = { x: -1, y: 0 }; break;
    case 'ArrowRight': if (direction.x !== -1) direction = { x: 1, y: 0 }; break;
  }
});

function tick() {
  if (checkCollision()) {
    endGame();
    return;
  }
  
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById('score').textContent = `Score: ${score}`;
    food = spawnFood();
  } else {
    snake.pop();
  }

  draw();
  drawSnake();
  drawFood();
}
function checkCollision() {
  const head = snake[0];
  const hitWall = head.x < 0 || head.y < 0 || head.x >= TILE_COUNT || head.y >= TILE_COUNT;
  const hitSelf = snake.slice(1).some(seg => seg.x === head.x && seg.y === head.y);
  return hitWall || hitSelf;
}

function endGame() {
  gameOver = true;
  clearInterval(gameLoop);
  document.getElementById('game-over').style.display = 'block';
}

function drawSnake() {
  ctx.fillStyle = '#2e7d32';
  snake.forEach(seg => ctx.fillRect(seg.x * GRID_SIZE, seg.y * GRID_SIZE, GRID_SIZE, GRID_SIZE));
}

let gameLoop = setInterval(tick, 100);

//Trying squash 

let food = spawnFood();
let score = 0;

function spawnFood() {
  return {
    x: Math.floor(Math.random() * TILE_COUNT),
    y: Math.floor(Math.random() * TILE_COUNT)
  };
}

function drawFood() {
  ctx.fillStyle = '#e53935';
  ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
}