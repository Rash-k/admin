<template>
  <div class="table">
    <div class="manager-header">
      <el-form inline class="myForm">
        <el-form-item label="投诉状态">
          <el-select v-model="queryParams.complaintStatus" placeholder="请选择" clearable>
            <el-option key="0" value="0" label="处理中"></el-option>
            <el-option key="1" value="1" label="已解决"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="button">
        <el-button type="primary" @click="searchPrice" class="search" style="margin-top: 20px">搜索</el-button>
      </div>
    </div>
    <el-table
        v-loading="loading"
        border
        :data="priceData"
        style="width: 100%">
      <el-table-column
          prop="_id"
          label="单号">
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名">
      </el-table-column>
      <el-table-column
          prop="complaintModel"
          label="投诉车型">
      </el-table-column>
      <el-table-column
          prop="complaintReason"
          label="诉求问题">
      </el-table-column>
      <el-table-column
          prop="complaintDate"
          label="投诉日期">
        <template slot-scope="scope">
          {{ formatDate(scope.row.complaintDate) }}
        </template>
      </el-table-column>
      <el-table-column
          prop="telephone"
          label="联系电话">
      </el-table-column>
      <el-table-column
          prop="complaintStatus"
          label="状态">
        <template slot-scope="scope">
          {{ scope.row.complaintStatus === 0 ? '已提交': scope.row.complaintStatus === 1 ? '处理中' : '完成' }}
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
              :disabled="scope.row.complaintStatus === '1' ? true : false"
              @click="closeStatus(scope.row)"
          >处理</el-button>
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
        title="提示"
        :visible.sync="failOpen"
        width="30%">
      <el-form>
        <el-form-item label="处理结果" :label-width="formLabelWidth">
          <el-input v-model="treatmentResult" autocomplete="off" placeholder="请输入投诉处理结果"></el-input>
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
          treatmentResult: '',
          isShow:false,
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
            complaintStatus: undefined
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
            this.$http.get('complaints', {params: queryParams})
            .then(res=>{
                this.allPriceData = res.data
                this.fileterPriceData = res.data
                //设置分页数据
              this.setPaginations()
                this.loading = false
            })
            .catch(err=>console.log(err))
        },
      closeStatus(row){
        this._id = row._id
        this.failOpen = true
      },
      changeFail(){
        this.$http.post('complaints/complaintsHandle', {_id: this._id, treatmentResult: this.treatmentResult})
            .then(res=>{
              this.failOpen = false
              this.$message({
                type: 'success',
                message: '成功!'
              });
              this.getPrice()
            }).catch(err=>console.log(err))
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
