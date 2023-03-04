// create the space in DB

let request = window.indexedDB.open("MyDB", 1); //1 refers to version

//updates when the DB is created or version is updated

request.onupgradeneeded = event => {
    
    console.log("DB created or version updated");

    let db = event.target.result;

    db.createObjectStore('heroes', {keyPath: 'id'});
};

//Error handling

request.onerror = event => {
    console.log("DB error: ", event.target.error);
};

//Insert data

request.onsuccess = event => {

    let db = event.target.result;

    let heroesData = [
        {id: '111', heroe: 'Spiderman', message: 'Spider sense'},
        {id: '222', heroe: 'Batman', message: 'I am Batman'},
        {id: '333', heroe: 'Superman', message: 'I am superman'},
        {id: '444', heroe: 'Ironman', message: 'I am using my new suit named Mark 50'},
    ];

    let heroesTransaction = db.transaction('heroes', 'readwrite');

    heroesTransaction.onerror = event => {
        console.log("Transaction error: ", event.target.error);
    }

    //Reports when the transaction is complete
    heroesTransaction.oncomplete = event => {
        console.log("Transaction completed", event);
    }

    let heroesObjectStore = heroesTransaction.objectStore('heroes');

    for(let hero of heroesData){
        heroesObjectStore.add(hero);
    }

    heroesObjectStore.onsuccess = event => {
        console.log("Data added successfully");
    }

};