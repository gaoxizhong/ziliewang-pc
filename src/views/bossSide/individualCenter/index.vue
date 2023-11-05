<template>
  <!-- 企业主页 -->
  <div class="bossSide-container">
    <div class="tab-box">
      <div class="tab-left">
        <div :class="tabStatus == 1?'hover-items':'' " @click="clickStatus(1)">基本信息</div>
        <div :class="tabStatus == 2?'hover-items':'' " @click="clickStatus(2)">账号安全</div>
        <!-- <div :class="tabStatus == 3?'hover-items':'' " @click="clickStatus(3)">员工关系</div> -->
        <!-- <div :class="tabStatus == 4?'hover-items':'' " @click="clickStatus(4)">隐私中心</div> -->
      </div>
    </div>
    <div class="m-box margin-top-20">
      <!-- 基本信息 开始-->
      <div class="jc-info-box" v-if="tabStatus == 1">
        <div class="items-box">
          <div class="title">头像</div>
          <!-- <div class="avatar-box">
            <img src="../../../assets/image/bossSide/img-user.jpg" alt="" />
          </div> -->
          <div class="info-avatar">
            <div class="info-avatar-i">
              <el-upload class="avatar-uploader" 
                drag ref="upload" 
                action= "none"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :data="uploadData"
                :http-request="uploadArticleCover" 
                >
                <img :src=" infoData.avatar ? infoData.avatar : require('../../../assets/image/bossSide/img-user.jpg' )" alt="" />
              </el-upload>
            </div>
          </div>
          <span class="sub-span">该头像将对求职者可见</span>
        </div>
        <!-- <div class="items-box">
          <div class="title">用户名</div>
          <span class="name-span">zjafsqyf482386</span>
        </div> -->
        <div class="items-box">
          <div class="title"><span>* </span>姓名</div>
          <el-input v-model="infoData.staff_name" placeholder="姓名"></el-input>
          <!-- <span class="sub-span">该头像将对求职者可见</span> -->
        </div>
        <!-- <div class="items-box">
          <div class="title"><span>* </span>职务</div>
          <el-input v-model="infoData.job" placeholder="请输入"></el-input>
          <span class="sub-span">该头像将对求职者可见</span>
        </div> -->
        <div class="btn-box">
          <el-button type="primary" @click="setUserSave">保存</el-button>
          <!-- <el-button @click="resetForm('ruleForm')">取消</el-button> -->
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
              <div class="sub-title">{{ infoData.phone }}</div>
            </div>
          </div>
          <!-- <div class="right">换绑</div> -->
        </div>
        <div class="list-items-box">
          <div class="left">
            <img src="../../../assets/image/bossSide/icon-sfz.png" alt="" />
            <div class="item-info-box">
              <div class="title">已通过实名认证</div>
              <div class="sub-title"><span>姓名：{{ infoData.staff_name }}</span><span style="padding-left: 10px;">身份证：{{ infoData.id_card }}</span></div>
            </div>
          </div>
          <!-- <div class="right">换绑</div> -->
        </div>
        <!-- <div class="list-items-box">
          <div class="left">
            <img src="../../../assets/image/bossSide/icon-zhmm.png" alt="" />
            <div class="item-info-box">
              <div class="title">账号密码</div>
              <div class="sub-title"><span>账号：zjayhyz8927394</span></div>
            </div>
          </div>
          <div class="right">换绑</div>
        </div> -->
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
              <div class="sub-title">{{ infoData.real_email }}  可用于找回账号和密码</div>
            </div>
          </div>
          <!-- <div class="right">换绑</div> -->
        </div>
        <div class="list-items-box">
          <div class="left">
            <img src="../../../assets/image/bossSide/icon-zjhm.png" alt="" />
            <div class="item-info-box">
              <div class="title">设置主叫号码 {{ infoData.phone }}</div>
              <div class="sub-title">仅可使用主叫号码联系人才</div>
            </div>
          </div>
          <!-- <div class="right">换绑</div> -->
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
      infoData:{
        staff_name:"Lucy",
        job: "",
        avatar:'',
      },
      
      upload_files_path:'',
      uploadData:{
        up_tag: 'avatar'
      },
    }
  },
  created(){
    //  获取信息
    this.getUserInfo();
  },
  methods:{
    //  获取信息
    getUserInfo(){
      let that = this;
      that.$axios.post('/api/staff/profile',{}).then( res =>{
        console.log(res)
        if(res.code == 0){
          that.infoData = res.data;
        }
      })
    },    
    //  修改信息
    setUserSave(){
      let that = this;
      // let p = Object.assign({},data);
      let p = {
        avatar: that.upload_files_path,
        staff_name: that.infoData.staff_name,
      }
      that.$axios.post('/api/staff/save',p).then( res =>{
        console.log(res)
        if(res.code == 0){
          that.$message.success('修改成功！');
          localStorage.setItem('staff_name',p.staff_name); // 用户名缓存
          localStorage.setItem('staffAvatar', this.infoData.avatar); // 用户头像缓存
          this.$store.dispatch('user/SET_staffName', p.staff_name); // vuex
          this.$store.dispatch('user/SET_staffAvatar', this.infoData.avatar); // vuex);
        }
      })
    },
    clickStatus(n){
      this.tabStatus = n;
    },
    // 上传图片--- 头像
    uploadArticleCover(param){
      console.log(param.file)
      const formData = new FormData();
      formData.append('file[]',param.file);
      formData.append('pictureCategory','articleCover');
      formData.append('up_tag','avatar');
      this.$axios.post('/api/upload',formData,{'Content-Type': 'multipart/form-data'}).then( res=>{
        console.log(res)
        this.infoData.avatar = res.data.upload_files;
        this.upload_files_path = res.data.upload_files_path;
        this.$refs['upload'].clearFiles();

        // let p = {
        //   avatar: upload_files_path
        // }
        // this.setUserSave(p);
      }).catch( e=>{
        console.log('erro')
        this.$refs['upload'].clearFiles()
      })
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPG = file.type === 'image/png' || 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传图片只能是 jpeg 或 png 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
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
      .info-avatar{
        width: 68px;
        height: 68px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        margin-left: 40px;
        img{
          width: 100%;
          height: 100%;
        }
        .info-avatar-i{
          width: 100%;
          height: 100%;
          background: #898a8b7a;
          // display: none;
          text-align: center;
          line-height: 68px;
          color: #ffffff;
          position: absolute;
          left: 0;
          top: 0;
          cursor: pointer;
          .avatar-uploader::v-deep .el-upload-dragger{
            width: 100%;
            height: 100%;
            border: none;
            background: none;
          }
          .avatar-uploader::v-deep .el-upload-dragger .el-icon-camera{
            font-size: 28px;
          }
        }
        &:hover .info-avatar-i{
          display: block;
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
          text-align: left;
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