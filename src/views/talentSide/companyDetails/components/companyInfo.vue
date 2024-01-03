<template>
  <!-- 公司信息 -->
  <div class="div-box">
    <div class="title">工商信息</div>
    <div class="business-detail" :class="is_show?'show-business-all':''">
      <div class="show-btn-box">{{ is_show?'收起':'查看更多' }}</div>
      <ul>
        <li class="w-420px">
          <span class="t">企业名称：</span>
          {{ infoData.company_name }}
        </li>
        <li class="w-210px">
          <span class="t">法定代表人：</span>
          {{ infoData.legal_person }}
        </li>
        <li class="w-150px">
          <span class="t">成立时间：</span>

        </li>
        <li class="w-420px">
          <span class="t">企业类型：</span>
          {{ infoData.business_nature }}
        </li>
        <li class="w-210px">
          <span class="t">上市状态：</span>
          {{ infoData.corporate_finance }}
        </li>
        <li class="w-150px">
          <span class="t">统一社会信用代码：</span>
          {{ infoData.organization_code }}
        </li>
      </ul>
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
  data(){
    return {
      is_show: false
    }
  }
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
    .business-detail{
      position: relative;
      border-radius: 12px;
      border: none;
      background: #f8f8f8;
      padding: 20px;
      height: auto;
      margin-top: 16px;
      .show-btn-box {
        position: absolute;
        display: block;
        bottom: 16px;
        left: 50%;
        width: auto;
        padding-right: 16px;
        transform: translate(-50%,0);
        top: auto;
        text-align: center;
        font-size: 15px;
        color: #00a6a7;
        line-height: 21px;
        transition: all .2s linear;
        cursor: pointer;
      }
      ul {
        overflow: hidden;
        max-height: 158px;
        display: flex;
        flex-wrap: wrap;
        li {
          display: inline-block;
          vertical-align: top;
          font-size: 15px;
          color: #333;
          line-height: 21px;
          padding: 0 5px 0 0;
          margin-bottom: 30px;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          -ms-box-sizing: border-box;
          -o-box-sizing: border-box;
          box-sizing: border-box;
          span {
            display: block;
            font-size: 14px;
            color: #999;
            line-height: 20px;
            margin-bottom: 8px;
          }
          .t {
            color: #9fa3b0;
            padding-right: 0;
          }
        }
        .w-420px{
          width: 21rem;
        }
        .w-150px{
          width: 13rem;
        }
        .w-210px{
          // width: 10.5rem;
          flex: 1;
        }
      }
    }
  }
</style>
