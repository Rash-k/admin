//客户接口
module.exports= app =>{
    const express = require('express')
    const router = express.Router()
    const Appointment = require('../../models/Appointment')
    const passport = require('passport')



    //获取全部客户信息
    router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
        let appointmentName = req.query.appointmentName
        if (!appointmentName) {
            Appointment.find().then(Appointment=>{
                if(!Appointment){
                    return res.status(404).json('没有任何信息')
                }
                res.json(Appointment)
            }).catch(err=>res.status(404).json(err))
        }else {
            Appointment.find({appointmentName:appointmentName}).then(Appointment=>{
                if(!Appointment){
                    return res.status(404).json('没有任何信息')
                }
                res.json(Appointment)
            }).catch(err=>res.status(404).json(err))
        }
    })

    //添加客户信息
    router.post('/appointmentAdd',passport.authenticate('jwt',{session:false}),(req,res)=>{
        const AppointmentFields = {}
        if(req.body.appointmentName) AppointmentFields.appointmentName = req.body.appointmentName
        if(req.body.appointmentModel) AppointmentFields.appointmentModel = req.body.appointmentModel
        if(req.body.telephone) AppointmentFields.telephone = req.body.telephone
        if(req.body.appointmentDate) AppointmentFields.appointmentDate = req.body.appointmentDate
        AppointmentFields.appointmentStatus = 0
        new Appointment(AppointmentFields).save().then(Appointment=>{
            res.json(Appointment)
        })
    })

    router.post('/cancel',passport.authenticate('jwt',{session:false}),(req,res)=>{
        let _id = req.body._id
        Appointment.findOneAndUpdate(
            {_id:_id},
            {appointmentStatus: 1},
            {new:true}
        ).then(Price=>res.json(Price))
    })


    app.use('/api/appointment',router)
}
