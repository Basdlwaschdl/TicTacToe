let fields = [];
let player1;
let player2;
let gameOver = false;
let currentPattern = 'cross';


function init() {
    document.getElementById('backgroundTable').style.display = 'none';
    document.getElementById('inputName2').style.display = 'none';
    document.getElementById('buttonStart').style.display = 'none';
}


function inputPlayer1() {
    player1 = document.getElementById('name1').value;
    document.getElementById('inputName1').style.display = 'none';
    document.getElementById('inputName2').style.display = '';
}


function inputPlayer2() {
    player2 = document.getElementById('name2').value;
    document.getElementById('buttonStart').style.display = '';
    document.getElementById('inputName2').innerHTML = `
    <div class="players" id="players">
        <div class="playerSub"><img src="img/circle.png"> = ${player1}</div>
        <div class="playerSub"><img src="img/cross.png"> = ${player2}</div>
        </div>`;
}


function startGame() {
    document.getElementById('backgroundTable').style.display = '';
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('Players').innerHTML = `
    <div class="playerSub"><img src="img/circle.png"> ${player1} ist am Zug</div>`;
}



function fillField(i) {
    if (!fields[i] && !gameOver) {
    if (currentPattern == 'cross') {
        currentPattern = 'circle';
        document.getElementById('Players').innerHTML = `
        <div class="playerSub"><img src="img/cross.png"> ${player1} ist am Zug</div>`;
    }
    else {
        currentPattern = 'cross';
        document.getElementById('Players').innerHTML = `
        <div class="playerSub"><img src="img/circle.png"> ${player1} ist am Zug</div>`;
    }
    fields[i] = currentPattern;
    draw();
}
}


function draw() {
    for (let i = 0; i < fields.length; i++) {
        if (fields[i] == 'circle') {
            document.getElementById(`circle-` + i).classList.remove('d-none');
        }
        if (fields[i] == 'cross') {
            document.getElementById(`cross-` + i).classList.remove('d-none');
        }
    }
    checkIfwin();
}


function checkIfwin() {
    let winner;
    if (fields[0] == fields[1] && fields[2] == fields[1] && fields[0]) {
        document.getElementById('winnerLine1').style.transform = 'scalex(1)';
        winner = fields[0];
    }
    if (fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) {
        document.getElementById('winnerLine2').style.transform = 'scalex(1)';
        winner = fields[3];
    }
    if (fields[6] == fields[7] && fields[7] == fields[8] && fields[6]) {
        document.getElementById('winnerLine3').style.transform = 'scalex(1)';
        winner = fields[6];
    }
    if (fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) {
        document.getElementById('winnerLine6').style.transform = 'rotate(90deg) scalex(1.0)';
        winner = fields[0];
    }
    if (fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) {
        document.getElementById('winnerLine5').style.transform = 'rotate(90deg) scalex(1.0)';
        winner = fields[1];
    }
    if (fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) {
        document.getElementById('winnerLine4').style.transform = 'rotate(90deg) scalex(1.0)';
        winner = fields[2];
    }
    if (fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {
        document.getElementById('winnerLine7').style.transform = 'rotate(45deg) scalex(1.0)';
        winner = fields[0];
    }
    if (fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {
        document.getElementById('winnerLine8').style.transform = 'rotate(135deg) scalex(1.0)';
        winner = fields[2];
    }
     if (winner) {
        gameOver = true;
     }
}


