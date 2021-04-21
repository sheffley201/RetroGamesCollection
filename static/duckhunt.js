//pull elements from HTML
const gameArea = document.querySelector('.game-container');
const flyArea = document.querySelector('.fly-area');
const duckOne = document.querySelector('.red');
const duckTwo = document.querySelector('.blue');
const winText = document.querySelector('.win');
const shotOne = document.querySelector('.one');
const shotTwo = document.querySelector('.two');
const shotThree = document.querySelector('.three');
const shotFour = document.querySelector('.four');
const shotFive = document.querySelector('.five');

//set up variables to be used
let duckOneTop;
let duckOneLeft;
let duckTwoTop;
let duckTwoLeft;

let duckOneVerticalMove;
let duckOneHorizontalMove;
let duckTwoVerticalMove;
let duckTwoHorizontalMove;

let duckTimer;
let stopGameTimer;

let shotDuckOne = false;
let shotDuckTwo = false;

let shotsLeft = 5;

let gameRunning = true;

//function to set random positions for ducks to start in
const setDuckPositions = () => {
    duckOneTop = getRandomInt(1, 300);
    duckOneLeft = getRandomInt(1, 450);

    duckTwoTop = getRandomInt(1, 300);
    duckTwoLeft = getRandomInt(1, 450);

    duckOne.style.top = duckOneTop + 'px';
    duckOne.style.left = duckOneLeft + 'px';

    duckTwo.style.top = duckTwoTop + 'px';
    duckTwo.style.left = duckTwoLeft + 'px';
}

//function to get random integer to avoid typing the same code over again
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//function to set which way the ducks are going to move
const setDuckTrajectory = () => {
    duckOneVerticalMove = getRandomInt(1, 3);
    if (duckOneVerticalMove == 1) {
        duckOneHorizontalMove = 3;
    } else if (duckOneVerticalMove == 2) {
        duckOneHorizontalMove = 2;
    } else {
        duckOneHorizontalMove = 1;
    }

    duckTwoVerticalMove = getRandomInt(1, 3);
    if (duckTwoVerticalMove == 1) {
        duckTwoHorizontalMove = 3;
    } else if (duckTwoVerticalMove == 2) {
        duckTwoHorizontalMove = 2;
    } else {
        duckTwoHorizontalMove = 1;
    }
}

//function to move the ducks
const moveDucks = () => {
    if (gameRunning) {
        duckOneTop += duckOneVerticalMove;
        duckOneLeft += duckOneHorizontalMove;

        duckTwoTop += duckTwoVerticalMove;
        duckTwoLeft += duckTwoHorizontalMove;

        duckOne.style.top = duckOneTop + 'px';
        duckOne.style.left = duckOneLeft + 'px';

        duckTwo.style.top = duckTwoTop + 'px';
        duckTwo.style.left = duckTwoLeft + 'px';

        if (!shotDuckOne) {
            duckOneVerticalMove = detectUpperLowerCollision(duckOneTop, duckOneVerticalMove);
            duckOneHorizontalMove = detectLeftRightCollision(duckOneLeft, duckOneHorizontalMove); 
        }
        
        if (!shotDuckTwo) {
            duckTwoVerticalMove = detectUpperLowerCollision(duckTwoTop, duckTwoVerticalMove);
            duckTwoHorizontalMove = detectLeftRightCollision(duckTwoLeft, duckTwoHorizontalMove); 
        }
        

        duckTimer = setTimeout(() => {
            moveDucks();
        }, 10);
    }
}

//function to detect vertical movement collision
const detectUpperLowerCollision = (coord, trajectory) => {
    if (coord <= 0 || coord >= 300) {
        return -trajectory;
    } else {
        return trajectory;
    }
}

//function to detect collision on left and right sides
const detectLeftRightCollision = (coord, trajectory) => {
    if (coord <= 0 || coord >= 450) {
        return -trajectory;
    } else {
        return trajectory;
    }
}

//function for when first duck is clicked (shot)
const deadDuckOne = () => {
    duckOneHorizontalMove = 0;
    duckOneVerticalMove = 4;
    shotDuckOne = true;
    detectGameWin();
}

//function for when second duck is clicked (shot)
const deadDuckTwo = () => {
    duckTwoHorizontalMove = 0;
    duckTwoVerticalMove = 4;
    shotDuckTwo = true;
    detectGameWin();
}

const shoot = () => {
    shotsLeft -= 1;
    if (shotFive.style.display != 'none') {
        shotFive.style.display = 'none';
    } else if (shotFive.style.display == 'none' && shotFour.style.display != 'none') {
        shotFour.style.display = 'none';
    } else if (shotFour.style.display == 'none' && shotThree.style.display != 'none') {
        shotThree.style.display = 'none';
    } else if (shotThree.style.display == 'none' && shotTwo.style.display != 'none') {
        shotTwo.style.display = 'none';
    } else if (shotTwo.style.display == 'none' && shotOne.style.display != 'none') {
        shotOne.style.display = 'none';
    }
}

//detect if the player has shot both ducks
const detectGameWin = () => {
    if (shotDuckOne && shotDuckTwo) {
        gameWon();

        stopGameTimer = setTimeout(() => {
            gameRunning = false;
        }, 1500)
    }
}

//add elements to the screen to indicate the player has won
const gameWon = () => {
    winText.style.display = 'block';
}

//set event listeners on ducks to call functions when clicked
duckOne.addEventListener('mousedown', deadDuckOne);
duckTwo.addEventListener('mousedown', deadDuckTwo);
gameArea.addEventListener('mousedown', shoot);

setDuckPositions();
setDuckTrajectory();
moveDucks();