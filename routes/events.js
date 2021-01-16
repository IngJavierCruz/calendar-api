/*
    Routes users 
    host + /api/events
*/

// VALIDATORS
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJwt } = require('../middlewares/validate-jwt');
const { isDate } = require('../helpers/isDate');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');

const { Router } = require('express');
const router = Router();

// ROUTES WITOUT JWT
// router.get('/', someAction );



// ROUTES WITH JWT
router.use( validateJwt );


// GET EVENTS
router.get('/', getEvents );


// SAVE EVENT
router.post(
    '/',
    [ // MIDDLEWARE
        check('title')
            .not().isEmpty().withMessage('The title is require')
            .isLength({ min: 3 }).withMessage('The title must be at least 3 chars long'),
        
        check('start')
            .not().isEmpty().withMessage('The date is require')
            .custom( isDate ).withMessage('The date not is valid'),
        
        check('end')
            .not().isEmpty().withMessage('The date is require')
            .custom( isDate ).withMessage('The date not is valid'),

        validateFields
    ], 
    createEvent );


// UPDATE EVENTS   
router.put(
    '/:id', 
    [ // MIDDLEWARE
        check('title')
            .not().isEmpty().withMessage('The title is require')
            .isLength({ min: 3 }).withMessage('The title must be at least 3 chars long'),
        
        check('start')
            .not().isEmpty().withMessage('The date is require')
            .custom( isDate ).withMessage('The date not is valid'),
        
        check('end')
            .not().isEmpty().withMessage('The date is require')
            .custom( isDate ).withMessage('The date not is valid'),

        validateFields
    ], 
    updateEvent );


// DELETE EVENTS
router.delete('/:id', deleteEvent );


module.exports = router;