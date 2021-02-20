const mongoose = require('mongoose')

const scheme = new mongoose.Schema({
    supplierName:{
        type:String,
    },
    vehicleName:{
        type:String,
    },
    modelCode:{
        type:String,
        required:true
    },
    contacts:{
        type:String,
        required:true
    },
    telephone:{
        type:String,
        required:true
    },
})


module.exports=mongoose.model('Supplier',scheme)
