const mongoose = require('mongoose')

const scheme = new mongoose.Schema({
    name:{
        type:String,
    },
    sex:{
        type:String,
    },
    age:{
        type:String,
    },
    model:{
        type:String,
    },
    telephone:{
        type:String,
    },
    address:{
        type:String,
    },
    reserveDate:{
        type:Date,
    },
    state:{
        type:String,
    },
    cancelReason:{
        type:String,
    },
})


module.exports=mongoose.model('Price',scheme)
