<template>
  <!-- 公司简介 -->
  <div class="div-box">
    <div class="title">公司简介</div>
    <div class="info-box">
      <div class="text">
        北京市建筑设计研究院有限公司( 简称BIAD )，成立于1949年，是与共和国龄的大型国有建筑设计咨询机构，是北京市人民政府出资并按照《公司法》设立的国有独资公司，北京市人民政府国有资产监督管理委员会监督管理的一级企业。
      </div>
    </div>
  </div>
</template>

<script>
export default {

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
    .info-box{
      width: 100%;
      margin-left: 1rem;
      margin-top: 1rem;
      .text{
        color: $g_textColor;
        font-size: 14px;
        font-weight: 400;
        line-height: 28px;
      }
    }
  }
</style>