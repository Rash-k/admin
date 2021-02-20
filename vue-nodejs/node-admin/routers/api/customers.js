//客户接口
module.exports= app =>{
    const express = require('express')
    const router = express.Router()
    const Customer = require('../../models/Customers')
    const passport = require('passport')



    //获取全部客户信息
    router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
        let isVip = req.query.isVip
        let name = req.query.name
        if (!name && !isVip) {
            Customer.find().then(customer=>{
                if(!customer){
                    return res.status(404).json('没有任何信息')
                }
                res.json(customer)
            }).catch(err=>res.status(404).json(err))
        }else if (!name){
            Customer.find({isVip:isVip}).then(customer=>{
                if(!customer){
                    return res.status(404).json('没有任何信息')
                }
                res.json(customer)
            }).catch(err=>res.status(404).json(err))
        }else if (!isVip) {
            Customer.find({name:name}).then(customer=>{
                if(!customer){
                    return res.status(404).json('没有任何信息')
                }
                res.json(customer)
            }).catch(err=>res.status(404).json(err))
        }else {
            Customer.find({name:name, isVip:isVip}).then(customer=>{
                if(!customer){
                    return res.status(404).json('没有任何信息')
                }
                res.json(customer)
            }).catch(err=>res.status(404).json(err))
        }
    })

    //添加客户信息
    router.post('/customerAdd',passport.authenticate('jwt',{session:false}),(req,res)=>{
        const customerFields = {}
        if(req.body.name) customerFields.name = req.body.name
        if(req.body.sex) customerFields.sex = req.body.sex
        if(req.body.age) customerFields.age = req.body.age
        if(req.body.telephone) customerFields.telephone = req.body.telephone
        if(req.body.address) customerFields.address = req.body.address
        if(req.body.model) customerFields.model = req.body.model
        if(req.body.saleDate) customerFields.saleDate = req.body.saleDate
        if(req.body.totalAmount) customerFields.totalAmount = req.body.totalAmount
        if(req.body.isVip) customerFields.isVip = req.body.isVip
        new Customer(customerFields).save().then(customer=>{
            res.json(customer)
        })
    })

    //修改客户信息
    router.post('/customerEdit', passport.authenticate('jwt', {session:false}),(req,res) => {
        const customerFields = {}
        if (req.body.name) customerFields.name = req.body.name
        if(req.body.sex) customerFields.sex = req.body.sex
        if(req.body.age) customerFields.age = req.body.age
        if(req.body.telephone) customerFields.telephone = req.body.telephone
        if(req.body.address) customerFields.address = req.body.address
        if(req.body.model) customerFields.model = req.body.model
        if(req.body.saleDate) customerFields.saleDate = req.body.saleDate
        if(req.body.totalAmount) customerFields.totalAmount = req.body.totalAmount
        if(req.body.isVip) customerFields.isVip = req.body.isVip
        Customer.findByIdAndUpdate(
            {_id:req.body._id},
            {$set:customerFields},
            {new:true}
            ).then(customer => res.json(customer))
    })

    app.use('/api/customers',router)
}
