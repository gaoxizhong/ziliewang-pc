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
          <div class="gz-sx-btn" v-if="uid != see_uid">
            <div>
              <div class="left" @click="clickAttention" v-if=" infoData.is_already_attention ==  2">
                <img src="../../../assets/image/Frame_10.png" alt="" />
                <span>关注</span>
              </div>
              <div class="left" @click="clickCancelAttention" v-if=" infoData.is_already_attention ==  1">
                <span>已关注</span>
              </div>
            </div>
            <div>
              <div class="right" @click="clickAddBlacklist" v-if=" infoData.is_already_black ==  2">
                <!-- <img src="../../../assets/image/Frame_10.png" alt="" /> -->
                <span>加入黑名单</span>
              </div>
              <div class="right" @click="clickCancelBlacklist" v-if=" infoData.is_already_black ==  1">
                <span>取消黑名单</span>
              </div>
            </div>
          </div>
          <div class="user-top-num">
            <div @click="clickAttentionTab('attention')">
              <span class="title">{{ infoData.attention_num }}</span>
              <span class="text">关注</span>
            </div>
            <div @click="clickAttentionTab('fans')">
              <span class="title">{{ infoData.fan_num }}</span>
              <span class="text">粉丝</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 左侧模块 结束 -->
      <!-- 中间模块 开始 -->
      <div class="info-m-box">
        <dynamicState :see_uid="see_uid" :infoData="infoData" :count_list="count_list" :infoList="infoList" @getMyProfessionCircle="getUserProfile"/>
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
import dynamicState from './dynamicState/index.vue';
export default {
  name: 'careerIdentity',
  components: {
    // myProfessionalCircleLeft,
    dynamicState,
    videoDialog
  },
  data(){
    return{
      see_uid:'',
      uid:'',
      infoData: {}, // 信息
      count_list: {},
      infoList:[],
    }
  },
  computed: {
    
  },
  mounted(){
    
  },
  created(){
    this.see_uid = this.$route.query.see_uid || localStorage.getItem('realUid');
    this.uid = localStorage.getItem('realUid');
    // 获取用户职圈信息
    this.getUserProfile();
  },
  methods: {
    
    clickAttentionTab(name){
      this.$router.push({
        path:'/attentionFans',   //跳转的路径
        query:{           //路由传参时push和query搭配使用 ，作用时传递参数
          tag:name,
          see_uid: localStorage.getItem('realUid')
        }
      })
    },

    // 点击关注按钮
    clickAttention(){
      this.$axios.post('/api/user-attention/attention',{
        attention_uid: this.see_uid
      }).then( res =>{
        if(res.code == 0){
          this.$message.success('关注成功！');
          this.getUserProfile();
        }else{
          this.$message.error({
            message:res.msg
          })
        }
      }).catch(e =>{
        console.log(e)
      })
    },
    // 取消关注
    clickCancelAttention(){
      this.$axios.post('/api/user-attention/cancel-attention',{
        attention_uid: this.see_uid
      }).then( res =>{
        if(res.code == 0){
          this.$message.success('取消成功！');
        }else{
          this.$message.error({
            message:res.msg
          })
        }
        this.getUserProfile();
      }).catch(e =>{
        console.log(e)
      })
    },
    // 加入黑名单
    clickAddBlacklist(){
      this.$axios.post('/api/user-defriend/create',{
        defriend_uid: this.see_uid
      }).then( res =>{
        if(res.code == 0){
          this.$message.success('加入黑名单成功！');
          this.getUserProfile();
        }else{
          this.$message.error({
            message:res.msg
          })
        }
      }).catch(e =>{
        console.log(e)
      })
    },
    // 取消黑名单
    clickCancelBlacklist(){
      this.$axios.post('/api/user-defriend/delete',{
        defriend_uid: this.see_uid
      }).then( res =>{
        if(res.code == 0){
          this.$message.success('取消成功！');
        }else{
          this.$message.error({
            message:res.msg
          })
        }
        this.getUserProfile();
      }).catch(e =>{
        console.log(e)
      })
    },
    // 获取用户职圈信息
    getUserProfile(){
      this.$axios.post('/api/profession-circle/my',{
        see_uid: this.see_uid
      }).then( res =>{
        if(res.code == 0){
          this.infoData = res.data.users;
          this.infoList = res.data.list;
          this.count_list = res.data.count_list;
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
    width: 260px;
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
        
      }
      .gz-sx-btn{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 16px;
        &>div{
          flex: 1;
          padding: 0 10px;
          border-radius: 2px;
          font-size: 13px;
          text-align: center;
          cursor: pointer;
          &>div{
            padding: 8px 0;
            img{
              width: 12px;
              height:12px;
            }
          }
          .left{
            background: $g_color;
            color: #fff;
            img{
              margin-right: 4px;
            }
          }
          .right{
            border: 1px solid #E5E6EB;
            box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.04);
            color: $g_textColor;
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
          padding: 10px 0;
          font-size: 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          .title{
            font-size: 1.2rem;
            font-family: DIN Alternate-Bold, DIN Alternate;
            font-weight: bold;
            color: #4E5969;
          }
          .text{
            font-size: 14px;
            font-weight: 400;
            color: #86909C;
            line-height: 22px;
          }
          &:nth-of-type(1){
            border-right: 1px solid #F2F3F5;
          }
        }
      }
     
    }
  }
  
  // 中间
  .info-m-box{
    flex: 1;
    padding: 0 10px;
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
