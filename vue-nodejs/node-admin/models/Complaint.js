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
    complaintStatus:{
        type:Number
    }
})


module.exports=mongoose.model('Complaint',scheme)
