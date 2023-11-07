<template>
  <div class="container">
    <div class="job-search-box">
      <!-- 搜索框模块 开始 -->
      <div class="search-box">
        <el-input placeholder="搜索职位/公司/内容关键词" v-model="input_name" class="input-with-select" @keydown.enter.native="searchEnterFun($event)">
          <el-button slot="append" @click="getSearchinfo">搜索</el-button>
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
      <!-- <div class="filter-box margin-top-20 m-box">
        <div class="filter-item-box"></div>
        <div class="filter-item-box"></div>
        <div class="filter-item-box"></div>
        <div class="filter-item-box"></div>
        <div class="filter-item-box"></div>
        <div class="filter-item-box"></div>
      </div> -->
      <!-- 筛选模块 开始-->
    </div>

    <div class="home-box margin-top-20">
      <!-- 左侧列表模块 开始 -->
      <div class="info-list-box">
        <!-- 列表开始 -->
        <div class="list-items" v-for="(item,index) in infoList" :key="index">
          <div class="items-left-box" @click.stop="clickItems(item)">
            <p class="items-title">
              {{ item.position_name }} 
              <span class="items-title-span">{{ item.salary }}K 
                <span class="span-1">/月</span>
                <span style="padding-left:10px;" v-if="item.months != 12 && item.months">x {{ item.months }}薪</span>
              </span>
            </p>
            <div class="items-tag-box">
              <el-tag>{{ item.resume_demand }}</el-tag>
              <el-tag>{{ item.educational_experience }}</el-tag>
            </div>
            <div class="items-firm-info" v-if="item.company">
              <span class="firm-info-1">{{ item.company.company_name }}</span>
              <span class="firm-info-2">{{ item.company.corporate_finance }}{{ item.company.company_scale }}</span>
            </div>
          </div>
          <div class="items-right-box" style="flex-direction: column;justify-content: center;">
            <img src="../../../assets/image/img-user.jpg" alt="" class="items-boss-img" />
            <div class="items-boss-name">{{ item.publish_name }}</div>
            <div class="items-boss-g">人事</div>
          </div>
        </div>
        <!-- 列表结束 -->
        <!-- <jobList :data="infoData" :tag="tag"/> -->
            
        <!-- 分页控制 -->
        <mPagination :data="paginationData" @pageChangeEvent="pageHasChanged"></mPagination>
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
import personalInfo from '../components/personalInfo.vue';
import mPagination from '@/components/m-pagination';

export default {
  name: 'talentHome',
  components: {
    personalInfo,
    mPagination,
  },
  data(){
    return{
      input_name:'', // 搜索框value
      hotJob_options: ['UI设计师','项目经理/主管','工艺工程师','3D设计师','电话销售'],
      tag: '',
      infoList: [], // 列表
      // 分页数据
      paginationData: {
        total: 10,
        currentPage: 1,
        pageSize: 20,
      },
    }
  },
  created(){
    this.getSearchinfo();
  },
  computed: {
    
  },
  methods: {
    clickItems(i){
      this.$router.push({
        path:'/JobDetails',
        query:{
          id: i.id
        }
      })
    },
    // 分页事件
    pageHasChanged() {
      this.getSearchinfo();
    },
    // 搜索
    getSearchinfo(){
      let that = this;
      let p = {
        page: that.paginationData.currentPage,
        pagesize: that.paginationData.pageSize,
        search: that.input_name,
      }
      that.$axios.post('/api/talents/index',p).then( res =>{
        console.log(res)
        if(res.code == 0){
          that.infoList = res.data.list;
          that.paginationData.total = res.data.total;
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
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



  .filter-box{
    width: 100%;
    padding: 1rem;
    .filter-item-box{
      width: 100%;
      padding: 10px 0;
      border-bottom: 1px solid #F2F3F5;
    }
  }

  .list-items{
    margin-top: 16px;
    background: #fff;
    border-radius: 6px;
    padding: 16px;
    display: flex;
    cursor: pointer;
    .items-left-box{
      flex: 1;
      text-align: left;
      .items-title{
        font-size: 16px;
        font-weight: bold;
        color: #000000;
        line-height: 22px;
        .items-title-span{
          color: #FF4D4F;
          padding-left: 10px;
        }
        .span-1{
          font-size: 12px;
          color: #999;
          padding-left: 6px;
        }
      }
      .items-tag-box{
        margin-top: 6px;
        .el-tag{
          background-color: #F7F8FA;
          border-color: #F7F8FA;
          color: #1F2E4DFF;
          height: 22px;
          padding: 0 10px;
          line-height: 22px;
          font-size: 12px;
          border-radius: 2px;
          margin-left: 10px;
          &:nth-of-type(1){
            margin-left: 0;
          }
        }
      }
      .items-firm-info{
        margin-top: 20px;
        .firm-info-1{
          font-size: 14px;
          font-weight: 400;
          color: $g_textColor;
        }
        .firm-info-2{
          margin-left: 16px;
          font-size: 14px;
          font-weight: 400;
          color: #86909C;
        }
      }
    }
    .items-right-box{
      width: 160px;
      position: relative;
      display: flex;
      align-items: center;
      .right-c{
        width: 0;
        height: 100%;
        opacity: 0.5;
        border: 1px dashed;
        border-image: linear-gradient(180deg, rgba(255, 117, 26, 0), rgba(255, 100, 0, 1), rgba(255, 117, 26, 0)) 1 1;
      }
      .quan{
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #FF751A;
        position: absolute;
        left: -3px;
        top: 50%;
        transform: translateY(-50%);
      }
      .right-status-box{
        padding-left: 10px;
        .right-status-text{
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: bold;
          color: #FF751A;
          line-height: 22px;
          cursor: pointer;
          i{
            margin-left: 4px;
          }
        }
        .status-time{
          font-size: 12px;
          font-weight: 400;
          color: #86909C;
          line-height: 20px;
        }
      }
      .items-boss-img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .items-boss-name{
        font-size: 14px;
        font-weight: 400;
        color: #1D2129;
        line-height: 22px;
      }
      .items-boss-g{
        font-size: 12px;
        font-weight: 400;
        color: #86909C;
        line-height: 20px;
      }
      
    }

  }
  .list-items:nth-of-type(1){
    margin-top: 0 !important;
  }
</style>
