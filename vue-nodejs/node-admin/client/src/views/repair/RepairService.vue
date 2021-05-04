<template>
  <div class="table">
    <div class="manager-header">
      <el-form inline class="myForm">
          <el-form-item label="时间">
            <el-date-picker
                v-model="time"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetimerange"
                size="small"
                range-separator="至"
                start-placeholder="起始时间"
                end-placeholder="结束时间"
            >
            </el-date-picker>
          </el-form-item>
      </el-form>
      <div class="button">
        <el-button type="primary" @click="searchCustomer" class="search">搜索</el-button>
        <el-button type="primary" class="add" @click="openAdd()">新增</el-button>
      </div>
    </div>
    <el-table
        v-loading="loading"
        :data="repairData"
        style="width: 100%">
      <el-table-column
          prop="_id"
          label="编号">
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名">
      </el-table-column>
      <el-table-column
          prop="model"
          label="车型">
      </el-table-column>
      <el-table-column
          prop="content"
          label="维修内容">
      </el-table-column>
      <el-table-column
          prop="cost"
          label="费用">
      </el-table-column>
      <el-table-column
          prop="repairDate"
          label="维修日期">
        <template slot-scope="scope">
          {{ formatDate(scope.row.repairDate) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="openEdit(scope.row)"
          >编辑</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
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
    <el-dialog :title="operateType === 'add' ? '维修记录添加' : '维修记录更新'" :visible.sync="isShow" width="30%">
      <el-form :model="operateForm">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="operateForm.name" autocomplete="off" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="车型" :label-width="formLabelWidth">
          <el-input v-model="operateForm.model" autocomplete="off" placeholder="请输入车型"></el-input>
        </el-form-item>
        <el-form-item label="维修内容" :label-width="formLabelWidth">
          <el-input v-model="operateForm.content" autocomplete="off" placeholder="请输入维修内容"></el-input>
        </el-form-item>
        <el-form-item label="金额" :label-width="formLabelWidth">
          <el-input v-model="operateForm.cost" autocomplete="off" placeholder="请输入金额"></el-input>
        </el-form-item>
        <el-form-item label="维修时间" :label-width="formLabelWidth">
          <el-date-picker
              v-model="operateForm.repairDate"
              type="date"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="determine()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from '../../utils'
export default {
  data(){
    return {
      formatDate,
      isShow:false,
      operateForm: {},
      operateType: 'add',
      formLabelWidth: '100px',
      time: [],
      queryParams: {
        startTime: undefined,
        endTime: undefined
      },
      loading: false,
      paginations:{
        page_index:1, //当前位于多少页
        total:0, //总数
        page_size:10,  //一页显示多少条
        page_sizes:[10,15,20], //每页显示多少条
        layout:'total,sizes,prev,pager,next,jumper' // 翻页属性
      },
      repairData:[],
      allRepairData:[],
      filterRepairData:[]
    }
  },
  methods:{
    getRepairs(){
      this.loading = true
      let queryParams = Object.assign({}, this.queryParams)
      queryParams.startTime = this.time[0]
      queryParams.endTime = this.time[1]
      this.$http.get('repairs', {params:queryParams}).then(res=>{
        this.allRepairData = res.data
        this.filterRepairData = res.data
        //设置分页数据
        this.setPaginations()
        this.loading = false
      }).catch(err=>console.log(err))
    },
    openAdd(){
      this.operateType = 'add';
      this.isShow=true;
      this.operateForm={};
    },
    openEdit(row){
      this.operateType = 'edit';
      this.isShow=true;
      this.operateForm={...row};
    },
    determine(){
      if (this.operateType === 'add') {
        this.$http.post('repairs/repairsAdd', this.operateForm).then(
                res => {
                  this.isShow=false;
                  this.getRepairs();
                }
        )
      } else if (this.operateType === 'edit'){
        this.$http.post('repairs/repairsEdit', this.operateForm).then(
                res => {
                  this.isShow=false;
                  this.getRepairs();
                }
        )
      }
    },
    handleDelete(row){
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(`repairs/repairsDelete/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getRepairs()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    },
    searchCustomer(){
      this.getRepairs()
    },
    setPaginations(){
      this.paginations.total = this.allRepairData.length
      this.paginations.page_index = 1
      this.paginations.page_size = 10
      //设置默认分页数据
      this.repairData = this.allRepairData.filter((item,index)=>{
        return index < this.paginations.page_size
      })
    },
    handleSizeChange(page_size){
      this.paginations.page_index = 1
      this.paginations.page_size = page_size
      this.repairData = this.allRepairData.filter((item,index)=>{
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
        if(this.allRepairData[i]){
          tables.push(this.allRepairData[i])
        }
        this.repairData = tables
      }
    },
  },
  computed:{
    user(){
      return this.$store.getters.user
    }
  },
  watch: {
    "time"(newVal) {
      if (newVal == null) {
        this.time = [];
      }
    }
  },
  created(){
    this.getRepairs()
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
