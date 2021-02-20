<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover" style="margin-top: 5px">
        <div class="user">
          <img :src="userImg">
          <div class="userInfo">
            <p class="name">{{ user.name }}</p>
            <p class="access">{{ user.identity === 'manager'? '管理员' : '员工' }}</p>
          </div>
        </div>
        <div class="loginInfo">
          <p>上次登陆时间:<span>{{currentDate}}</span></p>
          <p>上次登录地点:<span>北京</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="height: 522px;margin-top: 20px">
        <el-table :data="tableData">
          <el-table-column
              show-overflow-tooltip
              v-for="(val,key) in tableLabel"
              :key="key"
              :prop="key"
              :label="val">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="num">
        <el-card shadow="hover" v-for="item in countData" :key="item.name"
                 :body-style="{display: 'flex',padding: 0}">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
          <div class="detail">
            <p class="num">￥ {{item.value}}</p>
            <p class="txt">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <el-card shadow="hover">
        <echart style="height: 280px" :chartData="echartData.order"></echart>
      </el-card>
      <div class="graph">
        <el-card shadow="hover">
          <echart style="height: 260px" :chartData="echartData.user"></echart>
        </el-card>
        <el-card shadow="hover">
          <echart style="height: 260px" :chartData="echartData.video"></echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import Echart from "@/views/index/Echart";
export default {
  name: "VolumeManage",
  components:{
    Echart
  },
  data(){
    return {
      userImg:require('../../assets/img/user-default.png'),
      countData:[
        {
          name:'今日支付订单',
          value: 1234,
          icon:'success',
          color:'#2ec7c9'
        },
        {
          name: '今日预定订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '今日未支付订单',
          value: 105,
          icon: 's-goods',
          color: '#5ab1ef'
        },
        {
          name: '本月支付订单',
          value: 7888,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '本月预定订单',
          value: 882,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '本月未支付订单',
          value: 1025,
          icon: 's-goods',
          color: '#5ab1ef'
        }
      ],
      //存储表格数据
      tableData:[],
      tableLabel: {
        name:'品牌',
        todayBuy:'今日销售辆数',
        monthBuy:'本日销售辆数',
        totalBuy:'总销售辆数'
      },
      //图表数据
      echartData:{
        order:{
          xData: [],
          series:[]
        },
        user:{
          xData: [],
          series:[]
        },
        video:{
          xData: [],
          series:[]
        }
      }
    }
  },
  methods:{
    getTableData(){
      this.loading = true
      this.$http.get('/volume/getData').then(
          res => {
            res =res.data;
            this.tableData = res.data.tableData;
            console.log(res.data);
            //订单折线图
            const order = res.data.orderData;
            this.echartData.order.xData = order.date;
            //第一步取出series中的name部分--键名
            let keyArray = Object.keys(order.data[0]);
            // console.log(keyArray);
            keyArray.forEach(key => {
              this.echartData.order.series.push({
                name:key === 'Vue' ? 'vue': key,
                data:order.data.map(item => item[key]),
                type:'line'
              })
            });
            // 用户柱状图
            this.echartData.user.xData = res.data.userData.map(item => item.date)
            this.echartData.user.series.push({
              name: '未到店用户',
              data: res.data.userData.map(item => item.new),
              type: 'bar'
            });
            this.echartData.user.series.push({
              name: '到店用户',
              data: res.data.userData.map(item => item.active),
              type: 'bar',
              barGap: 0
            });
            // 视频饼状图
            this.echartData.video.series.push({
              data: res.data.videoData,
              type: 'pie'
            })
          });
    },
    formatDate(cellValue) {
      if (cellValue == null || cellValue == "") return "";
      let date = new Date(cellValue)
      let year = date.getFullYear()
      let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
    }
  },
  created(){
    this.getTableData();
  },
  computed: {
    currentDate(){
      let time = window.localStorage.getItem('lastTime')
      console.log(time);
      return this.formatDate(Number(time))
    },
    user(){
      return this.$store.getters.user
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/Manage.scss";
</style>
