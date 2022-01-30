class Greeting {
  greet(msg) {
    console.log(msg);
  }
}

class Hello extends Greeting {
  hi() {
    super.greet("Hello");
  }
}

class Goodbye extends Greeting {
  bye() {
    super.greet("Goodbye");
  }
}

let greet = new Greeting();
let hello = new Hello();
let bye = new Goodbye();

greet.greet("sasha");
hello.hi();
bye.bye();
bye.greet("sasha again");
