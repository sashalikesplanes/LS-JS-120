const objectsEqual = (obj1, obj2) => {
  const obj1Entries = Object.entries(obj1);
  const obj2Entries = Object.entries(obj2);
  if (obj1Entries.length !== obj2Entries.length) return false;
  //console.log(obj1Entries, obj2Entries);
  return obj1Entries.every(
    (keyValPair1, idx) =>
      keyValPair1[0] === obj2Entries[idx][0] &&
      keyValPair1[1] === obj2Entries[idx][1]
  );
};

console.log(objectsEqual({ a: "foo" }, { a: "foo" })); // true
console.log(objectsEqual({ a: "foo", b: "bar" }, { a: "foo" })); // false
console.log(objectsEqual({ a: "foo", b: "bar" }, { a: "foo", b: "bar" })); // true
console.log(objectsEqual({ a: "foo", b: "bar" }, { a: "foo", b: "bars" })); // false
console.log(objectsEqual({}, {})); // true
console.log(objectsEqual({ a: "foo", b: undefined }, { a: "foo", c: 1 })); // false
