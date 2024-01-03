<template>
  <div>
    <!-- 头部岗位信息 开始 -->
    <div class="container-title-box">
      <div class="container-titleinfo">
        <div class="titleinfo-left-box">
          <img :src="infoData.logo" alt="" class="company-logo"/>
          <div class="company-name-box">
            <div class="title-box">
              <div class="title-text"><span v-if="infoData.company_name">{{infoData.company_name }}</span></div>
            </div>
            <div class="title-tag">
              <span>
                {{ infoData.company_scale }}
                <span style="font-weight: bold;"> · </span>
                {{ infoData.industry }}
              </span>
            </div>
          </div>
          
        </div>
        <div class="titleinfo-right-box">
          <div class="btn-box">
            <span class="recruit-num">{{ infoData.recruit_position_num }}</span>
            <span style="padding-bottom: 4px;">在招岗位</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 头部岗位信息 结束 -->

    <!-- 主题部分 开始 -->
    <div class="container">
      <div class="mainBody-box">
        <div class="left">
          <!-- 公司信息 开始 -->
          <div class="m-box">
            <CompanyInfo :infoData="infoData"/>
          </div>
          <!-- 公司信息 结束 -->
          <!-- 公司简介 开始 -->
          <div class="m-box margin-top-20">
            <CompanyProfile :infoData="infoData"/>
          </div>
          <!-- 公司简介 结束 -->
        </div>
        <div class="right">
          <!-- 公司信息 开始 -->
          <div class="m-box">
            <OtherPositions :OtherPositionsList="infoData.other_position"/>
          </div>
          <!-- 公司信息 结束 -->
        </div>
      </div>
    </div>
    <!-- 主题部分 结束 -->

  </div>

</template>

<script>
import CompanyProfile from "./components/companyProfile";
import CompanyInfo from "./components/companyInfo"
import OtherPositions from "./components/otherPositions"

export default {
  name: 'companyDetails',
  components: {
    CompanyProfile,
    CompanyInfo,
    OtherPositions,
  },
  data(){
    return{
      infoData: {},
      company:{},
      is_type: 'chat'
    }
  },
  created(){
    this.id = this.$route.query.id;
  },
  mounted(){
    this.getInfo();
  },
  computed: {
    
  },
  methods: {
    async getInfo(){
      let that = this;
      let p = {
        company_id: that.id,
      }
      await that.$axios.post('/api/company/basic/info/detail',p).then( res =>{
        if(res.code == 0){
          let infoData = res.data;
          that.infoData = infoData;
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
  },
};
</script>

<style lang="scss" scoped>
  .container{
    width: 1200px;
    margin: 1.2rem auto 0;
  }
  .container-title-box{
    width: 100%;
    padding: 1.2rem 0;
    background: #fff;
    font-size: 14px;
    .container-titleinfo{
      width: 1200px;
      margin: 0 auto;
      display: flex;
      .titleinfo-left-box{
        flex: 1;
        text-align: left;
        display: flex;
        .company-logo{
          width: 70px;
          height: 70px;
          border-radius: 12px;
          display: inline-block;
          vertical-align: middle;
        }
        .company-name-box{
          padding-left: 10px;
          .title-box{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .title-text{
              flex: 1;
              font-size: 26px;
              font-weight: bold;
              color: $g_textColor;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              word-break: break-word; 
              text-align: left;
            }
          }
          .title-tag{
            margin-top: 1rem;
            span{
              font-size: 14px;
              font-weight: 400;
              color: #1D2129;
            }
            
          }
        }
        
      }
      .titleinfo-right-box{
        width: auto;
        padding-left: 40px;
        .btn-box{
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          font-weight: bold;
          font-size: 16px;
          color: $g_textColor;
          .recruit-num{
            font-size: 30px;
            padding-right: 4px;
          }
        }
      }
    }
  }
  .mainBody-box{
    width: 100%;
    display: flex;
    .left{
      flex: 1;

    }
    .right{
      width: 380px;
      padding-left: 0.8rem;

    }
  }
 


</style>
