<template>
  <div class="right-box">
    <div class="m-box">
      <div class="users-box">
        <img :src="infoData.basic_info.avatar?infoData.basic_info.avatar:require('../../../assets/image/img-user.jpg')" alt="" class="img-user" v-if="infoData.basic_info"/>
        <div class="users-right">
          <div class="users-name">
            <span class="span-1" v-if="infoData.basic_info">{{infoData.basic_info.real_name}}</span>
            <img src="../../../assets/image/sex-1.png" alt="" class="img-sex"/>
          </div>
          <div class="wcd-box">简历完整度{{ perfection_degree.degree_num }}%</div>
        </div>
      </div>
      <div class="infoTab-box">
        <div class="infoTab-items" @click="goTomyProfessionalCircle">
          <span class="infoTab-items-num">{{ basic_info.see_me_num }}</span>
          <span class="infoTab-items-name">谁看过我</span>
        </div>
        <div class="infoTab-items" @click="goTo('myDelivery')">
          <span class="infoTab-items-num">{{ basic_info.deliver_resume_num }}</span>
          <span class="infoTab-items-name">我的投递</span>
        </div>
        <div class="infoTab-items" @click="goTo('myCollection')">
          <span class="infoTab-items-num">{{ basic_info.collection_num }}</span>
          <span class="infoTab-items-name">我的收藏</span>
        </div>
      </div>
          
      <div class="setTab-box">
        <div class="setTab-items" @click="clcikRefresh">
          <img src="../../../assets/image/Frame_12.png" alt="" />
          <span class="setTab-items-name">刷新简历</span>
        </div>
        <div class="setTab-items" @click="goToMyResume">
          <img src="../../../assets/image/Frame_12.png" alt="" />
          <span class="setTab-items-name">查看简历</span>
        </div>
        <div class="setTab-items" @click="goTo('myDelivery')">
          <img src="../../../assets/image/Frame_12.png" alt="" />
          <span class="setTab-items-name">我的投递</span>
        </div>
      </div>
    </div>


     <!-- 我的资产 开始 -->
      <div class="m-box margin-top-20 vip-box">
        <div class="title-box">
          <div class="left">
            <img src="../../../assets/image/bossSide/wallet-three.png" alt="" />
            <span>我的资产</span>
          </div>
          <div class="right zc-box" @click="clickmyAssets">
            <span>更多</span>
            <img src="../../../assets/image/bossSide/right.png" alt="">
          </div>
        </div>
        <div class="my-goldCoin-box">
          <div class="goldCoin-title">会员等级</div>
          <div class="goldCoin-num-btn-box">
            <span class="goldCoin-span">{{ infoData.basic_info.vip_rank_text }}</span>
            <button class="goldCoin-btn" @click="goToTopUpBuy">购买</button>
          </div>
          <div class="goldCoin-title" v-if="infoData.basic_info.vip_expire_time_text">到期时间: {{ infoData.basic_info.vip_expire_time_text }}</div>
        </div>
      </div>
      <!-- 我的资产 结束 -->
  </div>

</template>

<script>
import { getPerfectionDegree } from "../../../utils/index";

export default {
  components: {
  },
  data(){
    return{
      infoData:{}, // 信息
      basic_info:{},
      perfection_degree: {},
    }
  },
  computed: {
    
  },
  mounted() {
    // 获取个人信息
    this.getUserProfile();
  },
  methods: {
    goTomyProfessionalCircle(){
      this.$router.push('/myProfessionalCircle');
    },
    goTo(type){
      this.$router.push('/myDelivery?tag=' + type);
    },
    // 点击我的简历
    goToMyResume(){
      this.$router.push('/myResume');
    },
    // 点击刷新
    clcikRefresh(){
      this.$message.success('刷新成功！');
    },
    // 获取个人信息
    getUserProfile(){
      let that = this;
      that.$axios.post('/api/user/profile',{}).then(res =>{
        if(res.code == 0){
          this.infoData = res.data;
          this.basic_info = res.data.basic_info;
          this.curriculum_vitae = res.data.basic_info.curriculum_vitae;
          // 简历完善度、
         that.perfection_degree = getPerfectionDegree(res.data);
        }
      }).catch(e =>{
        console.log(e)
      })
    },
    // 点击我的资产
    clickmyAssets(){
      let that = this;
      that.$router.push({ path:'/talentSide/myAssets' })
    },
    // 点击购买
    goToTopUpBuy(){
      this.$router.push('/talentSide/topUpBuy');
    },
  },
};
</script>

<style lang="scss" scoped>

.right-box{
  opacity: 1;
  text-align: left;
  .users-box{
    width: 100%;
    display: flex;
    align-items: center;
    img.img-user {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 3px solid #F2F3F5;
    }
    .users-right{
      flex: 1;
      padding-left: 8px;
      .users-name{
        display: flex;
        align-items: center;
        .span-1{
          font-size: 1rem;
          font-weight: bold;
          color: $g_textColor;
          line-height: 1.4rem;
        }
        .img-sex{
          width: 0.9rem;
          height: 0.9rem;
          margin-left: 0.8rem;
        }

      }
    }

  }
  .wcd-box{
    margin-top: 8px;
    font-size: 0.7rem;
    font-weight: 400;
    color: #86909C;
    line-height: 1.1rem;
  }
  .infoTab-box{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
    .infoTab-items {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .infoTab-items-num{
        font-size: 1.4rem;
        font-weight: bold;
        color: $g_textColor;
        line-height: 1.4rem;
      }
      .infoTab-items-name{
        font-size: 14px;
        font-weight: 400;
        color: #86909C;
        line-height: 1.1rem;
        margin-top: 6px;
      }
    }
  }
  .setTab-box{
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #F2F3F5;
    display: flex;
    justify-content: space-between;
    .setTab-items{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      img{
        width: 1.8rem;
        height: 1.8rem;
      }
      .setTab-items-name{
        font-size: 0.7rem;
        font-weight: 400;
        color: $g_textColor;
        line-height: 1.1rem;
        margin-top: 6px;
      }

    }
  }

}
.vip-box{
  width: 100%;
  text-align: left;
  background: #fff;
  padding: 10px 20px;
  
  .title-box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between; 
    .left{
      display: flex;
      align-items: center;
      img{
        width: 1.1rem;
        height: 1.1rem;
        margin-top: -4px;
      }
      span{
        font-size: 0.9rem;
        font-weight: 500;
        color:$g_textColor;
        line-height: 26px;
        padding-left: 10px;
      }
    }  
    .right{
      display: flex;
      align-items: center;
      cursor: pointer;
      img{
        width: 12.5px;
        height: 12.5px;
        margin-top: -4px;
      }
      span{
        color: $g_color;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        padding-left: 6px;
      }
    }
    .zc-box{
      img {
        margin-top: -2px;
        margin-left: 4px;
      }
      span{
        color: #4E5969;
      }
    }
    
  }
  .my-goldCoin-box{
    margin-top: 1.5rem;
    .goldCoin-title{
      font-size: 14px;
      font-weight: 400;
      color: #86909C;
      line-height: 22px;
    }
    .goldCoin-num-btn-box{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 1rem;
      span{
        font-size: 22px;
        font-weight: bold;
        color: #ff0000;
        line-height: 32px;
      }
      .goldCoin-btn{
        background: $g_bg;
        box-shadow: 0px 2px 0px 0px rgba(0,0,0,0.04);
        border-radius: 2px;
        opacity: 1;
        border: none;
        padding: 6px 12px;
        color: #fff;
        font-size: 14px;
        border-radius: 4px;
      }
    }

  }
}
</style>
