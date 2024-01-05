const mongoose = require('mongoose');

var mongoURL = 'mongodb+srv://internetsoundseasy:Alphamon04@atlascluster.35hwcdo.mongodb.net/shopping4u';

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection;

connection.on('error', () => {
    console.log('Mongo DB Connection failed')
})

connection.on('connected', () => {
    console.log('Mongo DB Connection Sucessfull')
})

module.exports = mongoose;