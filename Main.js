let btnStart = document.querySelector("#btn__start__game");
let btnReStart = document.querySelector("#btn__end__game");
let backgroundStartgame = document.querySelector(".background_start");
let backgroundPlaygame = document.querySelector(".background_play");
let backgroundEndgame = document.querySelector(".background_end");
let countdowTimeStart = document.getElementById("countdowTimeStart").innerHTML;
let tableQuestionEndAnswer = document.querySelector(".tableQuestionEndAnswer");
let questionElement = document.querySelector("#questionE");
let abcd = document.getElementsByClassName("answer");
let timeAnswer = document.querySelector(".time");
let levelup = document.querySelector(".level");
let scorepp = document.querySelector(".score");

// khai bao bien
let score = 0;
let level = 1;
let time = 11;
let fulltime = 11;
//nut start -> dao dien play

btnStart.addEventListener("click", function () {
    backgroundStartgame.style.zIndex = -1;
    backgroundPlaygame.style.zIndex = 1;
    playGame()
    document.getElementById("audio").play();
})

//nut replay -> dao dien play

btnReStart.addEventListener("click", function () {
    backgroundEndgame.style.zIndex = -1;
    backgroundPlaygame.style.zIndex = 1;
    playGame()
})

function playGame() {
    Level()
    scoress()
    time = fulltime;
    setTimeout(() => {
        tableQuestionEndAnswer.style.zIndex = 1;
    }, 3000)
    let id = setInterval(() => {
        countdowTimeStart--;
        document.getElementById("countdowTimeStart").innerHTML = countdowTimeStart;
        if (countdowTimeStart <= 0) {
            document.getElementById("countdowTimeStart").innerHTML ="";
            clearInterval(id);
        }
    }, 1000);

    QuestionandAnswer();
    countdownTimeAnswer();
}


function QuestionandAnswer() {
    let x1 = +randomNumber();
    let x2 = +randomNumber();
    let x3 = +randomNumber();
    let answer;
    if (level < 5) {
        questionElement.innerHTML = x1 + "+" + x2 + "=?"
        answer = x1 + x2;
    } else {
        questionElement.innerHTML = x1 + "+" + x2 + "+" + x3 + "=?"
        answer = x1 + x2 + x3;
    }

    let bbb = answer + 1;
    let ccc = answer - 1;
    let ddd = answer + 2;

    let aa = "<button onclick='a()' class='answers'>" + answer + "</button>";
    let bb = "<button onclick='b()' class='answers'>" + bbb + "</button>";
    let cc = "<button onclick='c()' class='answers'>" + ccc + "</button>";
    let dd = "<button onclick='d()' class='answers'>" + ddd + "</button>";

    let answers = [aa, bb, cc, dd];
    answers.sort(() => Math.random() - 0.5);
    abcd[0].innerHTML += answers[0];
    abcd[1].innerHTML += answers[1];
    abcd[2].innerHTML += answers[2];
    abcd[3].innerHTML += answers[3] ;
}

function Level() {
    levelup.innerHTML = "level: " + level;
}

function scoress() {
    scorepp.innerHTML = "score: " + score;
}

function countdownTimeAnswer() {
    let id2 = setInterval(() => {
        time--;
        timeAnswer.innerHTML ="time: " + time;
        if (time < 1) {
            timeAnswer.innerHTML = "";
            clearInterval(id2);
            andGames();
        }
    }, 1000);
}

function randomNumber() {
    if (level < 5) {
        return Math.floor(Math.random() * 20) + 1;
    } else {
        return Math.floor(Math.random() * 30) + 10;
    }
}

console.log(QuestionandAnswer)

function a() {
    time = fulltime;
    level++;
    score += 100;
    Level();
    scoress();
    for (let i = 0; i < 4; i++) {
        abcd[i].innerHTML = ""
    }
    QuestionandAnswer();
}

function b() {
    andGames()
}

function c() {
    andGames()
}

function d() {
    andGames()
}

//end game

function andGames() {
    Level()
    scoress()
    abcd[0].innerHTML = "";
    abcd[1].innerHTML = "";
    abcd[2].innerHTML = "";
    abcd[3].innerHTML = "";
    level = 1;
    score = 0
    time = 0;
    backgroundEndgame.style.zIndex = 1;
}