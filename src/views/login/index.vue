<template>
  <div class="login-container">
    <div class="login-header-box">
      <div class="header-nav-box">
        <div>logo</div>
        <div>我是求职者</div>
      </div>
    </div>
    <div class="home-container" :style="login_bgurl" >
      <div class="form-container-box">

        <!-- 登录模块 开始 -->
        <div class="sign-box">
          <div class="sign-type-box">
            <span :class=" sign_way == 1?'hover':'' " @click="clickTab(1)">快捷登录</span>
            <span :class=" sign_way == 2?'hover':'' " @click="clickTab(2)">密码登录</span>
          </div>

        </div>
        <!-- 登录模块 结束 -->


      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      login_bgurl:{},
      sign_way: 1, // 登录方式 1、快捷登录 2、密码登录
    };
  },
  computed: {
    // isProd() {
    //   return process.env.NODE_ENV === 'production'
    // }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
        // this.preUrl = !!this.$route.query.preUrl ? this.$route.query.preUrl : sessionStorage.getItem('preUrl')
        this.preUrl = !!this.$route.query.preUrl ? this.$route.query.preUrl : undefined
      },
      immediate: true,
    },
  },
  created() {
    this.login_bgurl = this.$root.login_bgurl;
    this.$nextTick(() => {
      this.preUrl = !!this.$route.query.preUrl ? this.$route.query.preUrl : undefined
    })
  },
  methods: {
    // 点击注册登录框tab
    clickTab(n){
      this.sign_way = n;
    }
  
  },
};
</script>

<style lang="scss" scoped>
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
$bg: #ffffff;
$light_gray: #000;
$cursor: #000;
.login-header-box{
  width: 100%;
  height: 50px;
  background: $bg;
  display: flex;
  align-items: center;
  justify-content: center;
  .header-nav-box{
    width: 1200px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

  }
}
.home-container{
  width: 100%;
  height: calc(100vh - 50px);
  position: relative;
}
.form-container-box{
  width: 440px;
  height: 450px;
  background: rgba(255,255,255,0.8);
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  position: absolute;
  top: 50%;
  right: 12.9%;
  transform: translateY(-50%);
  padding: 20px 40px;
}
.sign-box{
  width: 100%;
  height: 100%;
}
.sign-type-box{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  span{
    flex: 1;
    text-align: center;
    font-size: 20px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #4E5969;
    line-height: 28px;
    -webkit-background-clip: text;
    position: relative;
    padding: 4px 0;
    cursor: pointer;
  }
  span.hover::after{
      content: '';
      width: 30px;
      height: 2px;
      background: $g_color;
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
    }
}





@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

</style>
