
module.exports= app =>{
    const express = require('express')
    const router = express.Router()
    const Complaint = require('../../models/Complaint')
    const passport = require('passport')


    router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
        let complaintStatus = req.query.complaintStatus
        if (!complaintStatus) {
            Complaint.find().then(Complaint=>{
                if(!Complaint){
                    return res.status(404).json('没有任何信息')
                }
                res.json(Complaint)
            }).catch(err=>res.status(404).json(err))
        }else {
            Complaint.find({complaintStatus:complaintStatus}).then(Complaint=>{
                if(!Complaint){
                    return res.status(404).json('没有任何信息')
                }
                res.json(Complaint)
            }).catch(err=>res.status(404).json(err))
        }
    })


    router.post('/complaintAdd',passport.authenticate('jwt',{session:false}),(req,res)=>{
        const ComplaintFields = {}
        if(req.body.name) ComplaintFields.name = req.body.name
        if(req.body.complaintModel) ComplaintFields.complaintModel = req.body.complaintModel
        if(req.body.complaintReason) ComplaintFields.complaintReason = req.body.complaintReason
        if(req.body.complaintDate) ComplaintFields.complaintDate = req.body.complaintDate
        if(req.body.telephone) ComplaintFields.telephone = req.body.telephone
        ComplaintFields.complaintStatus = 0
        new Complaint(ComplaintFields).save().then(Complaint=>{
            res.json(Complaint)
        })
    })

    router.post('/complaintsHandle',passport.authenticate('jwt',{session:false}),(req,res)=>{
        let _id = req.body._id
        let treatmentResult = req.body.treatmentResult
        Complaint.findOneAndUpdate(
            {_id:_id},
            {complaintStatus: 1, treatmentResult: treatmentResult},
            {new:true}
        ).then(Price=>res.json(Price))
    })


    router.post('/complaintsDel/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
        let id = req.params.id
        Complaint.findOneAndDelete({_id:id}).then(Complaint=>{
            Complaint.save().then(Complaint=>res.json(Complaint))
        }).catch(err=>res.status(404).json('删除成功'))
    })

    app.use('/api/complaints',router)
}
