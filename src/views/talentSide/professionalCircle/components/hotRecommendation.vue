<template>
    <div class="info-right-top">
      <div class="title">热门职位</div>
      <ul>
        <li>
          <div class="li-title">
            <span class="li-text">软件测试/解决方案测试工...</span>
            <span class="li-xz">25-50K·13薪</span>
          </div>
          <div class="li-bottom-box">
            <div>华为云</div>
            <span>宁波</span>
          </div>
        </li>
        <li>
          <div class="li-title">
            <span class="li-text">软件测试/解决方案测试工...</span>
            <span class="li-xz">25-50K·13薪</span>
          </div>
          <div class="li-bottom-box">
            <div>华为云</div>
            <span>宁波</span>
          </div>
        </li>
        <li>
          <div class="li-title">
            <span class="li-text">软件测试/解决方案测试工...</span>
            <span class="li-xz">25-50K·13薪</span>
          </div>
          <div class="li-bottom-box">
            <div>华为云</div>
            <span>宁波</span>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>

export default {
  components: {
  },
  data(){
    return{

    }
  },
  computed: {
    
   
  },

  methods: {
   
   
  },
};
</script>

<style lang="scss" scoped>
  .info-right-top{
    width: 100%;
    height: auto;
    padding: 0.8rem 1.1rem;
    background: #FFFFFF;
    border-radius: 4px 4px 4px 4px;
    .title{
      font-size: 0.8rem;
      font-weight: bold;
      color: $g_textColor;
      line-height: 1.2rem;
    }
    ul{
      margin-top: 1rem;
      width: 100%;
      li{
        width: 100%;
        height: auto;
        padding: 0.6rem 0.7rem;
        font-size: 0.7rem;
        cursor: pointer;
        &:hover{
          background: #F4F8FF;
        }
        .li-title{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: bold;
          .li-text{
            flex: 1;
            color: $g_textColor;
            line-height: 22px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .li-xz{
            width: auto;
            color: #FF4D4F;
            line-height: 22px;
          }
        }
        .li-bottom-box{
          margin-block: 0.8rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          div{
            font-size: 12px;
            font-weight: 400;
            color: #86909C;
            line-height: 20px;
          }
        }
      }
    }
  }
</style>
