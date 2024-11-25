let playground;
let rows = 20;
let cols = 18;
let unitSize = 20;
let context;
let movementX = 0;
let movementY = 0;
let movesPerSec = 4;
let playerBody = [];
let gameOver = false;
let score = 0;
let interval;
let pause = false
const snakeHeadImg = new Image();
snakeHeadImg.src = "./snake.svg"; 

const fruitImg = new Image();
fruitImg.src = "./fruit.svg";

const snakeBody = new Image();
snakeBody.src = "./snakeBody.svg";

const scoreBoard = document.getElementById('score')
const scoreBoard2 = document.getElementById('score2')
const pop = document.getElementById("pop")
const pauseButton = document.getElementById("pauseButton")

window.onload = function () {
  playground = document.getElementById("playground");
  playground.width = cols * unitSize;
  playground.height = rows * unitSize;
  context = playground.getContext("2d");
  document.addEventListener("keydown", changeDir);
  spawnFood();
  interval = setInterval(draw, 1000 / movesPerSec);
};

let playerX = Math.floor(Math.random() * 10) * unitSize;
let playerY = Math.floor(Math.random() * 10) * unitSize;

let foodX;
let foodY;

function spawnFood() {
  foodX = Math.floor(Math.random() * cols) * unitSize ;
  foodY = Math.floor(Math.random() * rows) * unitSize;
}

function draw() {
  context.fillStyle = "balck";
  context.fillRect(0, 0, playground.width, playground.height);

  if (playerX === foodX && playerY === foodY) {
    playerBody.push([foodX, foodY]);
    score++
    updateScore()
    spawnFood();
  }

  for (let i = playerBody.length - 1; i > 0; i--) {
    playerBody[i] = playerBody[i - 1];
  }
  if (playerBody.length) {
    playerBody[0] = [playerX, playerY];
  }

  context.drawImage(fruitImg, foodX, foodY, unitSize, unitSize);

  playerX += movementX * unitSize;
  playerY += movementY * unitSize;

  context.drawImage(snakeHeadImg, playerX, playerY, unitSize, unitSize);

  for (let i = 0; i < playerBody.length; i++) {
    context.drawImage(
      snakeBody,
      playerBody[i][0],
      playerBody[i][1],
      unitSize,
      unitSize
    );
  }

  if (
    playerX < 0 ||
    playerY < 0 ||
    playerX >= cols * unitSize ||
    playerY >= rows * unitSize
  ) {
    gameOver = true;
  }

  for (let i = 0; i < playerBody.length; i++) {
    if (playerX == playerBody[i][0] && playerY == playerBody[i][1]) {
      gameOver = true;
    }
  }
  if (gameOver === true) {
    GAMEOVER()
    updateScore()
    pop.showPopover()
  }
}

function GAMEOVER(){
  clearInterval(interval);
  context.font = "20px Arial";
  context.fillStyle = "white"
  context.textAlign = "center";
  context.fillText("Game Over", playground.width/2 , 100);
  
  context.font = "12px Arial";
  context.fillText("your score:", playground.width/2 , 150);
  
  context.font = "50px Arial";
  context.textAlign = "center";
  context.fillText(score, playground.width/2 , 210);
  
  context.font = "15px Arial";
  context.fillText("Click restart button, to play again!", playground.width/2 , 300);
  
}

function changeDir(e) {
  if (e.code === "ArrowUp" && movementY != 1) {
    movementY = -1;
    movementX = 0;
  } else if (e.code === "ArrowRight" && movementX != -1) {
    movementY = 0;
    movementX = 1;
  } else if (e.code === "ArrowDown" && movementY != -1) {
    movementY = 1;
    movementX = 0;
  } else if (e.code === "ArrowLeft" && movementX != 1) {
    movementY = 0;
    movementX = -1;
  }
}

function restart(){
  location.reload()
}

function control(e) {
  if (e === "Up" && movementY != 1) {
    movementY = -1;
    movementX = 0;
    console.log('hai')
  } else if (e  === "Right" && movementX != -1) {
    movementY = 0;
    movementX = 1;
  } else if ( e === "Down" && movementY != -1) {
    movementY = 1;
    movementX = 0;
  } else if (e === "Left" && movementX != 1) {
    movementY = 0;
    movementX = -1;
  }
}

function updateScore(){
  scoreBoard.innerText = score;
  scoreBoard2.innerText = score
}

function changeSpeed(s) {
  movesPerSec = s;

  // Clear the existing interval
  clearInterval(interval);

  // Set a new interval with the updated speed
  interval = setInterval(draw, 1000 / movesPerSec);

  console.log(`Speed changed to ${movesPerSec} moves per second`);
}

function playPause(){
  pause = !pause
  
  if(pause){
    clearInterval(interval)
    pauseButton.classList.remove("fa-pause")
    pauseButton.classList.add("fa-play")
  }else{
    interval = setInterval(draw, 1000 / movesPerSec);
    pauseButton.classList.remove("fa-play")
    pauseButton.classList.add("fa-pause")
  }
}
