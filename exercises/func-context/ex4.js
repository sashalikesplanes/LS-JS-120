function myFilter(array, func, filter) {
  let result = [];

  array.forEach(function (value) {
    if (func.call(filter, value)) {
      result.push(value);
    }
  });

  return result;
}

let filter = {
  allowedValues: [5, 6, 9],
};

let test = myFilter(
  [2, 1, 3, 4, 5, 6, 9, 12],
  function (val) {
    return this.allowedValues.indexOf(val) >= 0;
  },
  filter
); // returns [5, 6, 9]

console.log(test);
