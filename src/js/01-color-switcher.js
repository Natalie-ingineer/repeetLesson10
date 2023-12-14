const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let colorChangeInterval;

body.style.marginTop = '200px';
body.style.textAlign = 'center';
stopBtn.disabled = true;

startBtn.addEventListener('click', () => {
  colorChangeInterval = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  startBtn.disabled = true;
  stopBtn.disabled = false;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

stopBtn.addEventListener('click', () => {
  clearInterval(colorChangeInterval);

  startBtn.disabled = false;
  stopBtn.disabled = true;
});
