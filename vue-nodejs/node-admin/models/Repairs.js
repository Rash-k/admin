const mongoose = require('mongoose')

const scheme = new mongoose.Schema({
    name: {
        type: String
    },
    model: {
        type: String
    },
    content: {
        type: String
    },
    cost: {
        type: Number
    },
    repairDate: {
        type: Date
    }
})


module.exports=mongoose.model('Repair',scheme)
