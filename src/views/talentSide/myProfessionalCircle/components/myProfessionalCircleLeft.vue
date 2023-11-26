<template>
  <div class="info-left-box">
    <div class="left-box user-top-box">
      <div class="user-top">
        <img :src="infoData.avatar?infoData.avatar:require('../../../../assets/image/img-user.jpg' )" alt="" class="user-img"/>
        <p class="user-name">{{ infoData.real_name }}</p>
        <p class="user-introduce">{{ infoData.position }}&nbsp;&nbsp;{{ infoData.company_name }}&nbsp;&nbsp;已关注<span @click="clickAttention('attention')">{{ infoData.attention_num }}</span>人&nbsp;&nbsp;有<span @click="clickAttention('fans')">{{ infoData.fan_num }}</span>个粉丝</p>
      </div>
      <!-- <div class="user-top-num">
        <div @click="clickAttention('attention')">
          <span class="title">{{ infoData.attention_num }}</span>
          <span class="text">关注</span>
        </div>
        <div @click="clickAttention('fans')">
          <span class="title">{{ infoData.fan_num }}</span>
          <span class="text">粉丝</span>
        </div>
      </div> -->
    </div>

    <div class="left-box user-m-box">
      <div class="option-box">
        <div class="option-title">工作经历</div>
        <ul class="row-options-detail-box">
          <li class="options-item" v-for="(item,index) in work_experience" :key="index">
            <div class="image-box">
              <img src="../../../../assets/image/work-icon.png" alt="" />
            </div>
            <div class="item-info">
              <div>总经理</div>
              <div>北京菁苗科技有限公司</div>
              <p>2022-05-10 — 至今</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="option-box">
        <div class="option-title">教育经历</div>
        <ul class="row-options-detail-box">
          <li class="options-item" v-for="(item,index) in education_experience" :key="index">
            <div class="education-image-box">
              <img src="../../../../assets/image/work-icon.png" alt="" />
            </div>
            <div class="item-info">
              <div>复旦大学</div>
              <div>硕士 · 管理学</div>
              <p>2022-05-10 — 至今</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- <div class="left-box user-b-box">
      <div @click="logout">退出登录</div>
    </div> -->
  </div>
</template>

<script>
export default {
  components: {
  },
  props:{
    infoData:{
      // 数组/对象的默认值应当由一个工厂函数返回
      type: Object,
      default() {
        return {}
      }
    }
  },
  data(){
    return{
      work_experience:[ {},{}],
      education_experience: [{},{}]
    }
  },
  mounted(){
  
  },
  computed: {
    // 点击关注/粉丝
    clickAttention(tag){
      this.$router.push({
        path:'/attentionFans',   //跳转的路径
        query:{           //路由传参时push和query搭配使用 ，作用时传递参数
          tag,
          see_uid: localStorage.getItem('realUid')
        }
      })
    },
  },
  methods: {
   
    
  },
};
</script>

<style lang="scss" scoped>
  .info-left-box{
    width: 18rem;
    .left-box{
      background: #FFFFFF;
      border-radius: 6px ;
      opacity: 1;
    }
    .user-top-box{
      width: 100%;
      .user-top{
        padding: 15px;
        margin: 0 auto;
        text-align: center;
        .user-img{
          width: 5.4rem;
          height: 5.4rem;
          border-radius: 50%;
          margin-bottom: 10px;
        }
        .user-name{
          color: $g_textColor;
          font-size: 16px;
          line-height: 28px;
          font-weight: bold;
          text-align: left;
        }
        .user-introduce{
          font-size: 14px;
          line-height: 23px;
          text-align: left;
          color: rgb(102, 102, 102);
          span{
            padding: 0 8px;
            color: $g_color;
            cursor: pointer;
          }
        }
        .gz-sx-btn{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 0.6rem;
          div{
            flex: 1;
            padding: 0.5rem;
            border-radius: 2px;
            font-size: 0.7rem;
            text-align: center;
            margin: 0 0.4rem;
            cursor: pointer;
            img{
              width: 0.6rem;
              height: 0.6rem;
            }
            &.left{
              background: $g_color;
              color: #fff;
              img{
                margin-right: 4px;
              }
            }
            &.right{
              border: 1px solid #E5E6EB;
              box-shadow: 0px 2px 0px 0px rgba(0,0,0,0.04);
              color: $g_textColor;
            }
          }
        }
      }
      .user-top-num{
        border-top: 1px solid #F2F3F5;
        display: flex;
        align-items: center;
        justify-content: space-between;
        div{
          flex: 1;
          text-align: center;
          padding: 0.6rem 0;
          font-size: 0.7rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .title{
            font-size: 1.2rem;
            font-family: DIN Alternate-Bold, DIN Alternate;
            font-weight: bold;
            color: #4E5969;
            line-height: 1.6rem;
          }
          .text{
            font-size: 0.7rem;
            font-weight: 400;
            color: #86909C;
            line-height: 1.1rem;
          }
          &:nth-of-type(1){
            border-right: 1px solid #F2F3F5;
          }
        }
      }
    }
    .user-top-num{
      width: 100%;
    }
    .user-top-num>div{
      cursor: pointer;
    }
    .user-m-box{
      margin-top: 10px;
      padding: 5px 16px;
      .m-items-box{
        display: flex;
        align-items: center;
        margin-top: 10px;
        font-size: 14px;
        img{
          width: 0.8rem;
          height: 0.8rem;
          margin-right: 0.6rem;
        }
        span{
          color: #86909C;
        }
        p{
          padding-left: 0.5rem;
          color: $g_textColor;
        }
      }
    }
    .user-b-box{
      width: 100%;
      margin-top: 0.8rem;
      div{
        width: 100%;
        cursor: pointer;
        color: $g_color;
        font-weight: bold;
        font-size: 0.7rem;
        padding: 0.5rem 0;
        text-align: center;
      }
    }
  }
  .option-box{
    padding-top: 10px;
    .option-title{
      font-size: 15px;
      line-height: 24px;
    }
  }
  .options-item{
    display: flex;
    margin-top: 10px;
    .image-box{
      width: 42px;
      height: 42px;
      background: #b9b9b9;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 30px;
        height: 30px;
      }
    }
    .education-image-box{
      width: 42px;
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .item-info{
      flex: 1;
      padding-left: 12px;
      border-bottom: 1px solid #f0f3f7;
      div{
        font-size: 14px;
        line-height: 20px;
      }
      p{
        font-size: 13px;
        line-height: 20px;
        color: #6b6b6b;
      }
    }
  }
  
 
</style>
