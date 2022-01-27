let noPrototype = Object.create(null);

console.log(Object.getPrototypeOf(noPrototype) === null);
