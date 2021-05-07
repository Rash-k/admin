<template>
  <div class="table">
    <el-table
        v-loading="loading"
        border
        :data="priceData"
        style="width: 100%">
      <el-table-column
          prop="_id"
          label="投诉单号">
      </el-table-column>
      <el-table-column
          label="操作"
          width="218px">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="closeStatus(scope.row)"
          >查看详情</el-button>
          <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="delHandel(scope.row)"
          >删除</el-button>
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
    <el-dialog
        title="投诉详情"
        :visible.sync="failOpen"
        width="40%">
      <el-card class="box-card">
        <div class="text item">
          <span>投诉编号:</span>
          {{operateForm._id}}
        </div>
        <div class="text item">
          <span>投诉人:</span>
          {{operateForm.name}}
        </div>
        <div class="text item">
          <span>投诉车型:</span>
          {{operateForm.complaintModel}}
        </div>
        <div class="text item">
          <span>投诉日期:</span>
          {{ formatDate(operateForm.complaintDate) }}
        </div>
        <div class="text item">
          <span>投诉内容:</span>
          {{ operateForm.complaintReason }}
        </div>
      </el-card>
      <el-divider></el-divider>
      <div class="center">
        <div class="title">投诉回复:</div>
        <div class="content">
          我们将尽快核实信息，并将汽车质量或服务问题投诉内容提交厂商，并持续电话沟通解决情况，最新厂商反馈我们将与车主及时沟通。
        </div>
      </div>
      <el-divider></el-divider>
      <el-steps :active="operateForm.complaintStatus + 1">
        <el-step title="已提交" description="投诉已提交"></el-step>
        <el-step title="处理中" description="投诉正在处理，请注意接听电话"></el-step>
        <el-step title="已解决" description="投诉以解决，请确认"></el-step>
      </el-steps>
    </el-dialog>
  </div>
</template>

<script>
import {formatDate} from '../../utils'
export default {
    data(){
        return {
          formatDate,
          failOpen: false,
          operateForm: {},
          queryParams: {
            complaintStatus: undefined,
            name: ''
          },
          loading: false,
            paginations:{
                page_index:1, //当前位于多少页
                total:0, //总数
                page_size:10,  //一页显示多少条
                page_sizes:[10,15,20], //每页显示多少条
                layout:'total,sizes,prev,pager,next,jumper' // 翻页属性
            },
            priceData:[],
            allPriceData:[],
            fileterPriceData:[]
        }
    },
    methods:{
      getPrice(){
        this.loading = true
        let queryParams = Object.assign(this.queryParams)
          queryParams.name = this.$store.getters.user.name
            this.$http.get('complaints', {params: queryParams}).then(res=>{
                this.allPriceData = res.data
                this.fileterPriceData = res.data
                //设置分页数据
              this.setPaginations()
                this.loading = false
            })
            .catch(err=>console.log(err))
        },
      closeStatus(row){
        this.operateForm = row
        this.failOpen = true
      },
      delHandel(row){
        this.$confirm('此操作将永久删除该投诉, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(`complaints/complaintsDel/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getPrice()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      },
      searchPrice(){
       this.getPrice();
      },
        setPaginations(){
            this.paginations.total = this.allPriceData.length
            this.paginations.page_index = 1
            this.paginations.page_size = 10
            //设置默认分页数据
            this.priceData = this.allPriceData.filter((item,index)=>{
                return index < this.paginations.page_size
            })
        },
        handleSizeChange(page_size){
            this.paginations.page_index = 1
            this.paginations.page_size = page_size
            this.priceData = this.allPriceData.filter((item,index)=>{
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
                if(this.allPriceData[i]){
                    tables.push(this.allPriceData[i])
                }
                this.priceData = tables
            }
        },
    },
    computed:{
        user(){
            return this.$store.getters.user
        }
    },
    created(){
        this.getPrice()
    },
}
</script>

<style lang="scss" scoped>
.table {
  .text {
    font-size: 14px;
  }
  .item {
    padding: 18px 0;
  }
  .box-card {
    width: 480px;
    margin: auto;
  }
  .pagination{
    text-align: right;
    margin-top: 10px;
    margin-right: 10px;
  }
  .center {
    .title {
      font-weight: bold;
      font-size: 15pt;
    }
    .content {
      margin-top: 10px;
    }
  }
}
</style>
