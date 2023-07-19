<template>
  <div id="app" @click="handleClick">
    <router-view />
  </div>
</template>

<script>
import { getToken, setToken } from '@/utils/auth';
export default {
  name: 'App',
  data() {
    return {
      lastTime: null,
      currentTime: null,
      timeOut: 0.5 * 3600000,
      token: '',
      timer: '',
    };
  },
  mounted() {
    this.lastTime = new Date().getTime();
    this.token = getToken();
  },
  methods: {
    handleClick() {
      setTimeout(() => {
        this.lastTime = new Date().getTime();
        clearInterval(this.timer);
      }, 1000);
    },
    isTimeOut() {
      this.currentTime = new Date().getTime();
      console.log(6666)
      // 判断上次最后一次点击的时间和这次点击的时间间隔是否大于30分钟
      if (this.currentTime - this.lastTime > this.timeOut) {
        if (null != this.token) {
          // 是否是登录状态
          clearInterval(this.timer);
          this.$message.info('30分钟内无操作，请重新登录。');
          setToken('');
          sessionStorage.removeItem('route');
          this.$router.push({ path: `/login` });
        } else {
          this.lastTime = new Date().getTime();
        }
      }
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
