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
              <div class="input-add-box"><img src="../../../assets/image/bossSide/icon-local-two.png" alt=""><span>宁波</span></div>
              <el-input v-model="search_value" placeholder="搜索职位/公司/内容关键词"></el-input>
            </div>
            <button class="input-button">搜索</button>
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
      </div>
    </div>
    <!-- 列表模块 结束  -->



  </div>
</template>

<script>
export default {
  data(){
    return {
      search_value:'',
      hotJob_options: ['UI设计师','项目经理/主管','工艺工程师','3D设计师','电话销售'],
      jobList:[{},{},{},{}],  // 列表
    }
  }
}
</script>

<style lang="scss" scoped>
  .searchTalent-top-box{
    .search-box{
      padding: 0 3rem 0 4.5rem;
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
        margin: 10px 0;
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
            padding: 4px 20px;
            border-radius: 4px;
            background: #fff;
            text-align: center;
            font-size: 14px;
            color: $g_color;
            margin-left: 8px;
            margin-bottom: 10px;
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
      .items-left-box{
        width: auto;
        display: flex;
        .avatar-box{
          width: 56px;
          height: 50px;
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
              font-size: 18px;
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
        padding-left: 8.6rem;
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
        margin-right: 20px;
        cursor: pointer;
        &.hover{
          background: $g_bg;
          color: #fff;
        }
       }
        
      }
    }

  }
</style>