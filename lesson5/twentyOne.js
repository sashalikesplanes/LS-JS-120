// Description

// The cards are all dealt from a classic 52 card deck
// A player and a dealer are dealt 2 cards each
// The player is shown one of dealers card
// The player can choose to hit where they are given another card
// Or can choose to stay
// If the players total adds to more than 21 then they are bust and lose
// Otherwise the dealer hits until they are at or above a total of 17
// If the dealer gets more than 21 they are bust and the player wins
// Otherwise the winner is determined by who has a higher total
// Cards 2 - 10 are at face value
// J, Q, K are worth 10 each
// Ace is worth 11 or 1 depending on whether the player goes bust

// N: Deck of cards, player, dealer, hand, card, worth
// V: Shuffle deck, deal card, hit, stay, get total, compare totals

// Deck - n
//  dealCard - v
//  shuffleDeck - v

// Participant - n
//  Dealer - n
//  Player - n
//  makeMove - v

// Game - n
//  dealCards - v
//  compareTotals - v
//  declareWinner - v

const readline = require("readline-sync");

class ClassicCard {
  static VALUE_TO_STRING = {
    J: "Jack",
    Q: "Queen",
    K: "King",
    A: "Ace",
  };
  static SUIT_TO_STRING = {
    S: "Spades",
    H: "Hearts",
    C: "Clubs",
    D: "Diamonds",
  };
  static VALID_VALUES = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];
  static VALID_SUITS = ["S", "H", "C", "D"];

  constructor(value, suit) {
    this.value = value;
    this.suit = suit;
  }

  toString() {
    let valueString = Number.isNaN(Number(this.value))
      ? ClassicCard.VALUE_TO_STRING[this.value]
      : this.value;
    return `${valueString} of ${ClassicCard.SUIT_TO_STRING[this.suit]}`;
  }

  getValue() {
    return this.value;
  }

  getSuit() {
    return this.suit;
  }
}

class Deck {
  static NUMBER_OF_SHUFFLES = 5;

  constructor(deckSize) {
    this.deck = this.getNewDeck();
    this.deckSize = deckSize;
    this.shuffleDeck();
  }

  getNewDeck() {
    let deck = [];
    ClassicCard.VALID_VALUES.forEach((value) => {
      ClassicCard.VALID_SUITS.forEach((suit) => {
        deck.push(new ClassicCard(value, suit));
      });
    });
    return deck;
  }

  shuffleDeckOnce() {
    for (let count = this.deckSize - 1; count > 0; count--) {
      let randomCardIdx = Math.floor(Math.random() * this.deckSize);
      [this.deck[count], this.deck[randomCardIdx]] = [
        this.deck[randomCardIdx],
        this.deck[count],
      ];
    }
  }

  shuffleDeck() {
    for (let count = 0; count < Deck.NUMBER_OF_SHUFFLES; count++) {
      this.shuffleDeckOnce();
    }
  }

  getACard() {
    return this.deck.pop();
  }
}

class CardHolder {
  constructor(name) {
    this.name = name;
    this.hand = [];
  }

  addACardToHand(card) {
    this.hand.push(card);
  }

  getHand() {
    return this.hand;
  }

  getName() {
    return this.name;
  }
}

class TwentyOneGame {
  static NUM_OF_CARDS_AT_START = 2;
  static DEALER_NAME = "Dealer";
  static PLAYER_NAME = "Player";
  static DECK_SIZE = 52;

  constructor() {
    this.dealer = new CardHolder(TwentyOneGame.DEALER_NAME);
    this.player = new CardHolder(TwentyOneGame.PLAYER_NAME);
    this.deck = new Deck(TwentyOneGame.DECK_SIZE);
  }

  play() {
    this.printWelcome();

    this.dealHands([this.dealer, this.player]);

    this.printHands([this.dealer, this.player]);

    while (this.playerHits()) {
      this.player.addACardToHand(this.deck.getACard());
      this.printHands([this.dealer, this.player]);
      if (this.isBust(this.player)) break;
    }

    if (!this.isBust(this.player)) {
      while (this.dealerHits()) {
        this.dealer.addACardToHand(this.deck.getACard());
        if (this.isBust(this.dealer)) break;
      }
    }
    this.printHands([this.dealer, this.player], false);
    this.printResult();
    this.printGoodbye();
  }

