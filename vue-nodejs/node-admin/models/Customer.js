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
    telephone:{
        type:String,
    },
    address:{
        type:String,
    },
    model:{
        type:String
    },
    saleDate:{
        type:Date,
    },
    totalAmount:{
        type:String
    }
})


module.exports=mongoose.model('Customer',scheme)
