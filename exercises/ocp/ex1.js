let foo = {
  name: "foo",
  ancestors() {
    let ancestors = [];
    let ancestor = Object.getPrototypeOf(this);
    while (ancestor !== null) {
      ancestors.push(ancestor.name);
      ancestor = Object.getPrototypeOf(ancestor);
    }
    return ancestors;
  },
};
let bar = Object.create(foo);
bar.name = "bar";
let baz = Object.create(bar);
baz.name = "baz";
let qux = Object.create(baz);
qux.name = "qux";

console.log(qux.ancestors()); // returns ['baz', 'bar', 'foo', 'Object.prototype']
console.log(baz.ancestors()); // returns ['bar', 'foo', 'Object.prototype']
console.log(bar.ancestors()); // returns ['foo', 'Object.prototype']
console.log(foo.ancestors()); // returns ['Object.prototype']
