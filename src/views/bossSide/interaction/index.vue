<template>
  <div class="bossSide-container interaction-box">
    <!-- 互动页 -->
    <div class="tab-box">
      <div class="tab-left">
        <div :class="tabStatus == 1?'hover-items':'' " @click="clickStatus(1)">沟通中</div>
        <div :class="tabStatus == 2?'hover-items':'' " @click="clickStatus(2)">已约面</div>
        <div :class="tabStatus == 3?'hover-items':'' " @click="clickStatus(3)">不合适</div>
        <div :class="tabStatus == 4?'hover-items':'' " @click="clickStatus(4)">收藏</div>
      </div>
      <!-- <div class="tab-right">
        <span></span>
      </div> -->
    </div>
    <div class="chat-window-box margin-top-20 m-box">
      <div class="left-box">
        <div class="seach-box"></div>
        <div class="personAbility-box">

          <div class="personAbility-items-box">
            <img src="../../../assets/image/bossSide/img-user.jpg" alt="" />
            <div class="name-box">
              <div class="name-t">
                <span class="span-1">康先生</span>
                <span class="span-2">商办中心负责人</span>
              </div>
              <div class="sub-title">想了解一下贵公司是否还在招产...</div>
            </div>
            <span class="time">01-11</span>
          </div>

          <div class="personAbility-items-box">
            <img src="../../../assets/image/bossSide/img-user.jpg" alt="" />
            <div class="name-box">
              <div class="name-t">
                <span class="span-1">康先生</span>
                <span class="span-2">商办中心负责人</span>
              </div>
              <div class="sub-title">想了解一下贵公司是否还在招产...</div>
            </div>
            <span class="time">01-11</span>
          </div>

          <div class="personAbility-items-box">
            <img src="../../../assets/image/bossSide/img-user.jpg" alt="" />
            <div class="name-box">
              <div class="name-t">
                <span class="span-1">康先生</span>
                <span class="span-2">商办中心负责人</span>
              </div>
              <div class="sub-title">想了解一下贵公司是否还在招产...</div>
            </div>
            <span class="time">01-11</span>
          </div>

          <div class="personAbility-items-box">
            <img src="../../../assets/image/bossSide/img-user.jpg" alt="" />
            <div class="name-box">
              <div class="name-t">
                <span class="span-1">康先生</span>
                <span class="span-2">商办中心负责人</span>
              </div>
              <div class="sub-title">想了解一下贵公司是否还在招产...</div>
            </div>
            <span class="time">01-11</span>
          </div>


        </div>
      </div>
      <div class="right-box">
        <div class="seach-box">
          <img src="../../../assets/image/bossSide/img-user.jpg" alt="" />
          <div class="name-t">
            <div class="span-1">康先生</div>
            <div class="span-2">商办中心负责人·龙湖地产福州公司</div>
          </div>
        </div>
        <div class="job-box">
          <div>
            <span class="job-title">沟通职位：</span>
            <span class="blue">厦门产业园投资总经理</span>
          </div>
          <div></div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      tabStatus: 1,
    }
  },
  methods:{
   
    clickStatus(n){
      this.tabStatus = n;
    },
  
  }
}
</script>

<style lang="scss" scoped>
  .interaction-box{
    height: 100%;
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 90px);
  }
  .tab-box{
    height: auto;
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
        height: 32px;
        line-height: 32px;
        padding: 0 10px;
        background: #FFFFFF;
        border-radius: 4px;
        border: 1px solid #E5E6EB;
        margin-right: 4px;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        color: $g_textColor;
        cursor: pointer;
      }
      &>div.hover-items{
        color: $g_color;
        border-color: $g_color;
      }
    }
    .tab-right{
      width: 124px;
      height: 32px;
      line-height: 32px;
      border-radius: 6px;
      background: $g_bg;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      img{
        width: 14.3px;
        height: 14.3px;
      }
      span{
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        padding-left: 4px;
      }
    }
  }
  .chat-window-box{
    padding: 0;
    width: 100%;
    flex: 1;
    display: flex;
    .left-box{
      width: 320px;
      border-right: 1px solid #F2F3F5;
      .seach-box{
        width: 100%;
        height: 54px;
        border-bottom: 1px solid #F2F3F5;
      }

      .personAbility-box{
        .personAbility-items-box{
          width: 100%;
          padding: 16px 12px;
          display: flex;
          &>img{
            width: 40px;
            height: 40px;
          }

          .name-box{
            flex: 1;
            .name-t{
              display: flex;
              align-items: center;
              padding-left: 4px;
              .span-1{
                font-size: 14px;
                font-weight: 500;
                color: #1F2E4D;
                line-height: 22px;
              }
              .span-2{
                padding-left: 2px;
                font-size: 12px;
                color: #1F2E4D;
                line-height: 20px;
              }
            }
            .sub-title{
              font-size: 12px;
              font-weight: 400;
              color: #86909C;
              line-height: 20px;              
            }
          }
          .time{
            width: auto;
            font-size: 12px;
            font-weight: 400;
            color: #86909C;
            line-height: 20px;
          }

        }
      }
    }
    .right-box{
      flex: 1;
      .seach-box{
        width: 100%;
        height: 54px;
        border-bottom: 1px solid #F2F3F5;
        padding-left: 16px;
        display: flex;
        align-items: center;
        &>img{
          width: 34px;
          height: 34px;
        }
        .name-t{
          padding-left: 4px;
          .span-1{
            font-size: 14px;
            font-weight: 500;
            color: #1F2E4D;
            line-height: 22px;
          }
          .span-2{
            font-size: 12px;
            color: #86909C;
            line-height: 20px;
          }
        }

      }

      .job-box{
        margin-top: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        &>div{
          display: flex;
          align-items: center;
          .job-title{
            font-size: 14px;
            font-weight: 400;
            color: #86909C;
            line-height: 22px;
          }
          .blue{
            font-size: 14px;
            font-weight: 400;
            color: #3377FF;
            line-height: 22px;
            padding-left: 4px;
          }
        }
      }
    }
  }


</style>