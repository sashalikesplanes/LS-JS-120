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

class Bar {
  constructor() {
    this.bar = 1;
  }

  qux() {
    console.log("hi");
  }
}
class Foo extends Bar {
  foo = function () {
    console.log(this.__proto__);
  };
}

let foo = new Foo();
console.log("foo" in foo);
