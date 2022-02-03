/*
console.log(typeof Object);
let obj = {};
console.log(Object.prototype.hasOwnProperty("hasOwnProperty"));
console.log(obj.__proto__ === Object.prototype);
console.log(obj.constructor === Object);
*/

/*
const func = function () {};
func.call();

console.log(func.__proto__ === Object.prototype); // false
console.log(func.__proto__ === Function.prototype); // true
console.log(Function.prototype.__proto__ === Object.prototype); // true
console.log(func.constructor === Function); // true
console.log(Function.prototype.hasOwnProperty("call")); // true
console.log(Function.prototype.constructor === Object); // false ???
*/

/*
const arr = ["a", "b"];
console.log(arr.join(" :) "));

console.log(arr.__proto__ === Array.prototype); // true
console.log(Array.prototype.__proto__ === Object.prototype); // true
*/

/*
const arr = ["a", "b"];
// Walking up the prototype chain
console.log(arr.__proto__.__proto__ === Object.prototype); // true
console.log(arr.__proto__.__proto__.__proto__ === null); // true

console.log(Array.__proto__ === Function.prototype); // true
console.log(Function.__proto__ === Function.prototype); // true
console.log(Object.constructor === Function); // true
*/

/*
const userFuncs = {
  add: function () {
    this.points += 1;
  },
  login() {
    console.log("Logged in");
  },
};

function userCreator(name, points) {
  const newUser = Object.create(userFuncs);
  newUser.name = name;
  newUser.points = points;
  return newUser;
}

const user = userCreator("sasha", 3);

console.log(user.__proto__ === userFuncs); // true
console.log(user.constructor === Object); // true
console.log("__proto__" in user); // true
console.log("prototype" in user); // false as 'prototype' in not enumerable

user.add();
console.log(user.points);
*/

// function UserCreator(name) {
//   this.name = name;
// }

// UserCreator.prototype.say = function () {
//   console.log(this.name);
// };

// function PaidUserCreator(name, points) {
//   UserCreator.call(this, name);
//   this.points = points;
// }

// PaidUserCreator.prototype = Object.create(UserCreator.prototype);
// PaidUserCreator.prototype.constructor = PaidUserCreator;

// const user = new UserCreator("Ryan"); // new provides a new exec context
// const paidUser = new PaidUserCreator("sasha", 3);

// user.say(); // Ryan
// paidUser.say();
// // not assign the prototype
// console.log(paidUser.constructor === PaidUserCreator); // false

// class UserCreator {
//   constructor(name) {
//     this.name = name;
//   }

//   say() {
//     console.log(this.name);
//   }
// }

// class PaidUserCreator extends UserCreator {
//   constructor(name, points) {
//     super(name);
//     this.points = points;
//   }

//   increase() {
//     this.balance += 1;
//   }
// }

// console.log(PaidUserCreator.__proto__ === UserCreator); // true
// // allows the use of the super keyword

// const user = new UserCreator("ryan");
// const paidUser = new PaidUserCreator("sasha", 5);

// console.log(user.__proto__ === UserCreator.prototype); // true
// console.log(user.constructor === UserCreator); // true

// console.log(paidUser.__proto__ === UserCreator.prototype); // false
// console.log(paidUser.constructor === UserCreator); // false

// console.log(paidUser.__proto__ === PaidUserCreator.prototype); // true
// console.log(paidUser.constructor === PaidUserCreator); // true

// console.log(paidUser.__proto__.__proto__ === UserCreator.prototype); // true

class Foo {
  constructor() {
    this.bar = 1;
  }

  baz() {
    console.log(this.bar);
  }
}
let foo = new Foo();
console.log(foo instanceof Foo); // true
console.log(foo.constructor === Foo); // true

foo.constructor = null;

console.log(foo instanceof Foo); // true
console.log(foo.constructor === Foo); // false

foo.__proto__ = null;

console.log(foo instanceof Foo); // false
console.log(foo.constructor === Foo); // false

let foo2 = new Foo();

foo2.__proto__ = null;
console.log(foo2 instanceof Foo); // false
console.log(foo2.constructor === Foo); // false as constructor is in __proto__?

let foo3 = new Foo();
console.log(foo3.hasOwnProperty("constructor")); // false
console.log(foo3.__proto__.hasOwnProperty("constructor")); // true
