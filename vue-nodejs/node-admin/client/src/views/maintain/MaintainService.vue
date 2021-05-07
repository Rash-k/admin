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
        :data="maintainData"
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
          label="保养内容">
      </el-table-column>
      <el-table-column
          prop="cost"
          label="费用">
      </el-table-column>
      <el-table-column
          prop="maintenanceType"
          label="保养类型">
        <template slot-scope="scope">
          {{ scope.row.maintenanceType === 1 ? '基础保养' : '深化保养' }}
        </template>
      </el-table-column>
      <el-table-column
          prop="mileage"
          label="行驶里程">
      </el-table-column>
      <el-table-column
          prop="maintenanceDate"
          label="保养日期">
        <template slot-scope="scope">
          {{ formatDate(scope.row.maintenanceDate) }}
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
    <el-dialog :title="operateType === 'add' ? '保养记录添加' : '保养记录更新'" :visible.sync="isShow" width="30%">
      <el-form :model="operateForm">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="operateForm.name" autocomplete="off" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="车型" :label-width="formLabelWidth">
          <el-input v-model="operateForm.model" autocomplete="off" placeholder="请输入车型"></el-input>
        </el-form-item>
        <el-form-item label="保养内容" :label-width="formLabelWidth">
          <el-input v-model="operateForm.content" autocomplete="off" placeholder="请输入保养内容"></el-input>
        </el-form-item>
        <el-form-item label="金额" :label-width="formLabelWidth">
          <el-input v-model="operateForm.cost" autocomplete="off" placeholder="请输入金额"></el-input>
        </el-form-item>
        <el-form-item label="行驶里程" :label-width="formLabelWidth">
          <el-input v-model="operateForm.mileage" autocomplete="off" placeholder="行驶里程"></el-input>
        </el-form-item>
        <el-form-item label="保养类型" :label-width="formLabelWidth">
          <el-select v-model="operateForm.maintenanceType" placeholder="请选择">
            <el-option key="1" value="1" label="基础保养"></el-option>
            <el-option key="0" value="0" label="深化保养"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="保养日期" :label-width="formLabelWidth">
          <el-date-picker
              v-model="operateForm.maintenanceDate"
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
      maintainData:[],
      allMaintainData:[],
      filterMaintainData:[]
    }
  },
  methods:{
    getMaintains(){
      this.loading = true
      let queryParams = Object.assign({}, this.queryParams)
      queryParams.startTime = this.time[0]
      queryParams.endTime = this.time[1]
      this.$http.get('maintains', {params:queryParams}).then(res=>{
        this.allMaintainData = res.data
        this.filterMaintainData = res.data
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
        this.$http.post('maintains/maintainAdd', this.operateForm).then(
                res => {
                  this.isShow=false;
                  this.getMaintains();
                }
        )
      } else if (this.operateType === 'edit'){
        this.$http.post('maintains/maintainEdit', this.operateForm).then(
                res => {
                  this.isShow=false;
                  this.getMaintains();
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
        this.$http.post(`maintains/maintainDel/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getMaintains()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    },
    searchCustomer(){
      this.getMaintains()
    },
    setPaginations(){
      this.paginations.total = this.allMaintainData.length
      this.paginations.page_index = 1
      this.paginations.page_size = 10
      //设置默认分页数据
      this.maintainData = this.allMaintainData.filter((item,index)=>{
        return index < this.paginations.page_size
      })
    },
    handleSizeChange(page_size){
      this.paginations.page_index = 1
      this.paginations.page_size = page_size
      this.maintainData = this.allMaintainData.filter((item,index)=>{
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
        if(this.allMaintainData[i]){
          tables.push(this.allMaintainData[i])
        }
        this.maintainData = tables
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
    this.getMaintains()
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
