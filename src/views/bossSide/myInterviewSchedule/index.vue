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
        <el-form :model="ruleForm" ref="ruleForm" label-width="70px" class="demo-ruleForm">
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
              <el-option label="线上" value="线上"></el-option>
              <el-option label="线下" value="线下"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="面试者" prop="interviewee">
            <el-select v-model="ruleForm.interviewee" placeholder="面试者">
              <el-option label="不限" value="不限"></el-option>
              <el-option label="线上" value="线上"></el-option>
              <el-option label="线下" value="线下"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系人" prop="contact_person">
            <el-select v-model="ruleForm.contact_person" placeholder="联系人">
              <el-option label="不限" value="不限"></el-option>
              <el-option label="线上" value="线上"></el-option>
              <el-option label="线下" value="线下"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="inquire-right-box">
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="submitForm">搜索</el-button>
      </div>
    </div>

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
        contact_person:''
      },
    }
  },
  methods:{
    clickStatus(n){
      this.tabStatus = n;
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
          .el-select{
            width: 120px;
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
</style>