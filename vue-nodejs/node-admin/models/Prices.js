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
    amount:{
        type:Number,
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
    priceDate:{
        type:Date,
    },
    priceStatus:{
        type:String,
    },
    priceFailReason:{
        type:String,
    },
})


module.exports=mongoose.model('Price',scheme)
