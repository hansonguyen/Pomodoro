let setButton = document.getElementById("setbtn");
let startButton = document.getElementById("startbtn");
let clock = document.getElementById("clock");

const totalMin = 1;
let totalSec = totalMin * 60;
let flag = null;
let onFlag = false;

function setTimer() {
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
    if (totalSec == 0) {clearInterval(flag);}
}

function startTimer() {
    if (onFlag === false) {flag = setInterval(runTimer, 1000);}
    onFlag = true;
}
/*
let hours = document.getElementById("hours");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");

let clock = () => {
    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();
    let period = "AM";
    if (h === 0) {h =12;}
    else if (h >= 12) {
        h = h - 12;
        period = "PM";
    }
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    let time = `${h}:${m}:${s} ${period}`;
    document.getElementById("clock").innerText = time;
    setTimeout(clock, 1000);
}
clock();*/