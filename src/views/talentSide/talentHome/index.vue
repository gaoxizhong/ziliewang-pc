<template>
  <div class="container">
    <div class="job-search-box">
      <!-- 搜索框模块 开始 -->
      <div class="search-box">
        <el-input placeholder="搜索职位/公司/内容关键词" v-model="input_name" class="input-with-select" @keydown.enter.native="searchEnterFun($event)">
          <el-button slot="append" @click="getExistLabels">搜索</el-button>
        </el-input>
      </div>
      <div class="hotJob-box">
        <span class="hotJob-span">热门岗位</span>
        <div class="hotJob-item-box">
          <a href="javascript:0;" class="hotJob-item" v-for="(item,index) in hotJob_options" :key="index" @click="clickTagname(item)">{{item}}</a>
        </div>
      </div>
      <!-- 搜索框模块 j结束 -->
      <!-- 筛选模块 开始-->
      <div class="filter-box"></div>
      <!-- 筛选模块 开始-->
    </div>

    <div class="home-box">
      <!-- 左侧列表模块 开始 -->
      <div class="info-list-box">
        <jobList :data="infoData" :tag="tag"/>
      </div>
      <!-- 左侧列表模块 结束 -->
      <!-- 右侧 个人信息操作模块 开始 -->
      <div class="info-right-box">
        <personalInfo />
      </div>
      <!-- 右侧 个人信息操作模块 结束 -->
    </div>


  </div>

</template>

<script>
import jobList from '../components/jobList.vue'
import personalInfo from '../components/personalInfo.vue'
export default {
  name: 'talentHome',
  components: {
    jobList,
    personalInfo,
  },
  data(){
    return{
      input_name:'', // 搜索框value
      hotJob_options: ['UI设计师','项目经理/主管','工艺工程师','3D设计师','电话销售'],
      tag: '',
      infoData: {
        infoList: [{},{}], // 列表
      }
    }
  },
  computed: {
    
  },
  methods: {
    // input 框搜索按钮
    getExistLabels(){

    },
  },
};
</script>

<style lang="scss" scoped>
  .job-search-box{
    width: 100%;
    .search-box{
      width: 100%;
      cursor: pointer;
      /deep/ .input-with-select {
        width: 100%;
        display: flex;
        align-items: center;
        height: 50px;
        line-height: 50px;
        background: $g_bg;
        border-radius: 6px;
        overflow: hidden;
      }
      /deep/ .el-input-group--append .el-input__inner {
        flex: 1;
        border: 3px solid $g_bg;
        height: 100%;
        line-height: 50px;
        border-radius: 6px;
      }
      /deep/ .el-input-group__append{
        width: 140px;
        height: 100%;
        background: none;
        border: none;
        padding: 0;
        margin: 0;
        .el-button {
          width: 100%;
          height: 100%;
          background: $g_bg;
          color: #fff;
          border: 1px solid $g_bg;
          border-radius: 0;
          font-size: 16px;
        }
      }
     
    }
    .hotJob-box{
      width: 100%;
      display: flex;
      margin: 10px 0;
      .hotJob-span{
        width: auto;
        font-size: 14px;
        font-weight: bold;
        color: #1D2129;
        line-height: 22px;
      }
      .hotJob-item-box{
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        a{
          padding: 4px 20px;
          border-radius: 4px;
          background: #fff;
          text-align: center;
          font-size: 14px;
          color: $g_color;
          margin-left: 8px;
          margin-bottom: 10px;
        }
      }
    }
  }
  .home-box{
    width: 100%;
    display: flex;
    .info-list-box{
      flex: 1;
    }
    .info-right-box{
      width: 19rem;
      padding-left: 0.8rem;
    }
  }
</style>
