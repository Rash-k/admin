const mongoose = require('mongoose')

const scheme = new mongoose.Schema({
    appointmentName: {
        type: String
    },
    appointmentModel: {
        type: String
    },
    telephone: {
        type: Number
    },
    appointmentDate: {
        type: Date
    },
    appointmentStatus: {
        type: Number
    }
})


module.exports=mongoose.model('Appointment',scheme)
