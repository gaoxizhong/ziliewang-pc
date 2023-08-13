<template>
  <!-- 我的简历页 -->
  <div class="container">
    <div class="tab-box">
      <div :class="is_titleTab == 1? 'hover':'' " @click="clickTitleTab_1(1)">预览简历</div>
      <div :class="is_titleTab == 2? 'hover':'' " @click="clickTitleTab(2)">刷新简历</div>
      <div :class="is_titleTab == 3? 'hover':'' " @click="clickTitleTab(3)">简历优化</div>
    </div>
    
    <div class="info-box">
      <div class="info-left-box" id="myReaume">
        <!-- 个人信息 开始 -->
        <MyInfo :data="infoData.basic_info" @refreshInfo="refreshInfo"/>  
        <!-- 个人信息 结束 -->

        <!-- 求职期望 开始 -->
        <JobExpectation :data="infoData.job_expectation" @refreshInfo="refreshInfo"/>  
        <!-- 求职期望 结束 -->
        
        <!-- 工作经历 开始 -->
        <WorkExperience :data="infoData.work_experience" @refreshInfo="refreshInfo"/>  
        <!-- 工作经历 结束 -->

        <!-- 项目经历 开始 -->
        <ProjectExperience :data="infoData.project_experience" @refreshInfo="refreshInfo"/>  
        <!-- 项目经历 结束 -->

        <!-- 教育经历 开始 -->
        <EducationExperience :data="infoData.education_experience" @refreshInfo="refreshInfo"/>  
        <!-- 教育经历 结束 -->

      </div>
      <!-- 右侧模块 开始 -->
      <div class="info-right-box">
        <div class="right-box up-attachments-box">
          <div class="up-att-t">
            <span class="span-1">上传附件简历</span>
            <el-upload class="upload-demo"
              drag ref="upload" 
              action= "none"
              :accept="accept" 
              :limit="1"
              :show-file-list="false"
              multiple
              :http-request="uploadArticleCover" 
              :on-exceed='limitCheck'
            >
              <span class="span-2">去上传<i class="el-icon-arrow-right" style="margin-left:2px;"></i></span>
            </el-upload>
          </div>
          <div class="up-box-Instructions">在附件中展示更多优势与特长</div>

          <div class="attachments-list-box">
            <div class="list-title">附件管理</div>
            <div class="list-items" v-if="curriculum_vitae != '' ">
              <span class="items-title" @click.stop="clickVitae(curriculum_vitae)">个人简历.pdf</span>
              <img src="../../../assets/image/delete.png" alt="" class="img" @click.stop="clickVitaeDelet"/>
            </div>
            <div v-else>
              <span>暂无</span>
            </div>
          </div>

        </div>

        <div class="right-box resume-improvement-box">
          <div class="improvement-att-t">
            <span class="span-1">简历待完善项</span>
            <img src="../../../assets/image/Frame_9.png" alt="" />
          </div>
          <div class="improvement-box-Instructions">完善后获更强竞争力</div>

          <div class="improvement-items-box">
            <div class="i-items">
              <div class="up-att-t">
                <span class="span-1">基本信息</span>
                <span class="span-2">去补充<i class="el-icon-arrow-right" style="margin-left:2px;"></i></span>
              </div>
              <div class="up-box-Instructions">必填字段缺失 <span>·1项</span></div>
            </div>

            <div class="i-items">
              <div class="up-att-t">
                <span class="span-1">工作经历</span>
                <span class="span-2">去补充<i class="el-icon-arrow-right" style="margin-left:2px;"></i></span>
              </div>
              <div class="up-box-Instructions">宁波...必填字段缺失 <span>·1项</span></div>
            </div>
            

          </div>
        </div>

        <div class="right-box integrity-box">
          <div class="integrity-att-t">中文简历完整度</div>
          <div></div>
          <div class="integrity-instructions">完善后获更强竞争力</div>
        </div>

      </div>
      <!-- 右侧模块 结束 -->
    </div>

    <!-- 预览附件简历pdf 弹窗  -->
    <div class="container-pdf">
      <el-dialog title="附件预览" :center="false" :visible.sync="dialogVisible" width="800px" :before-close="handleClose">
        <div class="pdf-preview-box">
          <div class="pdfViewer" id="viewer">
            <pdf :src="src" style="width: 100%;" :page="i" v-for="i in numPages" :key="i" ref="pdf"></pdf>
          </div>
        </div>
      </el-dialog>
    </div>
    <!-- 预览在线简历 弹窗  -->
    <div class="container-zx">
      <el-dialog title="你的简历在BOSS侧展示如下" :center="false" :visible.sync="zx_dialogVisible" width="920px" :before-close="handleClose">
        <div class="pc-preview-wrapper">
          <!-- 个人信息 -->
          <div class="resume-item item-base">
            <div class="figure J_resume_baseMsg_headImgPreview">
              <img :src="infoData.basic_info.avatar" alt="" class="cur-default"/>
            </div>
            <div class="item-right">
              <div style="text-align: left;">
                <h2 class="name">{{ infoData.basic_info.name }}</h2>
                <div class="info-labels fr">
                  <span class="label-text">
                    <img src="../../../assets/image/Frame_1.png" alt="" class="fz fz-age"/>
                    <span>{{ infoData.basic_info.birth_year_month?infoData.basic_info.birth_year_month:'30岁' }}</span>
                  </span>
                  <em class="vline"></em>
                  <span class="label-text">
                    <img src="../../../assets/image/Frame_2.png" alt="" class="fz fz-age"/>
                    <span>{{ infoData.basic_info.work_year?infoData.basic_info.work_year:'6年经验' }}</span>
                  </span>
                  <em class="vline"></em>
                  <span class="label-text">
                    <img src="../../../assets/image/Frame_5.png" alt="" class="fz fz-age"/>
                    <span>{{ infoData.basic_info.work_status_desc }}</span>
                  </span>
                </div>
              </div>
              <div class="text selfDescription">{{ infoData.basic_info.advantages_highlights }}</div>
            </div>
          </div>
          <!-- 期望职位 -->
          <div class="resume-item">
            <h3 class="title">期望职位</h3>
            <div class="item-right">

              <div style="text-align: left;" v-for="(items,idx) in infoData.job_expectation" :key="idx">
                <div class="info-labels">
                  <span class="label-text">{{ items.desired_position }}</span>
                  <em class="vline"></em>
                  <span class="label-text">{{ items.desired_industry }}</span>
                  <em class="vline"></em>
                  <span class="label-text">{{ items.expected_salary }}</span>
                </div>
              </div>
              
            </div>
          </div>
          <!-- 工作经历 -->
          <div class="resume-item">
            <h3 class="title">工作经历</h3>
            <div class="item-right">
              <div class="history-list">
                <div class="history-item" v-for="(items,idx) in infoData.work_experience" :key="idx">
                  <span class="period">{{ items.begin_date }} - {{ items.end_date }}</span>
                  <h4 class="name">
                    <span>{{ items.company_name }}</span>
                    <em class="vline"></em>
                    <span>{{ items.position }}</span>
                  </h4>
                  <div class="item-text">
                    <span class="project-title">内容：</span>
                    <div class="text" v-html="items.responsibility_performance"></div>
                    <!-- <p class="tags">
                      <span></span>
                    </p> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 项目经历 -->
          <div class="resume-item">
            <h3 class="title">项目经历</h3>
            <div class="item-right">
              <div class="history-list">
                <div class="history-item" v-for="(items,idx) in infoData.project_experience" :key="idx">
                  <span class="period">{{ items.begin_date }} - {{ items.end_date }}</span>
                  <h4 class="name">
                    <span>{{ items.project_name }}</span>
                    <em class="vline"></em>
                    <span>{{ items.position }}</span>
                  </h4>
                  <div class="item-text">
                    <span class="project-title">内容：</span>
                    <div class="text" v-html="items.job_content"></div>
                    <!-- <p class="tags">
                      <span></span>
                    </p> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 教育经历 -->
          <div class="resume-item">
            <h3 class="title">教育经历</h3>
            <div class="item-right">
              <div class="history-list">
                <div class="history-item" v-for="(items,idx) in infoData.education_experience" :key="idx">
                  <span class="period">{{ items.school_date }}</span>
                  <h4 class="name">
                    <b>{{ items.school }}</b>
                    <em class="vline"></em> 
                    <b>{{ items.specialty }}</b>
                    <em class="vline"></em>
                    <b>{{ items.education_background }}</b>
                  </h4>
                  <!-- <p class="tags school-tags">
                    <span class="blue">211院校</span>
                  </p> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>


    
  </div>

