let fields = [];
let player1;
let player2;
let gameOver = false;
let currentPattern = 'cross';
let img;
let winner;
let winPlayer;
let winnerLine;
let fieldFull = 0;
let pointsPlayer1 = 0;
let pointsPlayer2 = 0;


function init() {
    document.getElementById('backgroundTable').style.display = 'none';
    document.getElementById('inputName2').style.display = 'none';
    document.getElementById('buttonStart').style.display = 'none';
}

//-------------------------------------------------------------------------------input Player Names------------------------------------------------------------------------

function inputPlayer1() {
    player1 = document.getElementById('name1').value;
    if (player1.length < 1) {
        alert('Bitte gebe einen Namen ein.');
    }
    else {
        document.getElementById('inputName1').style.display = 'none';
        document.getElementById('inputName2').style.display = '';
    }
}


function inputPlayer2() {
    player2 = document.getElementById('name2').value;
    if (player2.length < 1) {
        alert('Bitte gebe einen Namen ein.');
    }
    else {
        document.getElementById('inputName2').style.display = 'none';
        document.getElementById('playerNames').style.display = '';
        document.getElementById('buttonStart').style.display = '';
        document.getElementById('playerNames').innerHTML = `
        <div class="players" id="players">
            <div class="playerSub"><img src="img/circle.png">  ${player1}</div>
            <div class="playerSub"><img src="img/cross.png">  ${player2}</div>
        </div>`;
    }
}

//---------------------------------------------------------------------------------Gaming------------------------------------------------------------------------------------

function startGame() {
    document.getElementById('Players').style.display = '';
    document.getElementById('endscreenButton').style.transform = 'scalex(0.0)';
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('backgroundTable').style.display = '';
    generateHTMLpointsP1();
}


function fillField(i) {
    fieldFull += 1;
    if (!fields[i] && !gameOver) {
        if (currentPattern == 'cross') {
            currentPattern = 'circle';
            generateHTMLpointsP2();
        }
        else {
            currentPattern = 'cross';
            generateHTMLpointsP1();
        }
        fields[i] = currentPattern;
        fillIn();
    }
}


function generateHTMLpointsP1() {
    document.getElementById('Players').innerHTML = `
    <div class="playerSub"><img src="img/circle.png" style="width: 20px;"> : ${pointsPlayer1}
        <div class= "who-turn">
            <img src="img/circle.png"> ${player1} ist am Zug
        </div>
        <img src="img/cross.png" style="width: 20px;"> : ${pointsPlayer2}
    </div>`;
}


function generateHTMLpointsP2() {
    document.getElementById('Players').innerHTML = `
    <div class="playerSub"><img src="img/circle.png" style="width: 20px;"> : ${pointsPlayer1}
        <div class= "who-turn">
            <img src="img/cross.png"> ${player2} ist am Zug
        </div>
        <img src="img/cross.png" style="width: 20px;"> : ${pointsPlayer2}
    </div>`;
}


function fillIn() {
    for (let i = 0; i < fields.length; i++) {
        if (fields[i] == 'circle') {
            document.getElementById(`circle-` + i).classList.remove('d-none');
        }
        if (fields[i] == 'cross') {
            document.getElementById(`cross-` + i).classList.remove('d-none');
        }
    }
    checkForwin();
    checkFordraw();
}

//----------------------------------------------------------------------Check if win or draw--------------------------------------------------------------------------------

function checkForwin() {
    checkForwinHorizontal();
    checkForwinVertacal();
    checkForwinDiagonal();
    if (winner) {
        gameOver = true;
        endScreen(winner);
    }
}


function checkForwinHorizontal() {
    if (fields[0] == fields[1] && fields[2] == fields[1] && fields[0]) {
        document.getElementById('winnerLine1').style.transform = 'scalex(1)';
        winner = fields[0];
        winnerLine = 1;
    }
    if (fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) {
        document.getElementById('winnerLine2').style.transform = 'scalex(1)';
        winner = fields[3];
        winnerLine = 2;
    }
    if (fields[6] == fields[7] && fields[7] == fields[8] && fields[6]) {
        document.getElementById('winnerLine3').style.transform = 'scalex(1)';
        winner = fields[6];
        winnerLine = 3;
    }
}


