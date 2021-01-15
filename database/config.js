const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        mongoose.connect(process.env.DB_CONNECT, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB ONLINNE');
    } catch (err) {
        console.error(err);
        throw new Error('Failed init database');
    }
}

module.exports = {
    dbConnection
}

