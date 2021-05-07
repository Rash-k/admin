<template>
  <div class="table">
    <el-card class="box-card" style="margin-left: 10px">
      <div slot="header" class="clearfix">
        <span>试驾预约</span>
      </div>
      <el-form :model="operateForm" size="medium ">
        <el-form-item label="预约试驾车型" :label-width="formLabelWidth">
          <el-input v-model="operateForm.appointmentModel" autocomplete="off" placeholder="请输入车型"></el-input>
        </el-form-item>
        <el-form-item label="预约日期" :label-width="formLabelWidth">
          <el-date-picker
              v-model="operateForm.appointmentDate"
              type="date"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="operateForm.telephone" autocomplete="off" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center">
        <el-button type="primary" @click="determine()">预约</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { formatDate } from '../../utils/index'
export default {
    data(){
        return {
          formatDate,
          operateType: 'add',
          isShow:false,
          dialogVisible:false,
          operateForm: {},
          formLabelWidth: '100px',
          queryParams: {
            sex: undefined
          },
          loading: false,
            paginations:{
                page_index:1, //当前位于多少页
                total:0, //总数
                page_size:10,  //一页显示多少条
                page_sizes:[10,15,20], //每页显示多少条
                layout:'total,sizes,prev,pager,next,jumper' // 翻页属性
            },
            customerData:[],
            allCustomerData:[],
            fileterCustomerData:[],
        }
    },
    methods:{
      open() {
        this.$notify({
          message: '预约成功!',
          type: 'success'
        });
      },
      determine(){
        this.operateForm.appointmentName = this.$store.getters.userName
          this.$http.post('appointment/appointmentAdd', this.operateForm).then(
              res => {
                console.log(this.operateForm)
                this.operateForm = {}
                this.open()
              }
          )
      },
      searchCustomer(){
        this.getCustomers()
      },
    },
    computed:{
        user(){
          return this.$store.getters.user
        },
        userName() {
          return this.$store.getters.userName
        }
    },
    created(){
    },
}
</script>

<style lang="scss" scoped>
.table {
  .pagination{
    text-align: right;
    margin-top: 10px;
    margin-right: 10px;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
}
</style>
