const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title for the activity'],
        trim: true
    },
    
    description: {
        type: String,
        required: [true, 'Please add a description']
    },

    location: {
        type: String,
        required: [true, 'Please add a location']
    },

    date: {
        type: Date,
        required: [true, 'Please add the date of the activity']
    },

    time: {
        type: String,
        required: [true, 'Please add the time of the activity']
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Activity', ActivitySchema);