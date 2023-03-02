

const URL = 'not-found2.html';

(async() => {

    try {
        const response = await fetch(URL);
        
        const text = await response.text();

        if (!response.ok) {
            throw new Error('Not found');
        }

        let body = document.querySelector('body');
        body.innerHTML = text;

    } catch (error) {
        console.log('Request error', error);
    }
})();