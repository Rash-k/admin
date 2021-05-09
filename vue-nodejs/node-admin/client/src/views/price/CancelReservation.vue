<template>
  <div class="table">
    <div class="manager-header">
      <el-form inline class="myForm">
        <el-form-item label="姓名">
          <el-input v-model="queryParams.name" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <div class="button">
        <el-button type="primary" @click="searchCancel" class="search" style="margin-top: 20px" plain>搜索</el-button>
      </div>
    </div>
    <el-table
        v-loading="loading"
        border
        :data="cancelData"
        style="width: 100%">
      <el-table-column
          prop="_id"
          label="预定编号">
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名">
      </el-table-column>
      <el-table-column
          prop="sex"
          label="性别">
        <template slot-scope="scope">
          {{ scope.row.sex === "1" ? '男' : '女' }}
        </template>
      </el-table-column>
      <el-table-column
          prop="age"
          label="年龄">
      </el-table-column>
      <el-table-column
          prop="address"
          label="地址">
      </el-table-column>
      <el-table-column
          prop="telephone"
          label="联系电话">
      </el-table-column>
      <el-table-column
          prop="model"
          label="预定车型">
      </el-table-column>
      <el-table-column
          prop="reserveDate"
          label="预定日期">
        <template slot-scope="scope">
          {{ formatDate(scope.row.reserveDate) }}
        </template>
      </el-table-column>
      <el-table-column
          prop="state"
          label="状态">
        <template slot-scope="scope">
          {{ scope.row.state === "1" ? '成功' : scope.row.state === "2" ? '待交车' : '已取消' }}
        </template>
      </el-table-column>
      <el-table-column
          prop="cancelReason"
          label="取消原因">
      </el-table-column>
      <el-table-column
          label="操作"
          width="218px">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="delCancel(scope.row)"
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
  </div>
</template>

<script>
import {formatDate} from '../../utils'
export default {
    data(){
        return {
          formatDate,
          operateForm: {},
          formLabelWidth: '100px',
          queryParams: {
            state: '3',
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
            cancelData:[],
            allCancelData:[],
            fileterCancelData:[],
        }
    },
    methods:{
      getCancel(){
        this.loading = true
        let queryParams = Object.assign(this.queryParams)
            this.$http.get('prices', {params: queryParams})
            .then(res=>{
                this.allCancelData = res.data
                this.fileterCancelData = res.data
                //设置分页数据
              this.setPaginations()
                this.loading = false
            })
            .catch(err=>console.log(err))
        },
      delCancel(row){
        this.$confirm('此操作将永久删除该预定信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(`prices/pricesDel/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getCancel()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      },
      searchCancel(){
       this.getCancel();
      },
        setPaginations(){
            this.paginations.total = this.allCancelData.length
            this.paginations.page_index = 1
            this.paginations.page_size = 10
            //设置默认分页数据
            this.cancelData = this.allCancelData.filter((item,index)=>{
                return index < this.paginations.page_size
            })
        },
        handleSizeChange(page_size){
            this.paginations.page_index = 1
            this.paginations.page_size = page_size
            this.cancelData = this.allCancelData.filter((item,index)=>{
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
                if(this.allCancelData[i]){
                    tables.push(this.allCancelData[i])
                }
                this.cancelData = tables
            }
        },
    },
    computed:{
        user(){
            return this.$store.getters.user
        }
    },
    created(){
        this.getCancel()
    },
}
</script>

<style lang="scss" scoped>
.table {
  .manager-header {
    display: flex;
    justify-content: flex-start;
    .myForm {
      margin: 20px 0 10px 10px;
    }
    .button {
      .search {
        margin-left: 10px;
      }
      .add {
        margin-left: 15px;
        margin-top: 20px;
      }
      .export {
        margin-left: 15px;
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
