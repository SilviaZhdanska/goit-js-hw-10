import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

// Функція для додавання лідируючого нуля до числа, якщо воно менше 10
function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

// Отримання елементів DOM
const dateTimePicker = document.getElementById('datetime-picker');
const startButton = document.getElementById('start-button');
const daysDisplay = document.getElementById('days');
const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');

let countdownInterval; // Змінна для зберігання інтервалу зворотного відліку

// Налаштування flatpickr
flatpickr(dateTimePicker, {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  minDate: 'today',
  minuteIncrement: 1,
  onClose: selectedDates => {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      // Дата у минулому
      iziToast.error({
        title: '',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      // Дата у майбутньому
      startButton.disabled = false;
    }
  },
});

// Обробник натискання кнопки "Start"
startButton.addEventListener('click', () => {
  const selectedDate = flatpickr.parseDate(dateTimePicker.value, 'Y-m-d H:i');
  const currentDate = new Date();
  const difference = selectedDate.getTime() - currentDate.getTime();

  // Відлік часу
  countdownInterval = setInterval(() => {
    const difference = selectedDate.getTime() - new Date().getTime();

    if (difference <= 0) {
      clearInterval(countdownInterval);
      daysDisplay.textContent = '00';
      hoursDisplay.textContent = '00';
      minutesDisplay.textContent = '00';
      secondsDisplay.textContent = '00';
      startButton.disabled = true;
      flatpickr(dateTimePicker).set('enable', true);
      return;
    }

    const timeLeft = convertMs(difference);
    daysDisplay.textContent = addLeadingZero(timeLeft.days);
    hoursDisplay.textContent = addLeadingZero(timeLeft.hours);
    minutesDisplay.textContent = addLeadingZero(timeLeft.minutes);
    secondsDisplay.textContent = addLeadingZero(timeLeft.seconds);
  }, 1000);

  // Відключення вибору дати після початку таймера
  flatpickr(dateTimePicker).set('enable', false);
  startButton.disabled = true;
});

// мій варіант
// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';

// // function flatpickr(selector, options) {}
// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//   },
// };

// let userSelectedDate = document.querySelector('#datetime-picker');
// userSelectedDate.addEventListener('click', event => {
//   flatpickr(userSelectedDate, calender);
// });

// iziToast.show({
//   title: '',
//   message: 'Please choose a date in the future',
// });
// const calender = {
//   mode: 'multiple',
//   dateFormat: 'Y-m-d',
//   enableTime: true,
//   minTime: '00:00',
//   maxTime: '23:59',
// };

// // const currentDate = new Date();
// // if (userSelectedDate <= currentDate) {
// //   window.alert('Please choose a date in the future');
// // } else {
// // }

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// function addLeadingZero(value) {
//   convertMs.padStart();
// }
