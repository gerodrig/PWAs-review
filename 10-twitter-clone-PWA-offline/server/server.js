const express = require('express');

const path = require('path');

const app = express();

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

//declare body-parser
const bodyParser = require('body-parser');

app.use(bodyParser.json()); //for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); //for parsing application/x-www-form-urlencoded

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