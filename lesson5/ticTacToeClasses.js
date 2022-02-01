// Textual description:
// A 2 person game, where we have a board of 9 empty squares at the start
// The two players take turns placing either an X or an O on the board
// only at an empty spot
// The game is over if all the board squares are full
// Or if either of the players achieves a winning move

// Key nouns: game, player, board, square, winning moves
// Key verbs: start, make move, check winning moves

// Game
//  - start
//  - play
//  - end

// Player
//  - make move

// Board
//  - check winning moves
//  - check if full

// Square
//  - initialized with empty marker
//  - filled with move marker

const readline = require("readline-sync");

class Player {
  constructor(token) {
    this.token = token;
  }
}

class HumanPlayer extends Player {
  makeMove(board) {
    console.clear();
    console.log("It is your move!");
    board.printBoard();
    const availableMoves = board.getAvailableMoves();
    console.log(
      "The squares are numbered 1 through 9, starting in top left corner."
    );
    console.log(`The available positions are: ${availableMoves}`);
    console.log(
      'Please type the number of one of the available positions and press "ENTER"'
    );
    let choice = readline.prompt();
    while (!availableMoves.includes(choice)) {
      console.log(`Please enter one of these numbers: ${availableMoves}`);
      choice = readline.prompt();
    }
    board.setMove(choice, this.token);
  }
}

class ComputerPlayer extends Player {
  makeMove(board) {
    const availableMoves = board.getAvailableMoves();
    const choice = Math.floor(Math.random() * availableMoves.length);
    board.setMove(availableMoves[choice], this.token);
  }
}

class Board {
  constructor() {
    // Make 3 x 3 array
    this.board = new Array(3)
      .fill(null)
      .map((_) => new Array(3).fill(Game.UNUSED_MARKER));
    this.PRINTER_BOARD_WIDTH = 11;
  }

  getWinner() {
    // Return either 'x' or 'o' or 'tie' or null if no winner
    let winner =
      this.getDiagonalWinner() ||
      this.getHorizontalWinner() ||
      this.getVerticalWinner();
    if (winner) return winner;

    const availableMoves = this.getAvailableMoves();
    if (availableMoves.length === 0) {
      return "tie";
    } else {
      return null;
    }
  }
  getDiagonalWinner() {
    if (this.board[1][1] !== Game.UNUSED_MARKER) {
      if (
        this.board[0][0] === this.board[1][1] &&
        this.board[1][1] === this.board[2][2]
      ) {
        return this.board[0][0];
      } else if (
        this.board[2][0] === this.board[1][1] &&
        this.board[0][2] === this.board[1][1]
      ) {
        return this.board[2][0];
      }
    }
    return null;
  }
  getHorizontalWinner() {
    for (let idx = 0; idx < 3; idx++) {
      if (
        this.board[idx][0] === this.board[idx][1] &&
        this.board[idx][1] === this.board[idx][2] &&
        this.board[idx][0] !== Game.UNUSED_MARKER
      ) {
        return this.board[idx][0];
      }
    }
    return null;
  }

  getVerticalWinner() {
    for (let idx = 0; idx < 3; idx++) {
      if (
        this.board[0][idx] === this.board[1][idx] &&
        this.board[1][idx] === this.board[2][idx] &&
        this.board[0][idx] !== Game.UNUSED_MARKER
      ) {
        return this.board[0][idx];
      }
    }
    return null;
  }

  printBoard() {
    console.log(
      ` ${this.board[0][0]} | ${this.board[0][1]} | ${this.board[0][2]}`
    );
    console.log("-".repeat(this.PRINTER_BOARD_WIDTH));
    console.log(
      ` ${this.board[1][0]} | ${this.board[1][1]} | ${this.board[1][2]}`
    );
    console.log("-".repeat(this.PRINTER_BOARD_WIDTH));
    console.log(
      ` ${this.board[2][0]} | ${this.board[2][1]} | ${this.board[2][2]}`
    );
  }

  getAvailableMoves() {
    // Returns an array of available moves
    const calculateMoveNumber = (firstIdx, secondIdx) =>
      String(firstIdx * 3 + secondIdx + 1);

    const availableMoves = [];
    this.board.forEach((row, firstIdx) =>
      row.forEach((square, secondIdx) => {
        if (square === " ") {
          availableMoves.push(calculateMoveNumber(firstIdx, secondIdx));
        }
      })
    );
    return availableMoves;
  }

  setMove(moveNumber, token) {
    let firstIdx = Math.floor((moveNumber - 1) / 3);
    let secondIdx = moveNumber - 1 - firstIdx * 3;
    this.board[firstIdx][secondIdx] = token;
  }
}

class Game {
  static HUMAN_MARKER = "x";
  static COMPUTER_MARKER = "o";
  static UNUSED_MARKER = " ";

  constructor() {
    this.human = new HumanPlayer(Game.HUMAN_MARKER);
    this.computer = new ComputerPlayer(Game.COMPUTER_MARKER);
    this.board = new Board();
    this.winner = null;
  }

  play() {
    this.printWelcome();

    this.gameIsOver = false;
    this.currentPlayer = this.human;

    while (!this.gameIsOver) {
      this.getMove();
      this.checkIfGameOver();
    }
    this.printWinner();
    this.printGoodbye();
  }

  getMove() {
    this.currentPlayer.makeMove(this.board);
    this.currentPlayer =
      this.currentPlayer === this.human ? this.computer : this.human;
  }
  printWelcome() {
    console.clear();
    console.log("Welcome to the game of tic tac toe! Press 'ENTER' to start!");
    readline.prompt();
  }

  printGoodbye() {
    console.log("Thanks for playing tic tac toe! Press 'ENTER' to exit");
    readline.prompt();
  }

  checkIfGameOver() {
    this.winner = this.board.getWinner();
    if (this.winner) {
      this.gameIsOver = true;
    }
  }

  printWinner() {
    console.clear();
    console.log("The final board: ");
    this.board.printBoard();
    if (this.winner === this.human.token) {
      console.log("You win! Congratulations");
    } else if (this.winner === this.computer.token) {
      console.log("You lose :(");
    } else {
      console.log("It is a tie! Well played both.");
    }
  }
}

let game = new Game();
game.play();
