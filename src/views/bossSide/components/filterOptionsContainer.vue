<template>
  <div class="filter-options-container">
    <div class="filter-options-row-section">
      <!-- <div class="selected-clear" @click="clickALLAnticon">
        <i class="el-icon-delete"></i>
        <span>清空筛选条件</span>
      </div> -->

      <div class="options-row">
        <div class="row-title">目前城市</div>
        <ul class="row-options-detail-box">
          <li class="options-item" :class="city == '全国'? 'selected':''" data-code="410" data-name="全国" @click="clickCity('全国')">全国</li>
          <li class="options-item" :class="selectCityList.indexOf(item.label) != -1? 'selected':''" :data-code="item.code" :data-name="item.label" @click="clickCity(item.label)" v-for="(item,index) in showCityList" :key="index">{{ item.label }}</li>
          <li class="options-item" id="filter-option-other-city"><span @click="clickCityOther">其他</span><div class="antd-lp-city"></div></li>
        </ul>
      </div>
      
      <div class="options-row">
        <div class="row-title">薪资范围:</div>
        <ul class="row-options-detail-box">
          <li class="options-item" :class="pay == ''? 'selected':''" @click="clickPay('')">不限</li>
          <li class="options-item" :class="pay == '3K以下'? 'selected':''" @click="clickPay('3K以下','0-3')">3K以下</li>
          <li class="options-item" :class="pay == '5K-10k'? 'selected':''" @click="clickPay('5K-10k','5-10')">5K-10k</li>
          <li class="options-item" :class="pay == '10K-20k'? 'selected':''" @click="clickPay('10K-20k','10-20')">10K-20k</li>
          <li class="options-item" :class="pay == '20K-40k'? 'selected':''" @click="clickPay('20K-40k','20-40')">20K-40k</li>
          <li class="options-item" :class="pay == '40K-60k'? 'selected':''" @click="clickPay('40K-60k','40-60')">40K-60k</li>
          <li class="options-item" :class="pay == '60k以上'? 'selected':''" @click="clickPay('60k以上','60-0')">60k以上</li>
          <!-- <div class="jsx-1824882820 search-job-custom-salary-box">
            <span class="jsx-1824882820 salary-name">自定义</span>
          </div> -->
        </ul>
      </div>
      <div class="options-row">
        <div class="row-title">工作年限:</div>
        <ul class="row-options-detail-box">
          <li class="options-item" :class="exp == ''? 'selected':''" @click="clickexp('')">不限</li>
          <!-- <li class="options-item" :class="exp == '应届生'? 'selected':''" @click="clickexp('应届生',3)">应届生</li>
          <li class="options-item" :class="exp == '实习生'? 'selected':''" @click="clickexp('实习生',2)">实习生</li> -->
          <li class="options-item" :class="exp == '1年以内'? 'selected':''" @click="clickexp('1年以内','0-1')">1年以内</li>
          <li class="options-item" :class="exp == '1-3年'? 'selected':''" @click="clickexp('1-3年','1-3')">1-3年</li>
          <li class="options-item" :class="exp == '3-5年'? 'selected':''" @click="clickexp('3-5年','3-5')">3-5年</li>
          <li class="options-item" :class="exp == '5-10年'? 'selected':''" @click="clickexp('5-10年','5-10')">5-10年</li>
          <li class="options-item" :class="exp == '10-15年'? 'selected':''" @click="clickexp('10-15年','10-15')">10-15年</li>
          <li class="options-item" :class="exp == '15年以上'? 'selected':''" @click="clickexp('15年以上','15-100')">15年以上</li>
        </ul>
      </div>
      <div class="options-row">
        <div class="row-title">教育经历:</div>
        <ul class="row-options-detail-box">
          <li class="options-item" :class="education_background == ''? 'selected':''" @click="clickeducation('')">不限</li>
          <li class="options-item" :class="education_background == '博士'? 'selected':''" @click="clickeducation('博士')">博士</li>
          <li class="options-item" :class="education_background == '硕士'? 'selected':''" @click="clickeducation('硕士')">硕士</li>
          <li class="options-item" :class="education_background == '研究生'? 'selected':''" @click="clickeducation('研究生')">研究生</li>
          <li class="options-item" :class="education_background == '本科'? 'selected':''" @click="clickeducation('本科')">本科</li>
          <li class="options-item" :class="education_background == '大专'? 'selected':''" @click="clickeducation('大专')">大专</li>
          <li class="options-item" :class="education_background == '中专/中技'? 'selected':''" @click="clickeducation('中专/中技')">中专/中技</li>
          <li class="options-item" :class="education_background == '高中'? 'selected':''" @click="clickeducation('高中')">高中</li>
          <li class="options-item" :class="education_background == '初中及以下'? 'selected':''" @click="clickeducation('初中及以下')">初中及以下</li>
        </ul>
        <div class="options-row-1">
          <div class="row-title">是否统招：</div>
          <el-select v-model="is_national_unified" placeholder="是否统招" @change="is_national_unified_change" style="width: 140px;">
            <el-option label="不限" value=""></el-option>
            <el-option label="统招" value="1"></el-option>
            <el-option label="非统招" value="2"></el-option>
          </el-select>
        </div>
      </div>
      <div class="options-row">
        <div class="row-title">院校要求:</div>
        <ul class="row-options-detail-box">
          <li class="options-item" :class="school == ''? 'selected':''" @click="clickschool('')">不限</li>
          <li class="options-item" :class="school == 2 ? 'selected':''" @click="clickschool(2)">211</li>
          <li class="options-item" :class="school == 3 ? 'selected':''" @click="clickschool(3)">985</li>
          <li class="options-item" :class="school == 4 ? 'selected':''" @click="clickschool(4)">双一流</li>
          <li class="options-item" :class="school == 5 ? 'selected':''" @click="clickschool(5)">海外留学</li>
        </ul>
      </div>
      <div class="options-row">
        <div class="row-title">当前行业:</div>
        <el-select v-model="desired_industry" filterable multiple collapse-tags clearable placeholder="当前行业" @change="desired_industry_change">
          <el-option
            v-for="item in industryList"
            :key="item.industry"
            :label="item.industry"
            :value="item.industry">
          </el-option>
        </el-select>
        <div class="options-row-1">
          <div class="row-title">当前职位：</div>
          <div class="item-content" @click="clickInvolved">
            <el-input v-model="desired_position" autocomplete="on" spellcheck="false" placeholder="请选择" readonly="readonly"></el-input>
            <img src="../../../assets/image/Frame_8.png" alt="" />
          </div>
        </div>

      </div>
      <div class="options-row">
        <div class="row-title">年   龄:</div>
        <div class="options-age-box">
          <el-input type="number" v-model="age.age_status" placeholder="岁" @input="age_status_input"></el-input>
          <span> - </span>
          <el-input type="number" v-model="age.age_end" placeholder="不限" @input="age_end_input"></el-input>
          <el-button type="primary" @click="age_btn" v-if="is_age">确定</el-button>
        </div>
        <div class="options-row-1">
          <div class="row-title">性   别：</div>
          <el-select v-model="sex" placeholder="性别" @change="sex_change">
            <el-option label="不限" value=""></el-option>
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </div>
        
      </div>


    </div>
    <div class="selected-options-box">
      <div class="selected-options-title">已选条件：</div>
      <ul class="selected-options-list-box">
        <block v-for="(item,index) in selectCityList" :key="index">
          <li class="selected-item">
            <span class="anticon anticon-close">{{ item }}</span>
            <i class="el-icon-close" @click="clickselectCityList(index)"></i>
          </li>
        </block>
        
        <li class="selected-item" v-if=" city == '全国' ">
          <span class="anticon anticon-close">全国</span>
          <i class="el-icon-close" @click="clickAnticon(-1)"></i>
        </li>
        <li class="selected-item" v-if="pay.value">
          <span class="anticon anticon-close">{{ pay.value }}</span>
          <i class="el-icon-close" @click="clickAnticon('pay')"></i>
        </li>
        <li class="selected-item" v-if="exp.value">
          <span class="anticon anticon-close">{{ exp.value }}</span>
          <i class="el-icon-close" @click="clickAnticon('exp')"></i>
        </li>
        <!-- 行业选项 开始 -->
        <block v-for="(item,index) in desired_industry" :key="index">
          <li class="selected-item">
            <span class="anticon anticon-close">{{ item }}</span>
            <i class="el-icon-close" @click="clickDesiredList(index)"></i>
          </li>
        </block>
        <!-- 行业选项 结束 -->
        <!-- 职业选项 开始 -->
        <block v-for="(item,index) in position.selectCategoryList" :key="index">
          <li class="selected-item">
            <span class="anticon anticon-close">{{ item }}</span>
            <i class="el-icon-close" @click="clickCategoryList(index)"></i>
          </li>
        </block>
        <!-- 职业选项 结束 -->
      </ul>
      <div class="selected-clear" ref="search-jobs-clear-options" id="search-jobs-clear-options" @click="clickALLAnticon">
        <i class="el-icon-delete"></i>
        <span>清空筛选条件</span>
      </div>
    </div>
    <!-- 选择城市弹窗 -->
    <div class="dialogVisible-pop-box" v-if="dialogVisible && cityData.length >=0 ">
      <div class="mask-box"></div>
      <div class="dialog-container">
        <div class="dialog-header">
          <h3 class="title">请选择城市</h3>
          <div class="dialog-header-input">
            <!-- <el-input type="text" v-model="dialogVisible_seach"></el-input> -->
          </div>
          <img src="../../../assets/image/icon-close.png" alt="" @click="clickClose"/>
        </div>
        <div class="dialog-body">
          <div class="body-left-box">
            <div class="left-list-box">
              <ul>
                <li :class="selt_province_item == index? 'active':'' " v-for="(item,index) in cityData" :key="index" @click="click_industryListLi(item,index)">{{ item.label }}</li>
              </ul>
            </div>
          </div>
          <div class="body-right-box">
            <div class="right-list-box">
              <div class="category-list-items">
                <ul>
                  <li :class="selectCityList.indexOf(items.label) != -1 ? 'active':'' " v-for="(items,idx) in city_list" :key="idx" @click="click_city_list(items,idx)">{{ items.label }}</li>
                </ul>
              </div>
            </div>
            
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <div class="slet-box">
            <span>当前选择:</span>
            <span class="span-item" v-for="(item,index) in selectCityList" :key="index">{{ item }}</span>
          </div>
          <div class="slet-btn-box">
            <el-button @click="clickClearCityOption">清空选项</el-button>
            <el-button type="primary" @click="clickCityOK">确  定</el-button>
          </div>
        </span>
      </div>
    </div>
    <!-- 选择职业弹窗 -->
    <div class="dialogVisible-pop-box" v-if="position.dialogVisible">
      <div class="mask-box"></div>
      <div class="dialog-container">
        <div class="dialog-header">
          <h3 class="title">请选择职位类别</h3>
          <div class="dialog-header-input">
            <!-- <el-input type="text" v-model="dialogVisible_seach"></el-input> -->
          </div>
          <img src="../../../assets/image/icon-close.png" alt="" @click="clickPositionClose"/>
        </div>
        <div class="dialog-body">
          <div class="body-left-box">
            <div class="left-list-box">
              <ul>
                <li :class="position.selt_item == index? 'active':'' " v-for="(item,index) in position.positionList" :key="index" @click="click_positionListLi(item,index)">{{ item.industry }}</li>
              </ul>
            </div>
          </div>
          <div class="body-right-box">
            <div class="right-list-box">
              <div class="category-list-items" v-for="(item,index) in position.category_list" :key="index">
                <div class="category-name">{{ item.category_name }}</div>
                <ul>
                  <li :class="position.selectCategoryList.indexOf(items.category_name) != -1 ? 'active':'' " v-for="(items,idx) in item.position_list" :key="idx" @click="click_position_list(items.category_name)">{{ items.category_name }}</li>
                </ul>
              </div>
              
            </div>
            
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <div class="slet-box">
            <span>当前选择:</span>
            <span class="span-item" v-for="(item,index) in position.selectCategoryList" :key="index">{{ item }}</span>
          </div>
          <div class="slet-btn-box">
            <el-button @click="clickClearOption">清空选项</el-button>
            <el-button type="primary" @click="clickPositionOK">确  定</el-button>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import pcas from '../../../assets/json/pc-code.json'
