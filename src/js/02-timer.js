import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

import Notiflix from 'notiflix/dist/notiflix-aio-3.2.6.min.js';

Notiflix.Notify.init({
  width: '280px',
  position: 'right-top', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
  distance: '10px',
  opacity: 1,
  borderRadius: '5px',
  rtl: false,
  timeout: 3000,
  messageMaxLength: 110,
  backOverlay: false,
  backOverlayColor: 'rgba(0,0,0,0.5)',
  plainText: true,
  showOnlyTheLastOne: false,
  clickToClose: false,
  pauseOnHover: true,

  ID: 'NotiflixNotify',
  className: 'notiflix-notify',
  zindex: 4001,
  fontFamily: 'Quicksand',
  fontSize: '13px',
  cssAnimation: true,
  cssAnimationDuration: 400,
  cssAnimationStyle: 'fade', // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'
  closeButton: false,
  useIcon: true,
  useFontAwesome: false,
  fontAwesomeIconStyle: 'basic', // 'basic' - 'shadow'
  fontAwesomeIconSize: '34px',

  failure: {
    background: '#ff5549',
    textColor: '#fff',
    childClassName: 'notiflix-notify-failure',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-times-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(255,85,73,0.2)',
  },
});

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button');
const timerDiv = document.querySelector('.timer');

timerDiv.style.display = 'flex';
timerDiv.style.fontSize = '20px';
timerDiv.style.gap = '10px';
timerDiv.style.color = 'orange';

let targetDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > new Date()) {
      startBtn.disabled = false;
      return (targetDate = selectedDates[0]);
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    }
  },
};

flatpickr(input, options);

startBtn.addEventListener('click', targetDateTimer);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function targetDateTimer() {
  let days = document.querySelector('[data-days]');
  let hours = document.querySelector('[data-hours]');
  let minutes = document.querySelector('[data-minutes]');
  let seconds = document.querySelector('[data-seconds]');

  if (targetDate > new Date()) {
    let delta = targetDate - new Date();
    timerId = setInterval(() => {
      const timeRemaining = convertMs(delta);

      days.textContent = addLeadingZero(timeRemaining.days);
      hours.textContent = addLeadingZero(timeRemaining.hours);
      minutes.textContent = addLeadingZero(timeRemaining.minutes);
      seconds.textContent = addLeadingZero(timeRemaining.seconds);

      if (new Date() >= targetDate) {
        clearInterval(timerId);
      } else if (delta <= 0) {
        clearInterval(timerId);
        startBtn.disabled = true;
      } else {
        delta -= 1000; // віднімання 1 секунди
      }
    }, 1000);
  }
}
