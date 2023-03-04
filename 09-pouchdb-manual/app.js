// PouchDB Training
console.log('PouchDB Training Started');

// 1- Create the database
// Name: messages
let db = new PouchDB('messages');
let remoteCouch = false;

// Object to save in database
let message = {
  _id: new Date().toISOString(),
  user: 'spiderman',
  message: 'My aunt made some very good pancakes',
  synchronized: false,
};

// 2- Insert into the database
(async () => {
    let { doc_count } = await db.info()
    
    if(doc_count > 0) return console.log('Database already has 5 messages');

    while(doc_count < 5){
        message._id = message._id + doc_count;
        db.put(message)
        .then(console.log('Message inserted!'))
        .catch(console.log);

        doc_count++;
    }
})();


// 3- Read all messages offline
//get all messages in console
db.allDocs({ include_docs: true, descending: false }).then( doc => console.log(doc.row)).catch(console.log);



// 4- Change the 'synchronized' value of all objects
// db.allDocs({include_docs: true, descending: false}).then( docs => {

//     console.log(docs);
//     docs.rows.forEach( row => {
//         let doc = row.doc;

//         doc.synchronized = true
        
//         db.put(doc);
//     });
// });

// 5- Delete all records one by one, evaluating
// which ones are synchronized
// You should comment out all the code that updates
// the synchronization field.

db.allDocs({include_docs: true, descending: false}).then( docs => {

    docs.rows.forEach( row => {
        let doc = row.doc;

        if(doc.synchronized){
            db.remove(doc);
        }
    });
});