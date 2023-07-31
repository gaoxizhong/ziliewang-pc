<template>
  <div class="container">
    <div class="info-title-box myResume-plate">
      <div class="info-title-top" v-if=" !redact_info ">
        <div class="info-avatar">
          <img :src=" data.avatar ? data.avatar : require('../../../../assets/image/img-user.jpg' )" alt="" />
          <div class="info-avatar-i">
            <el-upload class="avatar-uploader" 
              drag ref="upload" 
              action= "none"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :data="uploadData"
              :http-request="uploadArticleCover" 
              >
              <i class="el-icon-camera"></i>
            </el-upload>
          </div>
        </div>
        <div style="flex: 1;padding-left: 0.9rem;">
          <div class="info-1">
            <span class="info-name">{{ data.name }}</span>
            <span class="info-set" @click="clickRedactBtn(1)">编辑</span>
          </div>
          <ul class="info-2">
            <li>
              <img src="../../../../assets/image/Frame_1.png" alt="">
              <span>{{ data.birth_year_month?data.birth_year_month:'无' }}</span>
            </li>
            <li>
              <img src="../../../../assets/image/Frame_2.png" alt="">
              <span>{{ data.work_year?data.work_year:'无' }}</span>
            </li>
            <li>
              <img src="../../../../assets/image/Frame_5.png" alt="">
              <span>宁波</span>
            </li>
            <li>
              <img src="../../../../assets/image/Frame_5.png" alt="">
              <span v-if="data.work_status == 2">在职不考虑</span>
              <span v-else-if="data.work_status == 3">在职，看看新机会</span>
              <span v-else-if="data.work_status == 4">离职</span>
              <span v-else>离职</span>

            </li>
          </ul>
          <ul class="info-2">
            <li>
              <img src="../../../../assets/image/Frame_6.png" alt="">
              <span>{{ data.phone }}</span>
            </li>
            <li>
              <img src="../../../../assets/image/Frame_4.png" alt="">
              <span>{{ data.email }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="redact-title-top" v-else>

        <div class="mb20 redact-item">
          <div class="item-label">姓名</div>
          <div class="item-content">
            <el-input v-model="infoData.name" placeholder="请输入姓名" clearable></el-input>
          </div>
        </div>

        <div class="mb20 redact-item">
          <div class="item-label">邮箱</div>
          <div class="item-content">
            <el-input v-model="infoData.email" placeholder="请输入邮箱" clearable></el-input>
          </div>
        </div>

        <div class="mb20 redact-item">
          <div class="item-label">性别</div>
          <div class="item-content">
            <div class="radio-item" :class="radio == 1 ? 'radio-checked':'' " @click="clickRadio(1)">男</div>
            <div class="radio-item" :class="radio == 2 ? 'radio-checked':'' " @click="clickRadio(2)">女</div>
          </div>
        </div>
        
        <div class="form-btns">
          <el-button @click="clickInfoCancelBtn">取消</el-button>
          <el-button type="primary" @click="clickInfoVerifyBtn">确定</el-button>
        </div>
        
      </div>
      <div class="info-title-bottom" v-if="!redact_spot">
        <div class="jobExpectation-title-box">
          <span class="info-t">优势亮点</span>
          <span class="info-set" @click="clickRedactBtn(2)">编辑</span>
        </div>
        <div class="info-title-x">{{ data.advantages_highlights?data.advantages_highlights:'暂无' }}</div>
      </div>
      <div class="redact-title-bottom" v-else>
        <div class="jobExpectation-title-box">
          <span class="info-t">优势亮点</span>
        </div>
        <div class="textarea-box">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="infoData.advantages_highlights">
          </el-input>
        </div>
        <div class="form-spotbtns">
          <el-button @click="clickSpotCancelBtn">取消</el-button>
          <el-button type="primary" @click="clickSpotVerifyBtn">确定</el-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import config from '../../../../axios/config'

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
      redact_info: false, 
      redact_spot: false,
      infoData: {},
      radio: 0,
      fileList:[],
      imageUrl:'',
      uploadData:{
        up_tag: 'avatar'
      }
    }
  },
  mounted(){
 
  },
  computed: {
    
  },
  methods: {
    // 选择的文件超出限制的文件总数量时触发
    limitCheck() {
      this.$message.warning('每次只能上传一个文件')
    },
    // 上传图片
    uploadArticleCover(param){
      console.log(param.file)
      const formData = new FormData();
      formData.append('file[]',param.file);
      formData.append('pictureCategory','articleCover');
      formData.append('up_tag','avatar');
      this.$axios.post('/api/upload',formData,{'Content-Type': 'multipart/form-data'}).then( res=>{
        console.log(res)
        this.data.avatar = res.data.upload_files;
        let upload_files_path = res.data.upload_files_path;

        this.$refs['upload'].clearFiles()
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
        this.$message.error('上传头像图片只能是 jpeg 或 png 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    clickRadio(n){
      this.infoData.radio = n;
      this.radio = n;
      console.log(this.infoData)
    },
    clickRedactBtn(n){
      this.infoData = JSON.parse(JSON.stringify(this.data));
      this.radio = this.infoData.radio;
      if(n == 1){
        this.redact_info = true;
      }else if(n == 2){
        this.redact_spot = true;
      }
      
    }, 
    // 点击编辑个人信息取消按钮
    clickInfoCancelBtn(){
      this.redact_info = false;
    },
    // 点击编辑个人信息确定按钮
    clickInfoVerifyBtn(){

      this.redact_info = false;
    },
    // 点击优势亮点取消按钮
    clickSpotCancelBtn(){
      this.redact_spot = false;
    },
    // 点击优势亮点确定按钮
    clickSpotVerifyBtn(){

      this.redact_spot = false;
    },

  },
};
</script>

<style lang="scss" scoped>
  .myResume-plate{
    width: 100%;
    border-radius: 6px;
    background: #fff;
    margin-bottom: 16px;
    .jobExpectation-title-box{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .info-t{
        font-size: 18px;
        font-weight: bold;
        color: $g_textColor;
        line-height: 24px;
      }
      .info-icon-img{
        width: 22px;
        height: 22px;
        cursor: pointer;
      }

    }
  }
  .info-title-box{
    .info-title-top{
      width: 100%;
      display: flex;
      padding: 24px 30px;
      .info-avatar{
        width: 64px;
        height: 64px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        img{
          width: 100%;
          height: 100%;
        }
        .info-avatar-i{
          width: 100%;
          height: 100%;
          background: #898a8b7a;
          font-size: 28px;
          display: none;
          text-align: center;
          line-height: 64px;
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
      

      .info-1{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .info-name{
          font-size: 18px;
          font-weight: bold;
          color: $g_textColor;
        }

      }
      .info-2{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        li{
          display: flex;
          align-items: center;
          margin-top: 8px;
          margin-left: 30px;
          line-height: 22px;
          img{
            width: 14px;
            height: 14px;
          }
          span{
            font-size: 14px;
            color: $g_textColor;
            padding-left: 4px;
          }
        }
        li:nth-of-type(1){
          margin-left: 0;
        }
      }
    }
    .redact-title-top{
      padding: 24px 15px;
      background: #F4F5F7;
      text-align: left;
      position: relative;
      .redact-item{
        display: inline-block;
        width: 50%;
        vertical-align: top;
        padding: 0 15px;
        .item-label{
          font-size: 14px;
          text-align: right;
          vertical-align: middle;
          color: #495060;
          line-height: 1;
          box-sizing: border-box;
          float: none;
          display: inline-block;
          padding: 0 0 10px;
        }
        .item-content {
          position: relative;
          line-height: 32px;
          display: flex;
          .radio-item{
            flex: 1;
            min-width: auto;
            line-height: 36px;
            display: inline-block;
            border: 1px solid #e3e7ed;
            background-color: #fff;
            text-align: center;
            cursor: pointer;
            color: #9fa3b0;
            margin-right: 20px;
            white-space: nowrap;
            position: relative;
            vertical-align: middle;
            font-size: 16px;
            &:last-of-type {
              margin-right: 0;
            }
          }
          .radio-checked {
            border-color: $g_color;
            color: $g_color;
            background-color: #effbfa;
          }
        }
      }
      .redact-item:nth-child(odd) {
        margin-bottom: 0;
      }
      .form-btns{
        position: absolute;
        bottom: 26px;
        right: 15px;
        text-align: right;
        padding: 0 15px;
      }
    }
    .info-title-bottom{
      padding: 24px 30px;
      .info-title-x{
        padding: 10px 0;
        margin-top: 6px;
        font-size: 12px;
        font-weight: 400;
        color: #4E5969;
        line-height: 22px;
        text-align: left;
      }
    }
    .redact-title-bottom{
      padding: 20px 30px;
      background: #F4F5F7;
      text-align: left;
      position: relative;
      .textarea-box{
        width: 100%;
        margin-top: 10px; 
        font-size: 14px;
        /deep/ .el-textarea__inner{
          font-size: 14px;
          &:focus{
            border-color: $g_color;
          }
        }
      }
      .form-spotbtns{
        margin-top: 16px;
        width: 100%;
        text-align: right;
      }
    }
    /deep/ .el-button{
      padding: 0;
      width: 100px;
      height: 40px;
      line-height: 40px;
    }
    /deep/ .el-button--primary{
      background-color: $g_color;
      border-color: $g_color;
    }
  }
  .info-set{
    font-size: 14px;
    font-weight: 400;
    color: $g_color;
    cursor: pointer;
  }

</style>
