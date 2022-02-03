class Test {
  constructor() {
    this.baz = 5;
    this.foo = this.bar();
  }

  bar() {
    this.qux();
    return 1;
  }

  qux() {
    console.log(this.baz); // execution context is global, but why?
  }
}

let test = new Test();
