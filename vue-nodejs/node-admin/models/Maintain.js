const mongoose = require('mongoose')
const scheme = new mongoose.Schema({
    name: {
        type: String
    },
    model: {
        type: String
    },
    kilometre: {
        type: Number
    },
    cost: {
        type: Number
    },
    maintenanceDate: {
        type: Date
    }
})

module.exports = mongoose.model('Maintain', scheme)
