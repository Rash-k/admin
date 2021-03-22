<template>
  <div class="table">
    <div class="manager-header">
      <el-form inline class="myForm">
        <el-form-item label="订单状态">
          <el-select v-model="queryParams.priceStatus" placeholder="请选择" clearable>
            <el-option key="1" value="1" label="成功"></el-option>
            <el-option key="2" value="2" label="沟通中"></el-option>
            <el-option key="3" value="3" label="失败"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="button">
        <el-button type="primary" @click="searchPrice" class="search">搜索</el-button>
        <el-button type="primary" class="add" @click="openAdd()">新增</el-button>
        <el-button type="primary" @click="download" class="export">导出Excel</el-button>
      </div>
    </div>
    <el-table
        v-loading="loading"
        border
        :data="priceData"
        style="width: 100%">
      <el-table-column
          prop="_id"
          label="订单编号">
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
          label="购买车型">
      </el-table-column>
      <el-table-column
          prop="amount"
          label="金额">
      </el-table-column>
      <el-table-column
          prop="priceDate"
          label="订单日期">
        <template slot-scope="scope">
          {{ formatDate(scope.row.priceDate) }}
        </template>
      </el-table-column>
      <el-table-column
          prop="priceStatus"
          label="订单状态">
        <template slot-scope="scope">
          {{ scope.row.priceStatus === "1" ? '成功' : scope.row.priceStatus === "2" ? '沟通中' : '失败' }}
        </template>
      </el-table-column>
      <el-table-column
          prop="priceFailReason"
          label="失败原因">
      </el-table-column>
      <el-table-column
          label="操作"
          width="218px">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              :disabled="scope.row.priceStatus === '1' ? true : false"
              @click="openStatus(scope.row)"
          >改为成功</el-button>
          <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              v-if="scope.row.priceStatus === '2'"
              :disabled="scope.row.priceStatus === '1' ? true : false"
              @click="closeStatus(scope.row)"
          >改为失败</el-button>
          <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="delPrice(scope.row)"
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
    <el-dialog title="新增订单" :visible.sync="isShow" width="30%">
      <el-form :model="operateForm">
        <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="operateForm.name" autocomplete="off" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别:" :label-width="formLabelWidth">
          <el-select v-model="operateForm.sex" placeholder="请选择">
            <el-option key="1" value="1" label="男"></el-option>
            <el-option key="0" value="0" label="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="age" :label-width="formLabelWidth">
          <el-input v-model="operateForm.age" autocomplete="off" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address" :label-width="formLabelWidth">
          <el-input v-model="operateForm.address" autocomplete="off" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="telephone" :label-width="formLabelWidth">
          <el-input v-model="operateForm.telephone" autocomplete="off" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <el-form-item label="车型" prop="model" :label-width="formLabelWidth">
          <el-input v-model="operateForm.model" autocomplete="off" placeholder="请输入车型"></el-input>
        </el-form-item>
        <el-form-item label="金额" prop="amount" :label-width="formLabelWidth">
          <el-input v-model="operateForm.amount" autocomplete="off" placeholder="请输入金额"></el-input>
        </el-form-item>
        <el-form-item label="订单日期" :label-width="formLabelWidth">
          <el-date-picker
              v-model="operateForm.priceDate"
              type="date"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="订单状态" prop="priceStatus" :label-width="formLabelWidth">
          <el-select v-model="operateForm.priceStatus" placeholder="请选择">
            <el-option key="2" value="2" label="沟通中"></el-option>
            <el-option key="3" value="3" label="失败"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单失败原因" prop="priceFailReason" :label-width="formLabelWidth" v-if="operateForm.priceStatus === '3'">
          <el-input v-model="operateForm.priceFailReason" autocomplete="off" placeholder="请输入订单失败原因"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="determine()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
        title="提示"
        :visible.sync="successOpen"
        width="30%">
     <el-form>
       <el-form-item>
         <el-input placeholder="确定将订单状态更改为成功吗？" disabled>
         </el-input>
       </el-form-item>
     </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="successOpen = false">取 消</el-button>
        <el-button type="primary" @click="changeSuccess()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
        title="提示"
        :visible.sync="failOpen"
        width="30%">
      <el-form>
        <el-form-item label="失败原因" :label-width="formLabelWidth">
          <el-input v-model="priceFailReason" autocomplete="off" placeholder="请输入订单失败原因"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="failOpen = false">取 消</el-button>
        <el-button type="primary" @click="changeFail()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {export2Excel, formatDate} from '../../utils'
