<template>
  <!-- 搜索人才页 -->
  <div class="bossSide-container">
    <div class="searchTalent-top-box m-box">
      <!-- 检索及热门职位 开始 -->
      <div class="search-box">
        <!-- 搜索框 开始 -->
        <div class="search-input-box">

          <div class="input-box">
            <div class="input-left-box">
              <div class="input-add-box"><img src="../../../assets/image/bossSide/icon-local-two.png" alt="">
                <span>宁波</span>
              </div>
              <el-input v-model="search_value" placeholder="搜索职位/公司/内容关键词"></el-input>
            </div>
            <button class="input-button" @click="getSearchinfo">搜索</button>
          </div>

          <div class="search-input-tab">
            <div><span>展开高级搜索</span><img src="../../../assets/image/bossSide/icon-down.png" alt=""></div>
            <div><img src="../../../assets/image/bossSide/icon-heart.png" alt=""><span>我的收藏</span></div>
          </div>

        </div>
        <!-- 搜索框 结束 -->
        <!-- 热门职位 开始 -->
        <div class="hotJob-box">
          <span class="hotJob-span">热门岗位</span>
          <div class="hotJob-item-box">
            <a href="javascript:0;" class="hotJob-item" v-for="(item,index) in hotJob_options" :key="index" @click="clickTagname(item)">{{item}}</a>
          </div>
        </div>
        <!-- 热门职位 结束 -->
      </div>
      <!-- 检索及热门职位 结束 -->
      <div class="online-job-box">
        <div class="online-job-title">按在线职位搜</div>
        <div class="online-job-tab">
          <span>不限</span>
          <span class="hover">ui设计师| 宁波</span>
        </div>
      </div>
    </div>
    <div class="m-box margin-top-20"></div>
    <!-- 列表模块 开始  -->
    <div class="job-list-box">
      <div v-for="(item,index) in jobList" :key="index" class="jobList-items m-box margin-top-20" @click.stop="clickItems(item)">
        <div class="items-left-box">
          <div></div>
          <img :src="item.avatar?item.avatar:require('../../../assets/image/bossSide/img-user.png')" alt="" class="avatar-box">
          <div class="left-info-box">
            <div class="left-info-t">
              <span class="left-info-name">{{ item.name }}</span>
              <img src="../../../assets/image/bossSide/icon-sex.png" alt="" >
              <span class="icon-span">今日活跃</span>
            </div>
            <div class="sub-title" v-if="item.birth_year_month">生日：{{ item.birth_year_month }}</div>
            
            <div class="sub-title" v-if="item.begin_work_date">参加工作：{{ item.begin_work_date }} {{ item.live_city }}</div>
            <div class="sub-title" v-if="item.position">求职期望：<span style="color:#FF4D4F;">{{ item.position }}</span></div>
            <div class="bottom-box" v-if=" item.userjobexpectation.length > 0">
              <span>{{ item.userjobexpectation[0].desired_industry }}</span>
              <!-- <span>融资</span> -->
            </div>
          </div>
        </div>
        <div class="items-m-box">
          <div class="items-m-p professional">
            <div v-for="(work_item,work_index) in item.userworkexperience" :key="work_index">{{ work_item.company_name}}<span style="color:#FF4D4F;">·{{ work_item.position }}</span><span class="time-span">{{ work_item.begin_date }}-{{ work_item.end_date }}</span></div>
          </div>
          <div class="items-m-p educational">
            <div v-for="(ex_item,ex_index) in item.usereducationexperience" :key="ex_index">{{ ex_item.school }}·{{ ex_item.specialty }}·{{ ex_item.education_background }}<span class="time-span">{{ ex_item.school_date }}</span></div>
          </div>
        </div>
        <div class="items-right-box">
          <div class="hover">打招呼</div>
          <div>电话沟通</div>
        </div>
      </div>
      <div class="nolist-box" v-if="jobList.length <= 0">暂无数据....</div>
    </div>
    <!-- 列表模块 结束  -->

     <!-- 分页控制 -->
     <mPagination :data="paginationData" @pageChangeEvent="pageHasChanged"></mPagination>



     <!-- 预览在线简历 弹窗  -->
    <div class="container-zx">
      <el-dialog title="简历详情" :center="false" :visible.sync="zx_dialogVisible" width="1100px" :before-close="handleClose">
        <div class="pc-preview-wrapper m-box">
          <!-- 个人信息 -->
          <div class="resume-item item-base">
            <div class="figure J_resume_baseMsg_headImgPreview">
              <img :src="infoData?infoData.basic_info.avatar:require('../../../assets/image/bossSide/img-user.jpg')" alt="" class="cur-default"/>
            </div>
            <div class="item-right">
              <div style="text-align: left;">
                <h2 class="name">{{ infoData?infoData.basic_info.name:'暂无' }}</h2>
                <div class="info-labels fr">
                  <span class="label-text">
                    <img src="../../../assets/image/Frame_1.png" alt="" class="fz fz-age"/>
                    <span>{{ infoData?infoData.basic_info.birth_year_month:'30岁' }}</span>
                  </span>
                  <em class="vline"></em>
                  <span class="label-text">
                    <img src="../../../assets/image/Frame_2.png" alt="" class="fz fz-age"/>
                    <span>{{ infoData?infoData.basic_info.begin_work_date:'暂无' }}</span>
                  </span>
                  <em class="vline"></em>
                  <span class="label-text">
                    <img src="../../../assets/image/Frame_5.png" alt="" class="fz fz-age"/>
                    <span>{{ infoData?infoData.basic_info.work_status_desc:'暂无' }}</span>
                  </span>
                </div>
              </div>
              <div class="text selfDescription">{{ infoData?infoData.basic_info.advantages_highlights:'暂无' }}</div>
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
        <div class="info-right-box">
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
import mPagination from '@/components/m-pagination';

