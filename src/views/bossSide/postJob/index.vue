<template>
  <div class="bossSide-container">
    <!-- 发布职位页面 -->
    <div class="m-box">

      <div class="postJob-box ">
        <div class="title">发布职位</div>
        <div class="postJob-form-box">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="职位名称" prop="position_name">
              <el-input v-model="ruleForm.position_name" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="工作性质" prop="work_type">
              <el-radio-group v-model="ruleForm.work_type">
                <el-radio label="1">全职</el-radio>
                <el-radio label="2">兼职</el-radio>
                <el-radio label="3">实习</el-radio>
                <el-radio label="4">校园</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="职位描述" prop="position_desc">
              <span class="desc-title">请勿输入邮箱、电话、链接,请不要包含性别歧视语 请参考职位描述规范</span>
              <el-input type="textarea" :rows="10" v-model="ruleForm.position_desc" :placeholder="desc_placeholder"></el-input>
            </el-form-item>

            <el-form-item label="职位亮点" prop="position_lightspot">
              <span class="desc-title">求职端展示效果，向求职者介绍您的职位亮点，增加独特的吸引力，让您的职位脱颖而出!</span>
              <el-input type="textarea" :rows="3" v-model="ruleForm.position_lightspot" :placeholder="hight_placeholder"></el-input>
            </el-form-item>

            <el-form-item label="职位类别" prop="position_type">
              <el-select v-model="ruleForm.position_type" placeholder="请选择职位类别">
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

            <el-form-item label="学历要求" required>
              <el-col :span="7">
                <el-form-item prop="educational_experience">
                  <el-select v-model="ruleForm.educational_experience" placeholder="请选择学历要求">
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
            </el-form-item>

            <el-form-item label="职位偏好" prop="job_preference">
              <el-select v-model="ruleForm.job_preference" placeholder="请选择职位偏好，有助于帮您更精准地匹配人才">
                <el-option label="前端" value="前端"></el-option>
                <el-option label="后端" value="后端"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工作地址" prop="work_address">
              <!-- <el-input v-model="ruleForm.work_address" placeholder="请输入工作地址"></el-input> -->
              <el-cascader
                :options="ruleForm.options"
                ref="cascaderAddr" 
                v-model="ruleForm.selectedOptions"
                :props="{ value: 'label' }"
                :show-all-levels="false" placeholder="请选择城市"
                @change="handleChange">
              </el-cascader>
            </el-form-item>
            <el-form-item label="新资范围" required>
              <el-col :span="7">
                <el-input v-model="ruleForm.xz_status" placeholder="新资范围"></el-input>
              </el-col>
              <el-col class="line" :span="1" style="font-size: 14px;"> 至 </el-col>
              <el-col :span="7">
                <el-input v-model="ruleForm.xz_end" placeholder="新资范围"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="工作时间" required>
              <el-col :span="5">
                <el-select v-model="ruleForm.work_times" placeholder="工作时间" style="width: 100%;">
                  <el-option label="无经验要求" value="无经验要求"></el-option>
                  <el-option label="0-1年" value="0-1年"></el-option>
                  <el-option label="1-3年" value="1-3年"></el-option>
                  <el-option label="3-5年" value="3-5年"></el-option>
                  <el-option label="5-7年" value="5-7年"></el-option>
                  <el-option label="7年以上" value="7年以上"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="职位福利" prop="job_benefits">
              <el-col :span="15">
                <el-select v-model="ruleForm.job_benefits" multiple placeholder="请选择" style="width: 100%;">
                  <el-option label="五险一金" value="五险一金"></el-option>
                  <el-option label="绩效奖金" value="绩效奖金"></el-option>
                  <el-option label="餐补" value="餐补"></el-option>
                  <el-option label="交通补" value="交通补"></el-option>
                  <el-option label="住房补" value="住房补"></el-option>
                </el-select>
              </el-col>
              
            </el-form-item>
            
            <el-form-item label="招聘人数" prop="need_nums">
              <el-col :span="7">
                <el-input v-model="ruleForm.need_nums" placeholder="招聘人数"></el-input>
              </el-col>
              <span style="padding-left: 10px;font-size: 14px;">人</span>
            </el-form-item>

            <el-form-item label="简历同步至" prop="sync_workmate">
              <span class="desc-title">我的同事 TA将与您一起管理该职位，可以通过平台和邮箱接收简历</span>
              <el-col :span="15">
                <el-select v-model="ruleForm.sync_workmate" multiple placeholder="请选择" style="width: 100%;">
                  <el-option label="张三" value="1"></el-option>
                  <el-option label="李四" value="2"></el-option>
                  <el-option label="王五" value="3"></el-option>
                  <el-option label="麻六" value="4"></el-option>
                </el-select>
              </el-col>
              
            </el-form-item>
            <el-form-item label="简历要求" prop="resume_demand">
              <span class="desc-title">设置后，不满足要求的简历，将被自动标记为不合适，该部分简历可在下人才管理-不合适，中查看!</span>
              <el-col :span="15">
                <el-select v-model="ruleForm.resume_demand" multiple placeholder="设置期望简历要求" style="width: 100%;">
                  <el-option label="三年" value="三年"></el-option>
                  <el-option label="北京" value="北京"></el-option>
                  <el-option label="本科" value="本科"></el-option>
                </el-select>
              </el-col>
              
            </el-form-item>
            <el-form-item label="补充信息" prop="supplementary_information">
              <el-checkbox-group v-model="ruleForm.supplementary_information">
                <el-checkbox label="可转正" name="可转正"></el-checkbox>
                <el-checkbox label="可远程实习" name="可远程实习"></el-checkbox>
                <el-checkbox label="提供实习证明" name="提供实习证明"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            
            <el-form-item class="btn-box">
              <el-button type="primary" @click="submitForm">发布</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        
      </div>
      
    </div>
  </div>
