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
                    children:[{path:'customerManage',icon: 's-check', name:'客户信息'}]
                },
              {
                    icon:'s-shop',
                    name:'订单管理',
                    path:'price',
                    children:[
                      {path:'customerPrice', icon: 's-goods', name:'客户订单'}
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

            ]
        }
    },
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
