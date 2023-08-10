let blockSize = 25;
let total_row = 20; //total row number
let total_col = 20; //total column number
let board;
let context;
let die = new Audio();
die.src = "sfx_die.mp3";
let scor = new Audio();
scor.src = "score.mp3";


let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

// Set the total number of rows and columns
let speedX = 0; //speed of snake in x coordinate.
let speedY = 0; //speed of snake in Y coordinate.

let snakeBody = [];

//let score_val = document.querySelector('.score_val');

//let message = document.querySelector('.message');

//let score_title = document.querySelector('.score_title');

let foodX;
let foodY;

let gameOver = false;

window.onload = function () {
	// Set board height and width
	board = document.getElementById("board");
	board.height = total_row * blockSize;
	board.width = total_col * blockSize;
	context = board.getContext("2d");
    

	placeFood();
	document.addEventListener("keyup", changeDirection); //for movements
	// Set snake speed
	setInterval(update, 1000 / 10);
}

function update() {
	if (gameOver) {
		return;
	}

	// Background of a Game
	context.fillStyle = "black";
	context.fillRect(0, 0, board.width, board.height);

	// Set food color and position
	context.fillStyle = "red";
	context.fillRect(foodX, foodY, blockSize, blockSize);

	if (snakeX == foodX && snakeY == foodY) {
		snakeBody.push([foodX, foodY]);
		placeFood();
        scor.play();
	}

	// body of snake will grow
	for (let i = snakeBody.length - 1; i > 0; i--) {
		// it will store previous part of snake to the current part
		snakeBody[i] = snakeBody[i - 1];
	}
	if (snakeBody.length) {
		snakeBody[0] = [snakeX, snakeY];
	}

	context.fillStyle = "lime";
	snakeX += speedX * blockSize; //updating Snake position in X coordinate.
	snakeY += speedY * blockSize; //updating Snake position in Y coordinate.
	context.fillRect(snakeX, snakeY, blockSize, blockSize);
	for (let i = 0; i < snakeBody.length; i++) {
		context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
	}


    if (snakeX < 0 
        || snakeX >= total_col * blockSize 
        || snakeY < 0 
        || snakeY >= total_row * blockSize) {
        // Out of bound condition
        gameOver = true;
        die.play();
        alert("Game Over");
    }
    


	for (let i = 0; i < snakeBody.length; i++) {
		if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
			
			// Snake eats own body
			gameOver = true;
			alert("Game Over");
		}
	}
}

// Movement of the Snake - We are using addEventListener
function changeDirection(e) {
	if (e.key == "w" && speedY != 1) {
		// If up arrow key pressed with this condition...
		// snake will not move in the opposite direction
		speedX = 0;
		speedY = -1;
	}
	else if (e.key == "s" && speedY != -1) {
		//If down arrow key pressed
		speedX = 0;
		speedY = 1;
	}
	else if (e.key == "a" && speedX != 1) {
		//If left arrow key pressed
		speedX = -1;
		speedY = 0;
	}
	else if (e.key == "d" && speedX != -1) {
		//If Right arrow key pressed
		speedX = 1;
		speedY = 0;
	}
    //requestAnimationFrame(update);
}

// Randomly place food
function placeFood() {

	// in x coordinates.
	foodX = Math.floor(Math.random() * total_col) * blockSize;
	
	//in y coordinates.
	foodY = Math.floor(Math.random() * total_row) * blockSize;
    //requestAnimationFrame(update);

}
