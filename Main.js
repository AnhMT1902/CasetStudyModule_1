let btnStart = document.querySelector("#btn__start__game");
let btnReStart = document.querySelector("#btn__end__game");
let backgroundStartGame = document.querySelector(".background_start");
let backgroundPlayGame = document.querySelector(".background_play");
let backgroundEndgame = document.querySelector(".background_end");
let countdownTimeStart = document.getElementById("countdownTimeStart").innerHTML;
let tableQuestionEndAnswer = document.querySelector(".tableQuestionEndAnswer");
let questionElement = document.querySelector("#questionE");
let abcd = document.getElementsByClassName("answer");
let timeAnswer = document.querySelector(".time");
let levelUp = document.querySelector(".level");
let scores = document.querySelector(".score");

// khai bao bien
let score = 0;
let level = 1;
let time = 10;
let id2;
//nut start -> dao dien play

btnStart.addEventListener("click", function () {
    backgroundStartGame.style.zIndex = '-1';
    backgroundPlayGame.style.zIndex = '1';
    startGame();
    setTimeout(function () {
        playGame()
    }, 3000)
})

//nut replay -> dao dien play

btnReStart.addEventListener("click", function () {
    backgroundEndgame.style.zIndex = '-1';
    backgroundPlayGame.style.zIndex = '1';
    score = 0;
    level = 1;
    startGame();
    abcd[0].innerHTML = '';
    abcd[1].innerHTML = '';
    abcd[2].innerHTML = '';
    abcd[3].innerHTML = '';
    countdownTimeStart = 4;
    questionElement.innerHTML = '';
    levelUp.innerHTML = '';
    scores.innerHTML = ''
    setTimeout(function () {
        playGame()
    }, 4000)
})

function startGame() {
    let id = setInterval(() => {
        countdownTimeStart--;
        document.getElementById("countdownTimeStart").innerHTML = countdownTimeStart;
        if (countdownTimeStart <= 0) {
            document.getElementById("countdownTimeStart").innerHTML = "";
            clearInterval(id);
        }
    }, 1000);
}

let playGame = () => {
    printLevel()
    printScore()
    time = 10;
    tableQuestionEndAnswer.style.zIndex = '1';
    QuestionAndAnswer();
    countdownTimeAnswer();
}

function getRandomNumber(min, max) {
    let number = 0;
    while (number === 0) {
        number = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return number;
}

function QuestionAndAnswer() {
    let arrayCalculation = ["+", "-", "*", "/"];
    let answer;
    let calc
    if (level < 5) {
        calc = `${getRandomNumber(-10, 10)} ${arrayCalculation[getRandomNumber(0, 1)]} ${getRandomNumber(-10, 10)}`
        questionElement.innerHTML = calc + " =?"
        answer = eval(calc);
    } else if (level < 10) {
        calc = `${getRandomNumber(-10, 20)} ${arrayCalculation[getRandomNumber(0, 3)]} ${getRandomNumber(-10, 20)}`
        questionElement.innerHTML = calc + " =?"
        answer = eval(calc);
    } else if (level < 15) {
        calc = `${getRandomNumber(1, 10)} ${arrayCalculation[getRandomNumber(0, 3)]} ${getRandomNumber(1, 20)} ${arrayCalculation[getRandomNumber(0, 3)]} ${getRandomNumber(1, 30)}`
        questionElement.innerHTML = calc + " =?"
        answer = eval(calc);
    } else {
        calc = `${getRandomNumber(-30, 30)} ${arrayCalculation[getRandomNumber(0, 3)]} ${getRandomNumber(-30, 30)} ${arrayCalculation[getRandomNumber(0, 3)]} ${getRandomNumber(-30, 30)}`
        questionElement.innerHTML = calc + " =?"
        answer = eval(calc);
    }

    let wrongAnswers = [];
    while (wrongAnswers.length < 3) {
        let wrongAnswer = answer + getRandomNumber(-5, 10); // tạo một số ngẫu nhiên trong khoảng từ -5 đến 5 và cộng với đáp án đúng
        if (wrongAnswer !== answer && !wrongAnswers.includes(wrongAnswer)) { // đảm bảo rằng đáp án sai khác với đáp án đúng và không bị trùng lặp
            wrongAnswers.push(wrongAnswer);
        }
    }

    let bbb = wrongAnswers[0]
    let ccc = wrongAnswers[1]
    let ddd = wrongAnswers[2]

    let aa = "<button onclick='a()' class='answers'>" + answer + "</button>";
    let bb = "<button onclick='b()' class='answers'>" + bbb + "</button>";
    let cc = "<button onclick='c()' class='answers'>" + ccc + "</button>";
    let dd = "<button onclick='d()' class='answers'>" + ddd + "</button>";

    let answers = [aa, bb, cc, dd];
    answers.sort(() => Math.random() - 0.5);
    abcd[0].innerHTML = answers[0];
    abcd[1].innerHTML = answers[1];
    abcd[2].innerHTML = answers[2];
    abcd[3].innerHTML = answers[3];
}

function printLevel() {
    levelUp.innerHTML = "level: " + level;
}

function printScore() {
    scores.innerHTML = "score: " + score;
}

function countdownTimeAnswer() {
    timeAnswer.innerHTML = "time: " + time;
    id2 = setInterval(() => {
        time--;
        timeAnswer.innerHTML = "time: " + time;
        if (time < 1) {
            timeAnswer.innerHTML = "";
            clearInterval(id2);
            andGames();
        }
    }, 1000);
}

function a() {
    clearInterval(id2)
    time = 10;
    level++;
    score += 100;
    for (let i = 0; i < 4; i++) {
        abcd[i].innerHTML = ""
    }
    printLevel();
    printScore();
    countdownTimeAnswer();
    QuestionAndAnswer();
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
    let maxScore = localStorage.getItem("maxScore") || 0;
    if (maxScore < score) {
        maxScore = score;
        localStorage.setItem("maxScore", maxScore);
    }
    maxScore = localStorage.getItem("maxScore") || 0;
    document.querySelector("#score").innerHTML = `score: ${score}`;
    document.querySelector("#max_score").innerHTML = `max score: ${maxScore}`;
    printLevel()
    printScore()
    time = 0;
    backgroundEndgame.style.zIndex = '1';
}
