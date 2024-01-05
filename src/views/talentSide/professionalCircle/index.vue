<template>
  <!-- 职圈 -->
  <div id="professionalCircle">
    <div class="container-title-box">
      <div style="width: 1200px; position: relative;">
        <el-tabs v-model="tag" @tab-click="handleClick">
          <el-tab-pane label="好友列表" name="buddyList"></el-tab-pane>
          <el-tab-pane label="好友动态" name="attention"></el-tab-pane>
          <el-tab-pane label="头条" name="hot"></el-tab-pane>
          <!-- <el-tab-pane label="直播" name="live"></el-tab-pane> -->
        </el-tabs>
        <div class="fb-btn" @click="clickPublishBtn">发布动态</div>
      </div>
    </div>
    <!-- 好友列表 开始 -->
    <div class="container info-box interaction-box" v-if=" tag == 'buddyList' ">
      <buddyChart /> 
      <!-- <Chat ref="chat"/> -->
    </div>
    <!-- 好友列表 结束 -->
    <!-- 好友动态 、 头条 开始 -->
    <div class="container info-box" v-if=" tag == 'hot'|| tag == 'attention'">
      <div class="info-left-box">
        <div class="info-right-container">
          <!-- 列表项 开始 -->
          <div class="container-items-box" v-for="(item,index) in dataList" :key="index">
            <div class="right-container-item" @click.stop="clicklistItems(item)" v-if="item.users">
              <div class="title">
                <div class="title-left" @click.stop="clickName(item)">
                  <img :src=" item.users.avatar ? item.users.avatar : require('../../../assets/image/img-user.jpg' )" alt="" />
                  <span>{{ item.users.name }}</span>
                </div>
                <div class="title-t">{{ item.createtime }}</div>
              </div>

              <div class="items-c-box">
                <div>
                  <div class="items-c-p">{{ item.content }}</div>
                  <div class="items-img-box" v-if="item.images">
                    <img :src="img_item" alt="" v-for="(img_item,idx) in item.images" :key="idx"/>
                  </div>
                  <!-- <div class="items-img-box" v-if="item.images">
                    <img :src="item.images" alt="" />
                  </div> -->
                </div>
                <div class="items-bottom-btn">
                  <div class="bottom-btn-items">
                    <img src="../../../assets/image/preview-open.png" alt="" />
                    <span>{{ item.read_num?item.read_num:0 }}阅读</span>
                  </div>
                  <div class="bottom-btn-items" v-if="item.is_point == 2">
                    <img src="../../../assets/image/thumbs-up.png" alt="" />
                    <span>{{ item.point_num?item.point_num:0 }} 赞</span>
                  </div>
                  <div class="bottom-btn-items" v-else>
                    <img src="../../../assets/image/thumbs-up.png" alt="" />
                    <span class="point-hover">{{ item.point_num?item.point_num:0 }} 已赞</span>
                  </div>
                  <div class="bottom-btn-items">
                    <img src="../../../assets/image/comment.png" alt="" />
                    <span>{{ item.comment_num?item.comment_num:0 }}评论</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <!-- 列表项 结束 -->
          <el-empty description="暂无数据..." v-if="dataList.length == 0"></el-empty>
        </div>
      </div>
      <!-- 右侧模块 开始 -->
      <div class="info-right-box">
        <!-- 热门推荐 -->
        <hotRecommendation />
      </div>
      <!-- 右侧模块 结束 -->
    </div>
    <!-- 好友动态 、 头条 结束 -->
    <div class="container info-box" style="justify-content: center;" v-if="tag == 'live'"> 
      <live />
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
import hotRecommendation from './components/hotRecommendation.vue';
import live from '../../talentSide/liveBroadcast/index.vue';
import buddyChart from '../components/buddyChart.vue';
// import Chat from "../components/chat.vue"
export default {
  name: 'myProfessionalCircle',
  components: {
    hotRecommendation,
    live,
    buddyChart,
    // Chat
  },
  data(){
    return{
      tag: 'buddyList',
      page: 1,
      dataList:[],
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

  },
  created(){
    if(this.tag == 'hot'|| this.tag == 'attention'){
      this.getList();
    }
  },
  methods: {
    handleClick(tab, event){
      console.log(tab)
      this.tag = tab._props.name;
      if( this.tag == 'hot'|| this.tag == 'attention' ){ // 头条 好友动态
        this.page = 1;
        this.getList();
      }
 
    },
    getList(){
      this.$axios.post('/api/profession-circle/index',{
        page: this.page,
        tag: this.tag
      }).then(res =>{
        if(res.code == 0){
          this.dataList = res.data
        }
      })
    },
    // 点击头像、名称
    clickName(i){
      console.log(i)
      let uid = localStorage.getItem('realUid');
      if(uid == i.uid){
        // 是自己
        this.$router.push({ path:'/myProfessionalCircle' })
      }else{
        this.$router.push({
          path:'/professionalCircle/circleCentre',   //跳转的路径
          query:{           //路由传参时push和query搭配使用 ，作用时传递参数
            see_uid:i.uid,
          }
        })
      }
      
    },
    // 点击列表
    clicklistItems(i){
      this.$router.push({
        path:'/professionalCircle/circleDetails',   //跳转的路径
        query:{           //路由传参时push和query搭配使用 ，作用时传递参数
          id:i.id,
        }
      })
    },
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
      let str = images.toString(',');
      let p = {
        content: this.textarea,
        images: str
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
          this.getList();
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
     // 上传图片
     uploadArticleCover(param){
      console.log(param.file)
      const formData = new FormData();
      formData.append('file[]',param.file);
      formData.append('pictureCategory','articleCover');
      formData.append('up_tag','other');
      this.$axios.post('/api/upload',formData,{'Content-Type': 'multipart/form-data'}).then( res=>{
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
  },
 
};
</script>

<style lang="scss" scoped>
.interaction-box{
    height: calc(100vh - 150px);
    margin: 0 auto;
  }
  .container-title-box{
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    background: #FFFFFF;
    /deep/ .el-tabs{
        height: 100%;
        .el-tabs__header {
          height: 100%;
          margin: 0;
          .el-tabs__nav-wrap{
            height: 100%;
            line-height: 50px;
            &::after{
              height: 0;
            }
            .el-tabs__nav-scroll {
              height: 100%;
              padding: 0 20px;
              display: flex;
              justify-content: center;
              .el-tabs__item{
                font-size: 15px;
              }
              .el-tabs__item.is-active{
                color: $g_color;
              }
              .el-tabs__active-bar{
                bottom: 1px;
                background-color: $g_bg;
              }
            }
          }
        }
      }
  }
  .info-box{
    width: 1200px !important;
    margin: 0 auto;
    margin-top: 16px;
    width: 100%;
    display: flex;
    text-align: left;
    .info-left-box{
      flex: 1;
      .info-right-container{
        .container-items-box{
          background: #fff;
          .right-container-title{
            margin-top: 16px;
            width: 100%;
            height: 44px;
            line-height: 44px;
            border-bottom: 1px solid #F2F3F5;
            span{
              margin-left: 20px;
              font-size: 14px;
              color: #86909C;
              line-height: 22px;
            }

          }
          .right-container-item{
            padding: 1.2rem;
            margin-top: 0;
            &:nth-child(1){
              margin-top: 0;
            }
            .title{
              display: flex;
              align-items: center;
              justify-content: space-between;
              .title-left{
                display: flex;
                align-items: center;
                cursor: pointer;
                img{
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
                  margin-right: 8px;
                }
                span{
                  font-size: 14px;
                  font-weight: 400;
                  color: #4E5969;
                  line-height: 22px;
                }
              }
             
              .title-t{
                font-size: 14px;
                font-weight: 400;
                color: #86909C;
                line-height: 22px;
              }
            }
            .items-c-box{
              width: 100%;
              padding-left: 2rem;
              .items-c-p{
                font-size: 14px;
                font-weight: 400;
                color: #1F2E4D;
                line-height: 28px;
              }
              .items-img-box{
                width: 100%;
                height: auto;
                display: flex;
                flex-wrap: wrap;
                margin-top: 0.8rem;
                img{
                  width: 140px;
                  height: 100px;
                  margin-left: 0.5rem;
                  &:nth-child(1){
                    margin: 0;
                  }
                }
              }
            }
            .items-bottom-btn{
              display: flex;
              align-items: center;
              margin-top: 0.8rem;
              .bottom-btn-items{
                margin-right: 16px;
                display: flex;
                align-items: center;
                cursor: pointer;
                img{
                  width: 14px;
                  height: 14px;
                  margin-right: 4px;
                  display: inline-block;
                }
                span{
                  font-size: 14px;
                  font-weight: 400;
                  color: #86909C;
                  line-height: 22px;
                }
              }
            }
          }

        }
        
      }
    }
    .info-right-box{
      width: 380px;
      padding-left: 0.8rem;
    }
  }
  .fb-btn{
    width: 98px;
    height: 30px;
    line-height: 30px;
    background: $g_bg;
    border-radius: 4px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    cursor: pointer;
  }

  ////// ==========  发圈弹窗样式 ============== 
  #professionalCircle /deep/ .el-dialog{
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
