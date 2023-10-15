<template>
  <div class="bossSide-container">
    <div class="bossSide-box">
      <!-- 左侧 开始 -->
      <div class="bossSide-left-box">
        <!-- 搜索框模块 开始 -->
        <div class="search-box">
          <el-input placeholder="输入关键词，2.6亿人才库任你聊!" v-model="input_name" class="input-with-select" @keydown.enter.native="searchEnterFun($event)">
            <el-button slot="append" @click="getExistLabels">搜索</el-button>
          </el-input>
        </div>
        <!-- 搜索框模块 结束 -->
        <!-- 我的人才、我的职位 开始 -->
        <div class="my-TalentPosition-box margin-top-20">
          <div class="m-box my-talent-box">
            <div class="title-box">
              <div class="left">
                <img src="../../../assets/image/bossSide/user-business.png" alt="" />
                <span>我的人才</span>
              </div>
            </div>
            <div class="data-box">
              <div>
                <div class="data-t">新招呼人才</div>
                <div class="data-n">10</div>
              </div>
              <div>
                <div class="data-t">收藏的人才</div>
                <div class="data-n">32</div>
              </div>
            </div>
          </div>
          <div class="m-box my-position-box">
            <div class="title-box">
              <div class="left">
                <img src="../../../assets/image/bossSide/handbag.png" alt="" />
                <span>我的职位</span>
              </div>
              <div class="right" @click="goToPostJob">
                <img src="../../../assets/image/bossSide/edit.png" alt="" />
                <span>发布职位</span>
              </div>
            </div>
            <div class="data-box">
              <div>
                <div class="data-t">在线职位</div>
                <div class="data-n">26</div>
              </div>
              <div>
                <div class="data-t">7天内即将下线</div>
                <div class="data-n">236</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 我的人才、我的职位 结束 -->

        <!-- 我的面试 开始 -->
        <div class="my-interview-box m-box margin-top-20">
          <div class="title-box">
            <div class="left">
              <img src="../../../assets/image/bossSide/schedule.png" alt="" />
              <span>我的人才</span>
            </div>
          </div>
          
        </div>
        <!-- 我的面试 结束 -->
      </div>
      <!-- 左侧 结束 -->
      <!-- 右侧 开始 -->
      <div class="bossSide-right-box">

        <!-- 我的资产 开始 -->
        <div class="m-box">
          <div class="title-box">
            <div class="left">
              <img src="../../../assets/image/bossSide/wallet-three.png" alt="" />
              <span>我的资产</span>
            </div>
            <div class="right zc-box">
              <span>更多</span>
              <img src="../../../assets/image/bossSide/right.png" alt="">
            </div>
          </div>
          <div class="my-goldCoin-box">
            <div class="goldCoin-title">猎米</div>
            <div class="goldCoin-num-btn-box">
              <span>236</span>
              <button class="goldCoin-btn">购买</button>
            </div>
          </div>
        </div>
        <!-- 我的资产 结束 -->
        <!-- 我的权益 开始 -->
        <div class="m-box margin-top-20">
          <div class="title-box">
            <div class="left">
              <img src="../../../assets/image/bossSide/crown.png" alt="" />
              <span>我的权益</span>
            </div>
          </div>
          <div class="data-box">
            <div>
              <div class="data-t">剩余在线职位数</div>
              <div class="data-n">236</div>
            </div>
            <div>
              <div class="data-t">今日剩余聊天次数</div>
              <div class="data-n">632</div>
            </div>
          </div>
        </div>
        <!-- 我的权益 结束 -->
        
      </div>
      <!-- 右侧 结束 -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data(){
    return{
      role: localStorage.getItem('role'),
      input_name:'', // 搜索框value
      tag: '',
      infoData: {
        infoList: [{},{}], // 列表
      }
    }
  },
  computed: {
    
  },
  methods: {
    // 点击发布职位
    goToPostJob(){
      let that = this;
      that.$axios.post('/api/user/profile',{}).then(res =>{
        if(res.code == 0){
          if(res.data.basic_info.role == 1){
            that.$message.error({
              message: "请先去注册企业信息后在发布职位！"
            })
            setTimeout( ()=>{
              that.$router.push('/enterpriseInfoRequest')
            },1500)
          }else{
            that.$router.push({ path:'/postJob' })
          }
        }
      }).catch(e =>{
        console.log(e)
      })
  
    },
    searchEnterFun(e){
      console.log(e)
    },
    // input 框搜索按钮
    getExistLabels(){

    },
  },
}
</script>

<style lang="scss" scoped>
  .search-box{
    width: 100%;
    cursor: pointer;
    /deep/ .input-with-select {
      width: 100%;
      display: flex;
      align-items: center;
      height: 48px;
      line-height: 48px;
      background: $g_bg;
      border-radius: 6px;
      overflow: hidden;
    }
    /deep/ .el-input-group--append .el-input__inner {
      flex: 1;
      border: 3px solid $g_bg;
      height: 100%;
      line-height: 48px;
      border-radius: 6px;
    }
    /deep/ .el-input-group__append{
      width: 100px;
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
        margin: 0;
      }
    }
    
  }
  .my-TalentPosition-box{
    width: 100%;
    display: flex;
    font-size: 14px;
    .my-talent-box{
      margin-right: 0.4rem;
      padding: 1rem;
    }
    .my-position-box{
      margin-left: 0.4rem;
      padding: 1rem;
    }
  }
  .my-interview-box{
    min-height: 16rem;
  }
  .title-box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between; 
    .left{
      display: flex;
      align-items: center;
      img{
        width: 1.1rem;
        height: 1.1rem;
        margin-top: -4px;
      }
      span{
        font-size: 0.9rem;
        font-weight: 500;
        color:$g_textColor;
        line-height: 26px;
        padding-left: 10px;
      }
    }  
    .right{
      display: flex;
      align-items: center;
      cursor: pointer;
      img{
        width: 12.5px;
        height: 12.5px;
        margin-top: -4px;
      }
      span{
        color: $g_color;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        padding-left: 6px;
      }
    }
    .zc-box{
      img {
        margin-top: -2px;
        margin-left: 4px;
      }
      span{
        color: #4E5969;
      }
    }
    
  }
  .data-box{
    width: 100%;
    margin-top: 1.5rem;
    display: flex;
    &>div{
      flex: 1;
      .data-t{
        font-size: 14px;
        font-weight: 400;
        color: #86909C;
        line-height: 1.1rem;
      }
      .data-n{
        font-size: 1.2rem;
        font-family: DIN Alternate-Bold, DIN Alternate;
        font-weight: bold;
        color: $g_textColor;
        line-height: 1.6rem;
        margin-top: 0.5rem;
      }
    }
  }
  .my-goldCoin-box{
    margin-top: 1.5rem;
    .goldCoin-title{
      font-size: 14px;
      font-weight: 400;
      color: #86909C;
      line-height: 22px;
    }
    .goldCoin-num-btn-box{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 1rem;
      span{
        font-size: 24px;
        font-family: DIN Alternate-Bold, DIN Alternate;
        font-weight: bold;
        color: $g_textColor;
        line-height: 32px;
      }
      .goldCoin-btn{
        background: $g_bg;
        box-shadow: 0px 2px 0px 0px rgba(0,0,0,0.04);
        border-radius: 2px;
        opacity: 1;
        border: none;
        padding: 6px 12px;
        color: #fff;
        font-size: 16px;
        border-radius: 4px;
      }
    }

  }
</style>
