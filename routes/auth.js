/*
    Routes users 
    host + /api/auth
*/

const { Router } = require('express');
const { newUser, login, refresh } = require('../controllers/auth');

const router = Router();
// VALIDATORS
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJwt } = require('../middlewares/validate-jwt');

router.post(
    '/new', 
    [ // MIDDLEWARES
        check('name')
            .not().isEmpty().withMessage('The name is required')
            .isLength({ min: 5 }).withMessage('The name must be at least 5 chars long'),

        check('email','The email is required').isEmail(),

        check('password')
            .not().isEmpty().withMessage('Password is required')
            .isLength({ min: 8 }).withMessage('The name must be at least 8 chars long')   
            .matches(/\d/).withMessage('The password must contain a number'),
        validateFields
    ], 
    newUser );



router.post(
    '/login',
    [ // MIDDLEWARES
        check('email','The email is required').isEmail(),

        check('password')
            .not().isEmpty().withMessage('Password is required')
            .isLength({ min: 8 }).withMessage('The name must be at least 8 chars long')   
            .matches(/\d/).withMessage('The password must contain a number'),
        validateFields
    ], 
    login );




router.get('/refresh', validateJwt, refresh );



module.exports = router;