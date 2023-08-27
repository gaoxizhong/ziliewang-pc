<template>
  <!-- 职位介绍 -->
  <div class="div-box">
    <div class="title">职位介绍</div>
    <div class="title-subtag">
      <span>绩效奖金</span>
      <span>带薪年假</span>
      <span>双休</span>
    </div>
    <div class="info-box">
      <div class="title">职责描述:</div>
      <div class="text">
        1、严格按照公司规定的财务制度和审批流程开展日常财务工作<br />
        2、组织项目会计核算和财务管理工作，准确完成各项财务报表，客观真实反映工程的财务状况，及时、准确处理工程项目的会计业务，并审查其合法性、合理性 :<br />
        3、编制公司各项对内和对外的财务报表:<br />
        4、负责公司涉税业务会计核算、完成税务审核、申报等相关工作，<br />
        5、建立工程价款台帐及其他往来账，经常与项目合作方对账，协调处理好与各方的关系，按目编制资金计划，<br /> 
      </div>
      <div class="title">任职要求:</div>
      <div class="text">
        1、大学本科及以上学历，会计、财务管理等相关专业，持有会计资格证书<br />
        2、具有5年以上工程行业财务管理相关工作经验:<br />
        3、熟练操作用友财务软件及常用办公软件，熟悉各项财务操作流程<br />
        4、工作认真负责，耐心细致，有良好的沟通协调能力和团队合作意识<br />
        5、有中级职称者优先<br />
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
    .title-subtag{
      margin-top: 10px;
      span{
        font-size: 12px;
        font-weight: 400;
        color: #1D2129;
        line-height: 20px;
        padding: 0.3rem 0.6rem;
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
      margin-left: 1rem;
      color: $g_textColor;
      font-size: 14px;
      font-weight: 400;
      line-height: 28px;
      .title{
        margin-top: 1.3rem;
      }
    }
  }
</style>