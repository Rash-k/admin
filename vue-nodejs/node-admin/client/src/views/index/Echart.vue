<template>
  <div style="height: 100%" ref="echart">
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: "Echart",
  props:{
    chartData:{
      type:Object,
      default(){
        return{
          xData:[],
          series:{}
        }
      }
    },
    // 是否需要坐标轴
    isAxisChart:{
      type: Boolean,
      default: true
    }
  },
  computed:{
    options(){
      return this.isAxisChart ? this.axisOption:this.normalOption
    },
  },
  watch:{
    chartData: {
      deep:true,
      handler:function () {
        this.initChart()
      },

    },
  },
  data(){
    return {
      echart:null,
      //有坐标轴
      axisOption:{
        // 设置顶部圆点
        legend: {
          textStyle: {
            color: '#333'
          }
        },
        // 设置偏移量
        grid: {
          left: '20%'
        },
        // 设置悬浮气泡框
        tooltip: {
          trigger: 'axis'
        },
        // 图标X轴数据
        xAxis:
            {
              type: 'category',
              data: [],
              axisLine: {
                lineStyle: {
                  color: '#17b3a3'
                }
              },
              axisLabel: { color: '#333' }
            },
        // 图标 y 轴数据
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#17b3a3'
              }
            }
          }],
        color: [
          '#2ec7c9',
          '#b6a2de',
          '#5ab1ef',
          '#ffb980',
          '#d87a80',
          '#8d98b3',
          '#e5cf0d',
          '#97b552',
          '#95706d',
          '#dc69aa',
          '#07a2a4',
          '#9a7fd1',
          '#588dd5',
          '#f5994e',
          '#c05050',
          '#59678c',
          '#c9ab00',
          '#7eb00a',
          '#6f5553',
          '#c14089'
        ],
        // 定义图标类型（柱状图、折线图等）
        series: []
      },
      //没有坐标轴
      normalOption:{
        tooltip: {
          trigger: 'item'
        },
        color: [
          '#0f78f4',
          '#dd536b',
          '#9462e5',
          '#a6a6a6',
          '#e1bb22',
          '#39c362',
          '#3ed1cf'
        ],
        series:[]
      }
    }
  },
  methods:{
    initChart(){
      this.initChartData();
      if (this.echart){
        this.echart.setOption(this.options)
      }else {
        this.echart = echarts.init(this.$refs.echart);
        this.echart.setOption(this.options);
      }
    },
    initChartData(){
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData;
        this.axisOption.series = this.chartData.series
      }else {
        this.normalOption.series = this.chartData.series
      }
    },
    //图表自适应
    resizeChat(){
      this.echart ? this.echart.resize() : '';
    }
  },
  mounted(){
    //监听事件
    window.addEventListener('resize',this.resizeChat);
  },
  destroy(){
    //销毁事件避免内存泄漏
    window.removeEventListener('resize',this.resizeChat);
  }
}
</script>
<style scoped>
</style>
