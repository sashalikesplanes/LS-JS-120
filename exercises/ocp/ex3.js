class CircularQueue {
  constructor(size) {
    // Initialize an array to store the queue
    // Set the read and write pointers
    this.data = new Array(size);
    this.data.fill(null);

    this.size = size;
    this.writeIdx = 0;
    this.readIdx = 0;
  }

  enqueue(element) {
    // Write to the array
    // Update write pointer
    //  If location of write pointer is greater than size
    //    reset it to the start
    if (this.data[this.writeIdx] !== null) {
      this.readIdx = this.readIdx + 1 === this.size ? 0 : this.readIdx + 1;
    }
    // If element is rewritten we need to move write pointer
    this.data[this.writeIdx] = element;
    this.writeIdx = this.writeIdx + 1 === this.size ? 0 : this.writeIdx + 1;
  }

  dequeue() {
    // Read and store item at last read pointer of array
    // Replace item with null
    //  Update read pointer
    //   If location of write pointer is greater than size
    //      reset it to the start
    let readItem = this.data[this.readIdx];
    this.data[this.readIdx] = null;
    if (readItem !== null) {
      this.readIdx = this.readIdx + 1 === this.size ? 0 : this.readIdx + 1;
    }
    return readItem;
  }
}

let queue = new CircularQueue(3);
console.log(queue.dequeue() === null);

queue.enqueue(1);
console.log(queue.data);
queue.enqueue(2);
console.log(queue.data);
console.log(queue.dequeue() === 1);
console.log(queue.data);
queue.enqueue(3);
queue.enqueue(4);
console.log(queue.dequeue() === 2);

queue.enqueue(5);
queue.enqueue(6);
queue.enqueue(7);
console.log(queue.dequeue() === 5);
console.log(queue.dequeue() === 6);
console.log(queue.dequeue() === 7);
console.log(queue.dequeue() === null);

let anotherQueue = new CircularQueue(4);
console.log(anotherQueue.dequeue() === null);

anotherQueue.enqueue(1);
anotherQueue.enqueue(2);
console.log(anotherQueue.dequeue() === 1);

anotherQueue.enqueue(3);
anotherQueue.enqueue(4);
console.log(anotherQueue.dequeue() === 2);

anotherQueue.enqueue(5);
anotherQueue.enqueue(6);
anotherQueue.enqueue(7);
console.log(anotherQueue.dequeue() === 4);
console.log(anotherQueue.dequeue() === 5);
console.log(anotherQueue.dequeue() === 6);
console.log(anotherQueue.dequeue() === 7);
console.log(anotherQueue.dequeue() === null);
