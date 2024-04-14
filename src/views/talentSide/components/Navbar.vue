<template>
  <div class="navber-container" :style="`background:${backgroundColor};`">
    <div class="navbar">
      <div class="hospital">
        <img src="../../../assets/image/logo-2.png" alt="">
      </div>
      <div class="navbar-items-box">
        <el-menu
        :default-active="activeMenu"
        class="el-menu-demo"
        mode="horizontal"
        :background-color="backgroundColor"
        text-color="#ffffff"
        router 
        active-text-color="#fff" >
          <el-menu-item index="/talentHome">首页</el-menu-item>
          <el-menu-item index="/myResume">我的简历</el-menu-item>
          <el-menu-item index="/myDelivery">我的投递</el-menu-item>
          <el-menu-item index="/myProfessionalCircle">我的职业身份</el-menu-item>
          <el-menu-item index="/liveList">直播</el-menu-item>
        </el-menu>
      </div>
      <div class="right-menu">
        <div class="right-items-box">
          <div @click="clickProfessionalCircle">
            <img src="../../../assets/image/nav_1.png" alt="" />
            <span>我的好友</span>
          </div>
          <div @click="clickMessage" class="communication-box">
            <img src="../../../assets/image/icon-wechat1.png" alt="" />
            <span>消息</span>
            <span class="corner-mark-box" v-if="unreadAmount">{{ unreadAmount }}</span>
          </div>
        </div>
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img :src=" avatar ? avatar : require('../../../assets/image/img-user.jpg')" class="user-avatar" />
            <span class="username">{{ name }}</span>
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
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
import VueDragResize from 'vue-drag-resize';
import ConversationList from './mag/conversationList.vue';

export default {
  components: {
    VueDragResize,
    ConversationList
  },
  data(){
    return{
      width: 0,
      height: 0,
      unreadAmount: null,
      backgroundColor:'#262f34'
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
      return '' || path;
    },
    navbarMessagePrompt() {
      return this.$store.state.user.navbarMessagePrompt
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
    '$store.state.navbarMessagePrompt'(newVal){
      console.log('navbarMessagePrompt')
      this.navbarMessagePrompt = newVal;
      this.$forceUpdate();// 更新数据
    },
  },
  // 退出关闭
  beforeDestroy() {
    this.goEasy.im.off(this.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, this.setUnreadNumber);
  },
  mounted(){

  },
  created(){
    let getViewportSize = this.$getViewportSize();

    this.listenConversationUpdate();// 监听会话列表变化
  },
  methods: {
    listenConversationUpdate() {
      this.goEasy.im.on(this.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, this.setUnreadNumber);
    },
    // 获取消息数量
    setUnreadNumber(content) {
      console.log(content)
      this.unreadAmount = content.unreadTotal;
    },
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
      this.$bus.$emit('talentSide_receiveParams', {type:'navbarMag',laiyuan:'nav',infoData:{} });
    },
    // 获取个人信息
    getUserProfile(){
      let that = this;
      that.$axios.post('/api/user/profile',{}).then(res =>{
        if(res.code == 0){
          let role = res.data.basic_info.role;
          if(role == 1){
            that.$router.push('/talentSide/enterpriseInfoRequest')
          }else{
            that.$router.push('/')
          }
        }else{
          that.$message.error({
            message:res.msg
          })
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
    height: 40px;
  }
  .hospital>img{
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
  }
  .navbar-items-box{
    flex: 1;
    display: flex;
    align-items: center;
    padding-left: 20px;
    /deep/ .el-menu--horizontal>.el-menu-item{
      height: 50px;
      line-height: 50px;
      min-width: 80px;
      font-size: 14px;
      text-align: center;
      padding: 0 10px;
    }
    /deep/ .el-menu--horizontal>.el-menu-item.is-active{
      background-color: #000a14 !important;
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
        position: relative;
        cursor: pointer;
        img{
          width: 14px;
          height: 14px;
          margin-right: 4px;
        }
        .corner-mark-box{
          line-height: initial;
          background: #ff0000;
          color: #fff;
          border-radius: 10px;
          padding: 2px 6px;
          position: absolute;
          top: 2px;
          right: -3px;
          font-size: 12px;
          transform: scale(0.8);
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
          // position: absolute;
          // right: -20px;
          // top: 21px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
