function foo() {
  console.log(`this is in foo : ${this}`);
}

function bar() {
  function qux() {
    console.log(`this is in qux : ${this}`);
  }

  console.log(`this is in bar : ${this}`);
  foo();
  qux();
}

bar();
