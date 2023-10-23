<template>
  <div class="right-box">
    <div class="users-box">
      <img :src="infoData.basic_info?infoData.basic_info.avatar:require('../../../assets/image/img-user.jpg')" alt="" class="img-user"/>
      <div class="users-right">
        <div class="users-name">
          <span class="span-1" v-if="infoData.basic_info">{{infoData.basic_info.real_name}}</span>
          <img src="../../../assets/image/sex-1.png" alt="" class="img-sex"/>
        </div>
        <div class="wcd-box">简历完整度75%</div>
      </div>
    </div>
    <div class="infoTab-box">
      <div class="infoTab-items">
        <span class="infoTab-items-num">39</span>
        <span class="infoTab-items-name">谁看过我</span>
      </div>
      <div class="infoTab-items">
        <span class="infoTab-items-num">12</span>
        <span class="infoTab-items-name">我的投递</span>
      </div>
      <div class="infoTab-items">
        <span class="infoTab-items-num">25</span>
        <span class="infoTab-items-name">我的收藏</span>
      </div>
    </div>
    <div class="setTab-box">
      <div class="setTab-items">
        <img src="../../../assets/image/Frame_12.png" alt="" />
        <span class="setTab-items-name">刷新简历</span>
      </div>
      <div class="setTab-items">
        <img src="../../../assets/image/Frame_12.png" alt="" />
        <span class="setTab-items-name">查看简历</span>
      </div>
      <div class="setTab-items">
        <img src="../../../assets/image/Frame_12.png" alt="" />
        <span class="setTab-items-name">我的投递</span>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  components: {
  },
  data(){
    return{
      infoData:{}, // 信息
      
    }
  },
  computed: {
    
  },
  mounted() {
    // 获取个人信息
    this.getUserProfile();
  },
  methods: {
    // 获取个人信息
    getUserProfile(){
      let that = this;
      that.$axios.post('/api/user/profile',{}).then(res =>{
        if(res.code == 0){
          this.infoData = res.data;
          this.curriculum_vitae = res.data.basic_info.curriculum_vitae;
        }
      }).catch(e =>{
        console.log(e)
      })
    },
  },
};
</script>

<style lang="scss" scoped>

.right-box{
  background: #FFFFFF;
  border-radius: 6px;
  opacity: 1;
  padding: 1.5rem 1.2rem;
  text-align: left;
  .users-box{
    width: 100%;
    display: flex;
    align-items: center;
    img.img-user {
      width: 4.5rem;
      height: 4.5rem;
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
        font-size: 1.5rem;
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
    margin-top: 2rem;
    padding-top: 2rem;
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
</style>
