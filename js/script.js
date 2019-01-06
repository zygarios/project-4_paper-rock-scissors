"use strict";

//zmienne przycisków \\
var paperSelect = document.getElementById("paper");
var rockSelect = document.getElementById("rock");
var scissorsSelect = document.getElementById("scissors");
var output = document.getElementById("output");
var result = document.getElementById("result");
var round = document.getElementById("round");
var newGameButton = document.getElementById("newGame");
var buttonsWrapper = document.querySelectorAll(".buttonOption button");
var playerMoveButton = document.querySelectorAll('.player-move');
var myChoiceScore, pcChoiceScore, setRounds, gameOn;

function resetGame() {
  // btnAnim();
  gameOn = false;
  myChoiceScore = 0;
  pcChoiceScore = 0;
  setRounds = 0;
}

resetGame();

//Losowanie wyniku komputerowi \\
var pcChoiceResult = function() {
  var pcChoiceResult = Math.floor(Math.random() * 3 + 1);
  return pcChoiceResult;
};

//Wynik liczbowy na tekstowy
function numToText(result) {
  if (result == 1) {
    return "PAPER";
  } else if (result == 2) {
    return "ROCK";
  } else if (result == 3) {
    return "SCISSORS";
  }
}

//Porównanie losów
function compare(myChoice, pcChoice) {
  if (myChoice === pcChoice) {
    return "<strong>DRAW: </strong>";
  } else if (
    (myChoice === 1 && pcChoice === 2) ||
    (myChoice === 2 && pcChoice === 3) ||
    (myChoice === 3 && pcChoice === 1)
  ) {
    myChoiceScore++;
    return "<strong>YOU WON:</strong> ";
  } else {
    pcChoiceScore++;
    return "<strong>YOU LOST:</strong> ";
  }
}

//Tekstowe wyniki
function outputSingleResult(compareResult, myText, itsText) {
  output.innerHTML =
    compareResult +
    "you played " +
    myText +
    " computer played " +
    itsText +
    ". <br><br>";
}

//Wybór przycisku 1,2,3
function myChoice(choice) {
  var pcChoice = pcChoiceResult();
  var compareResult = compare(choice, pcChoice);
  var myText = numToText(choice);
  var itsText = numToText(pcChoice);
  outputSingleResult(compareResult, myText, itsText);
  result.innerHTML = myChoiceScore + " - " + pcChoiceScore;
  allScore();
}

//Animacja dla odblokowanych przycisków
function btnAnim() {
  for (var i = 0; i < buttonsWrapper.length; i++) {
    // buttonsWrapper[i].classList.toggle("button-animation");
    buttonsWrapper[i].classList.remove("isHidden");
  }
}

for (var i = 0; i < playerMoveButton.length; i++) {
  function playerMove() {
    if (gameOn == true) {
      myChoice((this.getAttribute("data-target")) * 1);
    } else {
      output.innerHTML = "Game over, please press the new game button!";
    }
  }
  playerMoveButton[i].addEventListener('click', playerMove);

}

//Odblokowane buttony
function enabledButton() {
  gameOn = true;
  round.innerHTML = "Points to win: " + setRounds;
  result.innerHTML = myChoiceScore + " - " + pcChoiceScore;
  output.innerHTML = "";
}

//Przycisk NewGame
newGameButton.addEventListener("click", function() {
  setRounds = parseInt(prompt("Set number of rounds: "));
  if (isNaN(setRounds) || setRounds === 0) {
    output.innerHTML = "Enter the correct number";
  } else {
    btnAnim();
    myChoiceScore = 0;
    pcChoiceScore = 0;
    enabledButton();

  }
});

//Pętla zliczająca punkty pozostałe do wygranej
function allScore() {
  if (myChoiceScore === setRounds) {
    output.innerHTML += "<strong>YOU WON THE ENTIRE GAME!!!</strong>";
    resetGame();
  } else if (pcChoiceScore === setRounds) {
    output.innerHTML += "<strong>YOU LOST THE ENTIRE GAME!!!</strong>";
    resetGame();
  }
}
