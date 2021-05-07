<template>
  <div class="table">
    <el-table
        v-loading="loading"
        :data="customerData"
        style="width: 100%">
      <el-table-column
          prop="_id"
          label="预约编号">
      </el-table-column>
      <el-table-column
          prop="appointmentName"
          label="试驾人姓名">
      </el-table-column>
      <el-table-column
          prop="appointmentModel"
          label="预约试驾车型">
      </el-table-column>
      <el-table-column
          prop="appointmentDate"
          label="预约日期">
        <template slot-scope="scope">
          {{ formatDate(scope.row.appointmentDate) }}
        </template>
      </el-table-column>
      <el-table-column
          prop="appointmentStatus"
          label="预约状态">
        <template slot-scope="scope">
          {{ scope.row.appointmentStatus === 0 ? '待试驾': scope.row.appointmentStatus === 1 ? '已取消': '试驾结束' }}
        </template>
      </el-table-column>
      <el-table-column
          prop="telephone"
          label="联系电话">
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="cancel(scope.row)"
              :disabled="scope.row.appointmentStatus !== 0 ? true : false"
          >取消预约</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span='24'>
        <div class="pagination">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="paginations.page_index"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { formatDate } from '../../utils/index'
export default {
    data(){
        return {
          formatDate,
          operateForm: {},
          formLabelWidth: '100px',
          queryParams: {
            appointmentName: ''
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
      getCustomers(){
        this.loading = true
        this.$http.get('appointment', {params:this.queryParams}).then(res=>{
          this.allCustomerData = res.data
                this.fileterCustomerData = res.data
                //设置分页数据
                this.setPaginations()
                this.loading = false
            })
            .catch(err=>console.log(err))
        },
        cancel(row) {
          this.$http.post('appointment/cancel', {_id: row._id}).then(res=>{
            this.allCustomerData = res.data
            this.fileterCustomerData = res.data
            //设置分页数据
            this.getCustomers()
            this.setPaginations()
          }).catch(err=>console.log(err))
        },
        setPaginations(){
            this.paginations.total = this.allCustomerData.length
            this.paginations.page_index = 1
            this.paginations.page_size = 10
            //设置默认分页数据
            this.customerData = this.allCustomerData.filter((item,index)=>{
                return index < this.paginations.page_size
            })
        },
        handleSizeChange(page_size){
            this.paginations.page_index = 1
            this.paginations.page_size = page_size
            this.customerData = this.allCustomerData.filter((item,index)=>{
                return index < page_size
            })
        },
        handleCurrentChange(page){
            //获取当前页
            let index = this.paginations.page_size * (page-1)
            //数据总数
            let nums = this.paginations.page_size * page
            let tables = []
            for(let i=index; i<nums; i++){
                if(this.allCustomerData[i]){
                    tables.push(this.allCustomerData[i])
                }
                this.customerData = tables
            }
        },
    },
    computed:{
        user(){
          return this.$store.getters.user
        },
    },
    created(){
      this.queryParams.appointmentName = this.$store.getters.user.name
      this.getCustomers()
    },
}
</script>

<style lang="scss" scoped>
.table {
  .manager-header {
    display: flex;
    .myForm {
      margin-left: 10px;
      margin-top: 20px;
      .search {
        margin-left: 10px;
      }
    }
    .button {
      margin-left: 5px;
      .add {
        margin-top: 20px;
      }
    }
  }
  .pagination{
    text-align: right;
    margin-top: 10px;
    margin-right: 10px;
  }
}
</style>
