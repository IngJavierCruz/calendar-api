/*
    Routes users 
    host + /api/events
*/

// VALIDATORS
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJwt } = require('../middlewares/validate-jwt');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');

const { Router } = require('express');
const router = Router();

// ROUTES WITOUT JWT
// router.get('/', someAction );



// ROUTES WITH JWT
router.use( validateJwt );

router.get('/', getEvents );


router.post('/', createEvent );


router.put('/:id', updateEvent );


router.delete('/:id', deleteEvent );


module.exports = router;