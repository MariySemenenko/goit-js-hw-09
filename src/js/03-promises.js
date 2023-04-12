import { Notify } from 'notiflix/build/notiflix-notify-aio';


  const body = document.querySelector('body');
  const form = document.querySelector('form.form');
  const step = document.querySelector('[name="step"]');
  const amount = document.querySelector('[name="amount"]');
  const submit = document.querySelector('button');
  const delay = document.querySelector('input[name="delay"]');

form.addEventListener('submit', onPromiseCreate);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}



function onPromiseCreate(e) {
  e.preventDefault();
const { delay, step, amount } = e.currentTarget.elements;
  let valueDelay = Number(delay.value);
  let steps = Number(step.value);
  let amounts= Number(amount.value);

  for (let i = 1; i <= amounts; i += 1) {
    let promiseDelay = valueDelay;

    createPromise(i, promiseDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
      valueDelay += steps;
      
      }
}



 