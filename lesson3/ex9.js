function Ninja() {
  this.swung = true;
}

let ninja = new Ninja();

Ninja.prototype.swingSword = function () {
  return this.swung;
};

console.log(ninja.swingSword());

// Logs true as the ninja object has a reference to the
// Ninja.prototype object
// Hence when Ninja.prototype is modified the change
// is reflected in the ninja object
