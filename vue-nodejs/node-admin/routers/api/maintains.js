module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const Maintain = require('../../models/Maintains')
    const passport = require('passport')


    router.get('/',passport.authenticate('jwt',{session: false}),(req,res) => {
        let startTime = req.query.startTime
        let endTime = req.query.endTime
        if (startTime && endTime) {
            Maintain.find({maintenanceDate: {$gte: startTime, $lt: endTime}}).then(maintain=> {
                if (!maintain) {
                    return res.status(404).json('没有任何信息')
                }
                res.json(maintain)
            })
        }else {
            Maintain.find().then(maintain=> {
                if (!maintain) {
                    return res.status(404).json('没有任何信息')
                }
                res.json(maintain)
            })
        }
    })

    router.post('/maintainAdd',passport.authenticate('jwt',{session:false}),(req,res) => {
        const maintainFields = {}
        if (req.body.name) maintainFields.name = req.body.name
        if (req.body.model) maintainFields.model = req.body.model
        if (req.body.content) maintainFields.content = req.body.content
        if (req.body.cost) maintainFields.cost = req.body.cost
        if (req.body.maintenanceDate) maintainFields.maintenanceDate = req.body.maintenanceDate
        new Maintain(maintainFields).save().then(maintain=>{
            res.json(maintain)
        })
    })

    router.post('/maintainEdit', passport.authenticate('jwt', {session:false}),(req,res) => {
        const maintainFields = {}
        if (req.body.name) maintainFields.name = req.body.name
        if (req.body.model) maintainFields.model = req.body.model
        if (req.body.content) maintainFields.content = req.body.content
        if (req.body.cost) maintainFields.cost = req.body.cost
        if (req.body.maintenanceDate) maintainFields.maintenanceDate = req.body.maintenanceDate
        Maintain.findByIdAndUpdate(
            {_id:req.body._id},
            {$set:maintainFields},
            {new:true}
        ).then(maintain => res.json(maintain))
    })

    router.post('/maintainDel/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
        let id = req.params.id
        Maintain.findOneAndDelete({_id:id}).then(Maintain=>{
            Maintain.save().then(Maintain=>res.json(Maintain))
        }).catch(err=>res.status(404).json('删除成功'))
    })

    app.use('/api/maintains', router)
}
