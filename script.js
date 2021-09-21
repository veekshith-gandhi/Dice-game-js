"use strict";

const diceRoll = document.querySelector(".btn--roll");
const diceHold = document.querySelector(".btn--hold");
const reset = document.querySelector(".btn--new");

const diceImg = document.querySelector(".dice");

const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const playerNo0 = document.querySelector(".player--0");
const playerNo1 = document.querySelector(".player--1");

const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");

let currentScore, activePlayer, scores, playing;
const initiate = function () {
  current0El.textContent = 0;
  current1El.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  scores = [0, 0];
  playing = true;
  diceImg.classList.remove("hidden");
  playerNo0.classList.add("player--active");
  playerNo1.classList.remove("player--active");
  playerNo0.classList.remove("player--winner");
  playerNo1.classList.remove("player--winner");
};
initiate();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerNo0.classList.toggle("player--active");
  playerNo1.classList.toggle("player--active");
  currentScore = 0;
};

diceRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceImg.src = `dice-${dice}.png`;
    currentScore += dice;

    if (dice !== 1) {
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

diceHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    console.log(scores);

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 50) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player-active");
      diceImg.classList.add("hidden");
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

reset.addEventListener("click", initiate);
