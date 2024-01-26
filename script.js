const score0El = document.getElementById("score_0");
const score1El = document.getElementById("score_1");

score0El.textContent = 0;
score1El.textContent = 0;

const diceEl = document.querySelector(".dice");
diceEl.classList.add("hidden");

const current0El = document.getElementById("current_0");
const current1El = document.getElementById("current_1");

let currentScore = 0;
let active_player = 0;
let game_active = true;

const btnRoll = document.querySelector(".btn--roll");

btnRoll.addEventListener("click", function () {

  if(!game_active) 
  return; 

  diceEl.classList.remove("hidden");

  const dice = Math.floor(Math.random() * 6) + 1;
  // console.log(dice);

  diceEl.src = `images/dice-${dice}.png`;

  if (dice != 1) {
    // display the score
    currentScore += dice;
    document.getElementById(`current_${active_player}`).textContent =
      currentScore;
  } else {
    // switch the player
    switchPlayer();
  }
});

const btnNew = document.querySelector(".btn--new");

btnNew.addEventListener("click",function(){
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  currentScore = 0;
  active_player = 0;
  diceEl.classList.add("hidden");
  game_active = true;
});


const btnHold = document.querySelector(".btn--hold");

function switchPlayer(){
  currentScore = 0;
  document.getElementById(`current_${active_player}`).textContent = 0;
  active_player = game_active ? (active_player === 0 ? 1 : 0) : active_player;
}

btnHold.addEventListener("click",function(){
  
  if(!game_active)
  return;

  const currentScoreElement = document.getElementById(`score_${active_player}`);
  currentScoreElement.textContent = parseInt(currentScoreElement.textContent) + currentScore;

  checkWinner();
  switchPlayer();
})

const winningScore = 50;

function checkWinner(){
  const currentScoreElement = document.getElementById(`score_${active_player}`);
  const currentScoreValue = parseInt(currentScoreElement.textContent);

  if (currentScoreValue >= winningScore) {
    if (confirm(`Player ${active_player + 1} wins the game! Start a new game?`)) {
      score0El.textContent = 0; // Reset player 0 score to 0
      score1El.textContent = 0; // Reset player 1 score to 0
      game_active = true;
    } else {
      game_active = false;
    }
  }  
}