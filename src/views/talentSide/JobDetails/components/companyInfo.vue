<template>
  <!-- 公司信息 -->
  <div class="div-box">
    <div class="title">公司信息</div>
    <div class="info-name-box">
      <img :src="infoData.logo" alt="" class="com-img"/>
      <div class="name-box">
        <div class="com-name">{{ infoData.company_name }}</div>
        <div class="com-job-num">在招职位<span>{{ infoData.recruit_position_num }}</span>个</div>
      </div>
    </div>
    <div class="info-2-box">
      <div>
        <span class="span-t">企业行业:</span>
        <span class="span-i">{{ infoData.industry_requirement }}/{{ infoData.industry }}</span>
      </div>
      <div>
        <span class="span-t">人数规模:</span>
        <span class="span-i">{{ infoData.company_scale }}</span>
      </div>
      <div>
        <span class="span-t">职位地址:</span>
        <span class="span-i">{{ infoData.company_register_address }}</span>
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
      margin-top: 10px;
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
    .info-2-box{
      margin-top: 5px;
      &>div{
        margin-top: 4px;
        display: flex;
        font-size: 13px;
        .span-t{
          width: auto;
          font-weight: 400;
          color: $g_textColor;
          line-height: 24px;
        }
        .span-i{
          flex: 1;
          font-weight: 400;
          color: #86909C;
          line-height: 24px;
          padding-left: 10px;
        }
      }
    }
  }
</style>
