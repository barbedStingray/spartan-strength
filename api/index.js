const express = require('express');
const app = express();
require('dotenv').config();
// console.log('POSTGRES_URL_NO_SSL:', process.env.POSTGRES_URL_NO_SSL);
const path = require('path');
// require('./modules/pool.js'); // * path to pool.js

// const router variables here...
const exerciseRouter = require('./routes/exercise.router.js');

// MIDDLEWARE
app.use(express.json()); // axios requests

// EXPRESS ROUTES
app.use('/api/exercise', exerciseRouter);


// SERVE STATIC FILES
app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log('listening on port:', PORT);
});

module.exports = app;
