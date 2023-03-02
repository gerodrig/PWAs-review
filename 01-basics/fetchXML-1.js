let request = new XMLHttpRequest();

request.open('GET', 'https://reqres.in/api/users', true);
request.send();

request.onreadystatechange = (state) => {
    if (request.readyState === 4) {
        let response = request.response;
        let parsedResponse = JSON.parse(response);
        console.log(parsedResponse);
    }
};


//