// Utils for the service worker to save in PouchDB
const db = new PouchDB('messages');


function saveMessage( message ) {

    message._id = new Date().toISOString();

    return db.put( message ).then( () => {

        self.registration.sync.register('new-post');

        const newResp = { ok: true, offline: true };

        return new Response( JSON.stringify(newResp) );

    });

}


// Post message to the api
function postMessages() {

    const posts = [];

    return db.allDocs({ include_docs: true }).then( docs => {


        docs.rows.forEach( row => {

            const doc = row.doc;

            const fetchPromise =  fetch('api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( doc )
                }).then( res => {

                    return db.remove( doc );

                });
            
            posts.push( fetchPromise );


        }); // Foreach end

        return Promise.all( posts );

    });





}

