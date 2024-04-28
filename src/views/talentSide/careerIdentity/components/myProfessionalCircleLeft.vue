<template>
  <div class="info-left-box">
    <div class="left-box user-top-box">
      <div class="user-top">
        <img :src="infoData.avatar?infoData.avatar:require('../../../../assets/image/img-user.jpg' )" alt="" class="user-img"/>
        <p class="user-name">{{ infoData.real_name }}</p>
        <p class="user-introduce">
          {{ infoData.position }}&nbsp;&nbsp;{{ infoData.company_name }}&nbsp;&nbsp;已关注
          <span @click="clickAttention('attention')">{{ infoData.attention_num }}</span>
          人&nbsp;&nbsp;有
          <span @click="clickAttention('fans')">{{ infoData.fan_num }}</span>个粉丝
      </p>
      </div>
    </div>

    <div class="left-box user-m-box">
      <div class="option-box">
        <div class="option-title">工作经历</div>
        <ul class="row-options-detail-box">
          <li class="options-item" v-for="(item,index) in infoData.user_work_experience" :key="index">
            <div class="image-box">
              <img src="../../../../assets/image/work-icon.png" alt="" />
            </div>
            <div class="item-info">
              <div>{{ item.position }}</div>
              <div>{{item.company_name}}</div>
              <p>{{ item.begin_date }} — {{ item.end_date }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="option-box">
        <div class="option-title">教育经历</div>
        <ul class="row-options-detail-box">
          <li class="options-item" v-for="(item,index) in infoData.user_education_experience" :key="index">
            <div class="education-image-box">
              <img src="../../../../assets/image/shcool.png" alt="" />
            </div>
            <div class="item-info">
              <div>{{ item.school }}</div>
              <div>{{ item.education_background }} · {{ item.specialty }}</div>
              <p>{{ item.school_date }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
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
    }
  },
  mounted(){
  
  },
  computed: {
   
  },
  methods: {
    clickAttention(name){
      this.$router.push({
        path:'/attentionFans',   //跳转的路径
        query:{           //路由传参时push和query搭配使用 ，作用时传递参数
          tag:name,
          see_uid: localStorage.getItem('realUid')
        }
      })
    },
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

    }
    
  }

 
  
 
</style>
