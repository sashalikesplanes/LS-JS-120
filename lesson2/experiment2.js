let foo = {
  a: 1,
  checkThisOut: function () {
    console.log(this);
  },
};

let bar = {
  a: 3,
};

Object.setPrototypeOf(bar, foo);

bar.checkThisOut();

let qux = {
  bar: function () {
    console.log(this);
  },
};

qux.bar();
