'use strict';
const PACMAN = '😷';

var gPacman;
var gIsPowerFood;

function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false
    };
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}


function movePacman(ev) {
    if (!gGame.isOn) return;

    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev);
    var nextCellContent = gBoard[nextLocation.i][nextLocation.j];

    // return if cannot move
    if (nextCellContent === WALL) return;

    // hitting a ghost?  call gameOver
    if (nextCellContent === GHOST) {
        if (!gPacman.isSuper) {
            gameOver();
            return;
        } else removeGhost(nextLocation);
    };

    if (nextCellContent === FOOD) eatFood();
    if (nextCellContent === CHERRY) updateScore(10);
    if (nextCellContent === POWER_FOOD) {
        if (gPacman.isSuper) return;
        eatPowerFood();
    };
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    // update the DOM
    renderCell(gPacman.location, EMPTY);
    // Move the pacman
    gPacman.location = nextLocation;
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the DOM
    renderCell(gPacman.location, PACMAN);

    if (isVictory()) gameOver();
}

function removeGhost(location) {
    console.log(location);
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === location.i && gGhosts[i].location.j === location.j) {
            if (gGhosts[i].currCellContent === FOOD) eatFood();
            gGhosts.splice(i, 1);
        }
    }
}

function eatPowerFood() {
    gPacman.isSuper = true;
    setTimeout(function () {
        gPacman.isSuper = false;
        var ghostsToAdd = 3 - gGhosts.length;
        for (var i = 0; i < ghostsToAdd; i++) createGhost(gBoard);
    }, 5000);
}

function eatFood() {
    console.log(gFoodCounter);
    updateScore(1);
    gFoodCounter--;
}


function getNextLocation(ev) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    };
    // figure out nextLocation
    switch (ev.key) {
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
    }

    return nextLocation;
}