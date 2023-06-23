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

// Game State
let scores, currentScore, activePlayer, playing;

function initializeGame() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');

  [player0El, player1El].forEach(player => player.classList.remove('player--winner', 'player--active'));
  player0El.classList.add('player--active');
  toggleButtons();
}

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  [player0El, player1El].forEach(player => player.classList.toggle('player--active'));
  activePlayer = activePlayer === 0 ? 1 : 0;
}

function toggleButtons(disabled) {
  [btnRoll, btnHold].forEach(button => (button.disabled = disabled));
}

btnRoll.addEventListener('click', () => {
  if (!playing) return;

  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.src = `dice-${dice}.png`;
  diceEl.classList.remove('hidden');

  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  } else {
    switchPlayer();
  }
});

btnHold.addEventListener('click', () => {
  if (!playing) return;

  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    playing = false;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    diceEl.classList.add('hidden');
    toggleButtons(true);
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener('click', initializeGame);

initializeGame();
