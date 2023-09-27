<template>
  <div class="bossSide-container">
    <!-- 企业主页---信息修改页 -->
    <div class="m-box page-box">
      <el-tabs :tab-position="tabPosition">
        <el-tab-pane label="企业基本信息">
          <div class="label-items-box">
            企业基本信息
          </div>
        </el-tab-pane>
        <el-tab-pane label="企业介绍">企业介绍</el-tab-pane>
        <el-tab-pane label="工作制度及福利">工作制度及福利</el-tab-pane>
        <el-tab-pane label="企业形象">企业形象</el-tab-pane>
        <el-tab-pane label="牛人团队">牛人团队</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      tabPosition: 'left', //标签一共有四个方向的设置 tabPosition="left|right|top|bottom"
      type:'',
    }
  },
  created(){
    this.type = this.$route.query.type;
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
  .page-box{
    height: calc(100vh - 90px);
    & /deep/ .el-tabs--left{
      height: 100%;
    }
    & /deep/ .el-tabs__item:hover, & /deep/ .el-tabs__item.is-active{
      color: $g_color;
    }
    & /deep/ .el-tabs__item{
      padding: 0 30px;
    }
    & /deep/ .el-tabs--left .el-tabs__item.is-left{
      font-size: 14px;
      font-weight: bold;
    }
  }
</style>