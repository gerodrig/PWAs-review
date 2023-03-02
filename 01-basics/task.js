// Tarea sobre promesas y fetch
// Realice resoluciÃ³n de cada ejercicio,

// compruebe el resultado en la consola y posteriormente
// siga con el siguiente.

// Comente TODO el cÃ³digo del ejercicio anterior
// antes de continuar con el siguiente.

// ==============================================
// Ejercicio #1
// ==============================================
/*
 Realizar un llamado FETCH a la siguiente API
 https://swapi.dev/api/people/1/
 Imprima en consola el nombre y gÃ©nero de la persona.
*/

// ResoluciÃ³n de la tarea #1
(async () => {
    try {
        const response = await fetch('https://swapi.dev/api/people/1/');
    
        if(!response.ok) {
            throw new Error('Not found');
        }

        const {name, gender} = await response.json();
        console.log({name, gender});
        
    } catch (error) {
        console.log('Request error', error);
    }
})();



// ==============================================
// Ejercicio #2
// ==============================================
/*
 Similar al ejercicio anterior... haga un llamado a la misma api
 (puede reutilizar el cÃ³digo )
 https://swapi.dev/api/people/1/
 
 Pero con el nombre y el gÃ©nero, haga un posteo
 POST a: https://reqres.in/api/users

 Imprima en consola el objeto y asegÃºrese que tenga
 el ID y la fecha de creaciÃ³n del objeto
*/

// ResoluciÃ³n de la tarea #2
(async () => {
    try {
        const response = await fetch('https://swapi.dev/api/people/1/');
    
        if(!response.ok) {
            throw new Error('Not found');
        }

        const {name, gender} = await response.json();
        // console.log({name, gender});
        const submit = await fetch('https://reqres.in/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, gender})
        });

        const {createdAt, ...rest} = await submit.json();

        //change date format 

        console.log({...rest, createdAt: new Intl.DateTimeFormat('en-US', { dateStyle: "medium"}).format(new Date(createdAt))});
        
    } catch (error) {
        console.log('Request error', error);
    }
})();