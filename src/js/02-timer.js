import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
 import { Notify } from 'notiflix/build/notiflix-notify-aio';

//  Notify.failure('Please choose a date in the future');//якщо потрібно викликати подію глобально

// створюємо константу, яка відповідає за час затримки в мілісекундах
const TIMER_DELAY = 1000;

// ініціалізуємо змінні, що будуть використовуватися в різних функціях
let intervalId = null;
let selectedDate = null;
let currentDate = null;

// знаходимо елементи на сторінці та зберігаємо їх у змінні
  const dateInput = document.querySelector('input#datetime-picker');
  const btnStartTimer = document.querySelector('button[data-start]');
  const daysRemaining = document.querySelector('[data-days]');
  const hoursRemaining = document.querySelector('[data-hours]');
 const minutesRemaining = document.querySelector('[data-minutes]');
  const secondsRemaining = document.querySelector('[data-seconds]');

// вимикаємо кнопку "Start" на початку, оскільки дата ще не обрана
btnStartTimer.disabled = true;

// додаємо обробник події "click" на кнопку "Start"
btnStartTimer.addEventListener('click', () => timerStart());

// змінна, в якій буде зберігатися кількість мілісекунд, що залишилися до обраної дати
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
// створюємо календар з параметрами
flatpickr(dateInput, options);

// функція, яка перевіряє обрану дату
function onDateCheck(selectedDates) {
  // отримуємо кількість мілісекунд, що пройшли з 1 січня 1970 року
  selectedDate = selectedDates[0].getTime();

  // отримуємо поточну дату
  currentDate = new Date().getTime();
// якщо обрана дата в майбутньому, вмикаємо кнопку "Start"
  if (selectedDates[0].getTime() < Date.now()) {
     // якщо обрана дата в минулому, виводимо повідомлення і вимикаємо кнопку "Start"
     Notify.failure('Please choose a date in the future');
     btnStartTimer.disabled = true;
  } else {
    btnStartTimer.disabled = false;
}
}
// Запускаємо таймер
function timerStart() {
   // Встановлюємо інтервал таймера
  intervalId = setInterval(() => {
     // Встановлюємо поточну дату в мілісекундах
    currentDate = new Date().getTime();
    // Якщо залишилася 1 секунда
    if (selectedDate - currentDate <= 1000) {
      clearInterval(intervalId);//інтервал очищається
      btnStartTimer.disabled = true;//кнопка старт вимкнена
      dateInput.disabled = false;//а поле dateInput увімкнене
    } else {//в іншому випадку час конвертується за допомогою convertMs
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
};

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
};



