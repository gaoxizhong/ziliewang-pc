<template>
  <div class="container" id="myProfessionalCircle">

    <div class="info-box">
      <!-- 左侧模块 开始 -->
      <div class="info-left-box">
        <div class="left-box user-top-box">
          <div class="user-top">
            <img :src="infoData.avatar" alt="" class="user-img"/>
            <p class="user-name">{{ infoData.real_name }}</p>
            <!-- <div class="gz-sx-btn">
              <div class="left">
                <img src="../../../assets/image/Frame_10.png" alt="" />
                <span>关注</span>
              </div>
              <div class="right">发私信</div>
            </div> -->
          </div>
          <div class="user-top-num">
            <div>
              <span class="title">{{ infoData.attention_num }}</span>
              <span class="text">关注</span>
            </div>
            <div>
              <span class="title">{{ infoData.fan_num }}</span>
              <span class="text">粉丝</span>
            </div>
          </div>
        </div>

        <div class="left-box user-m-box">
          <div class="m-items-box">
            <img src="../../../assets/image/shopping-mall.png" alt="" />
            <span>就职于</span>
            <p>{{ infoData.company_name }}</p>
          </div>
          <div class="m-items-box">
            <img src="../../../assets/image/handbag.png" alt="" />
            <span>职位</span>
            <p>{{ infoData.position }}</p>
          </div>
          <div class="m-items-box">
            <img src="../../../assets/image/user-business.png" alt="" />
            <span>目前状态</span>
            <p>{{ infoData.work_status_desc }}</p>
          </div>
        </div>

        <div class="left-box user-b-box">
          <div @click="logout">退出登录</div>
        </div>
      </div>
      <!-- 左侧模块 结束 -->
      <!-- 右侧模块 开始 -->
      <div class="info-right-box">
        <div class="info-right-top">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label=" `全部${count_list.all_count}` " name="first"></el-tab-pane>
            <el-tab-pane :label=" `动态${count_list.dynamic_state_Count}` " name="second"></el-tab-pane>
            <el-tab-pane :label=" `评论${count_list.comment_count}` " name="fourth"></el-tab-pane>
          </el-tabs>
          <div class="fb-btn" @click="clickPublishBtn">发布动态</div>
        </div>
        <div class="info-right-container">
          <!-- 列表项 开始 -->
          <div class="container-items-box" v-for="(item,index) in infoList" :key="index">
            <!-- <div class="right-container-title"><span>回忆那么真</span><span>发布了动态</span></div> -->
            <div class="right-container-item">
              <div class="title">
                <div class="title-left">
                  <img :src="infoData.avatar" alt="" />
                  <span>{{ infoData.name }}</span>
                </div>
                <div class="title-t">{{ item.createtime }}</div>
              </div>

              <div class="items-c-box">
                <div class="items-c-p">{{ item.content }}</div>
                <div class="items-img-box">
                  <img :src="item.images" alt="" />
                </div>
                <div class="items-bottom-btn">
                  <div class="bottom-btn-items">
                    <img src="../../../assets/image/preview-open.png" alt="" />
                    <span>{{ item.comment_num }}阅读</span>
                  </div>
                  <div class="bottom-btn-items">
                    <img src="../../../assets/image/thumbs-up.png" alt="" />
                    <span>{{ item.point_num }}点赞</span>
                  </div>
                  <div class="bottom-btn-items">
                    <img src="../../../assets/image/comment.png" alt="" />
                    <span>{{ item.read_num }}评论</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <!-- 列表项 结束 -->

        </div>
      </div>
      <!-- 右侧模块 结束 -->

    </div>
    <!-- 、、、、 发布弹窗 、、、、 -->
    <el-dialog :visible.sync="dialogVisible" width="640px" :before-close="handleClose">
      <div class="dialog-bodybox">
        <div class="dialog-img-box">

          <div class="img-item" v-for="(item,index) in upImgList" :key="index">
            <img :src="item.upload_files" alt="" />
          </div>

          <div class="img-item add">
            <el-upload class="avatar-uploader" 
              ref="upload" 
              action= "none"
              multiple
              :limit="3"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :data="uploadData"
              :http-request="uploadArticleCover" 
              >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>

        </div>
        <div class="dialog-content-box">
          <el-input
            type="textarea"
            :rows="8"
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
        </div>
      </div>
      
      <div slot="footer" class="dialog-footer">
        <!-- <div><span>1</span><span>2</span><span>3</span></div> -->
        <el-button type="primary" @click="clickMaskBtn">发布</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getToken, setToken, removeToken } from '@/utils/auth';
