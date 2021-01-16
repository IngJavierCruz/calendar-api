const moment = require('moment');

const isDate = (date ) => !date ? false : moment( date ).isValid();

module.exports = {
    isDate
}