<template>
  <div class="bossSide-container myRecruitmentData">
    <!-- 我的招聘数据页 -->
    <div class="title-box">招聘数据</div>
    <div class="m-box margin-top-20 zp-data">
      <div class="tab-box">
        <div class="left-box">
          <img src="../../../assets/image/bossSide/myRecruitment-search.png" alt="" />
          <span class="title">我的招聘数据总览</span>
          <!-- <span class="title-show">数据周期: 2023.03.30 ~ 2023.04.05</span> -->
        </div>
        <div class="right-box"></div>
      </div>

      <div class="dataInfo-box">

        <div>
          <div class="title">
            <span>简历浏览量</span>
            <!-- <img src="../../../assets/image/bossSide/question-circle.png" alt=""> -->
          </div>
          <div class="num" @click="goToPages('/resumeViewNum')">{{ company_recruitment_count.resume_view_num?company_recruitment_count.resume_view_num:0 }}</div>
          <div class="sm-box">
            <img src="../../../assets/image/bossSide/caret-right.png" alt="">
            <span class="sm-n">0</span>
            <span class="sm-t">相比上周期</span>
          </div>
        </div>
        <div>
          <div class="title">
            <span>聊天发起量</span>
            <!-- <img src="../../../assets/image/bossSide/question-circle.png" alt=""> -->
          </div>
          <div class="num" @click="goToPages('/interaction')">{{ company_recruitment_count.chat_initiate_num?company_recruitment_count.chat_initiate_num:0 }}</div>
          <div class="sm-box">
            <img src="../../../assets/image/bossSide/caret-right.png" alt="">
            <span class="sm-n">0</span>
            <span class="sm-t">相比上周期</span>
          </div>
        </div>
        <div>
          <div class="title">
            <span>回复处理量</span>
            <!-- <img src="../../../assets/image/bossSide/question-circle.png" alt=""> -->
          </div>
          <div class="num" @click="goToPages('/interaction')">{{ company_recruitment_count.reply_num?company_recruitment_count.reply_num:0 }}</div>
          <div class="sm-box">
            <img src="../../../assets/image/bossSide/caret-right.png" alt="">
            <span class="sm-n">0</span>
            <span class="sm-t">相比上周期</span>
          </div>
        </div>
        <div>
          <div class="title">
            <span>虚拟号码获取量</span>
            <!-- <img src="../../../assets/image/bossSide/question-circle.png" alt=""> -->
          </div>
          <div class="num" @click="goToPages('/numberAcquisitionNum')">{{ company_recruitment_count.get_phone_num?company_recruitment_count.get_phone_num:0 }}</div>
          <div class="sm-box">
            <img src="../../../assets/image/bossSide/caret-right.png" alt="">
            <span class="sm-n">0</span>
            <span class="sm-t">相比上周期</span>
          </div>
        </div>
        <!-- <div>
          <div class="title">
            <span>互动量</span>
            <img src="../../../assets/image/bossSide/question-circle.png" alt="">
          </div>
          <div class="num">0</div>
          <div class="sm-box">
            <img src="../../../assets/image/bossSide/caret-right.png" alt="">
            <span class="sm-n">0</span>
            <span class="sm-t">相比上周期</span>
          </div>
        </div> -->
        <div>
          <div class="title">
            <span>面试邀约量</span>
            <!-- <img src="../../../assets/image/bossSide/question-circle.png" alt=""> -->
          </div>
          <div class="num" @click="goToPages('/myInterviewSchedule')">{{company_recruitment_count.interview_invite_num?company_recruitment_count.interview_invite_num:0}}</div>
          <div class="sm-box">
            <img src="../../../assets/image/bossSide/caret-right.png" alt="">
            <span class="sm-n">0</span>
            <span class="sm-t">相比上周期</span>
          </div>
        </div>


      </div>
    </div>
    <div class="m-box margin-top-20 zxzw-data">
      <div class="tab-box">
        <div class="left-box">
          <img src="../../../assets/image/bossSide/frame-22.png" alt="" />
          <span class="title">在线职位数据</span>
          <!-- <span class="title-show">数据周期: 2023.03.30 ~ 2023.04.05</span> -->
        </div>
        <div class="right-box"></div>
      </div>

      <div class="block">
        <div style="flex: 1;">
          <div class="input-box">
            <span>关键词</span>
            <el-input placeholder="请输入职位名称/工作城市"></el-input>
          </div>
        </div>
        
        
      </div>

      <div class="tableData-box margin-top-20">    
        <el-table :data="company_recruitment_list" style="width: 100%">
          <el-table-column prop="position_name" label="在招职位"></el-table-column>
          <el-table-column prop="companypositionaboutcount.chat_initiate_num" label="聊天发起量"></el-table-column>
          <el-table-column prop="companypositionaboutcount.reply_num" label="求职者回复量"></el-table-column>
          <el-table-column prop="companypositionaboutcount.deliver_num" label="求职者投递量"></el-table-column>
          <!-- <el-table-column prop="e" label="回复处理量"></el-table-column> -->
          <el-table-column prop="companypositionaboutcount.get_phone_num" label="虚拟号码获取量"></el-table-column>
          <!-- <el-table-column prop="e" label="互动量"></el-table-column> -->
          <el-table-column label="操作">
            <template>
              <!-- <span class="blue">查看详情</span> -->
              <span class="blue">导出</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      formData: {},
      company_recruitment_count:{},
      company_recruitment_list: [],
    }
  },
  created(){
    //  获取信息
    this.getFormData();
  },
  methods:{
    goToPages(path){
      this.$router.push({ path })
    },
    getFormData(){
      let that = this;
      that.$axios.post('/api/company/recruitment',{}).then( res =>{
        if(res.code == 0){
          that.formData = res.data;
          that.company_recruitment_list = res.data.company_recruitment_list.list;
          that.company_recruitment_count = res.data.company_recruitment_count;
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .title-box{
    height: 24px;
    font-size: 16px;
    font-weight: bold;
    color: $g_textColor;
    line-height: 24px;
  }
  .myRecruitmentData{
    
    .tab-box{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left-box{
        display: flex;
        align-items: center;
        &>img{
          width: 24px;
          height: 24px;
        }
        .title{
          font-size: 18px;
          font-weight: bold;
          color: $g_textColor;
          line-height: 26px;
          padding-left: 5px;
        }
        .title-show{
          font-size: 14px;
          font-weight: 400;
          color: #86909C;
          line-height: 22px;
          padding-left: 24px;
        }
      }
    }
    .zp-data{
      width: 100%;
      .dataInfo-box{
        width: 100%;
        display: flex;
        align-items: center;
        margin-top: 40px;
        &>div{
          flex: 1;
          .title{
            display: flex;
            align-items: center;
            &>span{
              font-size: 14px;
              font-weight: 400;
              color: #86909C;
              line-height: 22px;
            }
            &>img{
              width: 16px;
              height: 16px;
              margin-left: 4px;
            }
          }
          .num{
            font-size: 30px;
            font-family: DIN Alternate-Bold, DIN Alternate;
            font-weight: bold;
            color: $g_textColor;
            line-height: 40px;
            margin: 4px 0;
            cursor: pointer;
          }
          .sm-box{
            display: flex;
            align-items: center;
            &>img{
              width: 12px;
              height: 12px;
            }
            &>span{
              font-size: 12px;
              font-family: PingFang SC-Regular, PingFang SC;
              font-weight: 400;
              color: #86909C;
              line-height: 20px;
              margin-left: 4px;
            }
          }
        }
      }
    }
    .zxzw-data{
      width: 100%;
      .block{
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .input-box{
        display: flex;
        align-items: center;
        width: 300px;
        &>span{
          font-size: 14px;
          font-weight: 400;
          color: #4E5969;
          line-height: 22px;
          padding-right: 10px;
          width: auto;
        }
        .el-input{
          flex: 1;
        }

        
      }
      .tableData-box{
        .blue {
          color: $g_color;
          cursor: pointer;
        }
        /deep/ .has-gutter tr{
          background: #F7F9FC !important;
        }
      }
    }
  }
</style>