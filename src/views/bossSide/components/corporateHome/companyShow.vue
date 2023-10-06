<template>
  <div class="label-items-box">
    <div class="box-title">
      <div class="title-1">秀出企业视频与美图</div>
      <div class="title-2">亮眼的视频和图片是企业品牌建设的重要一步</div>
    </div>
    <!-- <div class="items-box">
      <div class="title">企业视频 (选填)</div>
      <div class="info-box">
        <div class="info-items">
          <el-upload class="avatar-uploader" 
            drag ref="upload" 
            action= "none"
            :accept="video_accept" 
            :limit="3"
            :show-file-list="false"
            multiple
            :http-request="up_video" 
            :on-exceed='limitCheck'
            >
            <img src="../../../../assets/image/bossSide/icon-add.png" alt="" class="add-img" />
            <div class="file-tips">企业视频 (选填)</div>
          </el-upload>
        </div>
      </div>
    </div> -->
    <div class="items-box">
      <div class="title">企业美图 (选填)</div>
      <div class="info-box">
        <div class="info-items" v-for="(item,index) in image_files_path" :key="index">
          <img :src="item" alt="" class="image-box" />
        </div>
        <div class="info-items">
          <el-upload class="avatar-uploader" 
            drag ref="upload" 
            action= "none"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :http-request="up_image" 
            >
            <img src="../../../../assets/image/bossSide/icon-add.png" alt="" class="add-img" />
            <div class="file-tips">点击上传美图</div>
          </el-upload>
        </div>
      </div>
    </div>

    <div class="btn-box">
      <el-button type="primary" @click="submitForm">保存</el-button>
    </div>
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
      video_accept:'.mp4', // 接受上传文件
      video_files_path:[],
      image_files_path:[],
    }
  },
  created(){
    // 获取信息
    this.getDetail();
  },
  mounted(){
 
  },
  computed: {
    
  },
  methods: {
    // 选择的文件超出限制的文件总数量时触发
    limitCheck() {
      this.$message.warning('每次最多上传10个文件')
    },
    // 点击上传 ----  视频
    up_video(param){
      let that = this;
      console.log(param.file)
      const formData = new FormData();
      formData.append('file[]',param.file);
      formData.append('up_tag','resume');
      that.$axios.post('/api/upload',formData,{'Content-Type': 'multipart/form-data'}).then( res=>{
        console.log(res)
        that.video_files_path = res.data.upload_files_path;
        that.$refs['upload'].clearFiles();
      }).catch( e=>{
        console.log(e)
        that.$refs['upload'].clearFiles()
      })
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPG = file.type === 'image/png' || 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 10;

      if (!isJPG) {
        this.$message.error('上传图片只能是 jpeg 或 png 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 点击上传图片
    up_image(param){
      if(this.image_files_path.length > 10){
        that.$message.error({
          message: '最多上传10条！'
        })
        return
      }
      const formData = new FormData();
      formData.append('file[]',param.file);
      // formData.append('pictureCategory','articleCover');
      formData.append('up_tag','business_license');
      this.$axios.post('/api/upload',formData,{'Content-Type': 'multipart/form-data'}).then( res=>{
        this.image_files_path.push(res.data.upload_files);
        this.$refs['upload'].clearFiles();
      
      }).catch( e=>{
        console.log('erro')
        this.$refs['upload'].clearFiles()
      })
    },
    // 获取信息
    getDetail(){
      let that = this;
      that.$axios.post('/api/company/image/detail',{}).then( res =>{
        console.log(res)
        if(res.code == 0){
          that.image_files_path =  res.data.images.split(',');
          that.video_files_path =  res.data.video.split(',');

        }else{
          that.$message.error({
            message:res.msg
          })
        }
      }).catch( e=>{
        console.log(e)
      })
    },
    // 点击发布
    submitForm(){
      let that = this;
      let p = {
        images: that.image_files_path.join(','),
        video: that.video_files_path.join(','),
      };
      that.$axios.post('/api/company/image/create',p).then( res =>{
        console.log(res)
        if(res.code == 0){
          that.$message.success({
            message:'上传成功！'
          })
          setTimeout( ()=>{
            that.getDetail();
          },1000)
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
    .box-title{
      margin-top: 10px;
      .title-1{
        font-size: 16px;
        font-weight: bold;
        color: $g_textColor;
        line-height: 24px;
      }
      .title-2{
        margin-top: 8px;
        font-size: 14px;
        font-weight: 400;
        color: #4E5969;
        line-height: 22px;
      }
    }
    .items-box{
      width: 100%;
      margin-top: 24px;
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
          .image-box{
            width: 100%;
            height: 100%;
          }
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
    & .el-input{
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
</style>
