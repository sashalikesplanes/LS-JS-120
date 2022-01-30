class Player {
  constructor() {
    this.move = "hi";
  }
}

class Computer extends Player {
  choose() {
    const choices = ["rock", "paper", "scissors"];
    let randomIndex = Math.floor(Math.random() * choices.length);
    this.move = choices[randomIndex];
  }
}

let comp = new Computer();
console.log(comp.move);
