const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');

// PACKAGE ENVIROMENT VARIABLE
require('dotenv').config();


// CREATE SERVER
const app = express();

// DATABASE
dbConnection();

// CORS
app.use( cors() );
// DIRECTORY PUBLIC
app.use( express.static('public'));

// PARSE BODY
app.use( express.json() );

// ROUTES
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


app.listen( process.env.PORT, () => {
    console.log(`server listen... ${process.env.PORT}`);
});