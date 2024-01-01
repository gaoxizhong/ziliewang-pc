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

    <VueDragResize :isActive="true" :w="300" :h="450" @resizing="resize" @dragging="resize" v-if="is_VueDragResize">
      <div class="VueDragResize-centent-box">
        <h3>Hello World!</h3>
        <p>{{ top }} х {{ left }} </p>
        <p>{{ width }} х {{ height }}</p>
        <div class="vdr-stick vdr-stick-br vdr-icon"></div>
      </div>
    </VueDragResize>
  </div>
</template>
<script>
import Navbar from './components/Navbar';
import Footer from '../../components/footer';
import VueDragResize from 'vue-drag-resize';
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
    },
    data(){
      return {
        isRouterAlive: true,
        width: 0,
        height: 0,
        top: 100,
        left: 100,
        is_VueDragResize: true
      }
    },
    watch: {
      $route() {
        this.setCurrentRoute();
      }
    },
    methods:{
      
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
        console.log(newRect)
        this.width = newRect.width;
        this.height = newRect.height;
        this.top = newRect.top;
        this.left = newRect.left;
      }
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
  .mian-box /deep/ .vdr-stick{
    display: none;
  }
  .VueDragResize-centent-box{
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 10px;
    border-radius: 6px;
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
  }
 

</style>