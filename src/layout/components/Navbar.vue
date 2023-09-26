<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <div class="right-items-box">
        <div>
          <img src="../../assets/image/bossSide/icon-zq.png" alt="" />
          <span>职圈</span>
        </div>
        <div>
          <img src="../../assets/image/bossSide/remind.png" alt="" />
          <span>通知</span>
        </div>
        <div>
          <img src="../../assets/image/bossSide/questionCircle.png" alt="" />
          <span>帮助</span>
        </div>
        <div>
          <img src="../../assets/image/bossSide/comment.png" alt="" />
          <span>面试</span>
        </div>
        <div @click="goToCorporateHome">
          <img src="../../assets/image/bossSide/icon-frame2.png" alt="" />
          <span>企业主页</span>
        </div>
      </div>

      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src=" avatar ? avatar : require('../../assets/image/img-user.jpg')" class="user-avatar">
          <span class="username" v-if="name">{{ name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <router-link to="/individualCenter">
            <el-dropdown-item>
              个人中心
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { setToken } from '@/utils/auth';

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
    ]),
    name() {
      return localStorage.getItem('realname')
    },
    avatar() {
      return localStorage.getItem('realAvatar')
    },
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      // debugger
      setToken('');
      // 清除缓存的权限菜单
      sessionStorage.removeItem("route")
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    // 点击企业主页
    goToCorporateHome(){
      // 获取个人信息
      this.getUserProfile();
      
    },
     // 获取个人信息
   getUserProfile(){
      let that = this;
      that.$axios.post('/api/user/profile',{}).then(res =>{
        if(res.code == 0){
          let role = res.data.basic_info.role;
          if(role == 1){
            this.$router.push('/enterpriseInfoRequest')
          }else{
            this.$router.push('/corporateHome')
          }
        }
      }).catch(e =>{
        console.log(e)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    display: flex;
    align-items: center;
    &:focus {
      outline: none;
    }
    .right-items-box{
      display: flex;
      align-items: center;
      justify-content: center;
      div{
        margin-right: 1.5rem;
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
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;
        .user-avatar {
          cursor: pointer;
          width: 2rem;
          height: 2rem;
          border-radius: 10px;
        }
        .username{
          margin-left: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 12px;
        }
      }
    }
  }
}
</style>
