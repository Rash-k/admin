//客户接口
module.exports= app =>{
    const express = require('express')
    const router = express.Router()
    const Repair = require('../../models/Repair')
    const passport = require('passport')



    //获取供应商信息
    router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
        let startTime = req.query.startTime
        let endTime = req.query.endTime
        if (startTime && endTime) {
            Repair.find({repairDate: {$gte: startTime, $lt: endTime}}).then(Repair=> {
                if (!Repair) {
                    return res.status(404).json('没有任何信息')
                }
                res.json(Repair)
            })
        }else {
            Repair.find().then(Repair=> {
                if (!Repair) {
                    return res.status(404).json('没有任何信息')
                }
                res.json(Repair)
            })
        }
    })

    // 添加客户信息
    router.post('/repairsAdd',passport.authenticate('jwt',{session:false}),(req,res)=>{
        const RepairFields = {}
        if(req.body.name) RepairFields.name = req.body.name
        if(req.body.model) RepairFields.model = req.body.model
        if(req.body.content) RepairFields.content = req.body.content
        if(req.body.cost) RepairFields.cost = req.body.cost
        if(req.body.mileage) RepairFields.mileage = req.body.mileage
        if(req.body.repairDate) RepairFields.repairDate = req.body.repairDate
        new Repair(RepairFields).save().then(Repair=>{
            res.json(Repair)
        })
    })
    router.post('/repairsEdit', passport.authenticate('jwt', {session:false}),(req,res) => {
        const RepairFields = {}
        if (req.body.name) RepairFields.name = req.body.name
        if (req.body.model) RepairFields.model = req.body.model
        if (req.body.content) RepairFields.content = req.body.content
        if (req.body.cost) RepairFields.cost = req.body.cost
        if(req.body.mileage) RepairFields.mileage = req.body.mileage
        if (req.body.repairDate) RepairFields.repairDate = req.body.repairDate
        Repair.findByIdAndUpdate(
            {_id:req.body._id},
            {$set:RepairFields},
            {new:true}
        ).then(Repair => res.json(Repair))
    })
    //删除信息
    router.post('/repairsDelete/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
        Repair.findOneAndDelete({_id:req.params.id}).then(Repair=>{
            Repair.save().then(Repair=>res.json(Repair))
        }).catch(err=>res.status(404).json('删除成功'))
    })

    app.use('/' +
        'api/repairs',router)
}
