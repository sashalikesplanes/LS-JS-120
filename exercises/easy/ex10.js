class Pet {
  constructor(type, name) {
    this.type = type;
    this.name = name;
  }

  info() {
    return `a ${this.type} named ${this.name}`;
  }
}

class Owner {
  constructor(name) {
    this.name = name;
    this.pets = [];
  }

  addPet(pet) {
    this.pets.push(pet);
  }

  getPets() {
    this.pets.forEach((pet) => console.log(pet.info()));
  }

  numberOfPets() {
    return this.pets.length;
  }
}

class Shelter {
  constructor() {
    this.adopters = [];
  }
  adopt(owner, pet) {
    owner.addPet(pet);
    if (!this.adopters.includes(owner)) {
      this.adopters.push(owner);
    }
  }

  printAdoptions() {
    this.adopters.forEach((owner) => {
      console.log(`${owner.name} has adopted the following pets:`);
      owner.getPets();
      console.log();
    });
  }
}

let butterscotch = new Pet("cat", "Butterscotch");
let pudding = new Pet("cat", "Pudding");
let darwin = new Pet("bearded dragon", "Darwin");
let kennedy = new Pet("dog", "Kennedy");
let sweetie = new Pet("parakeet", "Sweetie Pie");
let molly = new Pet("dog", "Molly");
let chester = new Pet("fish", "Chester");

let phanson = new Owner("P Hanson");
let bholmes = new Owner("B Holmes");

let shelter = new Shelter();
shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.printAdoptions();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);
