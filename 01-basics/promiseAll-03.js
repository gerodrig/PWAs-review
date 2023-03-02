const sumSlow = (number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(number + 1);
    }, 800);
  });
};

const sumFast = (number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(number + 1);
    }, 300);
  });
};

// sumSlow(5).then(console.log);
// sumFast(3).then(console.log);

//Execute both promises at the same time> If one of them fails, the catch will be executed
Promise.all([sumSlow(5), sumFast(3)]).then((values) => {
  console.log(values);
});
