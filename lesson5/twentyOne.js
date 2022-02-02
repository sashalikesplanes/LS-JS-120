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

class Player extends CardHolder {
  constructor() {
    super();
    this.setPlayerName();
  }

  setPlayerName() {
    console.log('Please enter your name and press "ENTER"');
    let name = readline.prompt();
    this.name = name;
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

  constructor() {
    this.printWelcome();
    this.dealer = new CardHolder(TwentyOneGame.DEALER_NAME);
    this.player = new Player();
    this.deck = new Deck(TwentyOneGame.DECK_SIZE);
  }

  play() {
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
    console.log(`Welcome to the game of ${TwentyOneGame.BUST_VALUE}`);
    console.log(
      "The goal is to get a higher hand value than the dealer, " +
        `but not more than ${TwentyOneGame.BUST_VALUE}, otherwise you're bust!`
    );
    console.log(
      `2 - 10  are worth their face values
      Jack, Queen and King are worth ${TwentyOneGame.FACE_CARD_VALUE} each
      Ace is worth either ${TwentyOneGame.ACE_CARD_VALUE} or 1 depending on if you're over 21`
    );
    console.log(
      `You can always choose to hit or stay, the dealer stays ` +
        `once their hand is worth ${TwentyOneGame.DEALER_STAY_VALUE} or more.`
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
    if (
      this.getHandValue(this.dealer.getHand()) < TwentyOneGame.DEALER_STAY_VALUE
    ) {
      return true;
    } else return false;
  }

  isBust(player) {
    if (this.getHandValue(player.getHand()) > TwentyOneGame.BUST_VALUE) {
      return true;
    } else return false;
  }

  getCardValue(card) {
    if (!Number.isNaN(Number(card.value))) return Number(card.value);
    else if (ClassicCard.FACE_CARDS.includes(card.value)) {
      return TwentyOneGame.FACE_CARD_VALUE;
    } else return TwentyOneGame.ACE_CARD_VALUE;
  }

  getHandNumOfAces(hand) {
    let countOfAces = 0;
    hand.forEach(
      (card) =>
        (countOfAces += card.getValue() === ClassicCard.ACE_CARD ? 1 : 0)
    );
    return countOfAces;
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
