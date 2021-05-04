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
        {path:'/customerManage',name:'客户管理',component:CustomerManage},
        {path:'/customerPrice',name:'订单管理',component:CustomerPrice},
        {path:'/maintainService',name:'保养管理',component:MaintainService},
        {path:'/repairService',name:'维修管理',component:RepairService},
        {path:'/complaintService',name:'投诉管理',component:ComplaintService}
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
