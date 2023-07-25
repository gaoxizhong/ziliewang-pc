<template>
  <!-- 我的简历页 -->
  <div class="container">
    <div class="tab-box">
      <div :class="is_titleTab == 1? 'hover':'' " @click="clickTitleTab(1)">预览简历</div>
      <div :class="is_titleTab == 2? 'hover':'' " @click="clickTitleTab(2)">刷新简历</div>
      <div :class="is_titleTab == 3? 'hover':'' " @click="clickTitleTab(3)">简历优化</div>
    </div>
    
    <div class="info-box">
      <div class="info-left-box">
        <!-- 个人信息 开始 -->
        <MyInfo :data="infoData.basic_info" />  
        <!-- 个人信息 结束 -->

        <!-- 求职期望 开始 -->
        <JobExpectation :data="infoData.job_expectation" />  
        <!-- 求职期望 结束 -->
        
        <!-- 工作经历 开始 -->
        <WorkExperience :data="infoData.workExperience" />  
        <!-- 工作经历 结束 -->

        <!-- 项目经历 开始 -->
        <ProjectExperience :data="infoData.project_experience" />  
        <!-- 项目经历 结束 -->

        <!-- 教育经历 开始 -->
        <EducationExperience :data="infoData.education_experience" />  
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
  }
 }



</style>
