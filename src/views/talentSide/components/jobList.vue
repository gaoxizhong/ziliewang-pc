<template>
  <div>
    <div class="list-items" v-for="(item,index) in infoList" :key="index">
      <div class="items-left-box" @click.stop="clickItems(item)">
        <p class="items-title">导电浆料研发工程师【南通】 <span class="items-title-span">15-18K</span></p>
        <div class="items-tag-box">
          <el-tag>3-5年</el-tag>
          <el-tag>硕士</el-tag>
        </div>
        <div class="items-firm-info">
          <span class="firm-info-1">南通天盛新能源股份有限公司</span>
          <span class="firm-info-2">新能源新三板上市100-499人</span>
        </div>
      </div>
      <div class="items-right-box" v-if="tag == 'myDelivery'">
        <div class="quan"></div>
        <div class="right-c"></div>
        <div class="right-status-box">
          <div class="right-status-text">
            <span>已投递</span>
            <i class="el-icon-arrow-right"></i>
          </div>
          <div class="status-time">2023-03-21 14:41</div>
        </div>
        
      </div>

      <div class="items-right-box" style="flex-direction: column;justify-content: center;" v-else>
        <img src="../../../assets/image/img-user.jpg" alt="" class="items-boss-img" />
        <div class="items-boss-name">刘女士</div>
        <div class="items-boss-g">人事</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  components: {
  },
  props:{
    data: {
      type: Object,
      default() {
        return {
          data: {}
        }
      }
    },
    tag: {
      type: String,
      default() {
        return ''
      }
    },
  },
  data(){
    return{
    }
  },
  computed: {
    infoList(){
      let list = [];
      list = this.data.infoList;
      return list
    },

  },
  mounted() {

  },
  methods: {
    // 点击列表-- 跳转岗位详情
    clickItems(i){
      this.$router.push({
        path:'/JobDetails',
        query:{
          id: i.id
        }
      })
    }
   
  },
};
</script>

<style lang="scss" scoped>
  .list-items{
    margin-top: 16px;
    background: #fff;
    border-radius: 6px;
    padding: 16px;
    display: flex;
    cursor: pointer;
    .items-left-box{
      flex: 1;
      text-align: left;
      .items-title{
        font-size: 16px;
        font-weight: bold;
        color: #000000;
        line-height: 22px;
        .items-title-span{
          color: #FF4D4F;
          padding-left: 10px;
        }
      }
      .items-tag-box{
        margin-top: 6px;
        .el-tag{
          background-color: #F7F8FA;
          border-color: #F7F8FA;
          color: #1F2E4DFF;
          height: 22px;
          padding: 0 10px;
          line-height: 22px;
          font-size: 12px;
          border-radius: 2px;
          margin-left: 10px;
          &:nth-of-type(1){
            margin-left: 0;
          }
        }
      }
      .items-firm-info{
        margin-top: 20px;
        .firm-info-1{
          font-size: 14px;
          font-weight: 400;
          color: $g_textColor;
        }
        .firm-info-2{
          margin-left: 16px;
          font-size: 14px;
          font-weight: 400;
          color: #86909C;
        }
      }
    }
    .items-right-box{
      width: 160px;
      position: relative;
      display: flex;
      align-items: center;
      .right-c{
        width: 0;
        height: 100%;
        opacity: 0.5;
        border: 1px dashed;
        border-image: linear-gradient(180deg, rgba(255, 117, 26, 0), rgba(255, 100, 0, 1), rgba(255, 117, 26, 0)) 1 1;
      }
      .quan{
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #FF751A;
        position: absolute;
        left: -3px;
        top: 50%;
        transform: translateY(-50%);
      }
      .right-status-box{
        padding-left: 10px;
        .right-status-text{
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: bold;
          color: #FF751A;
          line-height: 22px;
          cursor: pointer;
          i{
            margin-left: 4px;
          }
        }
        .status-time{
          font-size: 12px;
          font-weight: 400;
          color: #86909C;
          line-height: 20px;
        }
      }
      .items-boss-img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .items-boss-name{
        font-size: 14px;
        font-weight: 400;
        color: #1D2129;
        line-height: 22px;
      }
      .items-boss-g{
        font-size: 12px;
        font-weight: 400;
        color: #86909C;
        line-height: 20px;
      }
      
    }

  }
  .list-items:nth-of-type(1){
    margin-top: 0 !important;
  }
</style>
