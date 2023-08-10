<template>
  <div class="container">
    <div class="jobExpectation-box myResume-plate">
      <div class="myResume-plate-title-box">
        <span class="info-t">求职期望</span>
        <img src="../../../../assets/image/Frame_7.png" alt="" class="info-icon-img" v-if="!is_creat" @click="clickCreat"/>
      </div>
      
      <div class="myResume-plate-list" v-if="!is_creat">
        <ul class="plate-list-ul">
          <li v-for="(item,index) in data" :key="index">
            <div class="li-title-box">
              <div class="li-name">
                <span class="li-name-1">{{ item.desired_position }}/{{ item.job_preference }}</span>
                <span class="li-name-3">
                  <span>{{ item.expected_salary }}</span>
                  <span>|</span>
                  <span>{{ item.desired_location }}</span>
                  <span>|</span>
                  <span>{{ item.desired_industry }}</span>
                </span>
              </div>
              <div class="info-set">
                <span>删除</span>
                <span>/</span>
                <span>编辑</span>
              </div>
            </div>

          </li>
        </ul>

      </div>

      <!-- 编辑状态模块 开始 -->
      <div class="redact-title-bottom" v-if="is_creat">
        <div class="redact-title-box">
          <span class="info-t">添加求职期望</span>
        </div>

        <div class="redact-item-box">

          <div class="mb20 redact-item">
            <div class="item-label">期待职位</div>
            <div class="item-content" @click="clickInvolved">
              <el-input v-model="infoData.desired_position" autocomplete="on" spellcheck="false" placeholder="请选择" readonly="readonly"></el-input>
              <img src="../../../../assets/image/Frame_8.png" alt="" />
            </div>
          </div>

          <div class="mb20 redact-item">
            <div class="item-label">期望地点</div>
            <div class="item-content">
              <!-- <el-input v-model="infoData.desired_location" autocomplete="on" spellcheck="false" placeholder="请选择" readonly="readonly"></el-input>
              <img src="../../../../assets/image/Frame_8.png" alt="" /> -->
              <el-cascader
                :options="options"
                ref="cascaderAddr" 
                v-model="selectedOptions"
                :props="{ value: 'label' }"
                :show-all-levels="false"
                @change="handleChange">
              </el-cascader>
            </div>
          </div>

          <div class="mb20 redact-item">
            <div class="item-label">期望行业</div>
            <div class="item-content">
              <!-- <el-input v-model="infoData.desired_industry" autocomplete="on" spellcheck="false" placeholder="请选择" readonly="readonly"></el-input>
              <img src="../../../../assets/image/Frame_8.png" alt="" /> -->
              <el-select v-model="infoData.desired_industry" placeholder="请选择">
                <el-option
                  v-for="item in industry.industryList"
                  :key="item.industry"
                  :label="item.industry"
                  :value="item.industry">
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="mb20 redact-item">
            <div class="item-label">期望薪资</div>
            <div class="item-content">
              <el-select v-model="expected_salary_st" placeholder="请选择">
                <el-option
                  v-for="item in option_salary_st"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
              <span class="span-line"> - </span>
              <el-select v-model="expected_salary_end" placeholder="请选择">
                <el-option
                  v-for="item in option_salary_end"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="mb20 redact-item">
            <div class="item-label">职位偏好</div>
            <div class="item-content">
              <el-input v-model="infoData.job_preference" placeholder="职位偏好"></el-input>
              <!-- <el-input v-model="infoData.job_preference" autocomplete="on" spellcheck="false" placeholder="请选择" readonly="readonly"></el-input>
              <img src="../../../../assets/image/Frame_8.png" alt="" /> -->
            </div>
          </div>

          <div class="form-btns">
            <el-button @click="clickInfoCancelBtn">取消</el-button>
            <el-button type="primary" @click="clickInfoVerifyBtn">确定</el-button>
          </div>
        
        </div>

      </div>
      <!-- 编辑状态模块 结束 -->

    </div>



    <!-- 职位弹窗 -->
    <div class="dialogVisible-pop-box" v-if="dialogVisible">
      <div class="mask-box"></div>
      <div class="dialog-container">
        <div class="dialog-header">
          <h3 class="title">请选择职位类别</h3>
          <div class="dialog-header-input">
            <!-- <el-input type="text" v-model="dialogVisible_seach"></el-input> -->
          </div>
          <img src="../../../../assets/image/icon-close.png" alt="" @click="clickClose"/>
        </div>
        <div class="dialog-body">
          <div class="body-left-box">
            <div class="left-list-box">
              <ul>
                <li :class="selt_item == index? 'active':'' " v-for="(item,index) in position.industryList" :key="index" @click="click_industryListLi(item,index)">{{ item.industry }}</li>
              </ul>
            </div>
          </div>
          <div class="body-right-box">
            <div class="right-list-box">
              <div class="category-list-items" v-for="(item,index) in position.category_list" :key="index">
                <div class="category-name">{{ item.category_name }}</div>
                <ul>
                  <li :class="selt_item == index? 'active':'' " v-for="(items,idx) in item.position_list" :key="idx" @click="click_position_list(items.category_name)">{{ items.category_name }}</li>
                </ul>
              </div>
              
            </div>
            
          </div>
        </div>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span> -->
      </div>
    </div>

  </div>