export default {
    data(){
        return {
          formatDate,
          _id:'',
          priceFailReason: '',
          isShow:false,
          successOpen:false,
          failOpen: false,
          operateForm: {},
          addForm: {
            name: undefined,
            sex: undefined,
            age: undefined,
            telephone: undefined,
            address: undefined,
            model: undefined,
            saleDate: undefined,
            totalAmount: undefined,
            isVip: undefined
          },
          formLabelWidth: '100px',
          queryParams: {
            priceStatus: undefined
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
            fileterPriceData:[],
            keys: ['_id','name','sex', 'age', 'model','telephone','telephone','amount','address','priceDate','priceFailReason'],
        }
    },
    methods:{
      getPrice(){
        this.loading = true
        let queryParams = Object.assign(this.queryParams)
            this.$http.get('prices', {params: queryParams})
            .then(res=>{
                this.allPriceData = res.data
                this.fileterPriceData = res.data
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
      openStatus(row){
        this.successOpen = true
        this._id = row._id
        this.addForm.name = row.name
        this.addForm.sex = row.sex
        this.addForm.age = row.age
        this.addForm.telephone = row.telephone
        this.addForm.address = row.address
        this.addForm.model = row.model
        this.addForm.saleDate = Date.now()
        this.addForm.totalAmount = row.amount
      },
      closeStatus(row){
        this._id = row._id
        this.failOpen = true
      },
      openAdd(){
        this.operateType = 'add';
        this.isShow=true;
        this.operateForm={};
      },
      changeSuccess(){
        let addForm = Object.assign(this.addForm)
        this.$http.post('prices/changeStatus', {_id: this._id})
            .then(async res=>{
              await this.$http.post('customers/customerAdd', addForm).then(res => {
                this.successOpen = false
                this.$message({
                  type: 'success',
                  message: '成功!'
                });
                this.getPrice()
              }).catch(err => {
                console.log(err);
              })
            }).catch(err=>console.log(err))
      },
      changeFail(){
        this.$http.post('prices/changeStatusFail', {_id: this._id, priceFailReason: this.priceFailReason})
            .then(res=>{
              this.failOpen = false
              this.$message({
                type: 'success',
                message: '成功!'
              });
              this.getPrice()
            }).catch(err=>console.log(err))
      },
      determine(){
              this.$http.post('prices/pricesAdd', this.operateForm).then(res => {
                    this.isShow=false;
                    this.getPrice();
                  })
      },
      delPrice(row){
        this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(`prices/pricesDel/${row._id}`)
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
      download() {
        if (this.allPriceData.length !== 0) {
          let list = [
            {title:'订单编号',key:'_id'},
            {title:'姓名',key:'name'},
            {title:'性别',key:'sex'},
            {title:'年龄',key:'sage'},
            {title:'车型',key:'model'},
            {title:'联系方式',key:'telephone'},
            {title:'金额',key:'amount'},
            {title:'地址',key:'address'},
            {title:'订单时间',key:'priceDate'},
            {title:'订单状态',key:'priceStatus'},
            {title:'订单失败原因',key:'priceFailReason'},
          ]
          let newList = []
          list.forEach((item,index)=>{
            this.keys.forEach((itemA,indexA)=>{
              if(item.key===itemA){
                newList.push(item)
              }
            })
          })
          export2Excel(newList,this.allPriceData)
        } else {
          this.$message.error('没有数据！');
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
