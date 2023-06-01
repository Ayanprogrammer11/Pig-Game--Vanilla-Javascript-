'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Reusable Functions
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  player0El.classList.toggle('player--active'); // Updated
  player1El.classList.toggle('player--active'); // Updated
  activePlayer = activePlayer === 0 ? 1 : 0;
}

function toggleButtons(command) {
  if (command === 'disable') {
    const buttons = document.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].classList.contains('btn--new')) continue;
      buttons[i].setAttribute('disabled', 'true');
    }
  } else if (command === 'enable') {
    const buttons = document.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].classList.contains('btn--new')) continue;
      buttons[i].removeAttribute('disabled');
    }
  }
}

// Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a Random Dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display Dice
    diceEl.classList.remove('hidden');
    diceEl.setAttribute('src', `dice-${dice}.png`);

    // 3. Check for rolled 1:
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Holding the game functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to total score and display it
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    // 2. if score >= 100 then the current player wins otherwise it switches the player
    if (scores[activePlayer] >= 100) {
      playing = false;
      // Manipulating Elements when the player wins
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      diceEl.classList.add('hidden');
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      toggleButtons('disable');
    } else {
      // Switching the player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  playing = true;
  toggleButtons('enable');
  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
});
