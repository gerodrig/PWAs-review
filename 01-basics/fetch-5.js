const URL = 'https://reqres.in/api/users/10';

// fetch(URL).then((response) => {
//   response
//     .clone()
//     .json()
//     .then((user) => console.log(user.data));
//   response
//     .clone()
//     .json()
//     .then((user) => console.log(user.data));
//   response.json().then((user) => console.log(user.data));
// }).catch((error) => console.log('Request error', error));


//autoinvoque function
(async()=>{

    try {
        const response = await fetch(URL);
        if(!response.ok) throw new Error('User not found');

        const {data} = await response.json();


      
          console.log(data);
    } catch (error) {
        console.log('Request error', error);
    }

})();
