let request = fetch('https://reqres.in/api/users');

request
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    console.log(data.page);
    console.log(data.per_page);
  })
  .catch((error) => {
    console.log(error);
  });

//!copy all page from wikipedia
// fetch('https://en.wikipedia.org')
//   .then((response) => response.text())
//   .then((html) => {
//     document.open();
//     document.write(html);
//     document.close();
//   });
