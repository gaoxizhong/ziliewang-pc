<template>
  <!-- 企业主页 -->
  <div class="bossSide-container">
    
    <div class="m-box page-box">
      <div class="page-left-box">
        <div class="title">完善主页信息，让求职者更快了解您的企业</div>
        <div class="sub-title">以下打勾项已成功发布，建议您继续完善其他信息</div>
        <div class="list-box">
          <div class="items-box">
            <img src="../../../assets/image/bossSide/check-circle.png" alt="" class="status-img"/>
            <div class="items-m">
              <div class="title">企业基本信息</div>
              <div class="items-icon">
                <span>企业logo</span>
                <span>所属主行业</span>
                <span>所属副行业</span>
                <span>企业性质</span>
                <span>企业规模</span>
                <span>上市/投融资状态</span>
                <span>企业注册地</span>
                <span>企业对外展示名称</span>
              </div>
            </div>
            <div class="items-right-box">
              <img src="../../../assets/image/bossSide/form-xg.png" alt="" @click="goToEnterpriseInfo('jcxx')"/>
            </div>
          </div>
          <div class="items-box">
            <img src="../../../assets/image/bossSide/check-circle.png" alt="" class="status-img"/>
            <div class="items-m">
              <div class="title">企业介绍</div>
              <div class="items-icon">
                <span>企业基本介绍</span>
                <span>企业成立时间</span>
                <span>企业官网</span>
                <span>核心产品</span>
                <span>企业获奖名称/获奖资讯链接</span>
                <span>集团旗下相关企业/关系说明</span>
              </div>
            </div>
            <div class="items-right-box">
              <img src="../../../assets/image/bossSide/form-xg.png" alt=""  @click="goToEnterpriseInfo('qyjx')"/>
            </div>
          </div>

          <div class="items-box">
            <img src="../../../assets/image/bossSide/check-circle.png" alt="" class="status-img"/>
            <div class="items-m">
              <div class="title">工作制度及福利</div>
              <div class="items-icon">
                <span>加班情况</span>
                <span>企业地址</span>
                <span>工作时间</span>
                <span>休息时间</span>
                <span>企业规模</span>
                <span>企业对外展示名称</span>
              </div>
            </div>
            <div class="items-right-box">
              <img src="../../../assets/image/bossSide/form-xg.png" alt="" @click="goToEnterpriseInfo('zdfl')"/>
            </div>
          </div>

          <div class="items-box">
            <img src="../../../assets/image/bossSide/check-circle.png" alt="" class="status-img"/>
            <div class="items-m">
              <div class="title">企业形象</div>
              <div class="items-icon">
                <span>团队牛人</span>
                <span>团队风格</span>
                <span>团队结构</span>
                <span>团队阶段</span>
              </div>
            </div>
            <div class="items-right-box">
              <img src="../../../assets/image/bossSide/form-xg.png" alt=""  @click="goToEnterpriseInfo('qyxx')"/>
            </div>
          </div>

          <div class="items-box">
            <img src="../../../assets/image/bossSide/check-circle.png" alt="" class="status-img"/>
            <div class="items-m">
              <div class="title">牛人团队</div>
              <div class="items-icon">
                <span>团队风格</span>
                <span>团队结构</span>
                <span>团队阶段</span>
                <span>团队牛人</span>
              </div>
            </div>
            <div class="items-right-box">
              <img src="../../../assets/image/bossSide/form-xg.png" alt="" @click="goToEnterpriseInfo('nrtd')"/>
            </div>
          </div>

        </div>
      </div>
      <div class="page-right-box"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods:{
    goToEnterpriseInfo(t){
      this.$router.push({
        path:'/enterpriseInfoEdit',
        query:{           //路由传参时push和query搭配使用 ，作用时传递参数
          type: t,
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-box{
    display: flex;
    &>div{
      flex: 1;
    }
    .page-left-box{
      .title{
        font-size: 1.4rem;
        font-weight: bold;
        color: $g_textColor;
        line-height: 1.8rem;
      }
      .sub-title{
        font-size: 14px;
        font-weight: 400;
        color: $g_textColor;
        line-height: 1.1rem;
        margin-top: 12px;
      }
      .list-box{
        .items-box{
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          .status-img{
            width: 20px;
            height: 20px;
          }
          .items-m{
            flex: 1;
            text-align: left;
            padding-left: 26px;
            .title{
              font-size: 18px;
              font-weight: bold;
              color: $g_textColor;
              line-height: 26px;
            }
            .items-icon{
              margin-top: 6px;
              display: flex;
              flex-wrap: wrap;
              &>span{
                font-size: 14px;
                font-weight: 400;
                color: #86909C;
                line-height: 22px;
                padding-right: 14px;
                padding-top: 6px;
              }
            }

          }
          .items-right-box{
            width: auto;
            padding-left: 16px;
            display: flex;
            align-items: center;
            &>img{
              width: 18px;
              height: 18px;
              cursor: pointer;
            }
          }
        }

      }
    }
  }
</style>