</template>

<script>
import MyInfo from "../components/myResume/myInfo";
import JobExpectation from "../components/myResume/jobExpectation";
import WorkExperience from "../components/myResume/workExperience";
import ProjectExperience from "../components/myResume/projectExperience";
import EducationExperience from "../components/myResume/educationExperience";
import pdf from 'vue-pdf';
export default {
  name: 'myResume',
  components: {
    MyInfo,
    JobExpectation,
    WorkExperience,
    ProjectExperience,
    EducationExperience,
    pdf,
  },
  data(){
    return{
      is_titleTab: 3,
      infoData:{}, // 信息
      accept:'.pdf', // 接受上传文件
      curriculum_vitae: "", // 附件简历
      dialogVisible: false,
      zx_dialogVisible: false,
      pdfUrl:'',
      src:'',
      numPages: 0
    }
  },
  computed: {
    
  },
  mounted(){

  },  
  created(){
    // 获取个人信息
    this.getUserProfile();
  },
  methods: {
    handleClose(done) {
      this.dialogVisible = false;
      this.zx_dialogVisible = false;

    },
    // 点击附件简历名称---预览
    clickVitae(url){
      this.pdfUrl = url;
      // 有时PDF文件地址会出现跨域的情况,这里最好处理一下
      this.src = pdf.createLoadingTask(this.pdfUrl);
      this.getPDFnums(this.pdfUrl);
      this.dialogVisible = true;
    },

    //计算pdf页码总数
    getPDFnums(url) {
      this.loading = true
      //let loadURL = pdf.createLoadingTask(url)
      let loadURL = pdf.createLoadingTask({
        url: url,//你的pdf地址
      })

      loadURL.promise.then(pdf => {
          this.numPages = pdf.numPages
          this.$set(this, 'docsPDF.numPages', pdf.numPages)
          this.loading = false
      }).catch(err => {
          this.loading = false;
          this.loadingError = true;
      })
    },
    // 刷新信息
    refreshInfo(){
      this.getUserProfile();
    },
    // clickTitleTab(n){
    //   this.is_titleTab = n;
    //   if(n == 1){
    //     this.zx_dialogVisible = !this.zx_dialogVisible
    //   }
    // },
    clickTitleTab_1(){
      this.zx_dialogVisible = !this.zx_dialogVisible
    },
    
   // 获取个人信息
   getUserProfile(){
      let that = this;
      that.$axios.post('/api/user/profile',{}).then(res =>{
        console.log(res.data)
        if(res.code == 0){
          this.infoData = res.data;
          this.curriculum_vitae = res.data.basic_info.curriculum_vitae;
        }
      }).catch(e =>{
        console.log(e)
      })
    },
    // 选择的文件超出限制的文件总数量时触发
    limitCheck() {
      this.$message.warning('每次只能上传1个文件')
    },
    // 点击去上传
    uploadArticleCover(param){
      console.log(param.file)
      const formData = new FormData();
      formData.append('file[]',param.file);
      formData.append('pictureCategory','articleCover');
      formData.append('up_tag','resume');
      this.$axios.post('/api/upload',formData,{'Content-Type': 'multipart/form-data'}).then( res=>{
        console.log(res)
        this.curriculum_vitae = res.data.upload_files;
        let upload_files_path = res.data.upload_files_path;
        this.$refs['upload'].clearFiles();

        let p = {
          curriculum_vitae: upload_files_path
        }
        this.setUserSave(p,'','上传成功!');
      }).catch( e=>{
        console.log(e)
        this.$refs['upload'].clearFiles()
      })
    },
    // 点击个人简历删除
    clickVitaeDelet(){
      let p = {
          curriculum_vitae: ''
        }
        this.setUserSave(p,'delet','删除成功!');
    },
    //  修改信息
    setUserSave(data,type,text){
      let that = this;
      let p = Object.assign({},data);
      that.$axios.post('/api/user/save',p).then( res =>{
        console.log(res)
        if(res.code == 0){
          that.$message.success( text );
          if(type == 'delet'){
            this.curriculum_vitae = '';
          }
        }
      })
    },
  },
};
</script>

