const cards = document.querySelectorAll(".card");

let cardOne;
let cardTwo;
let disableDeck = false;
let matchedCards = 0;

function flipCard(e) {
  let clickedCard = e.target; // getting user clicked card

  if(clickedCard !== cardOne && !disableDeck) {
    clickedCard.classList.add("flip");
    if(!cardOne) {
      // Return the cardOne value to clickedCard
      return cardOne = clickedCard;
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector("img").src;
    let cardTwoImg = cardTwo.querySelector("img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  // if two cards img matched 
  if(img1 === img2) {
    matchedCards++; // increment matched value by 1
    // if user matched all cards
    if(matchedCards == 8) {
      setTimeout(() => {
        return shuffleCard();
      }, 1000);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = ""; // setting both card value to blank
    return disableDeck = false;
  } else {
    // if two card not matched
    setTimeout(() => {
      // adding shake class to both card after 400ms
      cardOne.classList.add("shake");
      cardTwo.classList.add("shake");
    }, 400);
    setTimeout(() => {
      // Removing both classes(shake-flip) from both afer 1.2s 
      cardOne.classList.remove("shake", "flip");
      cardTwo.classList.remove("shake", "flip");
      cardOne = cardTwo = ""; // setting both card value to blank
      disableDeck = false;
    }, 1200);
  }
}

function shuffleCard() {
  matchedCards = 0;
  disableDeck = false;
  cardOne = "";
  cardTwo = "";
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => Math.random() > 0.5 ? 1 : -1); // sorting array item randomly
  cards.forEach((card, index) => {
    // adding click event to all cards again
    card.classList.remove("flip");
    let imgTag = card.querySelector("img");
    imgTag.src = `Images/img-${arr[index]}.png`;
    card.addEventListener("click", flipCard);
  });
}

shuffleCard();

// adding click event to all cards
cards.forEach(card => {
  card.addEventListener("click", flipCard);
});