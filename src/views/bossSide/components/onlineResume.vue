<template>
  <div>
    <div class="container-zx">
      <el-dialog title="简历详情" :center="false" :visible.sync="zx_dialogVisible" width="800px" :before-close="handleClose">
        <div class="pc-preview-wrapper m-box">
          <!-- 个人信息 -->
          <div class="resume-item item-base" v-if="infoData.basic_info">
            <div class="figure J_resume_baseMsg_headImgPreview">
              <img :src="infoData.basic_info?infoData.basic_info.avatar:require('../../../assets/image/bossSide/img-user.jpg')" alt="" class="cur-default"/>
            </div>
            <div class="item-right">
              <div style="text-align: left;">
                <h2 class="name">{{ infoData.basic_info?infoData.basic_info.name:'暂无' }}</h2>
                <div class="info-labels fr">
                  <span class="label-text">
                    <img src="../../../assets/image/Frame_1.png" alt="" class="fz fz-age"/>
                    <span>{{ infoData.basic_info?infoData.basic_info.birth_year_month:'30岁' }}</span>
                  </span>
                  <em class="vline"></em>
                  <span class="label-text">
                    <img src="../../../assets/image/Frame_2.png" alt="" class="fz fz-age"/>
                    <span>{{ infoData.basic_info?infoData.basic_info.begin_work_date:'暂无' }}</span>
                  </span>
                  <em class="vline"></em>
                  <span class="label-text">
                    <img src="../../../assets/image/Frame_5.png" alt="" class="fz fz-age"/>
                    <span>{{ infoData.basic_info?infoData.basic_info.work_status_desc:'暂无' }}</span>
                  </span>
                </div>
              </div>
              <div class="text selfDescription">{{ infoData.basic_info?infoData.basic_info.advantages_highlights:'暂无' }}</div>
            </div>
          </div>
          <!-- 期望职位 -->
          <div class="resume-item" v-if="infoData.job_expectation">
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
          <div class="resume-item" v-if="infoData.work_experience">
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
          <div class="resume-item" v-if="infoData.project_experience">
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
          <div class="resume-item" v-if="infoData.education_experience">
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
        <div class="info-right-box" v-if="is_type =='searchTalent'">
          <div class="m-box">
            <div class="title">感觉人才还不错，您可以:</div>
            <div class="form-btns">
              <el-button type="primary">打招呼</el-button>
              <el-button>电话沟通</el-button>
            </div>
            <div class="icon-box">
              <div>
                <img src="../../../assets/image/bossSide/icon-shareAlt-1.png" alt="" />
                <span>转发给同事</span>
              </div>
              <div>
                <img src="../../../assets/image/bossSide/icon-star-1.png" alt="" />
                <span>收藏</span>
              </div>
              <div>
                <img src="../../../assets/image/bossSide/icon-download-1.png" alt="" />
                <span>存至本地</span>
              </div>
              <div>
                <img src="../../../assets/image/bossSide/icon-printer.png" alt="" />
                <span>打印</span>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>

export default {

  components: {
  },
  props:{
    infoData: {
      type: Object,
      default() {
        return {
          data: {}
        }
      }
    },
    is_type:{
      type:String,
      default(){
        return {
          data:''
        }
      }
    }
  },
  data(){
    return{
      zx_dialogVisible: false
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
   
    handleClose(done) {
      this.zx_dialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
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
      .info-right-box{
        width: 320px;
        padding-left: 16px;
        .title{
          font-size: 14px;
          font-weight: bold;
          color: $g_textColor;
          line-height: 24px;
        }
        .form-btns{
          width: 100%;
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          .el-button{
            padding: 0;
            width: 100%;
            height: 40px;
            line-height: 40px;
            margin: 0;
            margin-top: 1rem;
          }
          .el-button--primary{
            background-color: $g_color;
            border-color: $g_color;
          }
        }
        .icon-box{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
          &>div{
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            img{
              width: 16px;
              height: 16px;
            }
            span{
              font-size: 12px;
              font-weight: 400;
              color: #86909C;
              line-height: 20px;
              padding-top: 6px;
            }
          }
        }
      }
    }
  }
</style>
