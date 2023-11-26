<template>
  <div class="filter-options-container">
    <div class="filter-options-row-section">
      <div class="options-row">
        <div class="row-title">城市</div>
        <ul class="row-options-detail-box">
          <li class="options-item" :class="infoData.city == ''? 'selected':''" data-key="dq" data-code="410" data-name="" @click="clickCity('')">全国</li>
          <li class="options-item" :class="infoData.city == '北京'? 'selected':''" data-key="dq" data-code="010" data-name="北京" @click="clickCity('北京')">北京</li>
          <li class="options-item" :class="infoData.city == '上海'? 'selected':''" data-key="dq" data-code="020" data-name="上海" @click="clickCity('上海')">上海</li>
          <li class="options-item" :class="infoData.city == '天津'? 'selected':''" data-key="dq" data-code="030" data-name="天津" @click="clickCity('天津')">天津</li>
          <li class="options-item" :class="infoData.city == '重庆'? 'selected':''" data-key="dq" data-code="040" data-name="重庆" @click="clickCity('重庆')">重庆</li>
          <li class="options-item" :class="infoData.city == '广州'? 'selected':''" data-key="dq" data-code="050020" data-name="广州" @click="clickCity('广州')">广州</li>
          <li class="options-item" :class="infoData.city == '深圳'? 'selected':''" data-key="dq" data-code="050090" data-name="深圳" @click="clickCity('深圳')">深圳</li>
          <li class="options-item" :class="infoData.city == '苏州'? 'selected':''" data-key="dq" data-code="060080" data-name="苏州" @click="clickCity('苏州')">苏州</li>
          <li class="options-item" :class="infoData.city == '南京'? 'selected':''" data-key="dq" data-code="060020" data-name="南京" @click="clickCity('南京')">南京</li>
          <li class="options-item" :class="infoData.city == '杭州'? 'selected':''" data-key="dq" data-code="070020" data-name="杭州" @click="clickCity('杭州')">杭州</li>
          <li class="options-item" :class="infoData.city == '大连'? 'selected':''" data-key="dq" data-code="210040" data-name="大连" @click="clickCity('大连')">大连</li>
          <li class="options-item" :class="infoData.city == '成都'? 'selected':''" data-key="dq" data-code="280020" data-name="成都" @click="clickCity('成都')">成都</li>
          <li class="options-item" :class="infoData.city == '武汉'? 'selected':''" data-key="dq" data-code="170020" data-name="武汉" @click="clickCity('武汉')">武汉</li>
          <li class="options-item" :class="infoData.city == '西安'? 'selected':''" data-key="dq" data-code="270020" data-name="西安" @click="clickCity('西安')">西安</li>
          <li class="options-item" id="filter-option-other-city"><span>其他</span><div class="antd-lp-city"></div></li>
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
    <div class="selected-options-box" v-if="infoData.city || infoData.pay || infoData.release_time || infoData.exp || infoData.educational || infoData.enterprise_scale || infoData.financing_stage || infoData.firm_nature">
      <div class="selected-options-title">已选条件：</div>
      <ul class="selected-options-list-box">
        <block v-for="(value,index) in infoData" :key="index">
          <li class="selected-item" v-if="value">
            <span class="anticon anticon-close">{{ value }}</span>
            <i class="el-icon-close" @click="clickAnticon(index)"></i>
          </li>
        </block>
      </ul>
      <div class="selected-clear" ref="search-jobs-clear-options" id="search-jobs-clear-options" @click="clickALLAnticon">清空筛选条件</div>
    </div>
  </div>
</template>
<script>
import pcas from '../../../assets/json/pc-code.json'
export default {
  data(){
    return {
      infoData:{
        city: '',
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
  },
  methods:{
    clickCity(n){
      this.infoData.city = n;
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
      let infoData = this.infoData;
      infoData[v] = '';
      this.infoData = infoData;
    },
    // 点击清空筛选条件
    clickALLAnticon(){
      this.infoData = {
        city: '',
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
</style>