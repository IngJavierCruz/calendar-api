const jwt = require('jsonwebtoken');


const generateJWT = (uid, name) => {

    const payload = { uid, name };
    return new Promise(( resolve, reject ) => {

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: 12000
        }, (err, token) => {

            if (err) {
                reject('Error to generate token');
            }

            resolve(token);
            
        });

    });

};

module.exports = {
    generateJWT
}

