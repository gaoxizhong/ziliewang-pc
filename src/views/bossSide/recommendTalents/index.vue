<template>
  <div class="bossSide-container">
    <div class="tab-box">
      <div class="tab-left">
        <div :class="tabStatus == 1?'hover-items':'' " @click="clickStatus(1)">UI设计师</div>
        <div :class="tabStatus == 2?'hover-items':'' " @click="clickStatus(2)">人力资源招聘</div>
      </div>
      <div class="tab-right" @click="goToMyCollection">
        <img src="../../../assets/image/bossSide/icon-star.png" alt="" />
        <span>我的收藏</span>
      </div>
    </div>
    <div class="job-tab-box m-box margin-top-20">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="智能推荐" name="recommended"></el-tab-pane>
        <el-tab-pane label="最新" name="latest"></el-tab-pane>
      </el-tabs>
      <div class="seach-box">
        <div><img src="../../../assets/image/bossSide/icon-local-two.png" alt=""><span>宁波</span></div>
        <div><img src="../../../assets/image/bossSide/icon-filter.png" alt=""><span>筛选</span></div>
      </div>
    </div>

    <div class="job-list-box">
      <div v-for="(item,index) in jobList" :key="index" class="jobList-items m-box margin-top-20">
        <div class="items-left-box">
          <div></div>
          <img src="../../../assets/image/bossSide/img-user.png" alt="" class="avatar-box">
          <div class="left-info-box">
            <div class="left-info-t">
              <span class="left-info-name">单女士</span>
              <img src="../../../assets/image/bossSide/icon-sex.png" alt="" >
              <span class="icon-span">今日活跃</span>
            </div>
            <div class="sub-title">35岁 工作11年 硕士 北京</div>
            <div class="sub-title">求职期望: <span style="color:#FF4D4F;">UI设计师</span></div>
            <div class="bottom-box">
              <span>房地产开发经营</span>
              <span>融资</span>
            </div>
          </div>
        </div>
        <div class="items-m-box">
          <div class="items-m-p professional">
            <div>北京联东投资(集团)有限公司<span style="color:#FF4D4F;">·UI设计师</span><span class="time-span">2019.08-至今（3年6个月）</span></div>
            <div>北京联东投资(集团)有限公司<span style="color:#FF4D4F;">·UI设计师</span><span class="time-span">2019.08-至今（3年6个月）</span></div>
          </div>
          <div class="items-m-p educational">
            <div>中国人民大学·金融学·硕士·非统招<span class="time-span">2013.08-2016.07（3年6个月）</span></div>
            <div>烟台大学·公共事业管理·本科·统招<span class="time-span">2006.09-2010.07 (4年）</span></div>
          </div>
        </div>
        <div class="items-right-box">
          <div class="hover">打招呼</div>
          <div>电话沟通</div>
        </div>
        <div class="close-box"><img src="../../../assets/image/bossSide/icon-close.png" alt=""></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabStatus: 1,
      jobList:[{},{}],
      activeName: 'recommended',
    }
  },
  methods:{
    clickStatus(n){
      this.tabStatus = n;
    },
    // 点击我收藏的
    goToMyCollection(){
      this.$router.push({ path:'/' })
    },
    handleClick(tab, event) {
      console.log(tab, event);
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
        margin-right: 10px;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        color: $g_textColor;
        cursor: pointer;
      }
      &>div.hover-items{
        color: $g_color;
        font-weight: bold;
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
  .job-list-box{
    width: 100%;
    .jobList-items{
      padding: 1rem 1.3rem;
      display: flex;
      justify-content: space-between;
      position: relative;
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
      .close-box{
        width: auto;
        height: auto;
        padding: 6px;
        position: absolute;
        top: 0.6rem;
        right: 0.8rem;
        cursor: pointer;
        img{
          width: 14px;
          height: 14px;
          display: inline-block;
        }
      }
    }

  }
</style>