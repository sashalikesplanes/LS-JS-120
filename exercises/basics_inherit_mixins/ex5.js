const Walkable = {
  walk() {
    return "Let's go for a walk!";
  },
};

class Cat {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello! My name is ${this.name}!`;
  }
}

Object.assign(Cat.prototype, Walkable);

let kitty = new Cat("Sophie");
console.log(kitty.greet());
console.log(kitty.walk());
