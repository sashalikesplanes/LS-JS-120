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
  static ACE_CARD = "A";
  static FACE_CARDS = ["J", "Q", "K"];

  constructor(value, suit) {
    this.value = value;
    this.suit = suit;
  }

  toString() {
    let valueString =
      this.isAce() || this.isFaceCard()
        ? ClassicCard.VALUE_TO_STRING[this.value]
        : this.value;
    return `${valueString} of ${ClassicCard.SUIT_TO_STRING[this.suit]}`;
  }

  isAce() {
    return this.value === ClassicCard.ACE_CARD;
  }

  isFaceCard() {
    return ClassicCard.FACE_CARDS.includes(this.value);
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

  shuffleDeck() {
    for (let count = 0; count < Deck.NUMBER_OF_SHUFFLES; count++) {
      this.shuffleDeckOnce();
    }
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

  clearHand() {
    this.hand = [];
  }
}

class Player extends CardHolder {
  constructor(initialPurse) {
    super();
    this.setPlayerName();
    this.purse = initialPurse;
  }

  setPlayerName() {
    console.log('Please enter your name and press "ENTER"');
    let name = readline.prompt();
    this.name = name;
  }

  getPurse() {
    return this.purse;
  }

  incrementPurse() {
    this.purse += 1;
  }

  decrementPurse() {
    this.purse -= 1;
  }
}

class TwentyOneGame {
  static NUM_OF_CARDS_AT_START = 2;
  static DEALER_NAME = "Dealer";
  static DECK_SIZE = 52;
  static FACE_CARD_VALUE = 10;
  static ACE_CARD_VALUE = 11;
  static BUST_VALUE = 21;
  static DEALER_STAY_VALUE = 17;
  static INITIAL_PURSE = 5;
  static WINNING_PURSE = 10;

  constructor() {
    this.printWelcome();
    this.dealer = new CardHolder(TwentyOneGame.DEALER_NAME);
    this.player = new Player(TwentyOneGame.INITIAL_PURSE);
    this.participants = [this.dealer, this.player];
    this.deck = null;
  }

  printWelcome() {
    console.clear();
    console.log(`Welcome to the game of ${TwentyOneGame.BUST_VALUE}`);
    console.log();
    console.log(
      "The goal is to get a higher hand value than the dealer, " +
        `but not more than ${TwentyOneGame.BUST_VALUE}, otherwise you're bust!`
    );
    console.log(
      `2 - 10  are worth their face values
Jack, Queen and King are worth ${TwentyOneGame.FACE_CARD_VALUE} each
Ace is worth either ${TwentyOneGame.ACE_CARD_VALUE} or 1 depending on if you're over 21`
    );
    console.log();
    console.log(
      `You can always choose to hit or stay, the dealer stays ` +
        `once their hand is worth ${TwentyOneGame.DEALER_STAY_VALUE} or more.`
    );
    console.log();
    console.log(`Your start with a purse of ${TwentyOneGame.INITIAL_PURSE}
Each win you get 1 coin, each loss you lose a coin
You win at ${TwentyOneGame.WINNING_PURSE} coins in your purse!`);
    console.log();
    console.log('Press "ENTER" to start the game.');
    readline.prompt();
  }

  play() {
    while (
      this.player.getPurse() > 0 &&
      this.player.getPurse() < TwentyOneGame.WINNING_PURSE
    ) {
      this.setupNewRound();

      this.playerTurn();
      this.dealerTurn();

      this.closeRound();
    }
    this.printFinalResult();
    this.printGoodbye();
  }

  setupNewRound() {
    this.printPlayerPurse();
    this.deck = new Deck(TwentyOneGame.DECK_SIZE);
    this.clearHands(this.participants);
    this.dealHands(this.participants);
    this.printHands(this.participants);
  }

  printPlayerPurse() {
    console.clear();
    console.log(
      `You have ${this.player.getPurse()} coins. Press "ENTER" to start the round.`
    );
    readline.prompt();
  }

  clearHands(players) {
    players.forEach((player) => player.clearHand());
  }

  dealHands(players) {
    players.forEach((player) => this.dealHand(player));
  }

  dealHand(player) {
    for (let count = 0; count < TwentyOneGame.NUM_OF_CARDS_AT_START; count++) {
      player.addACardToHand(this.deck.getACard());
    }
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

  playerTurn() {
    while (this.playerHits()) {
      this.player.addACardToHand(this.deck.getACard());
      this.printHands(this.participants);
      if (this.isBust(this.player)) break;
    }
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

  isBust(player) {
    if (this.getHandValue(player.getHand()) > TwentyOneGame.BUST_VALUE) {
      return true;
    } else return false;
  }

  getHandValue(hand) {
    let value = 0;
    let numOfAces = this.getHandNumOfAces(hand);
    hand.forEach((card) => (value += this.getCardValue(card)));
    while (value > TwentyOneGame.BUST_VALUE && numOfAces > 0) {
      value -= TwentyOneGame.ACE_CARD_VALUE - 1; // Make ace worth 1
      numOfAces -= 1;
    }
    return value;
  }

  getHandNumOfAces(hand) {
    let countOfAces = 0;
    hand.forEach(
      (card) =>
        (countOfAces += card.getValue() === ClassicCard.ACE_CARD ? 1 : 0)
    );
    return countOfAces;
  }

  getCardValue(card) {
    if (!card.isFaceCard() && !card.isAce()) return Number(card.value);
    else if (card.isFaceCard()) {
      return TwentyOneGame.FACE_CARD_VALUE;
    } else return TwentyOneGame.ACE_CARD_VALUE;
  }

  dealerTurn() {
    if (!this.isBust(this.player)) {
      while (this.dealerHits()) {
        this.dealer.addACardToHand(this.deck.getACard());
        if (this.isBust(this.dealer)) break;
      }
    }
  }

  dealerHits() {
    if (
      this.getHandValue(this.dealer.getHand()) < TwentyOneGame.DEALER_STAY_VALUE
    ) {
      return true;
    } else return false;
  }

  closeRound() {
    console.log("Final hands:");
    this.printHands(this.participants, false);
    let winner = this.getWinner();
    this.printHandValues(this.participants);
    this.printResult(winner);
    this.updatePlayerPurse(winner);
  }

  printHandValues(players) {
    players.forEach((player) => {
      let handValue = this.getHandValue(player.getHand());
      console.log(
        `${player.getName()}'s hand is worth: ${handValue}${
          handValue > TwentyOneGame.BUST_VALUE ? " - BUST!" : ""
        }`
      );
    });
  }

  getWinner() {
    if (this.isBust(this.player)) {
      return this.dealer;
    } else if (this.isBust(this.dealer)) {
      return this.player;
    } else {
      let playerHandValue = this.getHandValue(this.player.getHand());
      let dealerHandValue = this.getHandValue(this.dealer.getHand());
      if (playerHandValue > dealerHandValue) {
        return this.player;
      } else if (playerHandValue < dealerHandValue) {
        return this.dealer;
      } else {
        return null;
      }
    }
  }

  printResult(winner) {
    if (winner === this.player) {
      console.log("You win!");
    } else if (winner === this.dealer) {
      console.log("Dealer wins :(");
    } else {
      console.log("Equal hand values, its a tie :/");
    }
    console.log('Press "ENTER" to continue');
    readline.prompt();
  }

  updatePlayerPurse(winner) {
    if (winner === this.player) this.player.incrementPurse();
    else if (winner === this.dealer) this.player.decrementPurse();
  }

  printFinalResult() {
    if (this.player.getPurse() === 0) {
      console.log("You are broke, goodbye");
    } else {
      console.log("You are rich!!!");
    }
  }

  printGoodbye() {
    console.log(
      "Thank you for playing Twenty One made by Sasha from Russia with love."
    );
  }
}

const game = new TwentyOneGame();
game.play();
