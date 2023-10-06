<template>
  <div>
    <!-- 头部岗位信息 开始 -->
    <div class="container-title-box">
      <div class="container-titleinfo">
        <div class="titleinfo-left-box">
          <div class="title-box">
            <div class="title-text" v-if="company.company_name">{{ infoData.job_preference }}-{{ infoData?company.company_name:'' }}</div>
            <div class="pay-box">{{ infoData.salary }}</div>
          </div>
          <div class="title-tag">
            <span>{{ infoData.work_address }}</span>
            <span>{{ infoData.work_times }}</span>
            <span>{{ infoData.educational_experience }}</span>
          </div>
          <div class="title-subtag">
            <span v-for="(item,index) in infoData.job_benefits" :key="index">{{ item }}</span>
          </div>
        </div>
        <div class="titleinfo-right-box">
          <div class="btn-box">
            <el-button class="deliver">投简历</el-button>
            <el-button class="chat">聊一聊</el-button>
          </div>
          <div class="tag-box">
            <span class="tag-items">
              <img src="../../../assets/image/icon-collect.png" alt="" />
              <span>收藏</span>
            </span>
            <span class="tag-items">
              <img src="../../../assets/image/icon-wechat.png" alt="" />
              <span>微信分享扫描</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 头部岗位信息 结束 -->

    <!-- 主题部分 开始 -->
    <div class="container">
      <div class="mainBody-box">
        <div class="left">
          <!-- boss信息 开始 -->
          <div class="m-box boss-info-box">
            <div class="boss-info-left">
              <div class="img-box"><img src="../../../assets/image/img-user.jpg" alt="" /></div>
              <div class="info-text">
                <div class="info-text-1"><span class="name">袁女士</span><span class="status">当前在线</span><span class="aptitude">已认证</span></div>
                <div class="info-text-2"><span>招聘专员·</span><span v-if="company.company_name">{{ company.company_name }}</span></div>
              </div>
            </div>
            <div class="boss-info-btn">
              <el-button class="chat">聊一聊</el-button>
            </div>
          </div>
          <!-- boss信息 结束 -->
          <!-- 职位介绍 开始 -->
          <div class="m-box margin-top-20">
            <JobDescription :infoData="infoData"/>
          </div>
          <!-- 职位介绍 结束 -->
          <!-- 公司简介 开始 -->
          <div class="m-box margin-top-20">
            <CompanyProfile />
          </div>
          <!-- 公司简介 结束 -->
        </div>
        <div class="right">
          <!-- 公司信息 开始 -->
          <div class="m-box">
            <CompanyInfo />
          </div>
          <!-- 公司信息 结束 -->
        </div>
      </div>
    </div>
    <!-- 主题部分 结束 -->

  </div>

</template>

<script>
import JobDescription from "./components/jobDescription";
import CompanyProfile from "./components/companyProfile";
import CompanyInfo from "./components/companyInfo"
export default {
  name: 'JobDetails',
  components: {
    JobDescription,
    CompanyProfile,
    CompanyInfo
  },
  data(){
    return{
      infoData: {},
      company:{}
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
        position_id: that.id,
      }
      await that.$axios.post('/api/company-position/detail',p).then( res =>{
        console.log(res)
        if(res.code == 0){
          let infoData = res.data;
          infoData.job_benefits = infoData.job_benefits.split(',');
          that.infoData = infoData;
          that.company = infoData.company;
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
        .title-box{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .title-text{
            flex: 1;
            font-size: 1.4rem;
            font-weight: bold;
            color: $g_textColor;
            line-height: 1.4rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            word-break: break-word; 
            text-align: left;
          }
          .pay-box{
            width: auto;
            padding-right: 1.5rem;
            padding-left: 5rem;
            font-size: 1.4rem;
            font-weight: bold;
            color: #FF4D4F;
            line-height: 1.4rem;
          }
        }
        .title-tag{
          margin-top: 1rem;
          span{
            font-size: 14px;
            font-weight: 400;
            color: #1D2129;
            padding: 0 1rem;
            border-left: 1px solid #F2F3F5;
            &:nth-of-type(1){
              padding-left: 0;
              border: none;
            }
          }
          
        }
        .title-subtag{
          margin-top: 1.5rem;
          span{
            font-size: 12px;
            font-weight: 400;
            color: #1D2129;
            line-height: 20px;
            padding: 6px 12px;
            border: 1px solid #E5E6EB;
            border-radius: 4px;
            background: #F7F8FA;
            margin-left: 8px;
            &:nth-of-type(1){
              margin-left: 0;
            }
          }
        }
      }
      .titleinfo-right-box{
        width: 380px;
        padding-left: 2.5rem;
        .btn-box{
          width: 100%;
          display: flex;
          justify-content: space-between;
          button{
            flex: 1;
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-size: 16px;
            border: none;
            color: #fff;
            border-radius: 20px !important;
            padding: 0;
            &.deliver{
              background: #86909C;
            }
            &.chat{
              background: $g_bg;
            }
          }

        }
        .tag-box{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-top: 1rem;
          .tag-items{
            padding-left: 10px;
            display: flex;
            align-items: center;
            font-size: 14px;
            font-weight: 400;
            color: #86909C;
            line-height: 22px;
            cursor: pointer;
            img{
              width: 14px;
              height: 14px;
              margin-right: 5px;
            }
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
      .boss-info-box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .boss-info-left{
          flex: 1;
          display: flex;
          align-items: center;
          .img-box{
            width: 3.3rem;
            height: 3.3rem;
            border: 2px solid #F7F8FA;
            border-radius: 50%;
            img{
              display: inline-block;
              width: 100%;
              height: 100%;
            }
          }
          .info-text{
            flex: 1;
            padding-left: 0.9rem;
            &>div{
              display: flex;
              align-items: center;
              font-size: 14px;
              color: #86909C;
              line-height: 22px;
              &.info-text-1{
                .name{
                  font-size: 16px;
                  font-weight: bold;
                  color: $g_textColor;
                  line-height: 24px;
                }
                .status{
                  padding-left: 0.6rem;
                  margin-left: 0.6rem;
                  font-size: 13px;
                  font-weight: 400;
                  color: #86909C;
                  line-height: 20px;
                  position: relative;
                  &::after{
                    content:'';
                    width: 8px;
                    height: 8px;
                    background: #52C41A;
                    border-radius: 50%;
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                  }
                }
                .aptitude{
                  font-size: 12px;
                  font-weight: 400;
                  color: #FA8C16;
                  line-height: 20px;
                  padding: 0.1rem 0.6rem;
                  background: #FFF7E6;
                  border-radius: 2px;
                  border: 1px solid #FFD591;
                  margin-left: 0.5rem;
                }
              }
              &.info-text-2{
                margin-top: 0.5rem;
              }
            }
          }

        }
        .boss-info-btn{
          width: auto;
          padding: 0 0.8rem;
          button{
            width: 90px;
            height: 36px;
            line-height: 36px;
            text-align: center;
            font-size: 0.8rem;
            border: none;
            color: #fff;
            border-radius: 20px !important;
            padding: 0;
            background: $g_bg;
            }
        }
      }

    }
    .right{
      width: 380px;
      padding-left: 0.8rem;

    }
  }
 
</style>
