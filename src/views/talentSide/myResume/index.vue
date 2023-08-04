<template>
  <!-- 我的简历页 -->
  <div class="container">
    <div class="tab-box">
      <div :class="is_titleTab == 1? 'hover':'' " @click="clickTitleTab(1)">预览简历</div>
      <div :class="is_titleTab == 2? 'hover':'' " @click="clickTitleTab(2)">刷新简历</div>
      <div :class="is_titleTab == 3? 'hover':'' " @click="clickTitleTab(3)">简历优化</div>
    </div>
    
    <div class="info-box">
      <div class="info-left-box" id="myReaume">
        <!-- 个人信息 开始 -->
        <MyInfo :data="infoData.basic_info" @refreshInfo="refreshInfo"/>  
        <!-- 个人信息 结束 -->

        <!-- 求职期望 开始 -->
        <JobExpectation :data="infoData.job_expectation" @refreshInfo="refreshInfo"/>  
        <!-- 求职期望 结束 -->
        
        <!-- 工作经历 开始 -->
        <WorkExperience :data="infoData.work_experience" @refreshInfo="refreshInfo"/>  
        <!-- 工作经历 结束 -->

        <!-- 项目经历 开始 -->
        <ProjectExperience :data="infoData.project_experience" @refreshInfo="refreshInfo"/>  
        <!-- 项目经历 结束 -->

        <!-- 教育经历 开始 -->
        <EducationExperience :data="infoData.education_experience" @refreshInfo="refreshInfo"/>  
        <!-- 教育经历 结束 -->

      </div>
      <!-- 右侧模块 开始 -->
      <div class="info-right-box">
        <div class="right-box up-attachments-box">
          <div class="up-att-t">
            <span class="span-1">上传附件简历</span>
            <span class="span-2">去上传<i class="el-icon-arrow-right" style="margin-left:2px;"></i></span>
          </div>
          <div class="up-box-Instructions">在附件中展示更多优势与特长</div>
        </div>

        <div class="right-box resume-improvement-box">
          <div class="improvement-att-t">
            <span class="span-1">简历待完善项</span>
            <img src="../../../assets/image/Frame_9.png" alt="" />
          </div>
          <div class="improvement-box-Instructions">完善后获更强竞争力</div>

          <div class="improvement-items-box">
            <div class="i-items">
              <div class="up-att-t">
                <span class="span-1">基本信息</span>
                <span class="span-2">去补充<i class="el-icon-arrow-right" style="margin-left:2px;"></i></span>
              </div>
              <div class="up-box-Instructions">必填字段缺失 <span>·1项</span></div>
            </div>

            <div class="i-items">
              <div class="up-att-t">
                <span class="span-1">工作经历</span>
                <span class="span-2">去补充<i class="el-icon-arrow-right" style="margin-left:2px;"></i></span>
              </div>
              <div class="up-box-Instructions">宁波...必填字段缺失 <span>·1项</span></div>
            </div>
            

          </div>
        </div>

        <div class="right-box integrity-box">
          <div class="integrity-att-t">中文简历完整度</div>
          <div></div>
          <div class="integrity-instructions">完善后获更强竞争力</div>
        </div>

      </div>
      <!-- 右侧模块 结束 -->
    </div>



  </div>

</template>

<script>
import MyInfo from "../components/myResume/myInfo";
import JobExpectation from "../components/myResume/jobExpectation";
import WorkExperience from "../components/myResume/workExperience";
import ProjectExperience from "../components/myResume/projectExperience";
import EducationExperience from "../components/myResume/educationExperience";
export default {
  name: 'myResume',
  components: {
    MyInfo,
    JobExpectation,
    WorkExperience,
    ProjectExperience,
    EducationExperience
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
    // 刷新信息
    refreshInfo(){
      this.getUserProfile();
    },
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
  }
  .info-set{
    font-size: 14px;
    font-weight: 400;
    color: $g_color;
    cursor: pointer;
    display: none;
    span{
      padding-left: 6px;
    }
  }
  .info-right-box{
    width: 406px;
    padding-left: 0.8rem;
    .right-box{
      background: #FFFFFF;
      border-radius: 6px ;
      opacity: 1;
      padding: 24px 24px 20px 24px;
    }
    .up-attachments-box{
      .up-att-t{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .span-1{
          font-size: 15px;
          font-weight: bold;
          color: $g_textColor;
          line-height: 24px;
        }
        .span-2{
          font-size: 14px;
          font-weight: 400;
          color: $g_color;
          line-height: 22px;
          margin-left: 10px;
        }
      }
      .up-box-Instructions{
        font-size: 14px;
        font-weight: 400;
        color: #86909C;
        line-height: 22px;
        margin-top: 8px;
        text-align: left;
      }
    }
    .resume-improvement-box{
      margin-top: 16px;
      .improvement-att-t{
        display: flex;
        align-items: center;
        .span-1{
          font-size: 15px;
          font-weight: bold;
          color: $g_textColor;
          line-height: 24px;
        }
        img{
          width: 18px;
          height: 18px;
          margin-left: 10px;
        }
      }
      .improvement-box-Instructions{
        font-size: 14px;
        font-weight: 400;
        color: #86909C;
        line-height: 22px;
        margin-top: 8px;
        text-align: left;
      }
      .improvement-items-box{
        width: 100%;
        .i-items{
          margin-top: 16px;
          width: 100%;
          .up-att-t{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .span-1{
              font-size: 14px;
              font-weight: bold;
              color: $g_textColor;
              line-height: 24px;
            }
            .span-2{
              font-size: 14px;
              font-weight: 400;
              color: $g_color;
              line-height: 22px;
              margin-left: 10px;
            }
          }
          .up-box-Instructions{
            font-size: 14px;
            font-weight: 400;
            color: $g_textColor;
            line-height: 22px;
            text-align: left;
            span{
              color: #FF751A;
            }
          }
        }
      }
    }
    .integrity-box{
      margin-top: 16px;
      .integrity-att-t{
        font-size: 15px;
        font-weight: bold;
        color: $g_textColor;
        line-height: 24px;
        text-align: left;
      }
      .integrity-instructions{
        font-size: 14px;
        font-weight: 400;
        color: #86909C;
        line-height: 22px;
        margin-top: 8px;
        text-align: left;
      }
    }
  }
}



</style>
