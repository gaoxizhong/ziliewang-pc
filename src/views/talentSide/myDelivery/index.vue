<template>
  <div class="container">
    <div class="info-box myDelivery">
      <!-- 左侧模块 开始 -->
      <div class="info-left-box">
        <div class="tab-box">
          <el-tabs v-model="tag" @tab-click="handleClick">
            <el-tab-pane label="我的投递" name="myDelivery">
              <div class="sub-tab-box">
                <ul>
                  <li :class="sub_tag == 0 ? 'is-active':'' " @click.stop="clickSubTag(0)">全部状态</li>
                  <li :class="sub_tag == 1 ? 'is-active':'' " @click.stop="clickSubTag(1)">已投递</li>
                  <li :class="sub_tag == 2 ? 'is-active':'' " @click.stop="clickSubTag(2)">已查看</li>
                  <li :class="sub_tag == 3 ? 'is-active':'' " @click.stop="clickSubTag(3)">面试邀约</li>
                  <li :class="sub_tag == 4 ? 'is-active':'' " @click.stop="clickSubTag(4)">不合适</li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="我的收藏" name="myCollection"></el-tab-pane>
          </el-tabs>
        </div>
        <!-- 列表模块 开始 -->
        <div class="info-list-box">

          <div class="list-items" v-for="(item,index) in infoList" :key="index">
            <div class="items-left-box">
              <p class="items-title">导电浆料研发工程师【南通】 <span class="items-title-span">15-18K</span></p>
              <div class="items-tag-box">
                <el-tag>3-5年</el-tag>
                <el-tag>硕士</el-tag>
              </div>
              <div class="items-firm-info">
                <span class="firm-info-1">南通天盛新能源股份有限公司</span>
                <span class="firm-info-2">新能源新三板上市100-499人</span>
              </div>
            </div>
            <div class="items-right-box">
              <div class="right-c"></div>
            </div>
          </div>

        </div>
        <!-- 列表模块 结束 -->
      </div>
      <!-- 左侧模块 结束 -->

      <!-- 右侧模块 开始 -->
      <div class="info-right-box">
        <div class="right-box">2</div>
      </div>
      <!-- 右侧模块 结束 -->

    </div>
  </div>

</template>

<script>
export default {
  name: 'myDelivery',
  components: {
  },
  data(){
    return{
      tag: 'myDelivery',
      sub_tag: 0,
      infoList: [{},{}], // 列表
    }
  },
  computed: {
    
  },
  methods: {
    handleClick(tab, event){
      console.log(tab)
    },

    // 点击我的投递--子标签
    clickSubTag(n){
      this.sub_tag = n;
    }
  },
};
</script>

<style lang="scss" scoped>
  .info-box{
    width: 100%;
    display: flex;
    margin-top: 1rem;
    .info-left-box{
      flex: 1;
      .tab-box{
        width: 100%;
        border-radius: 6px;
        background: #FFFFFF;
        padding: 0.5rem 0.8rem;
        /deep/ .el-tabs {
          .el-tabs__item:hover,.el-tabs__item.is-active{
            color: $g_color;
          }
          .el-tabs__active-bar{
            background: $g_bg;
          }
          .el-tabs__nav-wrap::after{
            height: 1px;
          }
          .sub-tab-box{
            width: 100%;
            ul{
              width: 100%;
              display: flex;
              align-items: center;
              li{
                font-size: 14px;
                color: $g_textColor;
                margin-left: 20px;
                padding: 6px 12px;
                border-radius: 6px;
                cursor: pointer;
                &:nth-of-type(1){
                  margin-left: 0;
                }
              }
              li.is-active{
                background: #F4F8FF;
                color: $g_color;
              }
            }
          }

        }

        
      }
      .info-list-box{
        width: 100%;
        .list-items{
          margin-top: 16px;
          background: #fff;
          border-radius: 6px;
          padding: 16px;
          display: flex;
          .items-left-box{
            flex: 1;
            text-align: left;
            .items-title{
              font-size: 16px;
              font-weight: bold;
              color: #000000;
              line-height: 22px;
              .items-title-span{
                color: #FF4D4F;
                padding-left: 10px;
              }
            }
            .items-tag-box{
              margin-top: 6px;
              .el-tag{
                background-color: #F7F8FA;
                border-color: #F7F8FA;
                color: #1F2E4DFF;
                height: 22px;
                padding: 0 10px;
                line-height: 22px;
                font-size: 12px;
                border-radius: 2px;
                margin-left: 10px;
                &:nth-of-type(1){
                  margin-left: 0;
                }
              }
            }
            .items-firm-info{
              margin-top: 20px;
              .firm-info-1{
                font-size: 14px;
                font-weight: 400;
                color: $g_textColor;
              }
              .firm-info-2{
                margin-left: 16px;
                font-size: 14px;
                font-weight: 400;
                color: #86909C;
              }
            }
          }
          .items-right-box{
            width: 160px;
            .right-c{
              width: 0;
              height: 100%;
              opacity: 0.5;
              border: 1px dashed;
              border-image: linear-gradient(180deg, rgba(255, 117, 26, 0), rgba(255, 100, 0, 1), rgba(255, 117, 26, 0)) 1 1;
            }
          }

        }
      }
    }
    .info-right-box{
      width: 380px;
      padding-left: 0.8rem;
      .right-box{
        background: #FFFFFF;
        border-radius: 6px ;
        opacity: 1;
        padding: 1.2rem;
      }
    }
  }
</style>
