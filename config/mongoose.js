const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/aurora_db');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in database connection'));

db.once('open', () => {
    console.log('Connection to Mongodb Successful.')
});

module.exports = db;