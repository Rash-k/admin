<template>
  <div class="table">
    <div class="manager-header">
      <el-form inline class="myForm">
        <el-form-item label="姓名">
          <el-input v-model="queryParams.name" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <div class="button">
        <el-button type="primary" @click="searchPrice" class="search" plain>搜索</el-button>
        <el-button type="primary" class="add" @click="openAdd()" plain>新增</el-button>
      </div>
    </div>
    <el-table
        v-loading="loading"
        border
        :data="priceData"
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
          label="操作"
          width="218px">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              v-if="scope.row.state === '2'"
              :disabled="scope.row.state === '1' ? true : false"
              @click="openStatus(scope.row)"
          >改为成功</el-button>
          <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              v-if="scope.row.state === '2'"
              :disabled="scope.row.state === '1' ? true : false"
              @click="closeStatus(scope.row)"
          >取消</el-button>
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
    <el-dialog title="新增预定" :visible.sync="isShow" width="30%">
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
          <el-input v-model="operateForm.telephone" autocomplete="off" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="预定车型" prop="model" :label-width="formLabelWidth">
          <el-input v-model="operateForm.model" autocomplete="off" placeholder="请输入预定车型"></el-input>
        </el-form-item>
        <el-form-item label="预定日期" :label-width="formLabelWidth">
          <el-date-picker
              v-model="operateForm.priceDate"
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
    <el-dialog
        title="提示"
        :visible.sync="successOpen"
        width="30%">
     <el-form>
       <el-form-item>
         <el-input placeholder="确定将预定状态更改为成交吗？" disabled>
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
          <el-input v-model="cancelReason" autocomplete="off" placeholder="请输入取消原因"></el-input>
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
import {formatDate} from '../../utils'
export default {
    data(){
        return {
          formatDate,
          _id:'',
          cancelReason: '',
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
            saleDate: undefined
          },
          formLabelWidth: '100px',
          queryParams: {
            state: '2',
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
            fileterPriceData:[],
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
      openStatus(row){
        this.successOpen = true
        this._id = row._id
      },
      closeStatus(row){
        this._id = row._id
        this.failOpen = true
      },
      openAdd(){
        this.isShow=true;
        this.operateForm={};
      },
      changeSuccess(){
        this.$http.post('prices/changeStatus', {_id: this._id})
            .then(async res=>{
              this.successOpen = false
              this.getPrice();
            }).catch(err=>console.log(err))
      },
      changeFail(){
        this.$http.post('prices/changeStatusFail', {_id: this._id, cancelReason: this.cancelReason})
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
