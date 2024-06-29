import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const delayInput = document.querySelector('input[name="delay"]');
  const delay = parseInt(delayInput.value);

  const stateInputs = document.querySelectorAll('input[name="state"]');
  let selectedState;
  for (const input of stateInputs) {
    if (input.checked) {
      selectedState = input.value;
      break;
    }
  }

  const notificationPromise = new Promise((resolve, reject) => {
    if (selectedState === 'fulfilled') {
      setTimeout(() => {
        resolve(delay);
      }, delay);
    } else if (selectedState === 'rejected') {
      setTimeout(() => {
        reject(delay);
      }, delay);
    }
  });

  notificationPromise
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topCenter',
        messageColor: 'white',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topCenter',
        messageColor: 'white',
      });
    });

  delayInput.value = '';
  stateInputs.forEach(input => (input.checked = false));
});
