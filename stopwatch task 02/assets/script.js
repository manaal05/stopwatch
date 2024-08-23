let startTime = 0;
let elapsedTime = 0;
let intervalId;
let running = false;

const display = document.getElementById('display');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const laps = document.getElementById('laps');

function formatTime(ms) {
    const date = new Date(ms);
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0').slice(0, 2);
    return `${minutes}:${seconds}:${milliseconds}`;
}

function start() {
    if (running) return;
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateDisplay, 10);
    running = true;
}

function pause() {
    if (!running) return;
    clearInterval(intervalId);
    running = false;
}

function reset() {
    clearInterval(intervalId);
    running = false;
    elapsedTime = 0;
    display.textContent = '00:00:00';
    laps.innerHTML = '';
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function recordLap() {
    if (!running) return;
    const li = document.createElement('li');
    li.textContent = formatTime(elapsedTime);
    laps.appendChild(li);
}

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);
