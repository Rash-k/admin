<template>
    <el-row class="menu_page">
        <el-col>
            <el-menu
            class="el-menu-vertical-demo"
            background-color="#304156"
            text-color="#fff"
            active-text-color="#409eff">
            <h1 class="title">后台管理系统</h1>
            <router-link to='/home'>
                <el-menu-item index='0'>
                    <i class="el-icon-s-order"></i>
                    <span class="slot">首页</span>
                </el-menu-item>
            </router-link>
              <div v-if="user.identity === 'manager'">
                <template v-for="item in items">
                    <el-submenu v-if="item.children" :index='item.path' :key='item.path'>
                        <template slot="title">
                            <i :class="'el-icon-'+item.icon"></i>
                            <span slot="title">{{ item.name }}</span>
                        </template>
                        <router-link v-for="(citem,cindex) in item.children" :to='citem.path' :key="cindex">
                            <el-menu-item :index='citem.path'>
                                <i :class="'el-icon-'+citem.icon"></i>
                                <span slot="title">{{citem.name }}</span>
                            </el-menu-item>
                        </router-link>
                    </el-submenu>
                </template>
              </div>
              <div v-if="user.identity === 'emplyee'">
                <template v-for="item in itemsNew">
                  <el-submenu v-if="item.children" :index='item.path' :key='item.path'>
                    <template slot="title">
                      <i :class="'el-icon-'+item.icon"></i>
                      <span slot="title">{{ item.name }}</span>
                    </template>
                    <router-link v-for="(citem,cindex) in item.children" :to='citem.path' :key="cindex">
                      <el-menu-item :index='citem.path'>
                        <i :class="'el-icon-'+citem.icon"></i>
                        <span slot="title">{{citem.name }}</span>
                      </el-menu-item>
                    </router-link>
                  </el-submenu>
                </template>
              </div>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
export default {
    data(){
        return {
            items:[
                {
                    icon:'s-custom',
                    name:'客户管理',
                    path:'customer',
                    children:[{path:'customerManage',icon: 's-check', name:'购车客户登记'},
                      // {path:'customerManage',icon: 's-check', name:'意向客户登记'},
                      {path:'driveAppointment',icon: 's-check', name:'试驾客户预约'}]
                },
              {
                    icon:'s-shop',
                    name:'整车销售',
                    path:'price',
                    children:[
                      {path:'customerPrice', icon: 's-goods', name:'预定管理'},
                      {path:'dealPrice', icon: 's-goods', name:'成交管理'},
                      {path:'cancelReservation', icon: 's-goods', name:'预定取消管理'},
                    ]
              },
                // {
                //     icon:'delete-solid',
                //     name:'保险管理',
                //     path:'stock',
                //     children:[
                //       {path:'warehouseManage', icon: 's-help', name:'客户车辆保险'}
                // ]
                //   },
                {
                    icon:'upload',
                    name:'保养管理',
                    path:'maintain',
                    children:[
                      {path:'maintainService', icon: 's-grid', name:'保养服务'}
                    ]
                },
              {
                  icon:'upload',
                  name:'维修管理',
                  path:'repair',
                  children:[
                    {path:'repairService', icon: 's-tools', name:'维修服务'}
                  ]
              },
              {
                  icon:'upload',
                  name:'投诉管理',
                  path:'complaint',
                  children:[
                    {path:'complaintService', icon: 'warning', name:'投诉服务'}
                  ]
              },
                // {
                //     icon:'user-solid',
                //     name:'信息管理',
                //     path:'info',
                //     children:[{path:'infoshow',icon: 's-claim', name:'个人信息'}]
                // },

            ],
          itemsNew:[
            {
              icon:'s-custom',
              name:'试驾管理',
              path:'customer',
              children:[{path:'appointmentDive',icon: 's-check', name:'试驾预约'},
                        {path:'myAppointment',icon: 's-check', name:'我的预约'}]
            },
            {
              icon:'upload',
              name:'保养管理',
              path:'maintain',
              children:[
                {path:'maintainService', icon: 's-grid', name:'保养查询'}
              ]
            },
            {
              icon:'upload',
              name:'维修管理',
              path:'repair',
              children:[
                {path:'repairService', icon: 's-tools', name:'维修查询'}
              ]
            },
            {
              icon:'upload',
              name:'投诉管理',
              path:'complaint',
              children:[
                {path:'submitComplaint', icon: 'warning', name:'提交投诉'},
                {path:'complaintService', icon: 'warning', name:'我的投诉'}
              ]
            },
          ]
        }
    },
  computed:{
    user(){
      return this.$store.getters.user
    }
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
.menu_page {
  position: fixed;
  /*top: 71px;*/
  left: 0;
  //min-height: 100%;
  height: 100%;
  background-color: rgb(48,65,86);
  //z-index: 99;
  .title {
    text-align: center;
    line-height: 48px;
    font-size: 20px;
    color: white;
  }
}
.el-menu {
  height: 100%;
  border: none;
}
/*.fa-margin {*/
/*  margin-right: 5px;*/
/*}*/
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}

/*.hiddenDropdown,*/
/*.hiddenDropname {*/
/*  display: none;*/
/*}*/
a {
  text-decoration: none;
}
</style>
