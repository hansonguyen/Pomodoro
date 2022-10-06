let studyButton = document.getElementById("studybtn");
let breakButton = document.getElementById("breakbtn");
let startButton = document.getElementById("startbtn");
let clock = document.getElementById("clock");

let totalMin = 25;
let totalSec = totalMin * 60;
let flag = null;
let onFlag = false;
var audio = new Audio("timerfinish.wav");

function setStudyTimer() {
    studyButton.style.backgroundColor = "#3282b8";
    studyButton.style.boxShadow = "none";
    breakButton.style.backgroundColor = "#0f4c75";
    breakButton.style.boxShadow = "10px 10px 5px 0px rgba(0,0,0,0.7)";
    startButton.style.backgroundColor = "#0f4c75";
    totalMin = 25;
    totalSec = totalMin * 60;
    let temp = totalMin < 10 ? "0" + totalMin : totalMin;
    let time = `${temp}:00`;
    clock.innerHTML = time;
    clearInterval(flag);
    flag = null;
    onFlag = false;
}

function setBreakTimer() {
    studyButton.style.backgroundColor = "#0f4c75";
    studyButton.style.boxShadow = "10px 10px 5px 0px rgba(0,0,0,0.7)";
    breakButton.style.backgroundColor = "#3282b8";
    breakButton.style.boxShadow = "none";
    startButton.style.backgroundColor = "#0f4c75";
    totalMin = 5;
    totalSec = totalMin * 60;
    let temp = totalMin < 10 ? "0" + totalMin : totalMin;
    let time = `${temp}:00`;
    clock.innerHTML = time;
    clearInterval(flag);
    flag = null;
    onFlag = false;
}

function runTimer() {
    totalSec--;
    let m = Math.floor(totalSec / 60);
    let s = totalSec % 60;

    s = s < 10 ? "0" + s : s;
    m = m < 10 ? "0" + m : m;

    let time = `${m}:${s}`;
    clock.innerHTML = time;
    if (totalSec == 0) {
        clearInterval(flag);
        audio.play();
        startButton.textContent = "Play";
    }
}

function startTimer() {
    if (totalSec !== 0) {
        if (onFlag === false) {
            flag = setInterval(runTimer, 1000);
            onFlag = true;
            startButton.textContent = "Pause";
        }
        else {
            clearInterval(flag);
            flag = null;
            onFlag = false;
            startButton.textContent = "Play";
        }
    }
}