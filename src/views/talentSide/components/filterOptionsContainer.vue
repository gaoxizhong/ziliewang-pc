<template>
  <div class="filter-options-container">
    <div class="filter-options-row-section">
      <div class="options-row">
        <div class="row-title">城市</div>
        <ul class="row-options-detail-box">
          <li class="options-item" :class="city == '全国'? 'selected':''" data-code="410" data-name="全国" @click="clickCity('全国')">全国</li>
          <li class="options-item" :class="selectCityList.indexOf(item.label) != -1? 'selected':''" :data-code="item.code" :data-name="item.label" @click="clickCity(item.label)" v-for="(item,index) in showCityList" :key="index">{{ item.label }}</li>
          <li class="options-item" id="filter-option-other-city"><span @click="clickCityOther">其他</span><div class="antd-lp-city"></div></li>
        </ul>
      </div>
      <!-- <div class="options-row">
        <div class="row-title">区域</div>
        <ul class="row-options-detail-box">
          <li class="options-item" v-for="(item,index) in areaList" :key="index">和平区</li>
        </ul>
      </div> -->
      <div class="options-row">
        <div class="row-title">薪资</div>
        <ul class="row-options-detail-box">
          <li class="options-item" :class="infoData.pay == '3K以下'? 'selected':''" @click="clickPay('3K以下')">3K以下</li>
          <li class="options-item" :class="infoData.pay == '5K-10k'? 'selected':''" @click="clickPay('5K-10k')">5K-10k</li>
          <li class="options-item" :class="infoData.pay == '10K-20k'? 'selected':''" @click="clickPay('10K-20k')">10K-20k</li>
          <li class="options-item" :class="infoData.pay == '20K-40k'? 'selected':''" @click="clickPay('20K-40k')">20K-40k</li>
          <li class="options-item" :class="infoData.pay == '40K-60k'? 'selected':''" @click="clickPay('40K-60k')">40K-60k</li>
          <li class="options-item" :class="infoData.pay == '60k以上'? 'selected':''" @click="clickPay('60k以上')">60k以上</li>
          <!-- <div class="jsx-1824882820 search-job-custom-salary-box">
            <span class="jsx-1824882820 salary-name">自定义</span>
          </div> -->
        </ul>
      </div>
      <div class="options-row">
        <div class="row-title">发布时间</div>
        <ul class="row-options-detail-box">
          <li class="options-item" :class="infoData.release_time == ''? 'selected':''" @click="clickrelease_time('')">不限</li>
          <li class="options-item" :class="infoData.release_time == '一天以内'? 'selected':''" @click="clickrelease_time('一天以内')">一天以内</li>
          <li class="options-item" :class="infoData.release_time == '三天以内'? 'selected':''" @click="clickrelease_time('三天以内')">三天以内</li>
          <li class="options-item" :class="infoData.release_time == '一周以内'? 'selected':''" @click="clickrelease_time('一周以内')">一周以内</li>
          <li class="options-item" :class="infoData.release_time == '一个月以内'? 'selected':''" @click="clickrelease_time('一个月以内')">一个月以内</li>
        </ul>
      </div>
      <div class="options-row">
        <div class="row-title">经验</div>
        <ul class="row-options-detail-box">
          <li class="options-item" :class="infoData.exp == '应届生'? 'selected':''" @click="clickexp('应届生')">应届生</li>
          <li class="options-item" :class="infoData.exp == '实习生'? 'selected':''" @click="clickexp('实习生')">实习生</li>
          <li class="options-item" :class="infoData.exp == '1年以内'? 'selected':''" @click="clickexp('1年以内')">1年以内</li>
          <li class="options-item" :class="infoData.exp == '1-3年'? 'selected':''" @click="clickexp('1-3年')">1-3年</li>
          <li class="options-item" :class="infoData.exp == '3-5年'? 'selected':''" @click="clickexp('3-5年')">3-5年</li>
          <li class="options-item" :class="infoData.exp == '5-10年'? 'selected':''" @click="clickexp('5-10年')">5-10年</li>
          <li class="options-item" :class="infoData.exp == '10年以上'? 'selected':''" @click="clickexp('10年以上')">10年以上</li>
        </ul>
      </div>
    </div>
    <div class="filter-options-selector-section">
      <div class="options-row">
        <div class="row-title">更多</div>
        <div class="row-options-detail-box">
          <div id="filter-options-selector-bar">
            <div class="jsx-2644757290 filter-option-selector-bar-container">
              <div class="jsx-2644757290 select-box">
                <el-select v-model="infoData.educational" placeholder="学历">
                  <el-option
                    v-for="item in educationalList"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </div>
              <div class="jsx-2644757290 select-box">
                <el-select v-model="infoData.enterprise_scale" placeholder="企业规模">
                  <el-option
                    v-for="item in enterprise_scaleList"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </div>
              <div class="jsx-2644757290 select-box">
                <el-select v-model="infoData.financing_stage" placeholder="融资阶段">
                  <el-option
                    v-for="item in efinancing_stageList"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </div>
              <div class="jsx-2644757290 select-box">
                <el-select v-model="infoData.firm_nature" placeholder="企业性质">
                  <el-option
                    v-for="item in firm_natureList"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="selected-options-box" v-if=" selectCityList.length>0 || city == '全国' || infoData.pay || infoData.release_time || infoData.exp || infoData.educational || infoData.enterprise_scale || infoData.financing_stage || infoData.firm_nature">
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
        <block v-for="(value,index) in infoData" :key="index">
          <li class="selected-item" v-if="value">
            <span class="anticon anticon-close">{{ value }}</span>
            <i class="el-icon-close" @click="clickAnticon(index)"></i>
          </li>
        </block>
      </ul>
      <div class="selected-clear" ref="search-jobs-clear-options" id="search-jobs-clear-options" @click="clickALLAnticon">清空筛选条件</div>
    </div>

    <!-- 选择城市弹窗 -->
    <div class="dialogVisible-pop-box" v-if="dialogVisible && position.length >=0 ">
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
                <li :class="selt_item == index? 'active':'' " v-for="(item,index) in position" :key="index" @click="click_industryListLi(item,index)">{{ item.label }}</li>
              </ul>
            </div>
          </div>
          <div class="body-right-box">
            <div class="right-list-box">
              <div class="category-list-items">
                <ul>
                  <li :class="selectCityList.indexOf(items.label) != -1 ? 'active':'' " v-for="(items,idx) in position_list" :key="idx" @click="click_position_list(items,idx)">{{ items.label }}</li>
                </ul>
              </div>
              
            </div>
            
          </div>
        </div>
        
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
      position: pcas,
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
      selt_item: -1,
      selt_listItems: -1,
      position_list:[],
      city: '全国',
      infoData:{
        pay:'',
        release_time:'',
        exp:'',
        educational:'', // 学历
        enterprise_scale:'', // 企业规模
        financing_stage:'', // 融资阶段
        firm_nature:'', // 企业性质
      },
      areaList:[],
      educationalList:['博士','MBA/EMBA','硕士','本科','大专','中专/中技','高中','初中及以下'],
      enterprise_scaleList:['1-49人','50-99人','100-499人','500-999人','1000-2000人','2000-5000人','5000-10000人','10000人以上',],
      efinancing_stageList: ['天使轮','A轮','B轮','C轮','D轮及以上','已上市','战略融资','融资未公开','其他'], // 融资阶段
      firm_natureList: ['外商独资','中外合资','私营民企','国有企业','国内上市公司','政府机关/非盈利机构','事业单位','其他'],
    }
  },
  created(){
    console.log(pcas)
    //  this.position_list = this.position[this.selt_item].children;
  },
  methods:{
    // 点击城市其他
    clickCityOther(){
      this.dialogVisible = true;
    },
    // 点击左侧省项
    click_industryListLi(ele,index){
      let position = this.position;
      this.position_list = ele.children;
      this.selt_item = index;
    },
    // 点击城市
    click_position_list(item,index){
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
        selectCityList.push(n)
      }else{
        if( selectCityList.indexOf(n) == -1){
          selectCityList.push(n)
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
      
      
    },
    clickPay(n){
      this.infoData.pay = n;
    },
    clickrelease_time(n){
      this.infoData.release_time = n;
    },
    clickexp(n){
      this.infoData.exp = n;
    },
    // 点击已选项 删除
    clickAnticon(v){
      if(v == -1){
        this.city = '';
      }else{
        let infoData = this.infoData;
        infoData[v] = '';
        this.infoData = infoData;
      }
      
    },
    // 点击选择的城市删除
    clickselectCityList(v){
      let selectCityList = this.selectCityList;
      selectCityList.splice(v,1);
      this.selectCityList = selectCityList;
    },
    // 点击清空筛选条件
    clickALLAnticon(){
      this.selectCityList = [],
      this.city= '全国';
      this.infoData = {
        pay:'',
        release_time:'',
        exp:'',
        educational:'', // 学历
        enterprise_scale:'', // 企业规模
        financing_stage:'', // 融资阶段
        firm_nature:'', // 企业性质
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .filter-options-container{
    padding: 16px;
    background: #fff;
    box-shadow: 0 1px 8px 0 rgba(234,232,232,.06);
    border-radius: 6px;
    .options-row {
      display: flex;
      padding-bottom: 12px;
      margin-bottom: 12px;
      line-height: 20px;
      border-bottom: 1px solid #f0f3f7;
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
          color: #FF4D4F;
        }
      }
    }
    .selected-options-box {
      padding-top: 20px;
      display: flex;
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
    color: #FF4D4F;
  }
  .search-job-custom-salary-box.jsx-1824882820 .salary-name.jsx-1824882820:hover {
    color: #FF4D4F;
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
  .filter-option-selector-bar-container.jsx-2644757290 .select-box.jsx-2644757290 {
    padding-right: 10px;
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
  .selected-options-box .selected-clear {
    flex-shrink: 0;
    padding-right: 16px;
    font-size: 12px;
    line-height: 25px;
    color: #666;
    cursor: pointer;
  }
  .selected-options-box .selected-options-list-box .selected-item {
    display: flex;
    align-items: center;
    margin: 0 12px 0 0;
    padding: 0 6px;
    line-height: 25px;
    border-radius: 6px;
    background: #FF4D4F;
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
                    background: #FF4D4F;
                    color: #fff;
                  }
                }
                
              }
            }
          }
        }
      }

    }
  }
</style>