  printWelcome() {
    console.clear();
    console.log("Welcome to the game of 21");
    console.log(
      "The goal is to get a higher hand value than the dealer, " +
        "but not more than 21, otherwise you're bust!"
    );
    console.log(
      "2 - 10  are worth their face values, Jack, Queen and King are worth 10 each " +
        "an Ace is worth either 11 or 1 depending on if you're over 21"
    );
    console.log(
      "You can always choose to hit or stay, the dealer stays " +
        "once their hand is worth 17 or more."
    );
    console.log('Press "ENTER" to start the game.');
    readline.prompt();
  }

  printGoodbye() {
    console.log(
      "Thank you for playing Twenty One made by Sasha from Russia with love."
    );
  }

  dealHand(player) {
    for (let count = 0; count < TwentyOneGame.NUM_OF_CARDS_AT_START; count++) {
      player.addACardToHand(this.deck.getACard());
    }
  }

  dealHands(players) {
    players.forEach((player) => this.dealHand(player));
  }

  printHand(player, hideCards = false) {
    let cardString;
    if (hideCards) {
      cardString = `${player.getHand()[0].toString()} and ${
        player.getHand().length - 1
      } unknown card(s)`;
    } else {
      cardString = player
        .getHand()
        .map((card) => card.toString())
        .join(", ");
    }
    console.log(`${player.getName()} has ${cardString}`);
  }

  printHands(players, hideDealerCards = true) {
    console.clear();
    players.forEach((player) => {
      if (player === this.dealer) {
        this.printHand(player, hideDealerCards);
      } else {
        this.printHand(player);
      }
    });
  }

  playerHits() {
    console.log(
      'Do you hit or stay? Type either "hit" / "stay" or "h" / "s" and "ENTER"'
    );
    let choice = readline.prompt().toLowerCase();
    while (!["h", "s", "hit", "stay"].includes(choice)) {
      console.log("Invalid choice, try again");
      choice = readline.prompt().toLowerCase();
    }
    return choice[0] === "h";
  }

  dealerHits() {
    if (this.getHandValue(this.dealer.getHand()) < 17) return true;
    else return false;
  }

  isBust(player) {
    if (this.getHandValue(player.getHand()) > 21) return true;
    else return false;
  }

  getCardValue(card) {
    if (!Number.isNaN(Number(card.value))) return Number(card.value);
    else if (["J", "K", "Q"].includes(card.value)) return 10;
    else return 11;
  }

  getHandNumOfAces(hand) {
    let countOfAces = 0;
    hand.forEach((card) => (countOfAces += card.getValue() === "A" ? 1 : 0));
    return countOfAces;
  }

  getHandValue(hand) {
    let value = 0;
    let numOfAces = this.getHandNumOfAces(hand);
    hand.forEach((card) => (value += this.getCardValue(card)));
    while (value > 21 && numOfAces > 0) {
      value -= 10;
      numOfAces -= 1;
    }
    return value;
  }

  printResult() {
    if (this.isBust(this.player)) {
      console.log("You are bust :( Dealer wins!");
    } else if (this.isBust(this.dealer)) {
      console.log("Dealer is bust. You win!");
    } else {
      let playerHandValue = this.getHandValue(this.player.getHand());
      let dealerHandValue = this.getHandValue(this.dealer.getHand());
      console.log(`Your hand is worth: ${playerHandValue}.`);
      console.log(`Dealer's hand is worth: ${dealerHandValue}.`);
      if (playerHandValue > dealerHandValue) {
        console.log("You win!");
      } else if (playerHandValue < dealerHandValue) {
        console.log("Dealer wins :(");
      } else {
        console.log("Equal hand values, its a tie :/");
      }
    }
  }
}

const game = new TwentyOneGame();
game.play();
