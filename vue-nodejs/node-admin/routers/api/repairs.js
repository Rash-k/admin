//客户接口
module.exports= app =>{
    const express = require('express')
    const router = express.Router()
    const Repair = require('../../models/Repairs')
    const passport = require('passport')



    //获取供应商信息
    router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
        Repair.find().then(Repair=>{
            if(!Repair){
                return res.status(404).json('没有任何信息')
            }
            res.json(Repair)
        }).catch(err=>res.status(404).json(err))
    })

    // 添加客户信息
    router.post('/RepairsAdd',passport.authenticate('jwt',{session:false}),(req,res)=>{
        const RepairFields = {}
        if(req.body.RepairName) RepairFields.RepairName = req.body.RepairName
        if(req.body.vehicleName) RepairFields.vehicleName = req.body.vehicleName
        if(req.body.modelCode) RepairFields.modelCode = req.body.modelCode
        if(req.body.contacts) RepairFields.contacts = req.body.contacts
        if(req.body.telephone) RepairFields.telephone = req.body.telephone
        new Repair(RepairFields).save().then(Repair=>{
            res.json(Repair)
        })
    })
    //删除信息
    router.post('/RepairsDelete/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
        Repair.findOneAndDelete({_id:req.params.id}).then(Repair=>{
            Repair.save().then(Repair=>res.json(Repair))
        }).catch(err=>res.status(404).json('删除成功'))
    })

    app.use('/api/repairs',router)
}
