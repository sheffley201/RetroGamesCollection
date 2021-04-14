//keycodes for different directions
const left = 37;
const up = 38;
const right = 39;
const down = 40;

//pull all necessary elements from html
const snake = Array.from(document.querySelectorAll('.snake-section'));
const apple = document.querySelector('.apple');
const gameArea = document.querySelector('.game-container');
const gameOverText = document.querySelector('.game-over');
const resetButton = document.querySelector('.reset-game');
const currentScoreText = document.querySelector('.score');
const highScoreText = document.querySelector('high-score');

//create array to store positions of snake segments
const positions = [{xPos: 260, yPos: 240}, {xPos: 250, yPos: 240}, {xPos: 240, yPos: 240}];

//position of apple
let appleX = 0;
let appleY = 0;

//set up values to be used by the game
let currentDirection = right;
let newDirection;
let moveTimer;
let keyTimeout;
let gameOver = false;
let currentScore = 0;
let highScore = 0;
let xMove = 10;
let yMove = 0;

//a function to handle changing the direction of the snake
const changeDirection = (e) => {
    //set keyPressed to the value of the key that was pressed
    let keyPressed = e.keyCode;

    //only do this every 100 milliseconds to prevent the snake from doing a 180
    //prevent arrow keys from scrolling the page and set new direction
    if (keyPressed == left || keyPressed == up || keyPressed == right || keyPressed == down) {
        e.preventDefault;
        newDirection = keyPressed;
    }

    //set the current direction if it is not the same as the old one
    if (newDirection != currentDirection) {
        //set current direction only if the new direction is not the opposite of the old one
        if (newDirection == left && currentDirection != right) {
            currentDirection = newDirection;
            xMove = -10;
            yMove = 0;
        } else if (newDirection == up && currentDirection != down) {
            currentDirection = newDirection;
            xMove = 0;
            yMove = -10;
        } else if (newDirection == right && currentDirection != left) {
            currentDirection = newDirection;
            xMove = 10;
            yMove = 0;
        } else if (newDirection == down && currentDirection != up) {
            currentDirection = newDirection;
            xMove = 0;
            yMove = 10;
        }
        window.removeEventListener('keydown', changeDirection);
        keyTimeout = setTimeout(() => {
            window.addEventListener('keydown', changeDirection);
        }, 75);
    }
}

//a function to handle moving the snake in the desired direction
const moveSnake = () => {
    //only move if the player has not lost the game
    if (!gameOver) {
        //pull positions and snake sections from arrays

        //check if the snake ate an apple
        didEatApple();

        let firstPos = positions[0];
        let lastPos = positions[positions.length - 1];
        let lastSnake = snake[snake.length - 1];
        console.log(xMove, yMove);

        //set new coordinates on the last snake section, and shift it to the front of the array
        lastPos.xPos = firstPos.xPos + xMove;
        lastPos.yPos = firstPos.yPos + yMove;
        lastSnake.style.left = lastPos.xPos + 'px';
        lastSnake.style.top = lastPos.yPos + 'px';
        positions.unshift(lastPos);
        positions.pop();
        snake.unshift(lastSnake);
        snake.pop();

        moveTime = setTimeout(() => {
            moveSnake();
        }, 100);
    }
}

//function to check if the snake eats an apple
const didEatApple = () => {
    let snakeHead = positions[0];
    if (snakeHead.xPos == appleX && snakeHead.yPos == appleY) {
        longerSnake();
    }
}

//function to make the snake longer
const longerSnake = () => {
    //create new snake section in the html
    const newSnakeSection = document.createElement('div');
    newSnakeSection.className = 'snake-section';
    snake.push(newSnakeSection);

    //set position for the new section to be the same as the current last snake section
    let lastPos = positions[positions.length - 1];
    newSnakeSection.style.top = lastPos.yPos + 'px';
    newSnakeSection.style.left = lastPos.xPos + 'px';
    positions.push({xPos: lastPos.xPos, yPos: lastPos.yPos});
    gameArea.appendChild(newSnakeSection);

}

//create event handler to run changeDirection on button presses
window.addEventListener('keydown', changeDirection);
moveSnake();