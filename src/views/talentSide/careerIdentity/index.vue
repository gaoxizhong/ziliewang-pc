<template>
  <div class="container" id="myProfessionalCircle">

    <div class="info-box">
      <!-- <myProfessionalCircleLeft :infoData="infoData" /> -->

      <!-- 左侧模块 开始 -->
      <div class="info-left-box">
        <div class="view-box user-top-box">
          <div class="user-top">
            <img :src="infoData.avatar?infoData.avatar:require('../../../assets/image/img-user.jpg' )" alt="" class="user-img"/>
            <p class="user-name">{{ infoData.real_name }}</p>
            <p class="user-introduce">{{ infoData.position }}</p>
          </div>
          <div class="siderbar-info-list_2mXEH">
            <ul>
              <li class="siderbar-info-item_1jlrQ">
                <p class="siderbar-info-item-num">{{ infoData.attention_num }}</p>
                <p class="siderbar-info-item-title">关注</p>
              </li>
              <li class="siderbar-info-item_1jlrQ">
                <p class="siderbar-info-item-num">{{ infoData.fan_num }}</p>
                <p class="siderbar-info-item-title">粉丝</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 左侧模块 结束 -->
      <!-- 中间模块 开始 -->
      <div class="info-m-box">
        <router-view></router-view>
      </div>
      <!-- 中间模块 结束 -->
      <div class="info-right-box">
        <div class="view-box user-m-box">
          <div class="option-box">
            <div class="option-title">工作经历</div>
            <ul class="row-options-detail-box">
              <li class="options-item" v-for="(item,index) in infoData.user_work_experience" :key="index">
                <div class="image-box">
                  <img src="../../../assets/image/work-icon.png" alt="" />
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
                  <img src="../../../assets/image/shcool.png" alt="" />
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
    </div>
  </div>
</template>

<script>
// import myProfessionalCircleLeft from './components/myProfessionalCircleLeft.vue';
import videoDialog from '../components/videoDialog.vue';

export default {
  name: 'careerIdentity',
  components: {
    // myProfessionalCircleLeft,
    videoDialog
  },
  data(){
    return{
      infoData:{}, // 信息
    }
  },
  computed: {
    
  },
  mounted(){
    // 获取用户职圈信息
    this.getMyProfessionCircle();
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
    // 获取用户职圈信息
    getMyProfessionCircle(){
      this.$axios.post('/api/profession-circle/my',{}).then( res =>{
        if(res.code == 0){
          this.infoData = res.data.users;
        }else{
          this.$message.error({
            message:res.msg
          })
        }
      }).catch(e =>{
        console.log(e)
      })
    },
   
  }
};
</script>

<style lang="scss" scoped>
  .info-box{
    width: 100%;
    display: flex;
    justify-content: space-between;
    text-align: left;
  }
  .view-box{
    background: #FFFFFF;
    border-radius: 6px;
    opacity: 1;
  }
  // 左侧
  .info-left-box{
    width: 220px;
    .user-top-box{
      width: 100%;
      .user-top{
        padding: 15px;
        margin: 0 auto;
        text-align: center;
        .user-img{
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin-bottom: 5px;
        }
        .user-name{
          color: $g_textColor;
          font-size: 16px;
          line-height: 28px;
          font-weight: bold;
          text-align: center;
        }
        .user-introduce{
          font-size: 14px;
          line-height: 23px;
          text-align: center;
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
      .siderbar-info-list_2mXEH{
        padding-top: 12px;
        .siderbar-info-item_1jlrQ {
          display: block;
          margin: 20px auto 0 auto;
          width: auto;
          .siderbar-info-item-num{
            font-size: 18px;
            color: #222222;
            text-align: center;
            line-height: 18px;
            height: 18px;
          }
          .siderbar-info-item-title{
            margin-top: 4px;
            font-size: 12px;
            color: #9195A3;
            line-height: 12px;
            text-align: center;
          }
        }
      }
     
    }
  }
  
  // 中间
  .info-m-box{
    flex: 1;
    padding: 0 20px;
  }

  // 右侧
  .info-right-box {
    width: 320px;
    .user-m-box{
      padding: 5px 10px;
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
          padding: 10px 0;
        }
        &:nth-of-type(1){
          padding-top: 0;
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
