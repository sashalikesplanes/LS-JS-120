let fooA = { bar: 1 };
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

function assignProperty(object, key, value) {
  if (object === null) return;

  if (object.hasOwnProperty(key)) {
    object[key] = value;
  } else {
    assignProperty(Object.getPrototypeOf(object), key, value);
  }
}

assignProperty(fooC, "bar", 2);
console.log(fooA.bar); // 2
console.log(fooC.bar); // 2

assignProperty(fooC, "qux", 3);
console.log(fooA.qux); // undefined
console.log(fooC.qux); // undefined
console.log(fooA.hasOwnProperty("qux")); // false
console.log(fooC.hasOwnProperty("qux")); // false

let obj = Object.create(null);
console.log(Object.getPrototypeOf(obj) === null);
