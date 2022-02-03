class Foo {
  constructor(name) {
    this.name = name;
    this.bar = this.baz();
  }

  baz() {
    return this.qux(this.name);
  }

  qux(name) {
    return name + name;
  }
}

let foo = new Foo("test");
console.log(foo.bar);

class Foo2 {
  constructor(name) {
    this.name = name;
    this.bar = this.baz();
  }

  baz() {
    return this.qux();
  }

  qux() {
    return this.name + this.name;
  }
}

let foo2 = new Foo2("test");
console.log(foo2.bar);
