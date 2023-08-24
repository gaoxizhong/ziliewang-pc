<template>
  <!-- 职位介绍 -->
  <div class="jobDescription-box">
    <div class="title">职位介绍</div>
    <div class="title-subtag">
      <span>绩效奖金</span>
      <span>带薪年假</span>
      <span>双休</span>
    </div>
    <div class="info-box">
      <div class="title">在</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .jobDescription-box{
    width: 100%;
    .title{
      font-size: 0.8rem;
      font-weight: bold;
      color: $g_textColor;
      line-height: 1.2rem;
    }
    .title-subtag{
      margin-top: 0.5rem;
      span{
        font-size: 12px;
        font-weight: 400;
        color: #1D2129;
        line-height: 20px;
        padding: 6px 12px;
        border: 1px solid #E5E6EB;
        border-radius: 4px;
        background: #F7F8FA;
        margin-left: 8px;
        &:nth-of-type(1){
          margin-left: 0;
        }
      }
    }
    .info-box{
      width: 100%;
      margin-top: 1.3rem;
      margin-left: 1rem;
    }
  }
</style>