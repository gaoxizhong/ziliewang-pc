<template>
  <div class="bossSide-container">
    <!-- 我的面试安排页 -->
    <div class="tab-box">
      <div class="tab-left">
        <div :class="tabStatus == 1?'hover-items':'' " @click="clickStatus(1)">待面试</div>
        <div :class="tabStatus == 2?'hover-items':'' " @click="clickStatus(2)">历史记录</div>
      </div>
    </div>

    <div class="m-20 m-box inquire-box">
      <div class="inquire-left-box">
        <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm" label-suffix=":">
          <el-form-item label="面试方式" prop="interview_method">
            <el-select v-model="ruleForm.interview_method" placeholder="面试方式">
              <el-option label="不限" value="不限"></el-option>
              <el-option label="线上" value="线上"></el-option>
              <el-option label="线下" value="线下"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="面试职位" prop="interview_position">
            <el-select v-model="ruleForm.interview_position" placeholder="面试职位">
              <el-option label="不限" value="不限"></el-option>
              <el-option label="前端" value="前端"></el-option>
              <el-option label="后端" value="后端"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="面试者" prop="interviewee">
            <el-select v-model="ruleForm.interviewee" placeholder="面试者">
              <el-option label="不限" value="不限"></el-option>
              <el-option label="郜喜忠" value="郜喜忠"></el-option>
              <el-option label="仇登耀" value="仇登耀"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="inquire-right-box">
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="submitForm">搜索</el-button>
      </div>
    </div>

    <div class="m-box margin-top-20 tableData-box">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="80"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 + (tableDataPage.page - 1) * tableDataPage.size }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="users.real_name" label="投递人"></el-table-column>
        <el-table-column prop="begin_time_text" label="开始时间"></el-table-column>
        <el-table-column prop="end_time_text" label="结束时间"></el-table-column>
        <el-table-column prop="d" label="面试方式">
          <template slot-scope="scope">
            <span>{{ scope.row.type == 1?'线上':'线下' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="companyposition.position_name" label="面试职位"></el-table-column>
        <el-table-column prop="staff" label="面试者"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span class="blue" @click.stop="clickViewDetails(scope.row)">查看详情</span>
            <!-- <span class="blue">导出</span> -->
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 查看详情----弹窗 -->
    
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabStatus: 1,
      ruleForm:{
        interview_method:'不限',
        interview_position:'不限',
        interviewee:'',
        contact_person:'',
      },
      tableData:[],
      tableDataPage: {
        page: 1,
        size: 10,
        total: 0
      },
    }
  },
  mounted(){
    this.getSysMsgList();
  },
  methods:{
    // 重置
    resetForm(){

    },
    // 搜索
    submitForm(){

    },
    clickStatus(n){
      this.tabStatus = n;
    },
    // 获取聊天列表
    getSysMsgList(){
      let that = this;
      that.$axios.post('/api/company-interview/index',{}).then( res =>{
        console.log(res)
        if(res.code == 0){
          that.tableData = res.data;
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },

    // 点击查看详情
    clickViewDetails(i){
      console.log(i)
    },
    
  
    
  }
}
</script>

<style lang="scss" scoped>
  .tab-box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .tab-left{
      width: auto;
      display: flex;
      align-items: center;
      &>div{
        width: auto;
        line-height: 32px;
        margin-right: 15px;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        color: #86909CFF;
        cursor: pointer;
      }
      &>div.hover-items{
        color: $g_textColor;
        font-weight: bold;
      }
    }
    .tab-right{
      width: 124px;
      line-height: 32px;
      color: #4E5969;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      img{
        width: 14px;
        height: 14px;
      }
      span{
        font-size: 14px;
        line-height: 22px;
        padding-left: 4px;
      }
    }
  }
  .inquire-box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .inquire-left-box{
      flex: 1;
      .demo-ruleForm{
        width: 100%;
        display: flex;
        align-items: center;
        /deep/ .el-form-item{
          margin: 0;
          padding-left: 10px;
          display: flex;
          &:nth-of-type(1){
            padding-left: 0;
          }
          .el-form-item__content{
          line-height: 32px;
          }
          .el-form-item__label{
            line-height: 32px;
          }
          .el-input__inner{
            height: 32px;
            line-height: 32px;
          }
          .el-input__icon{
            line-height: 32px;
          }
        }
      }
    }
    .inquire-right-box{
      width: auto;
      & /deep/ .el-button{
        height: 32px;
        line-height: 32px;
        padding: 0 20px;
      }
      & /deep/ .el-button--primary{
        background-color:$g_bg;
        border-color: $g_color;
      }
    }
  }
  .tableData-box{

    .blue {
      color: $g_color;
      cursor: pointer;
    }
    /deep/ .has-gutter tr{
      background: #F7F9FC !important;
    }
  }
</style>