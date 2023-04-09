import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const TIMER_DELAY = 1000;
let intervalId = null;
let selectedDate = null;
let currentDate = null;


  const dateInput = document.querySelector('input#datetime-picker');
  const btnStartTimer = document.querySelector('button[data-start-timer]');
  const daysRemaining = document.querySelector('[data-days]');
  const hoursRemaining = document.querySelector('[data-hours]');
 const minutesRemaining = document.querySelector('[data-minutes]');
  const secondsRemaining = document.querySelector('[data-seconds]');


btnStartTimer.disabled = true;
btnStartTimer.addEventListener('click', timerStart);

let remainingTime = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onDateCheck(selectedDates);
  },
};

flatpickr(dateInput, options);

function onDateCheck(selectedDates) {
  selectedDate = selectedDates[0].getTime();
  currentDate = new Date().getTime();

  if (selectedDates > currentDate) {
    btnStartTimer.disabled = false;
    
    return;
  }
  window.alert(
    "Please choose a date in the future"
  );
}

function timerStart() {
  intervalId = setInterval(() => {
    currentDate = new Date().getTime();
    if (selectedDate - currentDate <= 1000) {
      clearInterval(intervalId);
      btnStartTimer.disabled = true;
      dateInput.disabled = false;

      return;
    } else {
      btnStartTimer.disabled = true;
      dateInput.disabled = true;
      currentDate += 1000;
      remainingTime = Math.floor(selectedDate - currentDate);
      convertMs(remainingTime);
    }
  }, TIMER_DELAY);
}

function createMarkup({ days, hours, minutes, seconds }) {
  daysRemaining.textContent = days;
  hoursRemaining.textContent = hours;
  minutesRemaining.textContent = minutes;
  secondsRemaining.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  createMarkup({ days, hours, minutes, seconds });
  return { days, hours, minutes, seconds };
}