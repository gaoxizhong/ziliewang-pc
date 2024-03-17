<template>
  <div class="block-sidebar" v-if="sidebar">
    <div class="block-sidebar-item iconfont">
      <button class="CB-kJkihA" @click="sidebarChatBtn">
        <img src="../../../assets/image/icon-chatMessage.png" alt="">
      </button>
    </div>
  </div>

</template>

<script>
export default {
  components: {
  },
  data(){
    return{
      sidebar: false,
      is_clickMinificationpngBtn: false
    }
  },
 
 
  mounted() {
    // 组件间通信
    this.$bus.$on('talentSide_clickSidebar', this.clickSidebar)
  },
  methods: {
    clickSidebar(params){
      // '接收到的参数:' params
      if(params.is_clickMinificationpngBtn){
        this.is_clickMinificationpngBtn = params.is_clickMinificationpngBtn;
      }
      if(params.type == 'clickChat'){
        // 点击的聊一聊
        this.sidebar = false;
      }else{
        this.sidebar = true;
      }
      
    },
    // 点击侧边栏 聊天按钮
    sidebarChatBtn(){
      this.sidebar = false;
      let is_clickMinificationpngBtn = this.is_clickMinificationpngBtn;
      this.$bus.$emit('talentSide_receiveParams', {is_clickMinificationpngBtn});
    }
    
    
  
  },
};
</script>

<style lang="scss" scoped>
.block-sidebar {
  position: fixed;
  right: 50px;
  bottom: 150px;
  width: 60px;
  z-index: 9999;
  .block-sidebar-item {
    font-size: 50px;
    color: rgba(204,204,204,.5);
    text-align: center;
    line-height: 50px;
    margin-bottom: 20px;
    cursor: pointer;
    display: block;
    transition: all 0.25s ease 0s;
    position: relative;
    .CB-kJkihA {
      border: none;
      display: inline-flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      position: relative;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      line-height: 1.2;
      overflow: unset;
      font-size: 14px;
      letter-spacing: 1px;
      transform: none;
      white-space: normal;
      overflow-wrap: break-word;
      color: #666;
      background-color: #fff;
      box-shadow: 0 0 8px 0 rgba(0,0,0,0.16);
      img{
        width: 24px;
        height: 22px;
      }
    }
  } 
}

</style>
