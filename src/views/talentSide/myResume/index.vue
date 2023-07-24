<template>
  <!-- 我的简历页 -->
  <div class="container">
    <div class="tab-box">
      <div :class="is_titleTab == 1? 'hover':'' " @click="clickTitleTab(1)">预览简历</div>
      <div :class="is_titleTab == 2? 'hover':'' " @click="clickTitleTab(2)">刷新简历</div>
      <div :class="is_titleTab == 3? 'hover':'' " @click="clickTitleTab(3)">建立优化</div>
    </div>
    
    <div class="info-box">
      <div class="info-left-box">
        <!-- 个人信息 开始 -->
          <MyInfo v-if="infoData.basic_info" :data="infoData.basic_info" />  
        <!-- 个人信息 结束 -->

        <!-- 优势亮点 开始 -->
        <div class="jobExpectation-box myResume-plate">
          <div class="jobExpectation-title-box">
            <span class="info-t">求职期望</span>
           <img src="../../../assets/image/Frame_7.png" alt="" class="info-icon-img"/>
          </div>
          <div class="myResume-plate-list">
            <ul class="plate-list-ul">
              <li>
                <div class="li-name">
                  <span class="li-name-1">首席执行官CEO/总裁/总经理</span>
                  <span class="li-name-2">
                    <span>8k - 13k x 12薪</span>
                    <span>|</span>
                    <span> 宁波</span>
                    <span>|</span>
                    <span>全部行业</span>
                  </span>
                 
                </div>
                <div class="info-set">设置</div>
              </li>
              <li></li>
            </ul>

          </div>
        </div>
        <!-- 优势亮点 结束 -->

      </div>
      <div class="info-right-box">

      </div>
    </div>



  </div>

</template>

<script>
import MyInfo from "../components/myResume/myInfo.vue"
export default {
  name: 'myResume',
  components: {
    MyInfo,
  },
  data(){
    return{
      is_titleTab: 3,
      infoData:{}, // 信息
    }
  },
  computed: {
    
  },
  mounted(){

  },  
  created(){
    // 获取个人信息
    this.getUserProfile();
  },
  methods: {
    clickTitleTab(n){
      this.is_titleTab = n;
    },
    
   // 获取个人信息
   getUserProfile(){
      let that = this;
      that.$axios.post('/api/user/profile',{}).then(res =>{
        console.log(res.data)
        if(res.code == 0){
          this.infoData = res.data;
        }
      }).catch(e =>{
        console.log(e)
      })
    },
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
      .myResume-plate-list{
        width: 100%;
        margin-top: 20px;
        .plate-list-ul{
          width: 100%;
          li{
            padding: 12px 20px;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .li-name{
              flex: 1;
              text-align: left;
              color: $g_textColor;
              .li-name-1{
                font-weight: bold;
              }
              .li-name-2{
                span{
                  padding-left: 16px;
                }
              }
            }
            &:hover{
              background: #F7F8FA;
            }
          }
          
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
