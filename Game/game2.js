const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "lightgray";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const foodBorder = "black";
const bombColor = "gray";
const bombBorder = "black";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let bombX;
let bombY;
let score = 0;
let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];
var timeout = setTimeout; 

let bombs = [
	//{x:0, y:0}
]


window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);


gameStart();

function gameStart(){
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
	createBomb();
	drawBomb();
    nextTick();
	bombs = [];
};
function nextTick(){
    if(running){
          timeout = setTimeout(()=> {
            clearBoard();
            drawFood();
			drawBomb();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 90);
    }
    else{
		startTheGameEvent();
        displayGameOver();

    }
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
};
function drawFood(){
    ctx.fillStyle = foodColor;
	ctx.strokeStyle = foodBorder;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
	ctx.strokeRect(foodX, foodY, unitSize, unitSize);
};
function createBomb() {
    function randomBomb(min, max) {
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }

    do {
        bombX = randomBomb(0, gameWidth - unitSize);
        bombY = randomBomb(0, gameWidth - unitSize);
    } while (bombX === foodX && bombY === foodY); // Check for overlap with food

    bombs.push({ x: bombX, y: bombY });
}

function drawBomb(){

	// draw existing snake:
	ctx.fillStyle = bombColor;
	ctx.strokeStyle = bombBorder;

	bombs.forEach(function(bomb) {
		ctx.fillRect(bomb.x, bomb.y, unitSize, unitSize);
		ctx.strokeRect(bomb.x, bomb.y, unitSize, unitSize);
	})
	


    ctx.fillStyle = bombColor;
	ctx.strokeStyle = bombBorder;
    ctx.fillRect(bombX, bombY, unitSize, unitSize);
	ctx.strokeRect(bombX, bombY, unitSize, unitSize);


	bombs.push({x: bombX, y: bombY})
};
function moveSnake(){
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity};
    
    snake.unshift(head);
    //if food is eaten
    if(snake[0].x == foodX && snake[0].y == foodY){
        score+=1;
        scoreText.textContent = score;
        createFood();
		createBomb();
    
    }
    else{
        snake.pop();
    } 

	bombs.forEach(element => {
		if(snake[0].x == element.x && snake[0].y == element.y){
			displayGameOver();
			bombs = [];
		}
	});
};
function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
		
    })
	
    
   

};

function changeDirection(event){
    const keyPressed = event.keyCode;
    const LEFT = 65;
    const UP = 87;
    const RIGHT = 68;
    const DOWN = 83;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch(true){
        case(keyPressed == LEFT && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == UP && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case(keyPressed == RIGHT && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == DOWN && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
};
function checkGameOver(){
    switch(true){
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
                running = false;
                break;
    }
    for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    }
};

function displayGameOver(){
    ctx.font = "50px Gill Sans";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
	ctx.font = "30px Gill Sans";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Press R to reset!", gameWidth / 2, gameHeight / 1.8);
    running = false;
};
function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];
    clearTimeout(timeout);
    gameStart();
};

function startTheGameEvent(){
	window.addEventListener('keydown', (e) => {
		// Start the game if enter key is pressed
		if (e.key == 'r' ) {
			score = 0;
		xVelocity = unitSize;
		yVelocity = 0;
		snake = [
			{x:unitSize * 4, y:0},
			{x:unitSize * 3, y:0},
			{x:unitSize * 2, y:0},
			{x:unitSize, y:0},
			{x:0, y:0}
		];
		clearTimeout(timeout);
		gameStart();
		
		}
	});
}