</template>

<script>
let pcas = require('../../../../assets/json/pc-code.json');

export default {
  components: {
  },
  props:{
    data:{
      // 数组/对象的默认值应当由一个工厂函数返回
      type: Array,
      default() {
        return []
      }
    }
  },
  data(){
    return{
      infoData: {
        desired_position: '', // 期待职位
        desired_location:'', // 期望地点
        desired_industry: '互联网', // 期望行业
        expected_salary: '', // 期望薪资
        job_preference: '', // 职位偏好
      },
      is_creat: false,
      dialogVisible: false,
      dialogVisible_seach:'',
      list_id: '', // 选中的列表id
      position:{
        industryList: [], // 获取行业职位信息
        category_list: [], // 点击行业匹配到对应的岗位数组
      },
      industry:{ // 行业信息
        industryList:[]
      },
      selt_item: 0,
      option_salary_st: ['1K','2K','3K','4K','5k','6K','7K','8K','9K','10k','11K','12K','13K','14K','15k','16K','17K','18K','19K','20K','30K'],
      option_salary_end: ['1K','2K','3K','4K','5k','6K','7K','8K','9K','10k','11K','12K','13K','14K','15k','16K','17K','18K','19K','20K','30K'],
      expected_salary_st:'',
      expected_salary_end:'',
      options: pcas,
      selectedOptions: [],
    }
  },
  mounted(){
    // 点击所属行业项
    this.getIndustryList();
  },
  computed: {
    
  },
  methods: {
     // 获取省市区地址级联
     handleChange(thsAreaCode) {
      thsAreaCode = this.$refs['cascaderAddr'].getCheckedNodes()[0].pathLabels// 注意2： 获取label值
      console.log(thsAreaCode) // 注意3： 最终结果是个一维数组对象
      this.infoData.desired_location = thsAreaCode[1];
    },
    clickCreat(){
      this.is_creat = true
    },
    // 点击新建取消按钮
    clickInfoCancelBtn(){
      this.is_creat = false;
      this.list_id = '';
    },
    // 点击创建、编辑确认按钮
    clickInfoVerifyBtn(){
      let infoData = this.infoData;
      infoData.expected_salary = this.expected_salary_st+'-'+this.expected_salary_end;
      const p = Object.assign({},this.infoData);
      if(p.desired_position == ''){
        this.$message.warning('期待职位不能为空!');
        return
      }
      if(p.desired_location == ''){
        this.$message.warning('期望地点不能为空!');
        return
      }
      if(p.desired_industry == ''){
        this.$message.warning('期望行业不能为空!');
        return
      }
      if(p.expected_salary == ''){
        this.$message.warning('期望薪资不能为空!');
        return
      }
      if(p.job_preference == ''){
        this.$message.warning('职位不能为空!');
        return
      }
      if(p.responsibility_performance == ''){
        this.$message.warning('职位偏好不能为空!');
        return
      }
      const subCallback= ()=>{
        setTimeout(() => {
          this.is_creat = false;
          this.list_id = '';
          this.$emit('refreshInfo');
        }, 1000);
      }
      let api = '';
      let text = '';
      if(this.list_id){
        p.id = this.list_id;
        // 编辑修改
        api = '/api/job-expectation/update';
        text = '修改成功'
      }else{
        // 创建项目
        api = '/api/job-expectation/create';
        text = '创建成功'
      }
      this.createWorkExperience(p,api,text,subCallback);
    },
    // 创建
    createWorkExperience(data,api,text,f){
      let that = this;
      let p = Object.assign({},data);
      that.$axios.post(api,p).then( res =>{
        if(res.code == 0){
          that.$message.success( text );
          return f()
        }
      })
    },
    //点击删除
    clickDelete(id,idx){
      let that = this;
      let data = that.data;
      that.$axios.post('/api/job-expectation/delete',{
        id,
      }).then( res =>{
        if(res.code == 0){
          that.$message.success( '删除成功！' );
          data.splice(idx);
          that.data = data;
        }
      })
    },
    // 点击列表编辑
    clickUpdate(e){
      const infoData = this.infoData;
      const obj= Object.assign({},e);
      this.list_id = obj.id;
      for(var key in infoData){
        infoData[key] = obj[key]
      }
      this.infoData = infoData;
      this.is_creat = true;
    },
    // 点击选择职位
    clickInvolved(){
      this.getPositionList();
    },
    // 点击职位弹窗关闭按钮
    clickClose(){
      this.dialogVisible = false;
    },
    // 获取行业列表信息
    getIndustryList(){
      let that = this;
      that.$axios.post('/api/industry/list',{}).then( res =>{
        that.industry.industryList = res.data;
      }).catch( e=>{
        console.log(e)
      })
    },
    // 获取职位列表信息
    getPositionList(){
      let that = this;
      that.$axios.post('/api/position/list',{}).then( res =>{
        that.position.industryList = res.data;
        that.position.category_list = that.position.industryList[that.selt_item].category_list;
        that.dialogVisible = true;
      }).catch( e=>{
        console.log(e)
      })
    },
    // 点击职位分类列表
    click_industryListLi(n,i){
      let item = n;
      let index = i;
      this.selt_item = index;
      this.position.category_list = item.category_list;
    },
    // 点击职位列表
    click_position_list(n){
      this.infoData.desired_position = n;
      this.dialogVisible = false;
    },

  },
};
</script>

