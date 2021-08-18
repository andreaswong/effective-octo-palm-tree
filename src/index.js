import {
  emToPx,
  pxToEm,
  randomNumber,
  toggleBallAnimation,
  updateScoreboard,
} from './helpers';

import ballImage from 'url:./ball.png';

const DEFAULT_STATE = {
  score: 0,
  spawnBallTimer: null,
  animationTimer: null,
  ballCleanupTimer: null,
  isPaused: false,
};

const MAX_BALL_COUNT = 40;
const SWAY_OFFSET = 32;
const BALL_ACTION_INTERVAL = 1000;
const MIN_BALL_WIDTH = 3;
const MAX_BALL_WIDTH = 12;
const SCORE_CONSTANT = MAX_BALL_WIDTH + 1;

const gameWindow = document.querySelector('div[class="game-window"]');
const startPauseButton = document.querySelector('button');
const stopButton = document.querySelector('button[class="stop"]');

let state = {};
let currentBallCount = 0;

function createBall() {
  const ball = document.createElement('img');

  ball.setAttribute('src', ballImage);
  ball.setAttribute('draggable', false);
  setBallStyles(ball);
  ball.addEventListener('click', popBallEventHandler);
  currentBallCount += 1;

  return ball;
}

function setBallStyles(ball) {
  const gameWindowWidth = gameWindow.getBoundingClientRect().width;
  const ballWidth = emToPx(randomNumber(MIN_BALL_WIDTH, MAX_BALL_WIDTH));
  const minOffset = ballWidth;
  const maxOffset = gameWindowWidth - ballWidth - SWAY_OFFSET;
  const ballLeftOffset = randomNumber(minOffset, maxOffset);

  ball.style.width = `${ballWidth}px`;
  ball.style.left = `${ballLeftOffset}px`;
}

function popBallEventHandler(event) {
  if (state.isPaused) {
    return;
  }

  const ball = event.target;
  const size = pxToEm(parseInt(event.target.style.width));
  const increment = SCORE_CONSTANT - size;

  removeBall(ball);
  state.score += increment;
  updateScoreboard(state.score);
}

function removeBall(ball) {
  ball.removeEventListener('click', popBallEventHandler);
  ball.parentNode.removeChild(ball);
  currentBallCount -= 1;
}

function spawnBall() {
  if (state.isPaused || currentBallCount >= MAX_BALL_COUNT) {
    return;
  }

  gameWindow.appendChild(createBall());
}

function startGame() {
  state.isPaused = false;
  state = Object.assign({}, DEFAULT_STATE);
  updateScoreboard(0);

  state.spawnBallTimer = setInterval(spawnBall, BALL_ACTION_INTERVAL);
  state.ballCleanupTimer = setInterval(ballCleanup, BALL_ACTION_INTERVAL);
}

function ballCleanup() {
  const balls = document.querySelectorAll('img');
  const gameWindowHeight = parseFloat(getComputedStyle(gameWindow).height);

  balls.forEach((ball) => {
    const ballTopOffset = parseFloat(getComputedStyle(ball).top);

    if (gameWindowHeight - ballTopOffset <= 0) {
      removeBall(ball);
    }
  });
}

function stopButtonEventListener() {
  const balls = document.querySelectorAll('img');

  pauseGameEventHandler();
  clearTimers();
  balls.forEach((ball) => removeBall(ball));
  state.isPaused = false;
}

function clearTimers() {
  clearInterval(state.spawnBallTimer);
  clearInterval(state.animationTimer);
  clearInterval(state.ballCleanupTimer);
  state.spawnBallTimer = null;
  state.animationTimer = null;
  state.ballCleanupTimer = null;
}

function startGameEventHandler() {
  startGame();
  state.animationTimer = setInterval(moveBalls, 100);
  startPauseButton.removeEventListener('click', startGameEventHandler);
  startPauseButton.addEventListener('click', pauseGameEventHandler);
  startPauseButton.innerHTML = 'pause';
  toggleBallAnimation(true);
}

function pauseGameEventHandler() {
  state.isPaused = true;
  startPauseButton.removeEventListener('click', pauseGameEventHandler);
  startPauseButton.addEventListener('click', startGameEventHandler);
  startPauseButton.innerHTML = 'start';
  toggleBallAnimation(false);
}

function moveBalls() {
  if (state.isPaused) {
    return;
  }

  const balls = document.querySelectorAll('img');
  if (balls.length === 0) {
    return;
  }

  const sliderValue = parseInt(document.querySelector('input').value);
  balls.forEach((ball) => {
    const currentTopOffset = parseInt(getComputedStyle(ball).top) || 0;
    ball.style.top = `${currentTopOffset + sliderValue}px`;
  });
}

window.onload = function () {
  startPauseButton.addEventListener('click', startGameEventHandler);
  stopButton.addEventListener('click', stopButtonEventListener);
};
