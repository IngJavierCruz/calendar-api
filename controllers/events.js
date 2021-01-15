const { response, request } = require('express');
const Event = require('../models/Event');


const getEvents = async(req = request, res = response) => {
    
}


const createEvent = async(req = request, res = response) => {

    return res.status(200).json({
        ok: true,
        msg: 'Event created',
        data: req.body
    });
    
}


const updateEvent = async(req = request, res = response) => {
    
}


const deleteEvent = async(req = request, res = response) => {
    
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}


