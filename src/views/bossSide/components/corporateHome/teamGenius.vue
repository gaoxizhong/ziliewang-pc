<template>
  <div class="label-items-box">
    <div class="btn">
      <el-button type="primary" size="small" @click="addAccount">新增团队牛人</el-button>
    </div>
    <div class="guildListSection-box">
     <div class="guildList">
      <el-row :gutter="24">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
          <div class="grid-content">
            <img class="user-img" src="https://zlw0720.oss-cn-beijing.aliyuncs.com/avatar/20231222/adf79811dadb6f5cea85c19e36cc3517.png" alt="" />
            <p class="user-name">郜喜忠</p>
            <p class="user-introduce">简介：郜喜忠郜喜忠郜喜忠郜喜忠郜喜忠郜喜忠郜喜忠郜喜忠郜喜忠郜喜忠郜喜忠郜喜忠郜喜忠郜喜忠郜喜忠郜喜忠郜喜忠</p>
            <div class="controls-box">
              <i class="el-icon-view" title="查看"></i>
              <i class="el-icon-delete" title="删除"></i>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
          <div class="grid-content">
            <img class="user-img" src="https://zlw0720.oss-cn-beijing.aliyuncs.com/avatar/20231222/adf79811dadb6f5cea85c19e36cc3517.png" alt="" />
            <p class="user-name">郜喜忠</p>
            <p class="user-introduce">简介：郜喜忠郜喜忠郜喜忠郜喜忠郜喜忠</p>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
          <div class="grid-content">
            <img class="user-img" src="https://zlw0720.oss-cn-beijing.aliyuncs.com/avatar/20231222/adf79811dadb6f5cea85c19e36cc3517.png" alt="" />
            <p class="user-name">郜喜忠</p>
            <p class="user-introduce">简介：郜喜忠郜喜忠郜喜忠郜喜忠郜喜忠</p>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
          <div class="grid-content">
            <img class="user-img" src="https://zlw0720.oss-cn-beijing.aliyuncs.com/avatar/20231222/adf79811dadb6f5cea85c19e36cc3517.png" alt="" />
            <p class="user-name">郜喜忠</p>
            <p class="user-introduce">简介：郜喜忠郜喜忠郜喜忠郜喜忠郜喜忠</p>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
          <div class="grid-content">
            <img class="user-img" src="https://zlw0720.oss-cn-beijing.aliyuncs.com/avatar/20231222/adf79811dadb6f5cea85c19e36cc3517.png" alt="" />
            <p class="user-name">郜喜忠</p>
            <p class="user-introduce">简介：郜喜忠郜喜忠郜喜忠郜喜忠郜喜忠</p>
          </div>
        </el-col>
      </el-row>
     </div>
    </div>
    
    <!-- <el-form :model="tdnr_ruleForm" :rules="tdnr_rules" ref="tdnr_ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="团队牛人" prop="team_genius">
        <el-col :span="16">
          <el-select v-model="tdnr_ruleForm.team_genius" multiple placeholder="团队牛人" style="width: 100%;">
            <el-option label="张三" value="张三"></el-option>
            <el-option label="李四" value="李四"></el-option>
            <el-option label="王五" value="王五"></el-option>
            <el-option label="麻六" value="麻六"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="团队风格" prop="team_style">
        <el-col :span="16">
          <el-input v-model="tdnr_ruleForm.team_style" placeholder="团队风格"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="团队阶段" prop="team_stage">
        <el-col :span="16">
          <el-input v-model="tdnr_ruleForm.team_stage" placeholder="团队阶段"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="团队结构" prop="team_structure">
        <el-col :span="16">
          <el-input v-model="tdnr_ruleForm.team_structure" placeholder="团队结构"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="btn-box">
        <el-button type="primary" @click="submitForm">保存</el-button>
      </el-form-item>
    </el-form> -->
  </div>
</template>

<script>

