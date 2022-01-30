function Ninja() {
  this.swung = true;
}

let ninja = new Ninja();

Ninja.prototype = {
  swingSword: function () {
    return this.swung;
  },
};

console.log(ninja.swingSword());

// TypeError cannot invoke undefined
// As on line 7 we change what object is referenced
// by the Ninja.prototype property
// Hence the change is not reflected in the already made
// ninja object
