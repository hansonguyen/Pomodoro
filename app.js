let studyButton = document.getElementById("studybtn");
let breakButton = document.getElementById("breakbtn");
let icon = document.getElementById("icon");
let clock = document.getElementById("clock");

let totalMin = 25;
let totalSec = totalMin * 60;
let flag = null;
var audio = new Audio("timerfinish.wav");
let mode = 'work';

function changeIcon() {
    if (icon.className == "bi bi-play-fill") {
        icon.className = "bi bi-pause-fill"; 
    } else {
        icon.className = "bi bi-play-fill";
    }
}

function setStudyTimer() {
    mode = "work";
    studyButton.style.backgroundColor = "#3282b8";
    studyButton.style.boxShadow = "none";
    breakButton.style.backgroundColor = "#0f4c75";
    breakButton.style.boxShadow = "10px 10px 5px 0px rgba(0,0,0,0.7)";
    if (flag !== null && totalSec !== 0) {changeIcon();}
    totalMin = 25;
    totalSec = totalMin * 60;
    let temp = totalMin < 10 ? "0" + totalMin : totalMin;
    let time = `${temp}:00`;
    clock.innerHTML = time;
    clearInterval(flag);
    flag = null;
}

function setBreakTimer() {
    mode = "break";
    studyButton.style.backgroundColor = "#0f4c75";
    studyButton.style.boxShadow = "10px 10px 5px 0px rgba(0,0,0,0.7)";
    breakButton.style.backgroundColor = "#3282b8";
    breakButton.style.boxShadow = "none";
    if (flag !== null && totalSec !== 0) {changeIcon();}
    totalMin = 5;
    totalSec = totalMin * 60;
    let temp = totalMin < 10 ? "0" + totalMin : totalMin;
    let time = `${temp}:00`;
    clock.innerHTML = time;
    clearInterval(flag);
    flag = null;
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
        flag = null;
        if (mode === 'work') {
            changeIcon();
            noti();
            totalMin = 5;
            totalSec = totalMin * 60;
            mode = 'break';
            temp = totalMin < 10 ? "0" + totalMin : totalMin;
            time = `${temp}:00`;
            clock.innerHTML = time;
            studyButton.style.backgroundColor = "#0f4c75";
            studyButton.style.boxShadow = "10px 10px 5px 0px rgba(0,0,0,0.7)";
        } else {
            changeIcon();
            noti();
            totalMin = 25;
            totalSec = totalMin * 60;
            mode = 'work';
            temp = totalMin < 10 ? "0" + totalMin : totalMin;
            time = `${temp}:00`;
            clock.innerHTML = time;
            breakButton.style.backgroundColor = "#0f4c75";
            breakButton.style.boxShadow = "10px 10px 5px 0px rgba(0,0,0,0.7)";
        }
    }
}

function startTimer() {
    if (totalSec !== 0) {
        if (flag === null) {
            flag = setInterval(runTimer, 1000);
            changeIcon();
        }
        else {
            clearInterval(flag);
            flag = null;
            changeIcon();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if ('Notification' in window) {
      if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        Notification.requestPermission().then(function(permission) {
          if (permission === 'granted') {
            let n = new Notification(
              'You will be notified at the start of each session!'
            );
            alert('You will be notified at the start of each session!');
          }
        });
      }
    }
  });

  function noti() {
    if (Notification.permission === 'granted') {
        let text = '';
        if (mode === 'work') {
            text = 'Take a break!';
        } else {
            text = 'Time to work!';
        }
        let n = new Notification("Pomodoro", {body: text});
        audio.play();
    }
}