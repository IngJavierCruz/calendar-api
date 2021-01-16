const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validateJwt = ( req = request, res = response, next ) => {

    const token = req.header('x-jwt');
    
    if (!token) {
        return res.status(401).json({
            ok: false,
            error: {
                msg: 'Jwt not found'
            }
        });
    }

    try {
        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
    
        
        const { uid, name } = payload;
        req.uid = uid;
        req.name = name;
      
    } catch (err) {

        console.log(err);
        return res.status(401).json({
            ok: false,
            error: {
                msg: 'Jwt not valid'
            }
        });
    }
    next();

}

module.exports = {
    validateJwt
}