export default {
  name: 'searchTalent',
  components: {
    mPagination,
  },
  data(){
    return {
      search_value:'',
      hotJob_options: ['UI设计师','项目经理/主管','工艺工程师','3D设计师','电话销售'],
      jobList:[],  // 列表
      // 分页数据
      paginationData: {
        total: 10,
        currentPage: 1,
        pageSize: 20,
      },
      zx_dialogVisible: false,
      infoData:''
    }
  },
  created(){
    this.getSearchinfo();
  },
  methods:{
    handleClose(done) {
      this.zx_dialogVisible = false;
    },
    // 分页事件
    pageHasChanged() {
      this.getSearchinfo();
    },
    // 搜索
    getSearchinfo(){
      let that = this;
      let p = {
        page: that.paginationData.currentPage,
        pagesize: that.paginationData.pageSize,
        search: that.search_value,
      }
      that.$axios.post('/api/company-position/search',p).then( res =>{
        console.log(res)
        if(res.code == 0){
          that.jobList = res.data.list;
          that.paginationData.total = res.data.total;
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    // 点击列表
    clickItems(i){
      this.zx_dialogVisible = !this.zx_dialogVisible;
    },
  }
}
</script>

<style lang="scss" scoped>
  .searchTalent-top-box{
    .search-box{
      padding: 0 3rem;
      .search-input-box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .input-box{
          flex: 1;
          height: 48px;
          line-height: 48px;
          background: $g_bg;
          border-radius: 6px;
          border: 3px solid $g_color;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .input-left-box{
            flex: 1;
            background: #fff;
            height: 100%;
            border-radius: 4px;
            display: flex;
            align-items: center;
            .input-add-box{
              padding: 0 12px;
              display: flex;
              align-items: center;
              border-right: 1px solid #F2F3F5;
              cursor: pointer;
              img{
                width: 14px;
                height: 14px;
              }
              span{
                font-size: 14px;
                font-weight: 400;
                color: #86909C;
                line-height: 22px;
                padding-left: 8px;
              }
            }
            .el-input{
              flex: 1;
            }
            /deep/ .el-input__inner{
              height: 100%;
              line-height: 48px;
              border: none;
              font-size: 14px;
            }

          }
          button.input-button{
            width: auto;
            height: 100%;
            padding: 0 30px;
            background: $g_bg;
            color: #fff;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            border: none;
            border-color: $g_bg;
          }
        }


        .search-input-tab{
          width: auto;
          display: flex;
          align-items: center;
          &>div{
            margin-left: 1rem;
            font-size: 14px;
            font-weight: 400;
            color: $g_textColor;
            line-height: 22px;
            img{
              width: 12px;
              height: 12px;
            }
            span{
              padding: 0 4px;
            }
            &:nth-of-type(2){
              color: #86909C;
            }
          }
        }
      }
      .hotJob-box{
        width: 100%;
        display: flex;
        margin-top: 10px;
        .hotJob-span{
          width: auto;
          font-size: 14px;
          font-weight: bold;
          color: #1D2129;
          line-height: 22px;
        }
        .hotJob-item-box{
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          a{
            padding: 4px 1rem;
            border-radius: 4px;
            background: #fff;
            text-align: center;
            font-size: 14px;
            color: $g_color;
            margin-left: 8px;
            margin-bottom: 0.5rem;
          }
        }
      }
    }
    .online-job-box{
      display: flex;
      align-items: center;
      .online-job-title{
        font-size: 14px;
        font-weight: 400;
        color: #4E5969;
        line-height: 22px;
      }
      .online-job-tab{
        margin-left: 1rem;
        display: flex;
        align-items: center;
        span{
          height: 28px;
          border-radius: 4px;
          border: 1px solid #F2F3F5;
          font-size: 14px;
          font-weight: 400;
          color: #86909C;
          line-height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1rem;
          padding: 0 10px;
          cursor: pointer;
          &.hover{
            color: $g_color;
          }
        }
      }
    }
  }



  // 列表
  .job-list-box{
    width: 100%;
    .jobList-items{
      padding: 1rem 1.3rem;
      display: flex;
      justify-content: space-between;
      position: relative;
      cursor: pointer;
      .items-left-box{
        width: auto;
        display: flex;
        .avatar-box{
          width: 2.8rem;
          height: 2.8rem;
          border-radius: 50%;
        }
        .left-info-box{
          padding-left: 14px;
          &>div{
            display: flex;
            align-items: center;
          }
          .left-info-t{
            .left-info-name{
              font-size: 16px;
              color: $g_textColor;
              line-height: 24px;
            }
            img{
              width: 16px;
              height: 16px;
              margin: 0 2px;
            }
            .icon-span{
              width: 64px;
              height: 22px;
              line-height: 22px;
              text-align: center;
              font-size: 12px;
              background: #F6FFED;
              border-radius: 2px;
              color: #B7EB8F;
              border: 1px solid #B7EB8F;
              margin-left: 6px;
            }

          }
          .sub-title{
            font-size: 14px;
            font-weight: 400;
            color: #86909C;
            line-height: 22px;
            margin-top: 4px;
          }
          .bottom-box{
            margin-top: 10px;
            span{
              width: auto;
              height: 22px;
              line-height: 22px;
              text-align: center;
              background: #F7F8FA;
              border-radius: 2px;
              padding: 0 10px;
              margin-right: 10px;
              color: $g_textColor;
              font-size: 12px;
            }
          }

        }

      }
      .items-m-box{
        flex: 1;
        padding-left: 6rem;
        .items-m-p{
          margin-top: 8px;
          &:nth-of-type(1){
            margin-top: 0;
          }
          &>div{
            font-size: 14px;
            font-weight: 400;
            color: $g_textColor;
            line-height: 22px;
            margin-top: 8px;
            &:nth-of-type(1){
              margin-top: 0;
            }
            .time-span{
              color: #86909C;
              padding-left: 6px;
            }
          }

        }
      }
      .items-right-box{
        width: auto;
        text-align: right;
        display: flex;
        justify-content: space-between;
       align-items: flex-end;
       &>div{
        width: 88px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        font-size: 14px;
        background: #FFFFFF;
        box-shadow: 0px 2px 0px 0px rgba(0,0,0,0.02);
        border-radius: 2px;
        border: 1px solid $g_color;
        color: $g_color;
        margin-right: 1rem;
        cursor: pointer;
        &.hover{
          background: $g_bg;
          color: #fff;
        }
       }
        
      }
    }

  }




  .container-zx /deep/ .el-dialog{
    min-width: 320px;
    top: 50%;
    transform: translateY(-50%);
    margin-top: 0 !important;
    background: #F7F9FC;
    .el-dialog__header{
      text-align: left;
      background: #fff;
      padding: 16px 20px;
      .el-dialog__title{
        font-size: 16px;
        color: $g_textColor;
      }
    }
    .el-dialog__body{
      height: calc(100vh - 128px);
      overflow: overlay;
      padding: 16px;
      display: flex;
      .pc-preview-wrapper{
        flex: 1;
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
              font-size: 14px;
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
  .vline {
    width: 1px;
    height: 12px;
    vertical-align: middle;
    background: #e0e0e0;
    margin: 0 10px;
    display: inline-block;
  }

</style>