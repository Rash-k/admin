<template>
    <header class="head-nav">
        <el-row>
<!--            <el-col :span='1' class="logo-container">-->
<!--              <el-button type="primary" icon="el-icon-menu" size="mini"></el-button>-->
<!--            </el-col>-->
          <el-col :span="6" class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item v-for="(item,index) in list" :key="index" :to="{path:item.path}">
                {{item.name}}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
            <el-col :span='6' class="user">
                <div class="userinfo">
                    <img src="../assets/img/userHead.jpg" class="avatar" alt="">
                    <div class="welcome">
                        <p class="welcomeText">欢迎</p>
                        <p class="welcomeAvatar">{{user.name}}</p>
                    </div>
                    <span class="username">
                        <el-dropdown trigger="click" @command="setDialogInfo">
                            <span class="el-dropdown-link"><i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="logout">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </span>
                </div>
            </el-col>
        </el-row>
    </header>
</template>

<script>
export default {
    name:'head-nav',
    data () {
      return {
        list:[]
      }
    },
    computed:{
        user(){
            return this.$store.getters.user
        }
    },
   watch:{
      $route(){
      this.bread();
      }
    },
    methods:{
      bread(){
        let matched = this.$route.matched.filter(item=>item.name);
        let first = matched[0];
        if(first&&first.name!=='首页'){    // 我在这里是判断的是name，渲染的是name，但是可以使用其他的字段
          matched = [{path:"/home",name:"首页"}].concat(matched);
        }
        this.list = matched;
      },

      // collapseMenu() {
      //   this.$store.commit('collapseMenu')
      // },
        setDialogInfo(cmdItem){
            switch(cmdItem){
                case "info":
                    this.showIndoList();
                    break;
                case "logout":
                    this.logout();
                    break;
            }
        },
        showIndoList(){
          this.$router.push('/infoshow')
        },
        logout(){
            //清除token
            localStorage.removeItem('eleToken')
            this.$store.dispatch('clearCurrentState')
            this.$router.push('/login')
        }
    },
      created() {
        this.bread();
      },
}
</script>

<style lang = "scss" scoped>
.head-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background: #DCDCDC;
  color: #fff;
  .logo-container {
    .el-button {
      margin-left: 10px;
      margin-top: 15px;
    }
  }
  .breadcrumb {
    margin-top: 20px;
    margin-left: 10px;
  }
  .user {
    line-height: 60px;
    text-align: right;
    float: right;
    padding-right: 10px;
    .userinfo {
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: middle;
        display: inline-block;
      }
      .welcome {
        display: inline-block;
        width: auto;
        vertical-align: middle;
        padding: 0 5px;
        .welcomeText {
          line-height: 20px;
          text-align: center;
          font-size: 12px;
          color: #696969;
        }
        .welcomeAvatar {
          line-height: 20px;
          text-align: center;
          color: #409eff;
          font-weight: bolder;
        }
      }
      .username {
        cursor: pointer;
        margin-right: 5px;
        .el-dropdown {
          color: #fff;
        }
      }
    }
  }
}
</style>
