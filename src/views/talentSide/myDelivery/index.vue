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
          <jobList :data="infoData" :tag="tag"/>
        </div>
        <!-- 列表模块 结束 -->
      </div>
      <!-- 左侧模块 结束 -->

      <!-- 右侧模块 开始 -->
      <div class="info-right-box">
        <personalInfo />
      </div>
      <!-- 右侧模块 结束 -->

    </div>
  </div>

</template>

<script>
import jobList from '../components/jobList.vue'
import personalInfo from '../components/personalInfo.vue'
export default {
  name: 'myDelivery',
  components: {
    personalInfo,
    jobList
  },
  data(){
    return{
      tag: 'myDelivery',
      sub_tag: 0,
      infoData: {
        infoList: [{},{}], // 列表
      }
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
        margin-bottom: 16px;
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
      }
    }
    .info-right-box{
      width: 19rem;
      padding-left: 0.8rem;
    }
  }
 
</style>
