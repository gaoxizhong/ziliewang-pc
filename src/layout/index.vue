<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <app-main />
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from '../components/footer/index'
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    Footer
  },
  data(){
    return {
      unreadAmount: null,
      currentUser: null,
      avatar: '',
      name:''
    }
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  watch:{
    '$store.state.staffAvatar'(newVal){
        this.avatar = newVal;
        this.$forceUpdate();// 更新数据
    },
    '$store.state.staffName'(newVal){
        this.name = newVal;
        this.$forceUpdate();// 更新数据
    },
  },
  created(){
    this.currentUser = {
      id: localStorage.getItem('realUid'),
      name: this.$store.state.user.staffName,
      avatar: this.$store.state.user.staffAvatar
    }
    console.log(this.currentUser)
    if (this.goEasy.getConnectionStatus() === 'disconnected') {
      this.connectGoEasy();  //连接goeasy
    }
    this.listenConversationUpdate(); //监听会话列表变化
    this.loadConversations(); //加载会话列表
  },
   beforeDestroy() {
    this.goEasy.im.off(this.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, this.setUnreadNumber);
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    connectGoEasy() {
      this.goEasy.connect({
        id: this.currentUser.id,
        data: {name: this.currentUser.name, avatar: this.currentUser.avatar},
        onSuccess: function () { 
          console.log("G连接成功.") 
        },
        onFailed: function (error) {
          console.log("连接失败, code:" + error.code + ",error:" + error.content);
        },
        onProgress: function (attempts) { 
          console.log("连接或自动重连中", attempts);
        }
      });
      
    },
    listenConversationUpdate() {
      // 监听会话列表变化
      this.goEasy.im.on(this.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, this.setUnreadNumber);
    },
    //加载会话列表
    loadConversations() {
      this.goEasy.im.latestConversations({
        onSuccess: (result) => {
          let content = result.content;
          this.setUnreadNumber(content);
        },
        onFailed: (error) => {
          console.log('获取最新会话失败, code:' + error.code + 'content:' + error.content);
        },
      });
    },
    // 获取消息数量
    setUnreadNumber(content) {
      this.unreadAmount = content.unreadTotal;
    },
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
