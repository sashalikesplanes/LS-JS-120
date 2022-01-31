const Speed = {
  goFast() {
    console.log(`I'm a ${this.constructor.name} and going super fast!`);
  },
};

class Car {
  goSlow() {
    console.log(`I'm safe and driving slow.`);
  }
}

class Truck {
  goVerySlow() {
    console.log(`I'm a heavy truck and like going very slow.`);
  }
}

Object.assign(Car.prototype, Speed);
//Object.assign(Truck.prototype, Speed);

console.log("goFast" in new Car());
console.log("goFast" in new Truck());
let fastCar = new Car();
fastCar.goFast();
