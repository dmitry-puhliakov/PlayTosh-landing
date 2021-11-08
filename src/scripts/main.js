
/* eslint-disable */

import { data } from './data.js';
import { firebaseDB } from './firebase';

//rendering list of casinos
const casinosList = document.querySelector('.casinos__list');

data.forEach(element => {
  casinosList.innerHTML += `
    <li class="casinos__item">
      <div class="card">
        <div class="card__flag">${element.flag}</div>

        <div class="card__content">
          <div class="card__logo" style="background-color: ${element.logoBg};">
            <img
              class="card__logo-img"
              src="${element.logoURL}"
              alt="${element.title}"
            >
          </div>

          <div class="card__text">
            <h2 class="card__title">${element.title}</h2>

            <span class="card__disc">${element.bonus1}</span>
            <span class="card__disc card__disc--dep">
              &#8364;${element.bonus2}
            </span>
            <span class="card__disc">${element.bonus3}</span>
            <span class="card__disc">${element.bonus4}</span>
            <span class="card__disc">${element.bonus5}</span>
          </div>

          <div class="card__rating">
            <div class="card__rating-text">
              Rating (${element.userRating})
            </div>

            <div class="card__rating-stars stars">
              <div class="stars__body">★ ★ ★ ★ ★</div>
            </div>
          </div>

          <div class="card__rating-value">${element.rating}</div>

          <div class="card__play">
            <div class="card__rating-stars card__rating-stars--m stars">
              <div class="stars__body">★ ★ ★ ★ ★</div>
            </div>

            <button class="card__btn btn-play" id="${element.id}">Play</button>
          </div>
        </div>
      </div>
    </li>
  `;
});

//hide the flag tag if there is no text for it
const flags = document.querySelectorAll('.card__flag');

for(const flag of flags) {
  if (flag.textContent == '') {
    flag.style.display = 'none';
  }
}

//geting user IP
let userIp = '';

fetch('https://ipapi.co/json/')
  .then(res => res.json())
  .then(res => userIp = res.ip);

//handling play button click
const btns = document.querySelectorAll('.btn-play');

for(const btn of btns) {
  btn.addEventListener('click', e => {
    e.preventDefault();

    const cDate = new Date();

    firebaseDB.collection('click-log').add({
      btnId: e.target.id,
      currentDate: cDate,
      userIP: userIp,
    });
  });
};

