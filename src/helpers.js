const BASE_FONT_SIZE = 16; // 1em = 16px

export const randomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export function emToPx(em) {
  return em * BASE_FONT_SIZE;
}

export function pxToEm(px) {
  return px / BASE_FONT_SIZE;
}

export function updateScoreboard(score) {
  const scoreElement = document.querySelector('h1');
  scoreElement.textContent = score;
}

export function toggleBallAnimation(flag) {
  const value = flag ? 'running' : 'pause';
  const balls = document.querySelectorAll('img');
  balls.forEach((ball) => {
    ball.style.animationPlayState = value;
  });
}
