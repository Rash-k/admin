<template>
  <div class="table">
    <div class="manager-header" >
      <el-form inline class="myForm">
        <el-form-item label="姓名">
          <el-input v-model="queryParams.name" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <div class="button">
        <el-button type="primary" @click="searchCustomer" class="search">搜索</el-button>
        <el-button type="primary" class="add" @click="openAdd()">新增</el-button>
        <el-button type="primary" @click="download" class="export">导出Excel</el-button>
      </div>
    </div>
    <el-table
        v-loading="loading"
        :data="customerData"
        style="width: 100%">
      <el-table-column
          prop="_id"
          label="客户ID">
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
          prop="model"
          label="购买车型">
      </el-table-column>
      <el-table-column
          prop="totalAmount"
          label="车辆总金额">
      </el-table-column>
      <el-table-column
          prop="saleDate"
          label="购买日期">
        <template slot-scope="scope">
          {{ formatDate(scope.row.saleDate) }}
        </template>
      </el-table-column>
      <el-table-column
          prop="address"
          label="常住地址">
      </el-table-column>
      <el-table-column
          prop="telephone"
          label="联系电话">
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="openEdit(scope.row)"
          >编辑</el-button>
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
    <el-dialog :title="operateType === 'add' ? '客户登记' : '客户信息更新'" :visible.sync="isShow" width="30%">
      <el-form :model="operateForm">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="operateForm.name" autocomplete="off" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别:" :label-width="formLabelWidth">
          <el-select v-model="operateForm.sex" placeholder="请选择">
            <el-option key="1" value="1" label="男"></el-option>
            <el-option key="0" value="0" label="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="operateForm.age" autocomplete="off" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="购买车型" :label-width="formLabelWidth">
          <el-input v-model="operateForm.model" autocomplete="off" placeholder="请输入购买车型"></el-input>
        </el-form-item>
        <el-form-item label="金额" :label-width="formLabelWidth">
          <el-input v-model="operateForm.totalAmount" autocomplete="off" placeholder="请输入金额"></el-input>
        </el-form-item>
        <el-form-item label="购买时间" :label-width="formLabelWidth">
          <el-date-picker
              v-model="operateForm.saleDate"
              type="date"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="operateForm.address" autocomplete="off" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="operateForm.telephone" autocomplete="off" placeholder="请输入联系电话"></el-input>
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
import { formatDate, export2Excel } from '../../utils/index'
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
            keys: ['_id','name','sex','age','model','totalAmount','saleDate','address','telephone'],
        }
    },
    methods:{
      getCustomers(){
        this.loading = true
        let queryParams = Object.assign(this.queryParams)
        this.$http.get('customers', {params:queryParams}).then(res=>{
          this.allCustomerData = res.data
                this.fileterCustomerData = res.data
                //设置分页数据
                this.setPaginations()
                this.loading = false
            })
            .catch(err=>console.log(err))
        },
      openEdit(row){
        this.operateType = 'edit';
        this.isShow=true;
        this.operateForm={...row};
      },
      openAdd(){
        this.operateType = 'add';
        this.isShow=true;
        this.operateForm={};
      },
      determine(){
        if (this.operateType === 'add') {
          this.$http.post('customers/customerAdd', this.operateForm).then(
              res => {
                // console.log(res.data);
                this.isShow=false;
                this.getCustomers();
              }
          )
        } else if (this.operateType === 'edit'){
          // /${this.operateForm._id}
          this.$http.post('customers/customerEdit', this.operateForm).then(
              res => {
                // console.log(res.data);
                this.isShow=false;
                this.getCustomers();
              }
          )
        }
      },
      searchCustomer(){
        this.getCustomers()
      },
      download() {
        if (this.allCustomerData.length !== 0) {
          let list = [
            {title:'客户ID',key:'_id'},
            {title:'姓名',key:'name'},
            {title:'性别',key:'sex'},
            {title:'年龄',key:'age'},
            {title:'购买车型',key:'model'},
            {title:'金额',key:'totalAmount'},
            {title:'购买时间',key:'saleDate'},
            {title:'地址',key:'address'},
            {title:'联系电话',key:'telephone'}
          ]
          let newList = []
          list.forEach((item,index)=>{
            this.keys.forEach((itemA,indexA)=>{
              if(item.key===itemA){
                newList.push(item)
              }
            })
          })
          export2Excel(newList,this.allCustomerData)
        } else {
          this.$message.error('没有数据！');
        }
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
        }
    },
    created(){
        this.getCustomers()
        console.log(this.$store.getters.user)
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
