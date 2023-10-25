<template>
  <!-- 公司信息 -->
  <div class="div-box">
    <div class="title">公司信息</div>
    <div class="info-name-box">
      <img :src="infoData.logo" alt="" class="com-img"/>
      <div class="name-box">
        <div class="com-name">{{ infoData.company_name }}</div>
        <div class="com-job-num">在招职位<span>135</span>个</div>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  props:{
    infoData:{
      type: Object,
      default() {
          return {}
        }
    }
  },
}
</script>

<style lang="scss" scoped>
  .div-box{
    width: 100%;
    &>.title{
      font-size: 16px;
      font-weight: bold;
      color: $g_textColor;
      line-height: 1.2rem;
    }
    .info-name-box{
      width: 100%;
      display: flex;
      margin-top: 24px;
      .com-img{
        width: 54px;
        height: 54px;
      }
      .name-box{
        flex: 1;
        padding-left: 10px;
        .com-name{
          font-size: 14px;
          font-weight: 400;
          color: $g_textColor;
          line-height: 22px;
        }
        .com-job-num{
          font-size: 14px;
          font-weight: 400;
          color: #86909C;
          line-height: 22px;
        }
      }
    }
  }
</style>
