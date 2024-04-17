<template>
  <div class="mian-box">
    <!-- 头部 开始  -->
    <navbar />
    <!-- 头部 结束  -->
    <!-- 主题 开始 -->
    <div ref="keepAliveContainer" class="container-box">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive && isRouterAlive" :key="$route.fullPath"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive && isRouterAlive" :key="$route.fullPath"></router-view>
    </div>
    <!-- 主题 结束 -->
    <!-- 底部 开始  -->
    <Footer />
    <!-- 底部 结束  -->

    <!-- 聊天弹窗 开始-->
    <transition name="suck-in" mode="out-in">
      <VueDragResize :style="`z-index:${zInfex_0};`" dragHandle=".VueDragResize-title-box" :isActive="true" :parentLimitation="true" :parentW="parentW" :parentH="parentH" :w="width" :h="height" :x='left' :y='top' @resizing="resize" @dragging="resize" v-if="is_VueDragResize">
        <div class="VueDragResize-centent-box">
          <div class="VueDragResize-title-box">
            <div class="title">聊一聊</div>
            <div class="icon-box">
              <!-- <span class="gt-span" @click="clickMessage">跳至沟通</span> -->
              <!-- <img src="../../assets/image/icon-minificationpng.png" alt="缩小"  @click="clickMinificationpngBtn"> -->
              <img src="../../assets/image/icon-close.png" alt="关闭" @click="clickCloseBtn"/>
            </div>
          </div>
          <div class="Chat-box">
            <buddyChart :title_show="title_show" :infoData="infoData" :laiyuan="laiyuan" :width="width" :height="height - 50"  is_pop="is_pop" ref="chat" />
          </div>
        </div>
      </VueDragResize>
    </transition>

    <!-- 聊天弹窗 结束-->

    <!-- 侧边栏 -->
    <Sidebar />

    <!-- 聊天弹窗 结束-->
    <!-- <div  class="TUICallKit-box" v-if="show_TUICallKit">
      <TUICallKit 
        :allowedMinimized="true" 
        :allowedFullScreen="true"
        :beforeCalling="beforeCalling"
        :afterCalling="afterCalling"
        :onMinimized="onMinimized"
        :kickedOut="handleKickedOut"
        :statusChanged="handleStatusChanged"
      />
    </div> -->

    
  </div>