export default {
   components: {

  },
  data(){
    return {
      dialogVisible: false,
      cityData: pcas, // 城市信息
      showCityList:[
        {label:'北京',code:'010'},
        {label:'上海',code:'020'},
        {label:'天津',code:'030'},
        {label:'重庆',code:'040'},
        {label:'广州',code:'050020'},
        {label:'深圳',code:'050090'},
        {label:'苏州',code:'060080'},
        {label:'南京',code:'060020'},
        {label:'杭州',code:'070020'},
        {label:'大连',code:'210040'},
        {label:'成都',code:'280020'},
        {label:'武汉',code:'170020'},
        {label:'西安',code:'270020'},
      ],
      selectCityList: [], // 选中的城市
      selt_province_item: 0,  // 选中的省下标
      selt_listItems: -1,
      city_list:[], // 城市列表
      city: '全国',
      work_times_type: 1, //传参- 工作时长类型 1.正常 2.实习生 3.应届生
      work_year: '', // 传参- 工作时长
      salary: '', // 传参- 薪资范围
      pay:'', // 展示用- 薪资
      exp:'', // 展示用- 工作年限
      education_background:'', // 教育经历
      school:'', // 学校
      desired_industry: [], // 当前行业
      sex:'', // 性别
      is_national_unified:'', // 是否统招
      age:{ // 年龄
        age_status:'',
        age_end: '',
      },
      is_age:false,
      industryList: [], // 行业列表
      desired_position:'',// 选中的职业
      position:{  // 职位信息
        positionList: [], //职位列表
        category_list: [], // 当前职位列表下职位信息
        selt_item: 0, // 左侧选中的职位下标
        selectCategoryList: [], // 右侧选择的数据
        dialogVisible: false
      },
      areaList:[],
    }
  },
  created(){
    console.log(pcas)
     this.city_list = this.cityData[this.selt_province_item].children;
    // 获取行业列表信息
    this.getIndustryList();
    // 获取职位列表信息
    this.getPositionList();
  },
  methods:{
    // 点击选择的城市删除
    clickselectCityList(v){
      let selectCityList = this.selectCityList;
      selectCityList.splice(v,1);
      this.selectCityList = selectCityList;
      this.city = this.selectCityList.join(',')
      this.getfilterInfo();
    },
    // 点击删除职位
    clickCategoryList(v){
      let selectCategoryList = this.position.selectCategoryList;
      selectCategoryList.splice(v,1);
      this.position.selectCategoryList = selectCategoryList;
      this.desired_position = this.position.selectCategoryList.join(',');
      this.getfilterInfo();
    },
    // 点击删除行业
    clickDesiredList(v){
      let desired_industry = this.desired_industry;
      desired_industry.splice(v,1);
      this.desired_industry = desired_industry;
      this.getfilterInfo();
    },
    // 点击已选项 删除
    clickAnticon(v){
      if(v == -1){
        this.city = '';
        this.getfilterInfo();
      }else{
        if(v =='pay'){
          this.salary = '';
        }
        if(v =='exp'){
          this.work_times_type = 1;
          this.work_times = '';
        }
        this[v].value = '';
        this.getfilterInfo();
      }
      
    },
    age_status_input(e){
      this.is_age = true;
    },
    age_end_input(e){
      this.is_age = true;
    },
    age_btn(){
      this.getfilterInfo();
      this.is_age = false;
    },
     // 获取行业列表信息
     getIndustryList(){
      let that = this;
      that.$axios.post('/api/industry/list',{}).then( res =>{
        that.industryList = res.data;
      }).catch( e=>{
        console.log(e)
      })
    },
    // 获取职位列表信息
    getPositionList(){
      let that = this;
      that.$axios.post('/api/position/list',{}).then( res =>{
        that.position.positionList = res.data;
        that.position.category_list = that.position.positionList[that.position.selt_item].category_list;
      }).catch( e=>{
        console.log(e)
      })
    },
    // 点击职业列表左侧项
    click_positionListLi(n,i){
      console.log(n)
      let item = n;
      let index = i;
      this.position.selt_item = index;
      this.position.category_list = item.category_list;
    },
    // 点击选择职位关闭
    clickInvolved(){
      this.position.dialogVisible = true;
    },
    // 点击右侧具体职位列表
    click_position_list(n){
      let selectCategoryList = this.position.selectCategoryList;
      let desired_position = n;
      if( selectCategoryList.length >=3 ){
        this.$message.error('最多可选择3个职位！');
        return
      }
      selectCategoryList.push(desired_position);
      this.position.selectCategoryList = selectCategoryList;
      this.desired_position = this.position.selectCategoryList.join(',');
    },
    // 清空职业弹窗选项
    clickClearOption(){
      this.desired_position = '';// 选中的职业
      this.position.selectCategoryList = [];
      this.getfilterInfo();
    },
    // 点击职业弹窗确定按钮
    clickPositionOK(){
      this.position.dialogVisible = false;
      this.getfilterInfo();
    },
    // 清空城市弹窗选项
    clickClearCityOption(){
      this.city= '全国';
      this.selectCityList = [];
      this.getfilterInfo();
    },
    // 点击城市弹窗确定按钮
    clickCityOK(){
      this.dialogVisible = false;
      this.getfilterInfo();
    },
    // 点击城市其他
    clickCityOther(){
      this.dialogVisible = true;
    },
    // 点击左侧项
    click_industryListLi(ele,index){
      this.city_list = ele.children;
      this.selt_province_item = index;
    },
    // 点击城市弹窗 城市
    click_city_list(item,index){
      let selectCityList = this.selectCityList;
      if( selectCityList.length >=5 ){
        this.$message.error('最多可选择五个城市！');
        return
      }
      this.selt_cityName = item.label;
      this.selt_listItems = index;
      if(selectCityList.indexOf('全国') != -1 ){
        selectCityList = []
        // this.infoData.city = '';
        selectCityList.push(item.label)
      }else{
        if( selectCityList.indexOf(item.label) == -1){
          selectCityList.push(item.label)
        }
       
      }
      this.selectCityList = selectCityList;
      this.city = selectCityList.join(',')
      // let showCityList = this.showCityList;
      // showCityList.forEach( ele =>{
      //   if(ele.code == item.code){
      //     this.showCityList[4] = item;
      //   }
      // })
    },
    clickClose(){
      this.dialogVisible = false;
    },
    // 关闭职业弹窗
    clickPositionClose(){
      this.position.dialogVisible = false;
    },
    clickCity(n){
      let selectCityList = this.selectCityList;
      if(n == '全国'){
        selectCityList = [];
        this.city = n;
      }else{
        if( selectCityList.length >=5 ){
          this.$message.error('最多可选择五个城市！');
          return
        }
        if( selectCityList.indexOf(n) == -1){
          selectCityList.push(n)
        }
        this.city = selectCityList.join(',')
      }
      this.selectCityList = selectCityList;
      this.getfilterInfo();
      
    },
    // 薪资
    clickPay(n,value){
      this.pay = n;
      this.salary = value;
      this.getfilterInfo();
    },
    // 教育经历
    clickeducation(n){
      this.education_background = n;
      this.getfilterInfo();
    },
    clickschool(n){
      if(n){
        this.school = Number(n);
      }else{
        this.school = '';
      }
      this.getfilterInfo();
    },
    // 工作年限
    clickexp(n,value){
      if(value == 2 || value == 3){
        this.work_times_type = value;
        this.work_year = '';
      }else{
        this.work_times_type = 1;
        this.work_year = value;
      }
      this.exp = n;
      this.getfilterInfo();
     
    },
    // 当前行业
    desired_industry_change(){
      this.getfilterInfo();
    },
    // 性别
    sex_change(){
      this.getfilterInfo();
    },
    is_national_unified_change(){
      this.getfilterInfo();
    },
     // 点击清空筛选条件
     clickALLAnticon(){
      this.selectCityList = [],
      this.city= '全国';
      this.work_times_type= 1;
      this.work_year='';
      this.salary=''; // 薪资范围
      this.pay = '';
      this.exp='';
      this.sex=''; // 性别
      this.is_national_unified='',
      this.education_background='';// 学历
      this.desired_industry = []; // 当前行业
      this.school='';
      this.desired_position= '',// 选中的职业
      this.position.selt_item = 0; // 左侧选中的职位下标
      this.position.selectCategoryList = []; // 右侧选择的数据
    
      this.age= { // 年龄
        age_status:'',
        age_end: '',
      },
      this.getfilterInfo();
    },
    getfilterInfo(){
      let age_status =  this.age.age_status?this.age.age_status:0;
      let age_end =  this.age.age_end?this.age.age_end:0;
      let info = {
        live_city: this.city == '全国'?'':this.city, // 城市
        salary: this.salary,
        work_year: this.work_year, // 工作年限
        // work_times_type: this.work_times_type,
        education_background: this.education_background, // 学历
        school_type: this.school,
        sex: this.sex,
        is_national_unified: this.is_national_unified,
        age: age_status + '-' + age_end,
        desired_industry: this.desired_industry.join(','), // 行业
        desired_position: this.position.selectCategoryList.join(','), // 职位
      };
      console.log(info)
      this.$emit('getfilterInfo',JSON.stringify(info))
    },
  }
}
</script>
<style lang="scss" scoped>
  .filter-options-container{
    background: #fff;
    box-shadow: 0 1px 8px 0 rgba(234,232,232,.06);
    border-radius: 6px;
    padding: 0 30px;
    .filter-options-row-section{
      position: relative;
    }
    .selected-clear {
      position: absolute;
      top: 0;
      right: 0;
      flex-shrink: 0;
      font-size: 14px;
      line-height: 25px;
      color: #666;
      cursor: pointer;
      &>span{
        padding-left: 6px;
      }
    }
    .selected-clear:hover{
      color: $g_color;
    }
    .options-row {
      display: flex;
      align-items: center;
      padding-bottom: 12px;
      margin-bottom: 12px;
      line-height: 20px;
      border-bottom: 1px solid #f0f3f7;

      .options-row-1{
        margin-left: 20px;
        display: flex;
        align-items: center;
        .item-content {
          position: relative;
          line-height: 32px;
          display: flex;
          
          /deep/ .el-select{
            width: 260px;
            .el-input.is-focus .el-input__inner{
              border-color: $g_color;
            }
          }
          /deep/ .el-input{
            width: 260px;
          }
          /deep/ .el-input__inner{
            height: 30px;
            line-height: 30px;
            cursor: pointer;
          }
          /deep/ .el-cascader{
            width: 100%;
          }
          img{
            width: 18px;
            height: 16px;
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 2;
          }
          .span-line{
            margin: 0 10px;
            font-size: 14px;
          }
        }
      }
      .options-age-box{
        display: flex;
        align-items: center;
        &>span{
          padding: 0 10px;
          color: #666;
        }
        /deep/ .el-input{
          width: 100px;
        }
        /deep/.el-input__inner{
          padding: 0;
          padding-left: 10px;
        }
        /deep/ .el-input.is-active .el-input__inner, /deep/.el-input__inner:focus{
          border-color: $g_color;
        }
        /deep/ .el-button{
          padding: 0 20px;
          margin-left: 10px;
          height: 30px;
          background:  $g_bg;
        }
        /deep/ .el-button--primary:focus, /deep/ .el-button--primary:hover{
          background:  $g_bg;
          border-color: $g_color;
        }
      }
      .row-title {
        flex-shrink: 0;
        width: 84px;
        font-size: 14px;
        font-weight: 700;
        color: #000;
      }
      .row-options-detail-box {
        display: flex;
        flex-wrap: wrap;
        .options-item {
          padding-right: 20px;
          line-height: 20px;
          font-size: 14px;
          color: #666;
          cursor: pointer;
        }
        .options-item.selected,.options-item:hover {
          font-weight: 700;
          color: $g_color;
        }
      }
      /deep/ .el-select{
        width: 260px;
      }
    }
    .selected-options-box {
      display: flex;
      position: relative;
    }
    .filter-options-selector-section .options-row {
      margin-bottom: 0;
      padding-bottom: 0;
      border: none;
    }
  }
  .filter-options-container dl, .filter-options-container ol, .filter-options-container p, .filter-options-container ul {
    margin: 0;
  }
  .search-job-custom-salary-box.jsx-1824882820 .salary-name.jsx-1824882820 {
    padding-right: 8px;
    color: rgb(102, 102, 102);
    cursor: pointer;
  }
  .search-job-custom-salary-box.jsx-1824882820 span.jsx-1824882820 {
    flex-shrink: 0;
  }
  .search-job-custom-salary-box.jsx-1824882820 .salary-name.on.jsx-1824882820 {
    font-weight: bold;
    color: $g_color;
  }
  .search-job-custom-salary-box.jsx-1824882820 .salary-name.jsx-1824882820:hover {
    color: $g_color;
  }
  .filter-options-container .options-row .row-options-detail-box {
    display: flex;
    flex-wrap: wrap;
  }
  .filter-option-selector-bar-container.jsx-2644757290 {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
  }
  /deep/ .el-input__inner{
    height: 30px;
    line-height: 30px;
    
  }
  /deep/ .el-input__icon{
    height: 30px;
    line-height: 30px;
  }
  /deep/ .el-range-editor.is-active, /deep/ .el-range-editor.is-active:hover,/deep/ .el-select .el-input__inner:focus,/deep/ .el-select .el-input.is-focus .el-input__inner{
    border-color: $g_color;
  }
  .filter-options-container .selected-options-box .selected-options-title {
    flex-shrink: 0;
    padding-right: 4px;
    font-size: 12px;
    line-height: 25px;
    color: #07132b;
  } 
  .selected-options-box .selected-options-list-box {
    flex: 1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .selected-options-box .selected-options-list-box .selected-item {
    display: flex;
    align-items: center;
    margin: 0 12px 10px 0;
    padding: 0 6px;
    line-height: 25px;
    border-radius: 6px;
    background: $g_color;
    color: #fff;
  }
  .selected-options-box .selected-options-list-box .selected-item span {
    font-size: 12px;
  }
  .selected-options-box .selected-options-list-box .selected-item i{
    font-size: 13px;
    color: #fff;
    margin-left: 10px;
    cursor: pointer;
  }
  .anticon {
    cursor: pointer;
  }




  /* 弹窗 */
  .dialogVisible-pop-box{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
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
        height: calc(50vh);
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
              li:hover,li.active{
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
                font-size: 15px;
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
                  text-align: center;
                  line-height: 32px;
                  background: #F7F8FA;
                  border-radius: 4px 4px 4px 4px;
                  font-size: 14px;
                  color: $g_textColor;
                  margin-top: 6px;
                  margin-right: 6px;
                  padding: 0 12px;
                  cursor: pointer;
                  &.active,&:hover{
                    background: $g_color;
                    color: #fff;
                  }
                }
                
              }
            }
          }
        }
      }
      .dialog-footer{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding: 10px 30px;
        border-top: 1px solid #f5f6f9;
        &>div{
          display: flex;
          align-items: center;
        }
        .slet-box{
          padding-left: 120px;
          &>span{
            display: inline-block;
            padding: 6px 12px;
          }
          .span-item{
            background: #F7F8FA;
            border-radius:4px;
            font-size: 14px;
            color: $g_textColor;
            margin-right: 8px;
          }
        }
        .slet-btn-box{
          /deep/ .el-button--primary,/deep/ .el-button--primary:focus, /deep/ .el-button--primary:hover{
            background:  $g_bg;
            border-color: $g_color;
          }
        }
      }

    }
  }

</style>