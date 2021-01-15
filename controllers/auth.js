const { response, request } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jw');

const newUser = async(req = request, res = response) => {

    const { email,password } = req.body;

    try {
        let user = await User.findOne({ email });
        
        if (user) {
            return res.status(400).json({
                ok: false,
                error: {
                    msg: 'User already exists with that email'
                },
            });
        }
        
        user = new User(req.body);
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );


        await user.save();
        const token = await generateJWT(user.id, user.name);

        return res.status(200).json({
            ok: true,
            msg: 'register',
            data: { 
                uid: user.id,
                name: user.name,
                email: user.email,
                token
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            error: {
                msg: 'Error to save'
            },
        })
    }

};


const login = async(req = request, res = response) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                error: {
                    msg: 'User no exists with that email'
                },
            });
        }

        const validPassword = bcrypt.compareSync( password, user.password );

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                error: {
                    msg: 'Password incorrect'
                },
            });
        }

        const token = await generateJWT(user.id, user.name);
        return res.status(200).json({
            ok: true,
            msg: 'Jwt create success',
            data: { 
                uid: user.id,
                name: user.name,
                email: user.email,
                token
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            error: {
                msg: 'Error to login'
            },
        })
    }

    

};


const refresh = async(req = request, res = response) => {

    const { uid, name } = req;
    
    const token = await generateJWT( uid, name );
    
    res.status(202).json({
        ok: true,
        msg: 'refresh success',
        token
    });

};

module.exports = {
    newUser,
    login,
    refresh
}