<style lang="scss" scoped>
 .tab-box{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  div{
    margin-left: 12px;
    width: 92px;
    height: 32px;
    line-height: 32px;
    background: #FFFFFF;
    border-radius: 100px 100px 100px 100px;
    border: 1px solid $g_color;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    color: $g_color;
    cursor: pointer;
  }
  div.hover{
    background: $g_bg;
    color: #fff;
  }
 }
.info-box{
  width: 100%;
  display: flex;
  margin-top: 20px;
  .info-left-box{
    flex: 1;
  }
  .info-set{
    font-size: 14px;
    font-weight: 400;
    color: $g_color;
    cursor: pointer;
    display: none;
    span{
      padding-left: 6px;
    }
  }
  .info-right-box{
    width: 406px;
    padding-left: 0.8rem;
    .right-box{
      background: #FFFFFF;
      border-radius: 6px ;
      opacity: 1;
      padding: 24px 24px 20px 24px;
    }
    .up-attachments-box{
      .up-att-t{
        display: flex;
        align-items: center;
        justify-content: space-between;
        /deep/ .el-upload-dragger{
          border: none;
          width: auto;
          height: auto;
        }
        .span-1{
          font-size: 15px;
          font-weight: bold;
          color: $g_textColor;
          line-height: 24px;
        }
        .span-2{
          font-size: 14px;
          font-weight: 400;
          color: $g_color;
          line-height: 22px;
          margin-left: 10px;
          cursor: pointer;
        }
      }
      .up-box-Instructions{
        font-size: 14px;
        font-weight: 400;
        color: #86909C;
        line-height: 22px;
        margin-top: 8px;
        text-align: left;
      }
    }
    .resume-improvement-box{
      margin-top: 16px;
      .improvement-att-t{
        display: flex;
        align-items: center;
        .span-1{
          font-size: 15px;
          font-weight: bold;
          color: $g_textColor;
          line-height: 24px;
        }
        img{
          width: 18px;
          height: 18px;
          margin-left: 10px;
        }
      }
      .improvement-box-Instructions{
        font-size: 14px;
        font-weight: 400;
        color: #86909C;
        line-height: 22px;
        margin-top: 8px;
        text-align: left;
      }
      .improvement-items-box{
        width: 100%;
        .i-items{
          margin-top: 16px;
          width: 100%;
          .up-att-t{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .span-1{
              font-size: 14px;
              font-weight: bold;
              color: $g_textColor;
              line-height: 24px;
            }
            .span-2{
              font-size: 14px;
              font-weight: 400;
              color: $g_color;
              line-height: 22px;
              margin-left: 10px;
            }
          }
          .up-box-Instructions{
            font-size: 14px;
            font-weight: 400;
            color: $g_textColor;
            line-height: 22px;
            text-align: left;
            span{
              color: #FF751A;
            }
          }
        }
      }
    }
    .integrity-box{
      margin-top: 16px;
      .integrity-att-t{
        font-size: 15px;
        font-weight: bold;
        color: $g_textColor;
        line-height: 24px;
        text-align: left;
      }
      .integrity-instructions{
        font-size: 14px;
        font-weight: 400;
        color: #86909C;
        line-height: 22px;
        margin-top: 8px;
        text-align: left;
      }
    }
  }
}
.attachments-list-box{
  width: 100%;
  margin-top: 16px;
  text-align: left;
  .list-title{
    font-size: 15px;
    font-weight: bold;
    color: $g_textColor;
    line-height: 24px;
    margin-bottom: 10px;
  }
  .list-items{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 10px;
    cursor: pointer;
    overflow: hidden;
    .items-title{
      flex: 1;
      display: inline-block;
      white-space: nowrap;
      font-size: 14px;
    }
    .img{
      width: 16px;
      height: 16px;
    }
    &:hover{
      background: rgb(248, 248, 248);
    }
  }

}
.container-pdf /deep/ .el-dialog{
  min-width: 320px;
  top: 50%;
  transform: translateY(-50%);
  margin-top: 0 !important;
  .el-dialog__header{
    text-align: left;
    .el-dialog__title{
      font-size: 15px;
      color: $g_textColor;
    }
  }
  .el-dialog__body{
    height: calc(100vh - 128px);
    overflow: hidden;
    padding: 20px;
    .pdf-preview-box{
      width: 794px;
      height: calc(100vh - 172px);
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
  
}
.container-zx /deep/ .el-dialog{
  min-width: 320px;
  top: 50%;
  transform: translateY(-50%);
  margin-top: 0 !important;
  .el-dialog__header{
    text-align: left;
    .el-dialog__title{
      font-size: 16px;
      color: $g_textColor;
    }
  }
  .el-dialog__body{
    padding: 20px 30px 30px;
    height: calc(100vh - 128px);
    overflow: overlay;
    padding: 20px;
    .pc-preview-wrapper{
      border-radius: 4px;
      border: 1px solid #e3e7ed;
      padding: 20px 40px;
      color: #414a60;
      line-height: 26px;
      .resume-item{
        display: block;
        zoom: 1;
        position: relative;
        padding-top: 18px;
        overflow: hidden;
        &:first-child {
          padding-top: 0;
        }
        .figure {
          float: left;
        }
        .J_resume_baseMsg_headImgPreview {
          position: relative;
          z-index: 99;
        }
        img{
          width: 60px;
          height: 60px;
          border-radius: 100%;
          cursor: default;
        }
        .item-right {
          position: relative;
          padding-left: 80px;
          vertical-align: top;
          padding-top: 2px;
          h2.name{
            font-size: 1.1rem;
            font-weight: bold;
            display: inline-block;
            position: relative;
          }
          .info-labels {
            font-size: 0;
            padding: 0;
            .label-text{
              display: inline-block;
              vertical-align: middle;
              font-size: 13px;
              img{
                width: 14px;
                height: 14px;
              }
            }
            .vline {
              margin: 0 0.9rem;
            }
            .fz {
              margin-left: 5px;
              display: inline-block;
              width: 16px;
              vertical-align: middle;
            }
          }
          .fr {
            float: right;
          }
          .text {
            color: #61687c;
            font-size: 13px;
            line-height: 26px;
            position: relative;
            word-wrap: break-word;
            word-break: break-all;
            white-space: pre-line;
            max-width: 600px;
            text-align: left;
          }

          .history-item{
            padding-top: 20px;
            position: relative;
            text-align: left;
            &:first-child {
              padding-top: 0;
            }
            .period {
              float: right;
              color: #9fa3b0;
              font-size: 12px;
            }
            h4.name {
              font-weight: 500;
              position: relative;
              color: #414a60;
              span,b {
                font-weight: 500;
              }
              .vline {
                margin: 0 18px;
              }
            }
            .item-text {
              position: relative;
              margin-top: 25px;
              min-height: 26px;
              color: #9fa3b0;
              .text {
                color: #51586d;
                font-size: 13px;
                line-height: 26px;
                position: relative;
                word-wrap: break-word;
                word-break: break-all;
                white-space: pre-line;
                max-width: 600px;
                padding-top: 10px;
              }
              .tags {
                margin-top: 15px;
                padding-bottom: 5px;
                span {
                  display: inline-block;
                  border: 1px solid #e3e7ed;
                  border-radius: 15px;
                  margin-right: 12px;
                  font-size: 12px;
                  line-height: 22px;
                  padding: 0 15px;
                  color: #9fa3b0;
                }
              }
            }
          }
          .project-title {
            font-weight: 500;
            line-height: 20px;
            width: 60px;
            text-align: right;
            box-sizing: border-box;
            padding-right: 4px;
            color: #51586d;
          }
          
        }
        .title{
          float: left;
          font-size: 14px;
          color: #414a60;
          width: 70px;
          font-weight: 500;
        }
      }
     

    }
  }
}
.vline {
  width: 1px;
  height: 12px;
  vertical-align: middle;
  background: #e0e0e0;
  margin: 0 10px;
  display: inline-block;
}

</style>
