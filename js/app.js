// create an array to hold all cards
let card = document.getElementsByClassName("card");
let cards = [...card];


// make deck hold all cards
const deck = document.getElementById("card-deck");


// matchedCards
const matchedCard = document.getElementsByClassName("match");


// star icons
const stars = document.querySelectorAll(".fa-star");


// counter to hold the number of moves made by the player
let moves = 0;
let counter = document.querySelector(".moves");


// stars list
let starsList = document.querySelectorAll(".stars li");


// close icon in modal
const closeicon = document.querySelector(".close");


// declare modal
const modal = document.querySelector("#popup1");


// array for opened cards
let openedCards = [];


// shuffle the array of cards
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

// start the game by shuffling cards when page is loaded/refreshed
document.body.onload = beginGame();


// toggle open & show class to display cards
function displayCard() {
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
};


// add open card to the openedcards array and see if they match
function cardOpen() {
  openedCards.push(this);
  let len = openedCards.length;
  if (len === 2) {
    moveCounter();
    if (openedCards[0].type === openedCards[1].type) {
      matched();
    } else {
      unmatched();
    }
  }
};


// update the card classes and reset the array when they are a match
function matched() {
  openedCards[0].classList.add("match", "disabled");
  openedCards[1].classList.add("match", "disabled");
  openedCards[0].classList.remove("show", "open", "no-event");
  openedCards[1].classList.remove("show", "open", "no-event");
  openedCards = [];
}


// reset the array and card classes when they don't match
function unmatched() {
  openedCards[0].classList.add("unmatched");
  openedCards[1].classList.add("unmatched");
  disable();
  setTimeout(function() {
    openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
    openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
    enable();
    openedCards = [];
  }, 1100);
}


// enable cards, disable matched cards
function enable() {
  Array.prototype.filter.call(cards, function(card) {
    card.classList.remove("disabled");
    for (i = 0; i < matchedCard.length; i++) {
      matchedCard[i].classList.add("disabled");
    }
  });
}


// disable cards temporarily
function disable() {
  Array.prototype.filter.call(cards, function(card) {
    card.classList.add("disabled");
  });
}


// timer
let second = 0,
  minute = 0;
hour = 0;
let timer = document.querySelector(".timer");
var interval;

function startTimer() {
  interval = setInterval(function() {
    timer.innerHTML = minute + "mins " + second + "secs";
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}


// count the player moves
function moveCounter() {
  moves++;
  counter.innerHTML = moves;
  //start timer on click
  if (moves == 1) {
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  };
  // setting rates based on moves
  if (moves > 8 && moves < 14) {
    for (i = 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.visibility = "collapse";
      }
    }
  } else if (moves > 15) {
    for (i = 0; i < 3; i++) {
      if (i > 0) {
        stars[i].style.visibility = "collapse";
      }
    }
  }
}


// Show modal (moves, rating, time) when all matches are complete
function congratulations() {
  if (matchedCard.length == 16) {
    clearInterval(interval);
    finalTime = timer.innerHTML;

    // show congratulations modal
    modal.classList.add("show");

    // declare star rating variable
    let starRating = document.querySelector(".stars").innerHTML;

    //show moves, rating, time on modal
    document.getElementById("lastMove").innerHTML = moves;
    document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = finalTime;

    //closeicon on modal
    closeModal();
  };
}


// start playing
function beginGame() {

  // shuffle deck
  cards = shuffle(cards);

  // remove all exisiting classes from each card
  for (var i = 0; i < cards.length; i++) {
    deck.innerHTML = "";
    [].forEach.call(cards, function(item) {
      deck.appendChild(item);
    });
    cards[i].classList.remove("show", "open", "match", "disabled");
  }

  // reset the Opencards Array
  openedCards = [];

  // reset moves
  moves = 0;
  counter.innerHTML = moves;

  // reset rating
  for (i = 0; i < stars.length; i++) {
    stars[i].style.color = "#FFD700";
    stars[i].style.visibility = "visible";
  }

  //reset timer
  let second = 0;
  let minute = 0;
  let hour = 0;
  var timer = document.querySelector(".timer");
  timer.innerHTML = "0 mins 0 secs";
  clearInterval(interval);
}


// use the closeicon to close the modal when clicked
function closeModal() {
  closeicon.addEventListener("click", function(e) {
    modal.classList.remove("show");
    beginGame();
  });
}


// play again
function playAgain() {
  modal.classList.remove("show");
  beginGame();
}


// add event listeners to the cards
for (var i = 0; i < cards.length; i++) {
  card = cards[i];
  card.addEventListener("click", displayCard);
  card.addEventListener("click", cardOpen);
  card.addEventListener("click", congratulations);
};
