<template>
  <div class="navber-container">
    <div class="navbar">
      <div class="hospital">
        <img src="../../../assets/image/logo-talentSide.png" alt="">
      </div>
      <div class="navbar-items-box">
        <el-menu
        :default-active="activeMenu"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#001529"
        text-color="#ffffffcc"
        router 
        active-text-color="#fff" >
          <el-menu-item index="/talentHome">首页</el-menu-item>
          <el-menu-item index="/myResume">我的简历</el-menu-item>
          <el-menu-item index="/myDelivery">我的投递</el-menu-item>
          <el-menu-item index="/myProfessionalCircle">我的职业身份</el-menu-item>
        </el-menu>
      </div>
      <div class="right-menu">
        <div class="right-items-box">
          <div @click="clickProfessionalCircle">
            <img src="../../../assets/image/nav_1.png" alt="" />
            <span>职圈</span>
          </div>
          <div @click="clickMessage" :class="activeMenu == '/communication'?'hover':''">
            <img src="../../../assets/image/icon-wechat1.png" alt="" />
            <span>消息</span>
          </div>
        </div>
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img :src=" avatar ? avatar : require('../../../assets/image/img-user.jpg')" class="user-avatar" />
            <span class="username">{{ name }}</span>
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <!-- <router-link to="/">
              <el-dropdown-item>企业端</el-dropdown-item>
            </router-link> -->
            <!-- <el-dropdown-item divided @click.native="getUserProfile">
              <span style="display: block">企业端</span>
            </el-dropdown-item> -->
            <router-link to="/talentSideSettings">
              <el-dropdown-item>设置</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click.native="logout">
              <span style="display: block">退出登陆</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>

</template>

<script>
import { getToken, setToken, removeToken } from '@/utils/auth';
export default {
  components: {
  },
  data(){
    return{
    }
  },
  computed: {
    name() {
      return this.$store.state.user.name
    },

    avatar() {
      // return localStorage.getItem('realAvatar')
      return this.$store.state.user.realAvatar
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if (meta.activeMenu) {
      //   return meta.activeMenu;
      // }
      console.log(path)
      return '' || path;
    },
  },
  watch:{
    '$store.state.realAvatar'(newVal){
      console.log('realAvatar')
      this.avatar = newVal;
      this.$forceUpdate();// 更新数据
    },
    '$store.state.name'(newVal){
      console.log('name')
      this.name = newVal;
      this.$forceUpdate();// 更新数据
    },
  },
  mounted() {

  },
  methods: {
   
    logout() {
      // debugger
      setToken('');
      localStorage.setItem('tag', ''); // 用户身份 user、人才端 company、企业端缓存
      // 清除缓存的权限菜单
      sessionStorage.removeItem("route")
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    // 点击职圈
    clickProfessionalCircle(){
      this.$router.push('/professionalCircle');
    },
    // 点击消息
    clickMessage(){
      this.$router.push({
        path:'/communication',   //跳转的路径
        // path:'/attentionFans',   //跳转的路径
        // query:{           //路由传参时push和query搭配使用 ，作用时传递参数
        //   tag: 'pingl-hf',
        //   see_uid: localStorage.getItem('realUid')
        // }
      })
    },
  // 获取个人信息
   getUserProfile(){
      let that = this;
      that.$axios.post('/api/user/profile',{}).then(res =>{
        if(res.code == 0){
          let role = res.data.basic_info.role;
          if(role == 1){
            this.$router.push('/talentSide/enterpriseInfoRequest')
          }else{
            this.$router.push('/')
          }
        }
      }).catch(e =>{
        console.log(e)
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.navber-container{
  width: 100%;
  height: 50px;
  background: #001529;
  color: #fff;
}
.navbar {
  margin: 0 auto;
  width: 1200px;
  height: 50px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  .hospital{
    width: 120px;
    height: 34px;
  }
  .navbar-items-box{
    flex: 1;
    display: flex;
    align-items: center;
    padding-left: 60px;
    /deep/ .el-menu--horizontal>.el-menu-item{
      height: 50px;
      line-height: 50px;
      min-width: 80px;
      font-size: 14px;
      text-align: center;
      padding: 0 10px;
    }
    /deep/ .el-menu--horizontal>.el-menu-item.is-active{
      background-color: #000A14 !important;
      border-bottom-color: $g_bg !important;
    }
  }
  .right-menu {
    width: auto;
    height: 100%;
    line-height: 50px;
    display: flex;
    align-items: center;

    &:focus {
      outline: none;
    }
    .right-items-box{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      div{
        padding: 0 12px;
        font-size: 14px;
        display: flex;
        align-items: center;
        cursor: pointer;
        img{
          width: 14px;
          height: 14px;
          margin-right: 4px;
        }
      }
      &>div.hover{
        background-color: #000A14 !important;
        border-bottom: 2px solid #37f !important;
      }
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;
          cursor: pointer;
          color: #fff;
        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 20px;
          vertical-align: middle;
          margin-right: 10px;
        }

        .username {
          vertical-align: middle;
          cursor: pointer;
          color: #fff;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 21px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
