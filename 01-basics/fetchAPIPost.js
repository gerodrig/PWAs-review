// POST REQUEST
// URL 'https://reqres.in/api/users'
const URL = 'https://reqres.in/api/users';

let user = {
  name: 'Benito',
  age: '7',
};

// fetch(URL, {
//   method: 'POST',
//   body: JSON.stringify(user),
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })
//   .then((response) => response.json())
//   .then(console.log)
//   .catch(console.error);

//autoinvoqued function
(async () => {
  const response = await fetch(URL, {
  method: 'POST',
  body: JSON.stringify(user),
  headers: {
    'Content-Type': 'application/json',
  },
});

try {

  const data = await response.json();
  console.log(data);
} catch (error) {
  console.log('Error: in request')
  console.log(error);
}
})();