export default {
  components: {
  },
  props:{
    data:{
      type: Object,
      default() {
          return {}
        }
    }
  },
  data(){
    return{
      useDataList: [],
      addDialog:{
        visible: false
      }
    }
  },
  created(){
    // 获取员工列表
    this.getTableData();
  },
  mounted(){
 
  },
  computed: {
    
  },
  methods: {
    // 获取员工列表
    getTableData() {
      let that = this;
      that.$axios.post('/api/staff/index',{
        type: 1
      }).then( res =>{
        if(res.code == 0){
          that.useDataList = res.data
        }else{
          that.$message.error({
            message:res.data.msg
          })
        }
      })
    },
    addAccount() {
      this.addDialog.form = {};
      this.addDialog.visible = true;
    },
    // 点击发布
    submitForm(){
      let that = this;
      let p = {
        team_genius: that.tdnr_ruleForm.team_genius.join(','),
        team_style: that.tdnr_ruleForm.team_style,
        team_stage: that.tdnr_ruleForm.team_stage,
        team_structure: that.tdnr_ruleForm.team_structure,

      };
      that.$axios.post('/api/company/team/create',p).then( res =>{
        console.log(res)
        if(res.code == 0){
          that.$message.success({
            message: '保存成功!'
          })
          that.getDetail();
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      }).catch( e=>{
        console.log(e)
      })
    },

  },
};
</script>

<style lang="scss" scoped>
  .label-items-box{
    width: 100%;
    height: auto;
    font-size: 14px;
    padding-left: 10px;
    padding-right: 1rem;

    .items-box{
      width: 100%;
      margin-top: 20px;
      .title{
        font-size: 16px;
        font-weight: bold;
        color: $g_textColor;
        line-height: 24px;
      }
      .info-box{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        &>div{
          margin-top: 10px;
          margin-right: 12px;
          width: 200px;
          height: 140px;
          position: relative;
          
          .avatar-uploader{
            width: 100%;
            height: 100%;
            & /deep/ .el-upload {
              width: 100%;
              height: 100%;
            }
            & /deep/ .el-upload-dragger{
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              .file-tips{
                margin-top: 6px;
                font-size: 14px;
                font-weight: 400;
                color: #86909C;
                line-height: 22px;
              }
            }
            & /deep/ .el-upload-dragger .el-icon-camera{
              font-size: 28px;
            }
          }


        }

      }
    }
    // & .el-input{
    //     width: 30rem;
    //   }
    & /deep/ .el-input.is-active .el-input__inner, & /deep/ .el-input__inner:focus{
        border-color: $g_bg;
      }
      /deep/ .el-form-item__content{
        line-height: 32px;
      }
      /deep/ .el-form-item__label{
        padding-right: 20px;
        line-height: 32px;
      }
      /deep/ .el-input__inner{
        height: 32px;
        line-height: 32px;
      }
      /deep/ .el-input__icon{
        line-height: 32px;
      }
    & /deep/ .el-form-item {
      margin-bottom: 22px;
      display: flex;
      align-items: center;
    }
    & /deep/ .el-form-item__content{
      margin: 0 !important;
      flex: 1;
      display: flex;
      align-items: center;
    }

  }
  .btn {
    padding: 10px 0px;
    & /deep/ .el-button--primary{
      background: $g_bg;
      border-color: $g_bg;
    }
  }
  .btn-box{
    display: flex;
    align-items: center;
    margin-top: 20px;
    padding: 20px 40px;
   & .el-button{
    width: 114px;
    height: 40px;
    margin-right: 20px;
   }
   & /deep/ .el-button--primary{
    background-color:$g_bg;
    border-color: $g_color;
   }
 
  }
  .guildListSection-box{
    width: 100%;
    min-width: 580px;
    .guildList{
      /deep/ .el-col {
        border-radius: 4px;
      }
      /deep/ .grid-content {
        width: 100%;
        border-radius: 4px;
        min-height: 36px;
        box-shadow: 0 0 20px 0 #eaeaea;
        text-decoration: none;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px 10px;
        margin-top: 14px;
        .user-img {
          width: 6.6rem;
          height: 6.6rem;
          border-radius: 50%;
          margin-bottom: 10px;
        }
        .user-name {
          color: $g_textColor;
          font-size: 16px;
          line-height: 28px;
          font-weight: bold;
          text-align: center;
        }
        .user-introduce{
          font-size: 14px;
          line-height: 23px;
          text-align: left;
          color: #666;
          display:box;
          overflow:hidden;
          text-overflow:ellipsis;
          box-orient: vertical;
          line-clamp:3;
        }
        .controls-box{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-top: 10px;
          &> i{
            margin-right: 14px;
            font-size: 16px;
            cursor: pointer;
            &:hover{
              color: $g_color;
            }
          }
        }
      }
    }
  }
</style>
