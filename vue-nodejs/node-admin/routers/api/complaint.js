
module.exports= app =>{
    const express = require('express')
    const router = express.Router()
    const Complaint = require('../../models/Complaint')
    const passport = require('passport')


    router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
        let ComplaintStatus = req.query.ComplaintStatus
        if (!ComplaintStatus) {
            Complaint.find().then(Complaint=>{
                if(!Complaint){
                    return res.status(404).json('没有任何信息')
                }
                res.json(Complaint)
            }).catch(err=>res.status(404).json(err))
        }else {
            Complaint.find({ComplaintStatus:ComplaintStatus}).then(Complaint=>{
                if(!Complaint){
                    return res.status(404).json('没有任何信息')
                }
                res.json(Complaint)
            }).catch(err=>res.status(404).json(err))
        }
    })


    router.post('/ComplaintsAdd',passport.authenticate('jwt',{session:false}),(req,res)=>{
        const ComplaintFields = {}
        if(req.body.name) ComplaintFields.name = req.body.name
        if(req.body.sex) ComplaintFields.sex = req.body.sex
        if(req.body.age) ComplaintFields.age = req.body.age
        if(req.body.amount) ComplaintFields.amount = req.body.amount
        if(req.body.model) ComplaintFields.model = req.body.model
        if(req.body.payWay) ComplaintFields.payWay = req.body.payWay
        if(req.body.telephone) ComplaintFields.telephone = req.body.telephone
        if(req.body.address) ComplaintFields.address = req.body.address
        if(req.body.ComplaintDate) ComplaintFields.ComplaintDate = req.body.ComplaintDate
        if(req.body.ComplaintStatus) ComplaintFields.ComplaintStatus = req.body.ComplaintStatus
        if(req.body.ComplaintFailReason) ComplaintFields.ComplaintFailReason = req.body.ComplaintFailReason
        new Complaint(ComplaintFields).save().then(Complaint=>{
            res.json(Complaint)
        })
    })

    app.use('/api/Complaints',router)
}
