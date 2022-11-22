import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const refs = {
  btnStart: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
  input: document.querySelector('#datetime-picker')
};

refs.btnStart.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - Date.now() < 0)
    Notiflix.Notify.failure('Please choose a date in the future');

    refs.btnStart.addEventListener('click', () => {
      setInterval(() => {
        const deltaTime = selectedDates[0] - Date.now();
        const timeData = convertMs(deltaTime);
        const keys = Object.keys(timeData);
        for (const key of keys) { 
        const timerRef = document.querySelector(`span[data-${key}]`)
        timerRef.textContent = timeData[key]
        }}, 1000);
    refs.btnStart.disabled = true;
    });
    refs.btnStart.disabled = false;
  },
};

flatpickr(refs.input, options);

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }
  function addLeadingZero(value) {return String(value).padStart(2,'0')}