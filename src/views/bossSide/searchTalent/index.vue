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
              <el-input v-model="search_value" placeholder="搜索职位/公司/内容关键词"></el-input>
            </div>
            <button class="input-button" @click="getSearchinfo">搜索</button>
          </div>

          <div class="search-input-tab">
            <!-- <div><span>展开高级搜索</span><img src="../../../assets/image/bossSide/icon-down.png" alt=""></div> -->
            <div @click.stop="myCollection"><img src="../../../assets/image/bossSide/icon-star.png" alt=""><span>我的收藏</span></div>
          </div>

        </div>
        <!-- 搜索框 结束 -->
      </div>
      <!-- 检索及热门职位 结束 -->
    </div>
    <!-- <div class="job-tab-box m-box margin-top-20">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="智能推荐" name="recommended"></el-tab-pane>
        <el-tab-pane label="最新" name="latest"></el-tab-pane>
      </el-tabs>
      <div class="tab-right" @click="myCollection">
        <img src="../../../assets/image/bossSide/icon-star.png" alt="" />
        <span>我的收藏</span>
      </div>
    </div> -->
    <!-- 高级筛选模块 开始-->
    <div class="screen-box m-box margin-top-20">
      <filterOptionsContainer  @getfilterInfo="getfilterInfo"/>
    </div>
    <!-- 高级筛选模块 结束-->
    <!-- 列表模块 开始  -->
    <div class="job-list-box">
      <div v-for="(item,index) in jobList" :key="index" class="jobList-items m-box margin-top-20" @click.stop="clickItems(item)">
        <div class="items-left-box">
          <div></div>
          <img :src="item.avatar?item.avatar:require('../../../assets/image/bossSide/img-user.png')" alt="" class="avatar-box">
          <div class="left-info-box">
            <div class="left-info-t">
              <span class="left-info-name">{{ item.name }}</span>
              <img :src="require(`../../../assets/image/bossSide/sex-${item.sex == 2? 2 : 1}.png`)" alt="" >
              <span class="icon-span">今日活跃</span>
            </div>
            <div class="sub-title" v-if="item.birth_year_month">生日：{{ item.birth_year_month }}</div>
            
            <div class="sub-title" v-if="item.begin_work_date">参加工作：{{ item.begin_work_date }} {{ item.live_city }}</div>
            <div class="sub-title" v-if="item.position">求职期望：<span style="color:#FF4D4F;">{{ item.position }}</span></div>
            <div class="bottom-box" v-if=" item.userjobexpectation.length > 0">
              <!-- <span>{{ item.userjobexpectation[0].desired_industry }}</span> -->
              <span v-for="(jobexpect_item,jobexpect_index) in item.userjobexpectation" :key="jobexpect_index">{{ jobexpect_item.desired_industry }}</span>
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
          <div class="hover" @click.stop="clickChat(item)">打招呼</div>
          <!-- <div>电话沟通</div> -->
        </div>
      </div>
      <el-empty description="暂无数据..." v-if="jobList.length == 0"></el-empty>

    </div>
    <!-- 列表模块 结束  -->

     <!-- 分页控制 -->
     <mPagination :data="paginationData" @pageChangeEvent="pageHasChanged"></mPagination>



     <!-- 预览在线简历 弹窗  -->
    <div class="container-zx">
      <el-dialog title="简历详情" :center="false" :visible.sync="zx_dialogVisible" width="1100px" :before-close="handleClose">
        <div class="pc-preview-wrapper">
          <div class="m-box">
            <!-- 个人信息 -->
            <div class="resume-item item-base" v-if="basic_info">
              <div class="figure J_resume_baseMsg_headImgPreview">
                <img :src="basic_info.avatar?basic_info.avatar:require('../../../assets/image/bossSide/img-user.jpg')" alt="" class="cur-default" v-if="basic_info"/>
              </div>
              <div class="item-right">
                <div style="text-align: left;">
                  <h2 class="name">{{ basic_info.name?basic_info.name:'暂无' }}</h2>
                  <div class="info-labels fr">
                    <span class="label-text">
                      <img src="../../../assets/image/Frame_1.png" alt="" class="fz fz-age"/>
                      <span>{{ basic_info.birth_year_month?basic_info.birth_year_month:'30岁' }}</span>
                    </span>
                    <em class="vline"></em>
                    <span class="label-text">
                      <img src="../../../assets/image/Frame_2.png" alt="" class="fz fz-age"/>
                      <span>{{ basic_info.begin_work_date?basic_info.begin_work_date:'暂无' }}</span>
                    </span>
                    <em class="vline"></em>
                    <span class="label-text">
                      <img src="../../../assets/image/icon-qzzt.png" alt="" class="fz fz-age"/>
                      <span>{{ basic_info.work_status_desc?basic_info.work_status_desc:'暂无' }}</span>
                    </span>
                    <em class="vline"></em>
                    <span class="label-text">
                      <img src="../../../assets/image/Frame_5.png" alt="" class="fz fz-age"/>
                      <span>{{ basic_info.live_city?basic_info.live_city:'暂无' }}</span>
                    </span>
                  </div>
                </div>
                <div class="text selfDescription">{{ basic_info.advantages_highlight?basic_info.advantages_highlights:'暂无' }}</div>
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
                    <em class="vline"></em>
                    <span class="label-text">{{ items.desired_location }}</span>
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
          
        </div>
        <div class="info-right-box">
          <div class="m-box">
            <div class="title">感觉人才还不错，您可以:</div>
            <div class="form-btns">
              <el-button type="primary" @click="clickChat(infoData)">打招呼</el-button>
              <el-button @click="clickMobile(infoData)">电话沟通</el-button>
            </div>
            <div class="icon-box">
              <div>
                <img src="../../../assets/image/bossSide/icon-shareAlt-1.png" alt="" />
                <span>转发给同事</span>
              </div>
              <div @click="collection">
                <img src="../../../assets/image/bossSide/icon-star-1.png" alt="" />
                <span :class="infoData.is_collection == 1?'hover':''"> {{ infoData.is_collection == 1?"已收藏":'收藏' }}</span>
              </div>
              <!-- <div>
                <img src="../../../assets/image/bossSide/icon-download-1.png" alt="" />
                <span>存至本地</span>
              </div>
              <div>
                <img src="../../../assets/image/bossSide/icon-printer.png" alt="" />
                <span>打印</span>
              </div> -->
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import mPagination from '@/components/m-pagination';
import filterOptionsContainer from '../components/filterOptionsContainer.vue';

