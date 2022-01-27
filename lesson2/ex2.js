let bar = { fizz: 1 };
let foo = Object.create(bar);

for (let property in foo) {
  console.log(`${property}: ${foo[property]}`);
}

Object.keys(foo).forEach((property) => {
  console.log(`${property}: ${foo[property]}`);
});
