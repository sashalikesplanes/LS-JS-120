const readline = require("readline-sync");
const CHOICES = ["rock", "paper", "scissors", "lizard", "spock"];
const WINNING_MOVES = [
  "rockscissors",
  "paperrock",
  "scissorspaper",
  "rocklizard",
  "lizardspock",
  "spockscissors",
  "scissorslizard",
  "lizardpaper",
  "paperspock",
  "spockrock",
];
const SCORE_TO_WIN = 5;

function createPlayer() {
  return {
    moves: [],
    score: 0,

    incrementScore() {
      this.score += 1;
    },

    resetScore() {
      this.score = 0;
    },

    getLastMove() {
      return this.moves[this.moves.length - 1];
    },
  };
}

function createComp() {
  let genericPlayer = createPlayer();

  let compPlayer = {
    choose() {
      let randomIdx = Math.floor(Math.random() * CHOICES.length);
      this.moves.push(CHOICES[randomIdx]);
    },
  };

  return Object.assign(genericPlayer, compPlayer);
}

function createHuman() {
  let genericPlayer = createPlayer();

  let humanPlayer = {
    choose() {
      let choice;

      while (true) {
        console.log(`Please choose one of (${CHOICES.join(", ")}): `);
        choice = readline.prompt().toLowerCase();
        if (CHOICES.includes(choice)) break;
        console.log(`Invalid choice! Choose one of ${CHOICES.join(", ")}`);
      }
      this.moves.push(choice);
    },
  };

  return Object.assign(genericPlayer, humanPlayer);
}

const RPSGame = {
  // The orchestration engine - where the procedural flow takes place
  human: createHuman(),
  comp: createComp(),

  displayWelcomeMsg() {
    console.clear();
    console.log(`Welcome to ${CHOICES.join(", ")}! First to 5 wins!`);
    console.log("Scissors cuts Paper cover Rock crushes");
    console.log("Lizard poisons Spock smashes Scissors");
    console.log("decapitates Lizard eats Paper disproves");
    console.log("Spock vaporizes Rock crushes Scissors.");
  },

  displayGoodbyeMsg() {
    console.clear();
    console.log("Thanks for playing :) Goodbye!");
    console.log('Press "ENTER" to quit.');
    readline.prompt();
  },

  displayWinner() {
    const humanMove = this.human.getLastMove();
    const compMove = this.comp.getLastMove();

    console.log(`You chose: ${humanMove} and the computer chose: ${compMove}`);

    if (humanMove === compMove) {
      console.log("It's a tie.");
    } else if (WINNING_MOVES.includes(humanMove + compMove)) {
      console.log("You win!");
      this.human.incrementScore();
    } else {
      console.log("Computer wins :(");
      this.comp.incrementScore();
    }

    console.log(
      `Your score is: ${this.human.score} and computer score: ${this.comp.score}`
    );
    console.log('Press "ENTER" to continue!');
    readline.prompt();
    console.clear();
  },

  displayGrandWinner() {
    if (this.human.score > this.comp.score)
      console.log("You are the GRAND WINNER!");
    else console.log("The computer is the Grand Winner :(");
  },

  playAgain() {
    console.log('Would you like to play again? "y" / "n"');
    let answer = readline.prompt().toLowerCase();
    return answer === "y" || answer === "yes";
  },

  resetScores() {
    this.human.resetScore();
    this.comp.resetScore();
  },

  play() {
    this.displayWelcomeMsg();
    while (true) {
      this.human.choose();
      this.comp.choose();
      this.displayWinner();

      if (this.human.score >= SCORE_TO_WIN || this.comp.score >= SCORE_TO_WIN) {
        this.displayGrandWinner();
        if (this.playAgain()) {
          this.resetScores();
        } else {
          break;
        }
      }
    }
    this.displayGoodbyeMsg();
  },
};

RPSGame.play();
