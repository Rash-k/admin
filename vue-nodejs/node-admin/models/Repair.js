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
    },
    mileage: {
        type: String
    }
})


module.exports=mongoose.model('Repair',scheme)
