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
var progressTable = document.querySelector('.progressTable');

// Modale
function showModal() {
  document.querySelector("#modal-overlay").classList.add("show");
};

var modal = document.querySelector('#modal');
var overlay = document.querySelector("#modal-overlay");

function hideModal() {
  overlay.classList.remove("show");
};
var closeButton = document.querySelector("#modal .close");
closeButton.addEventListener("click", hideModal);
overlay.addEventListener("click", hideModal);

modal.addEventListener("click", function() {
  event.stopPropagation();
});

//Results
var params = {
  gameOn: false,
  myChoiceScore: 0,
  pcChoiceScore: 0,
  setRounds: 0,
  roundValue: 0,
  progress: []
}

function resetGame() {
  // btnAnim();
  params.gameOn = false;
  params.myChoiceScore = 0;
  params.pcChoiceScore = 0;
  params.setRounds = 0;
  params.roundValue = 0;
  params.progress = [];
}

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
    return "DRAW";
  } else if (
    (myChoice === 1 && pcChoice === 2) ||
    (myChoice === 2 && pcChoice === 3) ||
    (myChoice === 3 && pcChoice === 1)
  ) {
    params.myChoiceScore++;
    return "WIN";
  } else {
    params.pcChoiceScore++;
    return "LOSE";
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

//Animacja dla odblokowanych przycisków
function btnAnim() {
  for (var i = 0; i < buttonsWrapper.length; i++) {
    // buttonsWrapper[i].classList.toggle("button-animation");
    buttonsWrapper[i].classList.remove("isHidden");
  }
}
//Wybór przycisku 1,2,3
function myChoice(choice) {
  var pcChoice = pcChoiceResult();
  var compareResult = compare(choice, pcChoice);
  var compareResultText = `<strong>YOU ${compareResult}: </strong>`;
  var myText = numToText(choice);
  var itsText = numToText(pcChoice);
  outputSingleResult(compareResultText, myText, itsText);
  result.innerHTML = params.myChoiceScore + " - " + params.pcChoiceScore;

  params.progress[params.roundValue] = {
    roundValue: ++params.roundValue,
    myMove: myText,
    pcMove: itsText,
    roundResult: compareResult,
    roundScore: result.innerHTML
  }
  allScore();
}


for (var i = 0; i < playerMoveButton.length; i++) {
  function playerMove() {
    if (params.gameOn == true) {
      myChoice((this.getAttribute("data-target")) * 1);
    } else {
      output.innerHTML = "Game over, please press the new game button!";
    }
  }
  playerMoveButton[i].addEventListener('click', playerMove);

}

//Odblokowane buttony
function enabledButton() {
  params.gameOn = true;
  round.innerHTML = "Points to win: " + params.setRounds;
  result.innerHTML = params.myChoiceScore + " - " + params.pcChoiceScore;
}

//Przycisk NewGame
newGameButton.addEventListener("click", function() {
  resetGame();
  params.setRounds = parseInt(prompt("Set number of rounds: "));
  if (isNaN(params.setRounds) || params.setRounds === 0) {
    output.innerHTML = "Enter the correct number";
  } else {
    btnAnim();
    enabledButton();
  }
});

//Generator Tabeli
function tableGenerator () {
  var allRows = ``;
  params.progress.forEach(function(eachRow) {
    allRows += `<tr><td>${eachRow.roundValue}</td>
    <td>${eachRow.myMove}</td>
    <td>${eachRow.pcMove}</td>
    <td>${eachRow.roundResult}</td>
    <td>${eachRow.roundScore}</td></tr>`;
  });
  progressTable.innerHTML = allRows;
}

//Pętla zliczająca punkty pozostałe do wygranej
function allScore() {
  if (params.myChoiceScore === params.setRounds) {
    modal.querySelector('h1').textContent = 'YOU WON GAME!!!';
    tableGenerator();
    showModal();
    resetGame();
  } else if (params.pcChoiceScore === params.setRounds) {
    modal.querySelector('h1').textContent = 'YOU LOST GAME!!!';
    tableGenerator();
    showModal();
    resetGame();
  }
}
