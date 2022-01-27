const assignPropertyIter = (obj, key, value) => {
  let prototypeObj = Object.getPrototypeOf(obj);
  while (prototypeObj !== null) {
    if (prototypeObj.hasOwnProperty(key)) prototypeObj[key] = value;
    prototypeObj = Object.getPrototypeOf(prototypeObj);
  }
};

const assignProperty = (obj, key, value) => {
  if (obj === null) return;
  else if (obj.hasOwnProperty(key)) obj[key] = value;
  else assignProperty(Object.getPrototypeOf(obj), key, value);
};

let fooA = { bar: 1 };
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

assignProperty(fooC, "bar", 2);
console.log(fooA.bar); // 2
console.log(fooC.bar); // 2

assignProperty(fooC, "qux", 3);
console.log(fooA.qux); // undefined
console.log(fooC.qux); // undefined
console.log(fooA.hasOwnProperty("qux")); // false
console.log(fooC.hasOwnProperty("qux")); // false
