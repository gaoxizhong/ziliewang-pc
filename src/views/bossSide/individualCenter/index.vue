<template>
  <!-- 企业主页 -->
  <div class="bossSide-container">
    <div class="tab-box">
      <div class="tab-left">
        <div :class="tabStatus == 1?'hover-items':'' " @click="clickStatus(1)">基本信息</div>
        <div :class="tabStatus == 2?'hover-items':'' " @click="clickStatus(2)">账号安全</div>
        <div :class="tabStatus == 3?'hover-items':'' " @click="clickStatus(3)">员工关系</div>
        <div :class="tabStatus == 4?'hover-items':'' " @click="clickStatus(4)">隐私中心</div>
      </div>
    </div>
    <div class="m-box margin-top-20">
      <!-- 基本信息 开始-->
      <div class="jc-info-box" v-if="tabStatus == 1">
        <div class="items-box">
          <div class="title">头像</div>
          <div class="avatar-box">
            <img src="../../../assets/image/bossSide/img-user.jpg" alt="" />
          </div>
          <span class="sub-span">该头像将对求职者可见</span>
        </div>
        <div class="items-box">
          <div class="title">用户名</div>
          <span class="name-span">zjafsqyf482386</span>
        </div>
        <div class="items-box">
          <div class="title">姓名</div>
          <span class="name-span">彭讲建</span>
        </div>
        <div class="items-box">
          <div class="title"><span>* </span>昵称</div>
          <el-input v-model="nickname" placeholder="昵称"></el-input>
          <span class="sub-span">该头像将对求职者可见</span>
        </div>
        <div class="items-box">
          <div class="title"><span>* </span>职务</div>
          <el-input v-model="job" placeholder="请输入"></el-input>
          <span class="sub-span">该头像将对求职者可见</span>
        </div>
        <div class="btn-box">
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </div>
      </div>
      <!-- 基本信息 结束-->
      <!-- 账号安全 开始-->
      <div v-if="tabStatus == 2">
        <div class="list-items-box">
          <div class="left">
            <img src="../../../assets/image/bossSide/icon-ph.png" alt="" />
            <div class="item-info-box">
              <div class="title">手机号</div>
              <div class="sub-title">15210022053</div>
            </div>
          </div>
          <div class="right">换绑</div>
        </div>
        <div class="list-items-box">
          <div class="left">
            <img src="../../../assets/image/bossSide/icon-sfz.png" alt="" />
            <div class="item-info-box">
              <div class="title">已通过实名认证</div>
              <div class="sub-title"><span>姓名：彭形建</span><span style="padding-left: 10px;">身份证：4109123184234312823</span></div>
            </div>
          </div>
          <div class="right">换绑</div>
        </div>
        <div class="list-items-box">
          <div class="left">
            <img src="../../../assets/image/bossSide/icon-zhmm.png" alt="" />
            <div class="item-info-box">
              <div class="title">账号密码</div>
              <div class="sub-title"><span>账号：zjayhyz8927394</span></div>
            </div>
          </div>
          <div class="right">换绑</div>
        </div>
        <!-- <div class="list-items-box">
          <div class="left">
            <img src="../../../assets/image/bossSide/icon-wx.png" alt="" />
            <div class="item-info-box">
              <div class="title">绑定微信</div>
              <div class="sub-title">可用微信登录当前账号</div>
            </div>
          </div>
          <div class="right">换绑</div>
        </div> -->
        <div class="list-items-box">
          <div class="left">
            <img src="../../../assets/image/bossSide/icon-yx.png" alt="" />
            <div class="item-info-box">
              <div class="title">绑定安全邮箱</div>
              <div class="sub-title">可用于找回账号和密码</div>
            </div>
          </div>
          <div class="right">换绑</div>
        </div>
        <div class="list-items-box">
          <div class="left">
            <img src="../../../assets/image/bossSide/icon-zjhm.png" alt="" />
            <div class="item-info-box">
              <div class="title">设置主叫号码 15210022053</div>
              <div class="sub-title">仅可使用主叫号码联系人才</div>
            </div>
          </div>
          <div class="right">换绑</div>
        </div>
      </div>
      <!-- 账号安全 结束-->

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabStatus: 1,
      nickname:"Lucy",
      job: "",
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
        margin-right: 18px;
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
  }
  .jc-info-box{
    .items-box{
      width: 100%;
      display: flex;
      align-items: center;
      margin-top: 20px;
      &:nth-of-type(1){
        margin-top: 0px;
      }
      .title{
        width: 71px;
        height: 24px;
        font-size: 16px;
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
    }
  }
  .list-items-box{
    width: 100%;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left{
      display: flex;
      align-items: center;
      &>img{
        width: 48px;
        height: 48px;
      }
      .item-info-box{
        padding-left: 20px;
        .title{
          font-weight: bold;
          font-size: 16px;
          color: $g_textColor;
        }
        .sub-title{
          margin-top: 6px;
          text-align: center;
          font-size: 14px;
          font-weight: 400;
          color: #86909CFF;
        }
      }
    }
    .right{
      width: 140px;
      height: 40px;
      text-align: center;
      font-size: 14px;
      line-height: 40px;
      border: 1px solid #E5E6EBFF;
      border-radius: 4px;
      color: $g_textColor;
      cursor: pointer;
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