export default {
  name: 'myProfessionalCircle',
  components: {
  },
  data(){
    return{
      activeName: 'first',
      infoData:{}, // 信息
      infoList:[],
      count_list:{},
      dialogVisible: false,
      uploadData:{
        up_tag: 'other'
      },
      textarea:'',
      upImgList:[],
      is_return: true,
     
    }
  },
  computed: {
    
  },
  mounted(){
    // 获取用户职圈信息
    this.getMyProfessionCircle();
  },
  methods: {
    // 点击发布
    clickPublishBtn(){
      this.dialogVisible = true;
    },  
    //点击弹窗发布按钮
    clickMaskBtn(){
      let upImgList = this.upImgList;
      let images = [];
      upImgList.forEach( ele =>{
        images.push(ele.upload_files_path)
      })
      let p = {
        content: this.textarea,
        images
      }
      if( !this.is_return ){
        return
      }
      this.is_return = false;
      this.$axios.post('/api/profession-circle/create',p).then( res =>{
        if(res.code == 0){
          this.$message.success('发布成功！');
          this.dialogVisible = false;
          this.upImgList = [];
          // 获取用户职圈信息
          this.getMyProfessionCircle();
        } 
        this.is_return = true;
      }).catch(e =>{
        console.log(e)
        this.is_return = true;
      })
      
    },
    handleClose(done) {
      this.dialogVisible = false;
    },
    logout() {
      // debugger
      setToken('');
      // 清除缓存的权限菜单
      sessionStorage.removeItem("route")
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 获取用户职圈信息
    getMyProfessionCircle(){
      this.$axios.post('/api/profession-circle/my',{}).then( res =>{
        if(res.code == 0){
          this.infoData = res.data.users;
          this.infoList = res.data.list;
          this.count_list = res.data.count_list;
        }
      }).catch(e =>{
        console.log(e)
      })
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
        let data = res.data;
        this.upImgList.push(data);

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
  }
};
</script>

<style lang="scss" scoped>
  @import '../../../styles/professionalCircle.scss';
  #myProfessionalCircle /deep/ .el-dialog{
    top: 50%;
    transform: translateY(-50%);
    margin-top: 0 !important;
    .dialog-bodybox{
      width: 100%;
      border-radius: 8px;
      border: 1px solid #E5E6EB;
      padding: 12px;
      .dialog-img-box{
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        .img-item{
          width: 76px;
          height: 76px;
          background: #f7f8fa;
          flex-shrink: 0;
          border-radius: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          border: 1px solid #dedfe0;
          margin-left: 0.6rem;

          img {
            width: 100%;
            height: 100%;
            border-radius: 8px;
            -o-object-fit: cover;
            object-fit: cover;
            display: block;
          }
          &:nth-of-type(1){
            margin-left: 0;
          }
        }
        .img-item.add {
          transition: all .2s ease-in-out;
          border: 1px dashed #dedfe0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: bold;
          color: $g_textColor;
          .avatar-uploader{
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .el-upload {
              display: inline-block;
              text-align: center;
              cursor: pointer;
              outline: 0;
              width: 100%;
              height: 100%;
              line-height: 76px;
            }
            .el-upload-dragger{
              width: 100%;
              height: 100%;
              background: none;
              border: none;
            }
          }
        }

      }
      .dialog-content-box{
        width: 100%;
        height: 100%;
        margin-top: 16px;
        .el-textarea__inner{
          font-size: 14px;
          padding: 0;
          border: none;
          &:focus{
            border-color: $g_color;
          }
        }
      }
    }
    .el-dialog__body{
      padding: 30px 20px 0 20px;
    }
    .el-button{
      padding: 0;
      width: 100px;
      height: 40px;
      line-height: 40px;
    }
    .el-button--primary{
      background-color: $g_color;
      border-color: $g_color;
    }
  }
</style>
