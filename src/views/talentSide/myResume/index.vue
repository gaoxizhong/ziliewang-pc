<template>
  <div class="container">
    <div class="tab-box">
      <div :class="is_titleTab == 1? 'hover':'' " @click="clickTitleTab(1)">预览简历</div>
      <div :class="is_titleTab == 2? 'hover':'' " @click="clickTitleTab(2)">刷新简历</div>
      <div :class="is_titleTab == 3? 'hover':'' " @click="clickTitleTab(3)">建立优化</div>
    </div>
    
    <div class="info-box">
      <div class="info-left-box">
        <!-- 个人信息 开始 -->
        <div class="info-title-box">
          <div class="info-title-top">
            <img :src="require('../../../assets/image/img-user.jpg')" alt="" />
            <div style="flex: 1;padding-left: 0.9rem;">
              <div class="info-1">
                <span class="info-name">张三</span>
                <span class="info-set">编辑</span>
              </div>
              <ul class="info-2">
                <li>
                  <img src="../../../assets/image/Frame_1.png" alt="">
                  <span>32</span>
                </li>
                <li>
                  <img src="../../../assets/image/Frame_2.png" alt="">
                  <span>工作11年2月</span>
                </li>
                <li>
                  <img src="../../../assets/image/Frame_5.png" alt="">
                  <span>宁波</span>
                </li>
                <li>
                  <img src="../../../assets/image/Frame_5.png" alt="">
                  <span>在职，看看新机会</span>
                </li>
              </ul>
              <ul class="info-2">
                <li>
                  <img src="../../../assets/image/Frame_6.png" alt="">
                  <span>187****1259</span>
                </li>
                <li>
                  <img src="../../../assets/image/Frame_4.png" alt="">
                  <span>47****27@qq.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="info-title-bottom">
            <div class="info-title-t">
              <span class="info-t">优势亮点</span>
              <span class="info-set">编辑</span>
            </div>
            <div class="info-title-x">7年互联网行业。善长网页设计，B端设计，ui设计熟悉设计组件 antdesign等。软件ps xd sketch fimga</div>
          </div>
        </div>
        <!-- 个人信息 结束 -->

      </div>
      <div class="info-right-box"></div>
    </div>






  </div>

</template>

<script>
export default {
  name: 'myResume',
  components: {
  },
  data(){
    return{
      is_titleTab: 3,
    }
  },
  computed: {
    
  },
  mounted(){
    this.getUserProfile();
  },  
  methods: {
    clickTitleTab(n){
      this.is_titleTab = n;
    },
    getUserProfile(){
      let that = this;
      that.$axios.post('/user/profile',{}).then(res =>{
        if(res.data.code == 0){

        }
      }).catch(e =>{
        console.log(e)
      })
    }
  },
};
</script>

<style lang="scss" scoped>
 .tab-box{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  div{
    margin-left: 12px;
    width: 92px;
    height: 32px;
    line-height: 32px;
    background: #FFFFFF;
    border-radius: 100px 100px 100px 100px;
    border: 1px solid $g_color;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    color: $g_color;
    cursor: pointer;
  }
  div.hover{
    background: $g_bg;
    color: #fff;
  }
 }
 .info-box{
  width: 100%;
  display: flex;
  margin-top: 20px;
  .info-left-box{
    flex: 1;
    .info-title-box{
      width: 100%;
      border-radius: 6px;
      background: #fff;
      padding: 24px 30px;
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
            color: #1F2E4D;
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
              color: #1F2E4D;
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
        .info-title-t{
          display: flex;
          align-items: center;
          justify-content: space-between;
          .info-t{
            font-size: 18px;
            font-weight: bold;
            color: #1F2E4D;
            line-height: 24px;
          }
        }
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
  }
  .info-set{
    font-size: 0.7rem;
    font-weight: 400;
    color: $g_color;
    cursor: pointer;
  }
  .info-right-box{
    width: 406px;
    padding-left: 16px;
  }
 }



</style>
