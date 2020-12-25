const express = require('express');
const app = express();

// Accessing the environment variables
require('dotenv').config()

//Importing route
const weartherRoute = require('./routes/weather')

// Setting App-level Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

// Setting View Engine 
app.set('view engine', 'ejs');

// Routing Middleware
app.use('/', weartherRoute);


const PORT = process.env.PORT || 7090;
app.listen(PORT, () => {
    console.log(`Server spinning on ${PORT}`);
});
