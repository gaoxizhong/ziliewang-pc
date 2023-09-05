<template>
  <div>
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
  </div>
</template>
<script>
import Navbar from './components/Navbar';
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
    },
    data(){
      return {
        isRouterAlive: true
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
    },

  }
</script>
<style lang="scss" scoped>
  .container-box{
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    .container{
      width: 1200px;
      margin: 1.2rem auto 0;
    }
  }

</style>