//客户接口
module.exports= app =>{
    const express = require('express')
    const router = express.Router()
    const Supplier = require('../../models/Suppliers')
    const passport = require('passport')



    //获取供应商信息
    router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
        Supplier.find().then(supplier=>{
            if(!supplier){
                return res.status(404).json('没有任何信息')
            }
            res.json(supplier)
        }).catch(err=>res.status(404).json(err))
    })

    // 添加客户信息
    router.post('/suppliersAdd',passport.authenticate('jwt',{session:false}),(req,res)=>{
        const supplierFields = {}
        if(req.body.supplierName) supplierFields.supplierName = req.body.supplierName
        if(req.body.vehicleName) supplierFields.vehicleName = req.body.vehicleName
        if(req.body.modelCode) supplierFields.modelCode = req.body.modelCode
        if(req.body.contacts) supplierFields.contacts = req.body.contacts
        if(req.body.telephone) supplierFields.telephone = req.body.telephone
        new Supplier(supplierFields).save().then(supplier=>{
            res.json(supplier)
        })
    })
    //编辑信息
    router.post('/suppliersEdit/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
        const supplierFields = {}
        if(req.body.supplierName) supplierFields.supplierName = req.body.supplierName
        if(req.body.vehicleName) supplierFields.vehicleName = req.body.vehicleName
        if(req.body.modelCode) supplierFields.modelCode = req.body.modelCode
        if(req.body.contacts) supplierFields.contacts = req.body.contacts
        if(req.body.telephone) supplierFields.telephone = req.body.telephone
        Supplier.findOneAndUpdate(
            {_id:req.params.id},
            {$set:supplierFields},
            {new:true}
        ).then(supplier=>res.json(supplier))
    })
    //删除信息
    router.post('/suppliersDelete/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
        Supplier.findOneAndDelete({_id:req.params.id}).then(supplier=>{
            supplier.save().then(supplier=>res.json(supplier))
        }).catch(err=>res.status(404).json('删除成功'))
    })

    //获取单个信息
    router.get('/:supplierName',passport.authenticate('jwt',{session:false}),(req,res)=>{
        Supplier.find({supplierName:req.params.supplierName}).then(supplier=>{
            if(!supplier){
                return res.status(404).json('没有任何信息')
            }
            res.json(supplier)
        }).catch(err=>res.status(404).json(err))
    })

    app.use('/api/suppliers',router)
}
