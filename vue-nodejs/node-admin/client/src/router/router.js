import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index.vue'
import Register from '../views/login/Register.vue'
import Notfound from '../views/404.vue'
import Login from '../views/login/Login.vue'
import Home from '../views/index/Home.vue'
// import InfoShow from '../views/information/InfoShow.vue'
// import FundList from '../views/stock/WarehouseManage.vue'
import CustomerManage from "@/views/customer/CustomerManage";
import CustomerPrice from "@/views/price/CustomerPrice";
import MaintainService from "@/views/maintain/MaintainService";
import RepairService from "@/views/repair/RepairService";
import ComplaintService from "@/views/complaint/ComplaintService";
import DriveAppointment from "../views/customer/DriveAppointment";
import CancelReservation from "../views/price/CancelReservation";
import DealPrice from "../views/price/DealPrice";
import AppointmentDive from "../views/customer/AppointmentDive";
import MyAppointment from "../views/customer/MyAppointment";
import SubmitComplaint from "../views/complaint/SubmitComplaint";
import MyComplaint from "../views/complaint/MyComplaint";
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect:'/index'
    },
    {
      path: '/index',
      // name: 'index',
      component: Index,
      children:[
        {path:'',component:Home},
        {path:'/home',name:'首页',component:Home},
        // {path:'/infoshow',name:'infoshow',component:InfoShow},
        // {path:'/warehouseManage',name:'warehouseManage',component:FundList},
        {path:'/customerManage',name:'客户登记',component:CustomerManage},
        {path:'/driveAppointment',name:'客户试驾预约',component:DriveAppointment},
        {path:'/customerPrice',name:'订购管理',component:CustomerPrice},
        {path:'/cancelReservation',name:'预定取消管理',component:CancelReservation},
        {path:'/dealPrice',name:'成交管理',component:DealPrice},
        {path:'/maintainService',name:'保养管理',component:MaintainService},
        {path:'/repairService',name:'维修管理',component:RepairService},
        {path:'/complaintService',name:'投诉管理',component:ComplaintService},
        {path:'/appointmentDive',name:'预约试驾',component:AppointmentDive},
        {path:'/myAppointment',name:'我的试驾',component:MyAppointment},
        {path:'/submitComplaint',name:'提交投诉',component:SubmitComplaint},
        {path:'/myComplaint',name:'我的投诉',component:MyComplaint}

      ]
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      name: '/404',
      component: Notfound
    },
  ]
})


//路由守卫
router.beforeEach((to,from,next)=>{
  const isLogin = localStorage.eleToken ? true : false
  if(to.path=='/login' || to.path=='/register'){
    next();
  }else{
    isLogin ? next() : next('/login')
  }
})

export default router
