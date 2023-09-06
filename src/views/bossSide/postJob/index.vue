<template>
  <div class="bossSide-container">
    <!-- 发布职位页面 -->
    <div class="m-box">

      <div class="postJob-box ">
        <div class="title">发布职位</div>
        <div class="postJob-form-box">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="职位名称" prop="postJob_name">
              <el-input v-model="ruleForm.postJob_name" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="工作性质" prop="natureWork">
              <el-radio-group v-model="ruleForm.natureWork">
                <el-radio label="全职"></el-radio>
                <el-radio label="兼职"></el-radio>
                <el-radio label="实习"></el-radio>
                <el-radio label="校园"></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="职位描述" prop="job_desc">
              <span class="desc-title">请勿输入邮箱、电话、链接,请不要包含性别歧视语 请参考职位描述规范</span>
              <el-input type="textarea" :rows="9" v-model="ruleForm.job_desc" :placeholder="desc_placeholder"></el-input>
            </el-form-item>

            <el-form-item label="职位亮点" prop="job_highlight">
              <span class="desc-title">求职端展示效果，向求职者介绍您的职位亮点，增加独特的吸引力，让您的职位脱颖而出!</span>
              <el-input type="textarea" :rows="3" v-model="ruleForm.job_highlight" :placeholder="hight_placeholder"></el-input>
            </el-form-item>

            <el-form-item label="职位类别" prop="job_category">
              <el-select v-model="ruleForm.job_category" placeholder="请选择职位类别">
                <el-option label="UI设计师" value="UI设计师"></el-option>
                <el-option label="前端开发" value="前端开发"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="行业要求" prop="industry_requirement">
              <el-select v-model="ruleForm.industry_requirement" placeholder="请选择您期望候选人来自于哪些行业">
                <el-option label="教育" value="教育"></el-option>
                <el-option label="金融" value="金融"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="学习经历" required>
              <el-col :span="7">
                <el-form-item prop="xl_1">
                  <el-select v-model="ruleForm.xl_1" placeholder="请选择">
                    <el-option label="博士" value="博士"></el-option>
                    <el-option label="研究生" value="研究生"></el-option>
                    <el-option label="本科" value="本科"></el-option>
                    <el-option label="大专" value="大专"></el-option>
                    <el-option label="高中" value="高中"></el-option>
                    <el-option label="初中" value="初中"></el-option>
                    <el-option label="最低学历" value="最低学历"></el-option>
                  </el-select>
                </el-form-item>

              </el-col>
              <el-col class="line" :span="1">-</el-col>
              <el-col :span="7">
                <el-form-item prop="xl_2">
                  <el-select v-model="ruleForm.xl_2" placeholder="请选择">
                  <el-option label="博士" value="博士"></el-option>
                  <el-option label="研究生" value="研究生"></el-option>
                  <el-option label="本科" value="本科"></el-option>
                  <el-option label="大专" value="大专"></el-option>
                  <el-option label="高中" value="高中"></el-option>
                  <el-option label="初中" value="初中"></el-option>
                  <el-option label="最低学历" value="最低学历"></el-option>
                  <el-option label="无经验" value="无经验"></el-option>
                </el-select>
                </el-form-item>
              </el-col>
            </el-form-item>

            <el-form-item label="职位偏好" prop="job_preference">
              <el-select v-model="ruleForm.job_preference" placeholder="请选择职位偏好，有助于帮您更精准地匹配人才">
                <el-option label="前端" value="前端"></el-option>
                <el-option label="后端" value="后端"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="工作地址" prop="working_address">
              <el-input v-model="ruleForm.working_address" placeholder="请输入工作地址"></el-input>
            </el-form-item>

            <el-form-item label="补充信息" prop="supplementary_info">
              <el-checkbox-group v-model="ruleForm.supplementary_info">
                <el-checkbox label="可转正" name="可转正"></el-checkbox>
                <el-checkbox label="可远程实习" name="可远程实习"></el-checkbox>
                <el-checkbox label="提供实习证明" name="提供实习证明"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">发布</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        
      </div>
      
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        postJob_name: '', // 职位名称
        natureWork: '', // 工作性质
        job_desc: '', // 职位描述
        job_highlight:'', // 职位亮点
        job_category:'', // 职位类别
        industry_requirement:'', // 行业要求
        xl_1:'',
        xl_2:'',
        job_preference:'', // 职位偏好
        working_address:'', // 工作地址
        supplementary_info: [], // 补充信息

        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
      },
      rules: {  // 必填提示
        postJob_name: [
          { required: true, message: '请输入职位名称', trigger: 'blur' }
        ],
        working_address: [
          { required: true, message: '请输入工作地址', trigger: 'blur' }
        ],
        natureWork: [
          { required: true, message: '请选择工作性质', trigger: 'change' }
        ],
        job_desc: [
          { required: true, message: '请填写职位描述', trigger: 'blur' }
        ],
        job_category: [
          { required: true, message: '请选择职位类别', trigger: 'change' }
        ],
        industry_requirement: [
          { required: true, message: '请选择行业要求', trigger: 'change' }
        ],
        xl_1: [
          { required: true, message: '请选择学习经历', trigger: 'change' }
        ],
        xl_2: [
          { required: true, message: '请选择学习经历', trigger: 'change' }
        ],
        job_preference: [
          { required: true, message: '请选择职位偏好', trigger: 'change' }
        ],





        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
      },
      desc_placeholder:`请输入岗位职责、任职要求等描述，至少10个字，建议使用以下格式逐条列出岗位职责
      1...
      2...
      任职要求
      1...
      2...
      补充说明
      晋升说明、培训情况等工作时间、
      `,
      hight_placeholder:`1.您可以问下招聘需求方，他们更懂得如何用有趣且个性化的方式来吸引该类人才。
2. 建议填写调薪机制&晋升通道、是否牛人带队、团队氛围、企业发展潜力等.
      `,
    }
  },
}
</script>
<style lang="scss" scoped>
  .postJob-box{
    width: 880px;
    padding: 16px 30px;
    .title{
      width: 100%;
      font-size: 0.9rem;
      font-weight: bold;
      color: $g_textColor;
      position: relative;
      padding-left: 10px;
      &::after{
        content: '';
        width: 3px;
        height: 100%;
        background: $g_bg;
        position: absolute;
        left: 0;
        top: -2px;
      }
    }



    .postJob-form-box{
      width: 100%;
      margin-top: 16px;
      .desc-title{
        font-size: 14px;
        font-weight: 400;
        color: $g_textColor;
        line-height: 22px;
      }
      .line{
        text-align: center;
        font-size: 20px;
      }
      /deep/ .el-form-item__content{
        line-height: 32px;
      }
      /deep/ .el-form-item__label{
        padding-right: 20px;
        line-height: 32px;
      }
      /deep/ .el-input__inner{
        height: 32px;
        line-height: 32px;
      }
      /deep/ .el-input__icon{
        line-height: 32px;
      }
    }
  }
</style>