<style lang="scss" scoped>
  @import '../../../../styles/myResume.scss';
  // 职位弹窗 
  .dialogVisible-pop-box{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    .mask-box{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: .5;
      background: #000;
    }
    .dialog-container{
      min-width: 320px;
      width: 50%;
      max-height: 100%;
      transform: none;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      background: #FFF;
      border-radius: 2px;
      box-shadow: 0 1px 3px rgba(0,0,0,.3);
      box-sizing: border-box;
      .dialog-header{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #f5f6f9;
        font-size: 14px;
        padding: 0 24px;
        .title{
          font-size: 16px;
          color: $g_textColor;
          font-weight: bold;
          width: auto;
        }
        .dialog-header-input{
          flex: 1;
          display: flex;
          align-items: center;
          padding-left: 30px;
          /deep/ .el-input{
            width: 320px;
            border: none;
            .el-input__inner{
              background: #F7F8FA;
              height: 38px;
              line-height: 38px;
            }
          }
          /deep/ .el-input.is-focus .el-input__inner{
            border-color: $g_color;
            &:focus{
              border-color: $g_color;
            }
          }
        }
        img{
          width: 16px;
          height: 16px;
          cursor: pointer;
        }
      }
      .dialog-body {
        overflow: visible;
        height: calc(60vh);
        width: 100%;
        display: flex;
        .body-left-box{
          width: 13rem;
          padding: 10px 10px 20px;
          overflow-x: hidden;
          overflow-y: auto;
          border-right: 1px solid #f5f6f9;

          .left-list-box{
            width: 100%;
            height: auto;
            ul{
              width: 100%;
              height: auto;
              li{
                width: 100%;
                height: 40px;
                border-radius: 4px 4px 4px 4px;
                font-size: 14px;
                line-height: 40px;
                color: $g_textColor;
                padding: 0 12px;
                cursor: pointer;
                text-align: left;
              }
              li.active{
                background: #F7F8FA;
              }
            }
          }
        }
        .body-right-box{
          flex: 1;
          height: 100%;
          overflow-x: hidden;
          overflow-y: auto;
          .right-list-box{
            width: 100%;
            height: auto;
            padding: 0 1.2rem 0.8rem;
            .category-list-items{
              margin-top: 20px;
              text-align: left;
              .category-name{
                font-size: 16px;
                font-weight: bold;
                color: $g_textColor;
                line-height: 24px;
                width: 100%;
              }
              ul{
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                li{
                  width: auto;
                  height: 38px;
                  text-align: center;
                  line-height: 38px;
                  background: #F7F8FA;
                  border-radius: 4px 4px 4px 4px;
                  font-size: 14px;
                  color: $g_textColor;
                  margin-top: 16px;
                  margin-right: 16px;
                  padding: 0 10px;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }

    }
  }

</style>