export default {
  name: 'searchTalent',
  components: {
    mPagination,
    filterOptionsContainer
  },
  data(){
    return {
      search_value:'',
      jobList:[],  // 列表
      // 分页数据
      paginationData: {
        total: 10,
        currentPage: 1,
        pageSize: 20,
      },
      zx_dialogVisible: false,
      infoData:'',
      basic_info:{},
      activeName: 'recommended',
      filterInfo:{}
    }
  },
  created(){
    this.search_value = this.$route.query.input_name;
    this.getSearchinfo();
  },
  methods:{
     // 筛选
     getfilterInfo(e){
      let info = JSON.parse(e);
      this.filterInfo = info;
      this.paginationData= {
        total: 10,
        currentPage: 1,
        pageSize: 20,
      };
      this.getSearchinfo();
    },
    clickTagname(n){
      this.search_value = n;
      this.getSearchinfo();
    },
    // 点击我的收藏 --- 跳转到我的收藏
    myCollection(){
      this.$router.push('/myCollect');
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleClose(done) {
      this.zx_dialogVisible = false;
    },
    // 分页事件
    pageHasChanged() {
      this.getSearchinfo();
    },
    // 获取省市区地址级联
    handleChange(thsAreaCode) {

      let areaCode = thsAreaCode;
      let length = areaCode.length;
      let index = length - 10;
      if(length > 10){
        this.$message.error({
          message: '最多选择10个城市！'
        })

        this.selectedOptions = areaCode.splice(index,length) // 返回被截取的对象
        return
      }
      this.selectedOptions = thsAreaCode;
    },
    // 搜索
    getSearchinfo(){
      let that = this;
      let p = {
        page: that.paginationData.currentPage,
        pagesize: that.paginationData.pageSize,
        search: that.search_value,
        many_search:{}
        // desired_location: desired_location.length>0?desired_location.join(','):'',
      }
      let filterInfo = that.filterInfo;
      for(let key in filterInfo){
        if(filterInfo[key]){
          p.many_search[key] = filterInfo[key]
        }
      }
      if(p.many_search.work_address == '全国'){
        p.many_search.work_address = ''
      }
      that.$axios.post('/api/company-position/search',p).then( res =>{
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
      let that = this;
      
      that.$axios.post('/api/company/resume/detail',{
        uid: i.uid
      }).then( res =>{
        if(res.code == 0){
          that.infoData = res.data;
          that.basic_info = res.data.basic_info;

          that.zx_dialogVisible = true;
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    // 点击收藏
    collection(){
      let that = this;
      let url = '';
      let infoData = that.infoData;
      if( infoData.is_collection == 1){
        // 取消收藏
        url = '/api/company-collection/cancelcollection'
      }else{
        //收藏
        url = '/api/company-collection/collection'
      }
      that.$axios.post(url,{
        uid: infoData.basic_info.uid,
      }).then( res =>{
        if(res.code == 0){
          that.$message.success({
            message:res.msg
          })
        infoData.is_collection == 1?infoData.is_collection = 2 : infoData.is_collection = 1;
        that.infoData = infoData;
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    // 点击打电话
    clickMobile(i){
      let that = this;
      let p = {
        uid: i.uid|| i.basic_info.uid,
      }
      that.$axios.post('/api/company/get-user-mobile',p).then( res =>{
        if(res.code == 0){
          
          this.$alert(res.data.mobile, '电话', {
            confirmButtonText: '确定',
          });
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    // 点击聊一聊
    clickChat(i){
      let that = this;
      let infoData = {
        uid: i.uid || i.basic_info.uid,
        name: i.name || i.basic_info.uid,
        avatar: i.avatar || i.basic_info.uid,
      }
      that.$bus.$emit('receiveParams', {type:'searchTalent',infoData:JSON.stringify(infoData) });
      return
      let p = {
        uid: i.uid|| i.basic_info.uid,
        content:'看过您的简历后，希望可以和您聊聊，谢谢！'
      }
      that.$axios.post('/api/company/find-user',p).then( res =>{
        if(res.code == 0){
          that.$router.push('/interaction?user_uid=' + i.uid);
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .searchTalent-top-box{
    // padding-bottom: 0;
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
              height: 100%;
              width: auto;
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

              .el-cascader{
                font-size: 14px;
                font-weight: 400;
                color: #86909C;
                padding-left: 8px;
                height: 100%;
                /deep/ .el-input{
                  height: 100%;
                }
                /deep/ .el-input__inner{
                  padding: 0;
                }
                /deep/ .el-input__suffix{
                  display: none;
                }
                /deep/ .el-cascader__label{
                  width: 100%;
                  height: 100%;
                  display: flex;
                  align-items: center;
                }
                
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
            cursor: pointer;
            display: flex;
            align-items: center;
            img{
              width: 14px;
              height: 14px;
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
        width: 20rem;
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
              padding: 0 6px;
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
              padding-left: 8px;
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
    display: flex;
    flex-direction: column;
    height: calc(100vh - 68px);
    .el-dialog__header{
      text-align: left;
      background: #fff;
      padding: 16px 20px;
      height: auto;
      .el-dialog__title{
        font-size: 16px;
        color: $g_textColor;
      }
    }
    .el-dialog__body{
      // height: calc(100vh - 128px);
      flex: 1;
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
              &.hover{
                color: $g_color;
              }
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
  .job-tab-box{
    width: 100%;
    height: 2.8rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    /deep/ .el-tabs{
      height: 100%;
      .el-tabs__header {
        height: 100%;
        .el-tabs__nav-wrap{
          height: 100%;
          line-height: 2.8rem;
          &::after{
            height: 0;
          }
          .el-tabs__nav-scroll {
            height: 100%;
            padding: 0 20px;
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
    .seach-box{
      width: auto;
      padding-right: 1.5rem;
      font-size: 14px;
      display: flex;
      align-items: center;
      &>div{
        display: flex;
        align-items: center;
        margin-left: 20px;
        cursor: pointer;
        img{
          width: 14px;
          height: 14px;
        }
        span{
          font-size: 14px;
          line-height: 22px;
          padding-left: 4px;
        }
      }
    }
  }
  .tab-right{
    width: 124px;
    line-height: 32px;
    color: #4E5969;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    img{
      width: 14px;
      height: 14px;
    }
    span{
      font-size: 14px;
      line-height: 22px;
      padding-left: 4px;
    }
  }
  /deep/ .el-checkbox__input.is-checked .el-checkbox__inner, /deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background: $g_bg;
    border-color: $g_bg;
  }
  .screen-box {
    padding: 20px 20px 10px 20px;
  }
</style>