</template>
<script>
import pcas from '../../../assets/json/pc-code.json'

export default {
  data() {
    return {
      ruleForm: {
        position_name: '', // 职位名称
        work_type: '', // 工作性质
        position_desc: '', // 职位描述
        position_lightspot:'', // 职位亮点
        position_type:'', // 职位类别
        industry_requirement:'', // 行业要求
        educational_experience:'',
        job_preference:'', // 职位偏好
        work_address:'', // 工作地址
        xz_status:'',
        xz_end:'',
        work_times:'',
        supplementary_information: [], // 补充信息
        sync_workmate:'', // 同事
        need_nums:'', // 招聘人数
        job_benefits:'', // 职位福利
        resume_demand: '', // 简历要求
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        options: pcas,  // 地址数据
        selectedOptions: [], // 选中的地址
      },
      rules: {  // 必填提示
        position_name: [
          { required: true, message: '请输入职位名称', trigger: 'blur' }
        ],
        work_address: [
          { required: true, message: '请输入工作地址', trigger: 'blur' }
        ],
        work_type: [
          { required: true, message: '请选择工作性质', trigger: 'change' }
        ],
        position_desc: [
          { required: true, message: '请填写职位描述', trigger: 'blur' }
        ],
        position_type: [
          { required: true, message: '请选择职位类别', trigger: 'change' }
        ],
        industry_requirement: [
          { required: true, message: '请选择行业要求', trigger: 'change' }
        ],
        educational_experience: [
          { required: true, message: '请选择学历要求', trigger: 'change' }
        ],
        work_times: [
          { required: true, message: '请选择工作时间', trigger: 'change' }
        ],
        xz_status: [
          { required: true, message: '请填写薪资范围', trigger: 'blur' }
        ],
        xz_end: [
          { required: true, message: '请填写薪资范围', trigger: 'blur' }
        ],
        need_nums: [
          { required: true, message: '请填写招聘人数', trigger: 'blur' }
        ],
        job_preference: [
          { required: true, message: '请选择职位偏好', trigger: 'change' }
        ],
        job_preference: [
          { required: true, message: '请选择职位偏好', trigger: 'change' }
        ],
      },
      desc_placeholder:`请输入岗位职责、任职要求等描述，至少10个字，建议使用以下格式逐条列出岗位职责
      职责描述:
      1...
      2...
      任职要求:
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
  methods:{
  // 获取省市区地址级联
    handleChange(thsAreaCode) {
      // thsAreaCode = this.$refs['cascaderAddr'].getCheckedNodes()[0].pathLabels// 注意2： 获取label值
      console.log(thsAreaCode) // 注意3： 最终结果是个一维数组对象
      this.selectedOptions = thsAreaCode;
      console.log(this.selectedOptions)

    },
    radioGroup(v){
      console.log(v)
    },
    // 点击重置
    resetForm(){
      this.ruleForm= {
        position_name: '', // 职位名称
        work_type: '', // 工作性质
        position_desc: '', // 职位描述
        position_lightspot:'', // 职位亮点
        position_type:'', // 职位类别
        industry_requirement:'', // 行业要求
        educational_experience:'', // 学历要求
        job_preference:'', // 职位偏好
        work_address:'', // 工作地址
        xz_status:'',
        xz_end:'',
        work_times:'', // 工作要求
        supplementary_information: [], // 补充信息
        sync_workmate:'', // 同事
        need_nums:'', // 招聘人数
        job_benefits:'', // 职位福利
        resume_demand: '', // 简历要求
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
      }
    },
    // 点击提交
    submitForm(){
      let that = this;
      let ruleForm = that.ruleForm;
      let p = {
        position_name: ruleForm.position_name,
        work_type: ruleForm.work_type,
        position_desc: ruleForm.position_desc,
        position_lightspot: ruleForm.position_lightspot,
        position_type: ruleForm.position_type,
        industry_requirement: ruleForm.industry_requirement,
        educational_experience:ruleForm.educational_experience,
        job_preference: ruleForm.job_preference,
        work_address: ruleForm.selectedOptions.join('/'),
        salary: ruleForm.xz_status + '-' + ruleForm.xz_end,
        job_benefits: ruleForm.job_benefits.join(','),
        need_nums: ruleForm.need_nums,
        supplementary_information: ruleForm.supplementary_information.join(','),
        sync_workmate: ruleForm.sync_workmate.join(','),
        resume_demand: ruleForm.resume_demand.join(','),
        work_times: ruleForm.work_times,

      };
      
      that.$axios.post('/api/company-position/publish',p).then( res =>{
        console.log(res)
        if(res.code == 0){
          that.$message.success(' 发布成功！');
          setTimeout( ()=>{
            that.resetForm();
          },1500)
        }else{
          that.$message.error({
            message:res.data.msg
          })
        }
      })
    },
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
  .btn-box{
    display: flex;
    align-items: center;
    margin-top: 20px;
    & /deep/ .el-form-item__content{
      margin-left: 40px !important;
    }
   & /deep/ .el-button{
    width: 114px;
    height: 40px;
    margin-right: 20px;
   }
   & /deep/ .el-button--primary{
    background-color:$g_bg;
    border-color: $g_color;
   }

  }
</style>