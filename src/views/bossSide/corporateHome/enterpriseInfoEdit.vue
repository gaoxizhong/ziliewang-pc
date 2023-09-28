<template>
  <div class="bossSide-container">
    <!-- 企业主页---信息修改页 -->
    <div class="m-box page-box">
      <el-tabs :tab-position="tabPosition">
        <el-tab-pane label="企业基本信息">
          <div class="label-items-box">
            <div class="items-box">
              <div class="title">企业logo</div>
              <div class="avatar-box">
                <img src="../../../assets/image/bossSide/img-user.jpg" alt="" />
              </div>
            </div>
            <div class="items-box">
              <div class="title">所属主行业</div>
              <el-input v-model="nickname" placeholder="所属主行业"></el-input>
            </div>
            <div class="items-box">
              <div class="title">所属副行业</div>
              <el-input v-model="job" placeholder="所属副行业"></el-input>
            </div>
            <div class="items-box">
              <div class="title">企业性质</div>
              <el-input v-model="nickname" placeholder="企业性质"></el-input>
            </div>
            <div class="items-box">
              <div class="title">企业规模</div>
              <el-input v-model="job" placeholder="企业规模"></el-input>
            </div>
            <div class="items-box">
              <div class="title">上市/投融资状态</div>
              <el-input v-model="nickname" placeholder="上市/投融资状态"></el-input>
            </div>
            <div class="items-box">
              <div class="title">企业注册地</div>
              <el-input v-model="job" placeholder="企业注册地"></el-input>
            </div>
            <div class="items-box">
              <div class="title">企业对外展示名称</div>
              <el-input v-model="job" placeholder="企业对外展示名称"></el-input>
            </div>
            <div class="btn-box">
              <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
              <!-- <el-button @click="resetForm('ruleForm')">取消</el-button> -->
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="企业介绍">
          <div class="label-items-box">
            <div class="items-box">
              <div class="title">企业基本介绍</div>
              <el-input v-model="nickname" placeholder="企业基本介绍"></el-input>
            </div>
            <div class="items-box">
              <div class="title">企业成立时间</div>
              <el-input v-model="job" placeholder="企业成立时间"></el-input>
            </div>
            <div class="items-box">
              <div class="title">企业官网</div>
              <el-input v-model="nickname" placeholder="企业官网"></el-input>
            </div>
            <div class="items-box">
              <div class="title">核心产品</div>
              <el-input v-model="job" placeholder="核心产品"></el-input>
            </div>
            <div class="items-box">
              <div class="title">企业获奖名称/获奖资讯链接</div>
              <el-input v-model="nickname" placeholder="企业获奖名称/获奖资讯链接"></el-input>
            </div>
            <div class="items-box">
              <div class="title">集团旗下相关企业/关系说明</div>
              <el-input v-model="job" placeholder="集团旗下相关企业/关系说明"></el-input>
            </div>
            <div class="btn-box">
              <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
              <!-- <el-button @click="resetForm('ruleForm')">取消</el-button> -->
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="工作制度及福利">工作制度及福利</el-tab-pane>
        <el-tab-pane label="企业形象">企业形象</el-tab-pane>
        <el-tab-pane label="牛人团队">牛人团队</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      tabPosition: 'left', //标签一共有四个方向的设置 tabPosition="left|right|top|bottom"
      type:'',
    }
  },
  created(){
    this.type = this.$route.query.type;
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
  .page-box{
    height: calc(100vh - 90px);
    & /deep/ .el-tabs--left{
      height: 100%;
    }
    & /deep/ .el-tabs__item:hover, & /deep/ .el-tabs__item.is-active{
      color: $g_color;
    }
    & /deep/ .el-tabs__item{
      padding: 0 30px;
    }
    & /deep/ .el-tabs--left .el-tabs__item.is-left{
      font-size: 16px;
      font-weight: bold;
      margin-top: 20px;
      &:nth-of-type(1){
        margin-top: 0;
      }
    }
  }
  .label-items-box{
    width: 100%;
    height: auto;
    font-size: 14px;
    padding-left: 10px;
    .items-box{
      width: 100%;
      display: flex;
      align-items: center;
      margin-top: 20px;
      &:nth-of-type(1){
        margin-top: 0px;
      }
      .title{
        width: 200px;
        height: 24px;
        font-size: 15px;
        font-weight: 400;
        color: $g_textColor;
        line-height: 24px;
        text-align: right;
        &>span{
          color: #ff0000;
          font-size: 18px;
          font-weight: bold;
        }
      }
      .avatar-box{
        width: 68px;
        height: 68px;
        border-radius: 50%;
        position: relative;
        margin-left: 40px;
        &>img{
          width: 100%;
          height: 100%;
          display: inline-block;
        }
      }
      &>span.sub-span{
        width: auto;
        font-size: 16px;
        font-weight: 400;
        color: #C9CDD4;
        line-height: 24px;
        margin-left: 15px;
      }
      &>span.name-span{
        font-size: 16px;
        font-weight: 400;
        color: #1F2E4D;
        line-height: 24px;
        margin-left: 40px;
      }
      & .el-input{
        margin-left: 40px;
        width: 30rem;
      }
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
    }
  }
  .btn-box{
    display: flex;
    align-items: center;
    margin-top: 20px;
    padding: 20px 40px;
   &>.el-button{
    width: 114px;
    height: 40px;
    margin-right: 20px;
   }
   & /deep/ .el-button--primary{
    background-color:$g_bg;
    border-color: $g_color;
   }

  }
</style>