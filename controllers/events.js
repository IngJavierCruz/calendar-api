const { response, request } = require('express');
const Event = require('../models/Event');


const getEvents = async(req = request, res = response) => {
    
    try {
        const events = await Event.find().populate('user', 'name');
    
        return res.status(200).json({
            ok: true,
            msg: 'Events get succesfull',
            data: events
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error: {
                msg: 'Error to save'
            }
        })
    }

}


const createEvent = async(req = request, res = response) => {

    const event = new Event( req.body );

    try {

        event.user = req.uid;
        const eventSaved = await event.save();

        return res.status(201).json({
            ok: true,
            msg: 'Event created',
            data: eventSaved
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error: {
                msg: 'Error to save'
            }
        });
    }
    
}


const updateEvent = async(req = request, res = response) => {
    
    const eventId = req.params.id;

    try {
        
        const event = await Event.findById( eventId );
        const { uid } = req;

        if (!event) {
            return res.status(404).json({
                ok: false,
                msj: 'Event not found',
                data: event
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                error: {
                    msj: 'You do not have privileges to edit this event',
                }
            });
        }
        

        const eventToUpdate = {
            ...req.body,
            user: uid
        };

        const eventUpdated = await Event.findByIdAndUpdate(eventId, eventToUpdate, { new: true });

        return res.status(200).json({
            ok:true,
            msj: 'Update sucess',
            data: eventUpdated
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error: {
                msg: 'Error to save'
            }
        });
    }
}


const deleteEvent = async(req = request, res = response) => {
    
    const eventId = req.params.id

    try {

        const { uid } = req;
        const event = await Event.findById( eventId );

        if (!event) {
            return res.status(404).json({
                ok:false,
                msj: 'Event not found',
                data: event
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok:false,
                error: {
                    msj: 'You do not have privileges to delete this event',
                }
            });
        }

        await Event.findByIdAndDelete( eventId );

        return res.status(200).json({
            ok:true,
            msj: 'Event deleted',
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error: {
                msg: 'Error to delete'
            }
        });
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}


