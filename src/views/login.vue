<template>
  <div class="login-container">
 
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      preUrl: ''
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
    this.$nextTick(() => {
      this.preUrl = !!this.$route.query.preUrl ? this.$route.query.preUrl : undefined
    })
  },
  methods: {
  
  
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
$bg: #ffffff;
$light_gray: #000;
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

</style>

<style lang="scss" scoped>
$bg: #fff;
$dark_gray: #889aa4;
$light_gray: #000;
::v-deep .el-form-item__content {
  line-height: 1;
}

</style>
