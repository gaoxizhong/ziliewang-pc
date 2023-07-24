<template>
  <div class="container">
    <div class="info-title-box myResume-plate">
      <div class="info-title-top" v-if=" !redact_info ">
        <img :src="require('../../../../assets/image/img-user.jpg')" alt="" />
        <div style="flex: 1;padding-left: 0.9rem;">
          <div class="info-1">
            <span class="info-name">{{ data.name }}</span>
            <span class="info-set" @click="clickRedactBtn( 'redact_info' )">编辑</span>
          </div>
          <ul class="info-2">
            <li>
              <img src="../../../../assets/image/Frame_1.png" alt="">
              <span>{{ data.birth_year_month }}</span>
            </li>
            <li>
              <img src="../../../../assets/image/Frame_2.png" alt="">
              <span>{{ data.work_year }}</span>
            </li>
            <li>
              <img src="../../../../assets/image/Frame_5.png" alt="">
              <span>宁波</span>
            </li>
            <li>
              <img src="../../../../assets/image/Frame_5.png" alt="">
              <span v-if="data.work_status == 2">在职不考虑</span>
              <span v-if="data.work_status == 3">在职，看看新机会</span>
              <span v-if="data.work_status == 4">离职</span>
            </li>
          </ul>
          <ul class="info-2">
            <li>
              <img src="../../../../assets/image/Frame_6.png" alt="">
              <span>{{ data.phone }}</span>
            </li>
            <li>
              <img src="../../../../assets/image/Frame_4.png" alt="">
              <span>{{ data.email }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="redact-title-top" v-else>12131231231</div>
      <div class="info-title-bottom">
        <div class="jobExpectation-title-box">
          <span class="info-t">优势亮点</span>
          <span class="info-set">编辑</span>
        </div>
        <div class="info-title-x">{{ data.advantages_highlights }}</div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  components: {
  },
  props:{
    data:{
      typeof: Object,
      default() {
          return {
            data: {}
          }
        }
    }
  },
  data(){
    return{
      redact_info: false,
      redact_brightSpot: false,
    }
  },
  mounted(){
    console.log(this.data)
    this.data = this.data;
  },
  computed: {
    
  },
  methods: {
    clickRedactBtn(n){
      this.redact_info = true;
    },  
  },
};
</script>

<style lang="scss" scoped>
  .myResume-plate{
    width: 100%;
    border-radius: 6px;
    background: #fff;
    padding: 24px 30px;
    margin-bottom: 16px;
    .jobExpectation-title-box{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .info-t{
        font-size: 18px;
        font-weight: bold;
        color: $g_textColor;
        line-height: 24px;
      }
      .info-icon-img{
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
    }
  }
  .info-title-box{
    .info-title-top{
      width: 100%;
      display: flex;
      img{
        width: 64px;
        height: 64px;
        border-radius: 50%;
      }

      .info-1{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .info-name{
          font-size: 18px;
          font-weight: bold;
          color: $g_textColor;
        }

      }
      .info-2{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        li{
          display: flex;
          align-items: center;
          margin-top: 8px;
          margin-left: 30px;
          line-height: 22px;
          img{
            width: 14px;
            height: 14px;
          }
          span{
            font-size: 14px;
            color: $g_textColor;
            padding-left: 4px;
          }
        }
        li:nth-of-type(1){
          margin-left: 0;
        }
      }
    }
    .info-title-bottom{
      margin-top: 38px;
      .info-title-x{
        padding: 10px 0;
        margin-top: 6px;
        font-size: 12px;
        font-weight: 400;
        color: #4E5969;
        line-height: 22px;
        text-align: left;
      }
    }
  }
  .info-set{
    font-size: 0.7rem;
    font-weight: 400;
    color: $g_color;
    cursor: pointer;
  }
</style>
