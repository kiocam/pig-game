/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/* Declaring all global variables */
var scores, roundScore, activePlayer, gamePlaying;
var querySel = document.querySelector.bind(document);

init();


querySel('.btn-roll').addEventListener('click', function () {

  if (gamePlaying) {
    // 1. random number
    var dice = Math.floor(Math.random() * 6 + 1);

    //2. display the result

    var diceDOM = querySel('.dice');

    diceDOM.style.display = 'block';

    diceDOM.src = './imgs/dice-' + dice + '.png';




    //3. Update the score if the rolled number was not a 1

    if (dice !== 1) {
      //add score
      roundScore += dice;
      querySel('#current-' + activePlayer).textContent = roundScore;
    } else {
      //Next Player
      nextPlayer();
    }
  }

});


querySel('.btn-hold').addEventListener('click', function () {

  if (gamePlaying) {
    //Add current score to global score
    scores[activePlayer] += roundScore;


    // Update the User Interface
    querySel('#score-' + activePlayer).textContent = scores[activePlayer];

    // check to see if current player won the game
    if (scores[activePlayer] >= 20) {
      querySel('#name-' + activePlayer).textContent = 'Winner!!!!';
      querySel('.dice').style.display = 'none';
      querySel('.player-' + activePlayer + '-panel').classList.add('winner');
      querySel('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false
    } else {
      //next player
      nextPlayer();
    }
  }

})



function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  querySel('.player-0-panel').classList.toggle('active');
  querySel('.player-1-panel').classList.toggle('active');

  querySel('.dice').style.display = 'none';
}


querySel('.btn-new').addEventListener('click', init);


function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  querySel('.dice').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  querySel('.player-0-panel').classList.remove('winner');
  querySel('.player-1-panel').classList.remove('winner');
  querySel('.player-0-panel').classList.remove('active');
  querySel('.player-1-panel').classList.remove('active');
  querySel('.player-0-panel').classList.add('active');
}