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

//Promise race will execute the first promise that is resolved
Promise.race([sumSlow(5), sumFast(3)]).then((values) => {
  console.log(values);
}).catch(console.log);
