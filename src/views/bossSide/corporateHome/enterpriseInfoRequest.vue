<template>
  <!-- 企业主页---申请企业页 -->

  <div class="bossSide-container">
    <div class="m-box">
      <div class="title">企业申请</div>
      <div class="info-box">
        <div class="items-box">
          <div class="title"><span>* </span>公司名称</div>
          <el-input v-model="company_name" placeholder="公司名称"></el-input>
        </div>
        <div class="items-box">
          <div class="title"><span>* </span>法人</div>
          <el-input v-model="legal_person" placeholder="法人"></el-input>
        </div>
        
        <div class="items-box">
          <div class="title"><span>* </span>公司注册地址</div>
          <el-input v-model="company_register_address" placeholder="公司注册地址"></el-input>
        </div>
        <div class="items-box">
          <div class="title"><span>* </span>组织代码</div>
          <el-input v-model="organization_code" placeholder="组织代码"></el-input>
        </div>

        <div class="items-box">
          <div class="title"><span>* </span>企业logo</div>
          <div class="z_file fl">
            <el-upload class="avatar-uploader" 
              drag ref="upload" 
              action= "none"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :data="uploadData"
              :http-request="up_logo_img" 
              >
              <img :src="logo?logo:require('../../../assets/image/bossSide/a11.png')" alt="" class="add-img" />
            </el-upload>
          </div>
        </div>

        <div class="items-box">
          <div class="title"><span>* </span>营业执照</div>
          <div class="z_file fl">
            <el-upload class="avatar-uploader" 
              drag ref="upload" 
              action= "none"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :data="uploadData"
              :http-request="up_business_license_img" 
              >
              <img :src="business_license?business_license:require('../../../assets/image/bossSide/a11.png')" alt="" class="add-img" />
            </el-upload>
          </div>
        </div>

        <div class="btn-box">
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data(){
    return {
      company_name: '', // 公司名称
      legal_person: '', //法人
      company_register_address: '', // 注册地址
      organization_code: '',  //组织代码
      business_license:'', // 营业执照照片
      logo: '', //logo
      upload_files_path:'',
      uploadData:{
        up_tag: 'business_license'
      },
    }
  },
  methods:{
     // 选择的文件超出限制的文件总数量时触发
     limitCheck() {
      this.$message.warning('每次只能上传一个文件')
    },
    //公司logo
    up_logo_img(param){
      const formData = new FormData();
      formData.append('file[]',param.file);
      // formData.append('pictureCategory','articleCover');
      formData.append('up_tag','logo');
      this.$axios.post('/api/upload',formData,{'Content-Type': 'multipart/form-data'}).then( res=>{
        console.log(res)
        this.logo = res.data.upload_files;
        this.$refs['upload'].clearFiles();
       
      }).catch( e=>{
        console.log('erro')
        this.$refs['upload'].clearFiles()
      })
    },
    // 营业执照 ---- 上传图片
    up_business_license_img(param){
      console.log(param.file)
      const formData = new FormData();
      formData.append('file[]',param.file);
      // formData.append('pictureCategory','articleCover');
      formData.append('up_tag','business_license');
      this.$axios.post('/api/upload',formData,{'Content-Type': 'multipart/form-data'}).then( res=>{
        console.log(res)
        this.business_license = res.data.upload_files;
        this.$refs['upload'].clearFiles();
       
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

    // 点击提交
    submitForm(){
      let that = this;
      let p = {
        company_name: that.company_name, // 公司名称
        legal_person: that.legal_person, // 法人
        company_register_address: that.company_register_address, //公司注册地址
        organization_code: that.organization_code, // 组织代码
        business_license: that.business_license, //营业执照
        logo: that.logo, //公司logo
      }
      if(p.company_name == ''){
        that.$message.warning('公司名称不能为空!');
        return
      }
      if(p.legal_person == '' || !p.legal_person){
        that.$message.warning('法人不能为空!');
        return
      }
      if(p.company_register_address == ''){
        that.$message.warning('公司注册地址不能为空!');
        return
      }
      if(p.organization_code == '' || !p.organization_code){
        that.$message.warning('组织代码不能为空!');
        return
      }
      if(p.business_license == '' || !p.business_license){
        that.$message.warning('营业执照不能为空!');
        return
      }
      if(p.logo == '' || !p.logo){
        that.$message.warning('公司logo不能为空!');
        return
      }
      that.$axios.post('/api/company/apply',p).then( res =>{
        console.log(res)
        if(res.code == 0){
          that.$message.success('提交成功，等待审核中！');
          setTimeout(()=>{
            that.$router.push({ path:'/' })
          },1500)
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    resetForm(){
      this.company_name = ''; // 公司名称
      this.legal_person = ''; //法人
      this.company_register_address = ''; // 注册地址
      this.organization_code = '';  //组织代码
      this.business_license = ''; // 营业执照照片
      this.logo = ''; //logo
    }
  }
}
</script>

<style lang="scss" scoped>
  .title{
    font-weight: bold;
    font-size: 16px;
  }
  .info-box{
    margin-top: 16px;
    .items-box{
      width: 100%;
      display: flex;
      align-items: center;
      margin-top: 20px;
      &:nth-of-type(1){
        margin-top: 0px;
      }
      .title{
        width: 120px;
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
      .z_file {
        width: 128px;
        height: 128px;
        margin-left: 40px;
        position: relative;
        .add-img{
          display: block;
          width: 128px;
          height: 128px;
          border: none;
        }
        .avatar-uploader{
          width: 100%;
          height: 100%;
          &::v-deep .el-upload {
            width: 100%;
            height: 100%;
          }
          &::v-deep .el-upload-dragger{
            width: 100%;
            height: 100%;
          }
          &::v-deep .el-upload-dragger .el-icon-camera{
            font-size: 28px;
          }
        }
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