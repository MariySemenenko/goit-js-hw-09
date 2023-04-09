import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";



const options = {
    enableTime: true,//дозволяє вибирати час
    time_24hr: true,// формат 24-годинного годинника
    defaultDate: new Date(),//дата та час за замовчуванням
    minuteIncrement: 1,//крок1 з яким можна вибирати хвилини в годиннику
    onClose(selectedDates) {//на закривання календаря
      console.log(selectedDates[0]);//виводимо час
    },
  };


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
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}