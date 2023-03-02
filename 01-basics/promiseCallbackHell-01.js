// ?CALLBACK HELL EXAMPLE
const sumOne = (number, cb) => {
  if (number >= 7) {
    cb('number is greater than 7');
    return;
  }
  setTimeout(() => {
    cb(null, number + 1);
  }, 800);
};

console.log(
  sumOne(5, (error, newValue) => {
    if (error) {
      console.log(error);
      return;
    }
    sumOne(newValue, (error, newValue2) => {
      if (error) {
        console.log(error);
        return;
      }
      sumOne(newValue2, (error, newValue3) => {
        if (error) {
          console.log(error);
          return;
        }
        console.log(newValue3);
      });
    });
  })
);
