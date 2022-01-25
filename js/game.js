'use strict';
const WALL = '🟦';
const FOOD = '.';
const EMPTY = ' ';
const POWER_FOOD = '🟠';
const CHERRY = '🍒';

var gAddCherryInterval;
var gFoodCounter;
var gBoard;
var gGame = {
    score: 0,
    isOn: false
};

function init() {
    console.log('hello');
    gBoard = buildBoard();
    createGhosts(gBoard);
    createPacman(gBoard);
    printMat(gBoard, '.board-container');
    CountFood();
    gGame.isOn = true;
}

function restartGame() {
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';
    updateScore(-gGame.score)
    init();
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
        }
    }
    board[1][1] = POWER_FOOD;
    board[1][8] = POWER_FOOD;
    board[8][1] = POWER_FOOD;
    board[8][8] = POWER_FOOD;

    gAddCherryInterval = setInterval(addCherry, 15000);

    return board;
}

function addCherry() {
    var cherryCell = getEmptyCell();
    if (!cherryCell) return;
    gBoard[cherryCell.i][cherryCell.j] = CHERRY;
    renderCell(cherryCell, CHERRY);
}

// update model and dom
function updateScore(diff) {
    // model
    gGame.score += diff;

    //dom
    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;
}

// TODO
function gameOver() {

    var elModal = document.querySelector('.modal');
    elModal.style.display = 'block';

    var elH1 = document.querySelector('.modal h1');
    elH1.innerText = (!isVictory()) ? 'Game over' : 'Victory!🏆';

    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    gIntervalGhosts = null;

    clearInterval(gAddCherryInterval);
    gAddCherryInterval = null;
}

function isVictory() {
    return (gFoodCounter !== 0) ? false : true;
}

function CountFood() {
    gFoodCounter = 1;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === FOOD) gFoodCounter++;
        }
    }
}