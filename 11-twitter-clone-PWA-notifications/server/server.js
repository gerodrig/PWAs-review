const express = require('express');

const path = require('path');

const app = express();

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

//declare body-parser
const bodyParser = require('body-parser');

app.use(bodyParser.json()); //for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); //for parsing application/x-www-form-urlencoded


//enable cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Public folder
app.use(express.static(publicPath));

//Routes
const routes = require('./routes');
app.use('/api', routes);


//Listen
app.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Server running on port ${port}`);
});