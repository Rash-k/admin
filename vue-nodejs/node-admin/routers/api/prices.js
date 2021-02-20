
module.exports= app =>{
    const express = require('express')
    const router = express.Router()
    const Price = require('../../models/Prices')
    const passport = require('passport')


    router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
        let priceStatus = req.query.priceStatus
        if (!priceStatus) {
            Price.find().then(Price=>{
                if(!Price){
                    return res.status(404).json('没有任何信息')
                }
                res.json(Price)
            }).catch(err=>res.status(404).json(err))
        }else {
            Price.find({priceStatus:priceStatus}).then(Price=>{
                if(!Price){
                    return res.status(404).json('没有任何信息')
                }
                res.json(Price)
            }).catch(err=>res.status(404).json(err))
        }
    })


    router.post('/pricesAdd',passport.authenticate('jwt',{session:false}),(req,res)=>{
        const PriceFields = {}
        if(req.body.name) PriceFields.name = req.body.name
        if(req.body.sex) PriceFields.sex = req.body.sex
        if(req.body.age) PriceFields.age = req.body.age
        if(req.body.amount) PriceFields.amount = req.body.amount
        if(req.body.model) PriceFields.model = req.body.model
        if(req.body.payWay) PriceFields.payWay = req.body.payWay
        if(req.body.telephone) PriceFields.telephone = req.body.telephone
        if(req.body.address) PriceFields.address = req.body.address
        if(req.body.priceDate) PriceFields.priceDate = req.body.priceDate
        if(req.body.priceStatus) PriceFields.priceStatus = req.body.priceStatus
        if(req.body.priceFailReason) PriceFields.priceFailReason = req.body.priceFailReason
        new Price(PriceFields).save().then(Price=>{
            res.json(Price)
        })
    })


    router.post('/pricesDel/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
        let id = req.params.id
        Price.findOneAndDelete({_id:id}).then(Price=>{
            Price.save().then(Price=>res.json(Price))
        }).catch(err=>res.status(404).json('删除成功'))
    })

    router.post('/changeStatus',passport.authenticate('jwt',{session:false}),(req,res)=>{
        let _id = req.body._id
        Price.findOneAndUpdate(
            {_id:_id},
            {priceStatus: '1', priceFailReason: ''},
            {new:true}
        ).then(Price=>res.json(Price))
    })

    router.post('/changeStatusFail',passport.authenticate('jwt',{session:false}),(req,res)=>{
        let _id = req.body._id
        let priceFailReason = req.body.priceFailReason
        Price.findOneAndUpdate(
            {_id:_id},
            {priceStatus: '3', priceFailReason: priceFailReason},
            {new:true}
        ).then(Price=>res.json(Price))
    })

    app.use('/api/prices',router)
}
