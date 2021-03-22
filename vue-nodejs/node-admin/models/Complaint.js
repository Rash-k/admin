const mongoose = require('mongoose')

const scheme = new mongoose.Schema({
    name:{
        type:String,
    },
    complaintModel:{
        type:String,
    },
    complaintReason:{
        type:String,
    },
    complaintDate:{
        type:Date,
    },
    telephone:{
        type:String,
    },
    treatmentResult:{
        type:String,
    },
    complaintStatus:{
        type:String
    }
})


module.exports=mongoose.model('Complaint',scheme)