</template>
<script>
import Navbar from './components/Navbar';
import Footer from '../../components/footer';
import VueDragResize from 'vue-drag-resize';
import Sidebar from './components/sidebar';
import buddyChart from './components/mag/buddyChart.vue';
// import { TUICallKit, TUICallKitServer, TUICallType } from "@tencentcloud/call-uikit-vue2.6";
// import * as GenerateTestUserSig from "../../debug/GenerateTestUserSig-es";

  export default {
    provide(){ 
      // 父组件中通过provide来提供变量，在子组件中通过inject来注入。
      return {
        reloads: this.reloads
      }
    },
    name: 'Mian',
    components: {
      Navbar,
      Footer,
      VueDragResize,
      Sidebar,
      buddyChart,
      // TUICallKit
    },
    data(){
      return {
        isRouterAlive: true,
        width: 0,
        height: 0,
        parentH: 0,
        parentW: 0,
        top: 40,
        left: 500,
        zInfex_0: 99,
        is_VueDragResize: false,
        title_show: '',
        laiyuan:'',
        is_pop:'pop',
        infoData: {},
        show_TUICallKit: false,
        // 腾讯云 SDKAppID、userSig 的获取参考下面步骤
        // 主叫的 userID
        userID:'gzx1601',    
        // 被叫的 userID
        callUserID: 'qdy1602',
        SDKAppID: 1600032579,    // Replace with your SDKAppID
        SecretKey: '46c5cdb58daafc522d269cfffe9c3bd5b836ad57b648c5d08200d226b2e97b1a',  // Replace with your SecretKey
      }
    },
    watch: {
      $route() {
        this.setCurrentRoute();
      },
      '$store.state.realAvatar'(newVal){
        this.avatar = newVal;
        this.$forceUpdate();// 更新数据
      },
      '$store.state.name'(newVal){
          this.name = newVal;
          this.$forceUpdate();// 更新数据
      },
    },
    beforeCreate(){
      console.log('beforeCreate')
    },
    mounted(){
      // 组件间通信
      this.$bus.$on('talentSide_receiveParams', this.talentSide_receiveParams);
      // 腾讯云-- 点击电话
      // this.$bus.$on('user_clickAUDIOCallt', this.user_clickAUDIOCallt);
      // 腾讯云-- 点击视频
      // this.$bus.$on('user_clickVIDEOCall', this.user_clickVIDEOCall);
    },
    created(){
      let that = this;
      let getViewportSize = this.$getViewportSize();
      this.parentH = getViewportSize.height; // 组件范围
      this.parentW = getViewportSize.width; // 组件范围 
      this.width = 840; // 可拖动div 高度
      this.left = Number(getViewportSize.width)/2 - Number(this.width)/2;
      this.height = Number(getViewportSize.height - 60); // 可拖动div 高度
      this.currentUser = {
        id: localStorage.getItem('realUid'),
        name: this.$store.state.user.name,
        avatar: this.$store.state.user.realAvatar
      }
      //连接goeasy
      if (this.goEasy.getConnectionStatus() === 'disconnected') {
         this.connectGoEasy(); 
      }
    },
    beforeDestroy() {
      //断开连接
      this.goEasy.disconnect({
        onSuccess: function(){
            console.log("断开连接成功.")
        },
        onFailed: function(error){
            console.log("断开连接失败, code:"+error.code+ ",error:"+error.content);
        }
      });
    },
    methods:{
      //连接goeasy
       connectGoEasy() {
        this.goEasy.connect({
          id: this.currentUser.id,
          data: {name: this.currentUser.name, avatar: this.currentUser.avatar},
          onSuccess: function () { 
            console.log("连接成功.")
          },
          onFailed: function (error) { //连接失败
            console.log("连接失败, code:" + error.code + ",error:" + error.content);
          },
          onProgress: function (attempts) { //连接或自动重连中
            console.log("连接或自动重连中", attempts);
          }
        });
      },
     
      talentSide_receiveParams(params){
        console.log(params)
        // '接收到的参数:' params
        this.laiyuan = params.laiyuan?params.laiyuan:'';
        if(params.type){
          this.title_show = params.type //JobDetails 是详情页  navbarMag 是导航
        }
        if(params.is_clickMinificationpngBtn){  // 表示点击的 右侧浮动按钮
          this.is_clickMinificationpngBtn = false;
        }else{
          this.infoData = params.infoData;
          this.is_VueDragResize = false;
          this.$nextTick(function () {
            this.is_VueDragResize = true;
          });
        }
        // this.zInfex_0 = 99;
        // this.top = 56;
      },
      //监听到当前路由状态并激活当前菜单
      setCurrentRoute() {
        this.activeIndex = this.$route.path;    
      },
      
      reloads () {
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true;
        });
      },

       // 拖拽时可以确定元素位置
       resize(newRect) {
        this.width = newRect.width;
        this.height = newRect.height;
        this.top = newRect.top;
        this.left = newRect.left;
      },
      // 点击关闭
      clickCloseBtn(){
        this.is_VueDragResize = false;
      },
      // 点击缩小--按钮
      clickMinificationpngBtn(){
        this.zInfex_0 = -1;
        this.top = -800;
        this.$bus.$emit('talentSide_clickSidebar',{ is_clickMinificationpngBtn:true } );
      },
        // 点击消息
      clickMessage(){
      
      },

      // 腾讯云 初始化
      async Init() {
        console.log(e)
        try {
          const { userSig } = GenerateTestUserSig.genTestUserSig({
            userID: e.currentUser.id,
            SDKAppID: Number(this.SDKAppID),
            SecretKey: this.SecretKey,
          });
          await TUICallKitServer.init({
            SDKAppID: Number(this.SDKAppID),
            userID: e.currentUser.id,
            userSig,
            // tim: this.tim     // 如果工程中已有 tim 实例，需在此处传入
          });
          alert("[TUICallKit] Initialization succeeds.");
        } catch (error) {
          alert(`[TUICallKit] Initialization failed. Reason: ${error}`);
        }
      },
      // 视频
      async user_clickVIDEOCall(e) {
        try {
          // 1v1 video call
          await TUICallKitServer.call({ userID: e.to.id, type: TUICallType.VIDEO_CALL });
        } catch (error) {
          alert(`[TUICallKit] Call failed. Reason: ${error}`);
        }
      },
    },

  }
</script>
<style lang="scss" scoped>
  .mian-box{
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }
  .container-box{
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    min-height: 100%;
    flex: 1;
    padding-bottom: 10px;
    .container{
      width: 1200px;
      margin: 1.2rem auto 0;
    }
  }
  // 聊天弹窗 样式=============== ↓ ===========

  .mian-box /deep/ .vdr{
    z-index: 9997 !important;
    position: fixed;
    border-radius: 4px;
    box-shadow:0 0 16px 0 rgba(139,152,169,1);
  }
  .mian-box /deep/ .vdr.active:before{
    transform: scale(0.5);
  }
  .mian-box /deep/ .vdr-stick{
    display: none;
  }
  .mian-box /deep/ .vdr-stick-br, .vdr-stick-tl{
    display: block;
    width: 14px !important;
    height: 14px !important;
    background-image: url("data:image/png;base64,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") !important;
    background-size: 100% 100% !important;
    right: 2px !important;
    bottom: 2px !important;
    border: none !important;
  }
  .VueDragResize-centent-box{
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 10px 0;
    padding-top: 0;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    .vdr-icon{
      width: 28px;
      height: 28px;
      position: absolute;
      bottom: -4px;
      right: -4px;
      background: #ff0000;
      z-index: auto;
      display: block;
    }
    .VueDragResize-title-box{
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      height: auto;
      padding: 10px;
      cursor: move;
      .icon-box{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        img{
          margin-left: 12px;
          width: 16px;
          cursor: pointer;
        }
      }
    }
    .Chat-box{
      flex: 1;
      height: calc(100% - 60px);
    }
    .gt-span{
      cursor: pointer;
      color: $g_color;
      font-size: 14px;
    }
  }
  //  弹窗 动画样式 -----
  .suck-in-enter-active, .suck-in-leave-active {
    transition: all 0.8s ease;
    transform-origin: right;
  }

  .suck-in-enter, .suck-in-leave-to {
    opacity: 0;
    transform: translateX(100%) scale(0);
  }
  // 聊天弹窗 样式=============== ↑ ===========
  .TUICallKit-box{
    width: 50rem;
    height: 35rem;
    position: fixed; 
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 999;
    border: 1px solid salmon;
  }
</style>