function checkForwinVertacal() {
    if (fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) {
        document.getElementById('winnerLine6').style.transform = 'rotate(90deg) scalex(1.0)';
        winner = fields[0];
        winnerLine = 6;
    }
    if (fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) {
        document.getElementById('winnerLine5').style.transform = 'rotate(90deg) scalex(1.0)';
        winner = fields[1];
        winnerLine = 5;
    }
    if (fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) {
        document.getElementById('winnerLine4').style.transform = 'rotate(90deg) scalex(1.0)';
        winner = fields[2];
        winnerLine = 4;
    }
}


function checkForwinDiagonal() {
    if (fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {
        document.getElementById('winnerLine7').style.transform = 'rotate(45deg) scalex(1.0)';
        winner = fields[0];
        winnerLine = 7;
    }
    if (fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {
        document.getElementById('winnerLine8').style.transform = 'rotate(135deg) scalex(1.0)';
        winner = fields[2];
        winnerLine = 8;
    }
}


function checkFordraw() {
    if (fieldFull == 9 && typeof winPlayer == 'undefined') {
        document.getElementById('endscreenButton').style.transform = 'scalex(1.0)';
        document.getElementById('Players').innerHTML = `
    <div class="winner-Endscreen">
        <div class="playerSub">
            Unentschieden !!
        </div>
    </div>`;
    }
}


//----------------------------------------------------------------------End Game-------------------------------------------------------------------------------------


function endScreen(winner) {
    if (winner == 'circle') {
        winPlayer = player1;
        img = '"img/circle.png"';
        pointsPlayer1 += 1;
    }
    else {
        img = '"img/cross.png"';
        winPlayer = player2;
        pointsPlayer2 += 1;
    }
    document.getElementById('endscreenButton').style.transform = 'scalex(1.0)';
    document.getElementById('Players').innerHTML = `
    <div class="winner-Endscreen">
        <div class="playerSub">
            <img src=${img}> ${winPlayer} hat gewonnen !!!
        </div>
    </div>`;
}


function newGame() {
    if (typeof winPlayer !== 'undefined') {
        document.getElementById(`winnerLine${winnerLine}`).style.transform = 'scalex(0.0)';
    }
    winPlayer = undefined;
    winner = undefined;
    fields.length = 0;
    fieldFull = 0
    currentPattern = 'cross';
    gameOver = false;
    for (let i = 0; i < 9; i++) {
        document.getElementById(`circle-` + i).classList.add('d-none');
        document.getElementById(`cross-` + i).classList.add('d-none');
    }
    startGame();
}

//-------------------------------------------------------------Reset for new Players------------------------------------------------------------------------------------

function newPlayer() {
    init();
    hideShowcontent();
    resetGame();
}


function resetGame() {
    winner = undefined;
    player1 = undefined
    player2 = undefined
    winPlayer = undefined;
    fields.length = 0;
    fieldFull = 0;
    pointsPlayer1 = 0;
    pointsPlayer2 = 0;
    currentPattern = 'cross';
    gameOver = false;
    document.getElementById('name1').value = ``;
    document.getElementById('name2').value = ``;
}


function hideShowcontent() {
    if (typeof winPlayer !== 'undefined') {
        document.getElementById(`winnerLine${winnerLine}`).style.transform = 'scalex(0.0)';
    }
    for (let i = 0; i < 9; i++) {
        document.getElementById(`circle-` + i).classList.add('d-none');
        document.getElementById(`cross-` + i).classList.add('d-none');
    }
    document.getElementById('inputName2').style.display = 'none';
    document.getElementById('playerNames').style.display = 'none';
    document.getElementById('Players').style.display = 'none';
    document.getElementById('startScreen').style.display = '';
    document.getElementById('inputName1').style.display = '';
    document.getElementById('endscreenButton').style.transform = 'scalex(0.0)';
}


