
//?PROMISE EXAMPLE
const sumOne = (number) => {
  return new Promise((resolve, reject) => {
    if (number >= 7) {
      reject('number is greater than 7');
      return;
    }
    setTimeout(() => {
      resolve(number + 1);
    }, 800);
  });
};

sumOne(5)
  .then((newValue) => {
    console.log(newValue);
    return sumOne(newValue);
  })
  .then((newValue2) => {
    console.log(newValue2);
    return sumOne(newValue2);
  })
  .then((newValue3) => {
    console.log(newValue3);
    return sumOne(newValue3);
  })
  .catch((error) => {
    console.log(error);
  });
