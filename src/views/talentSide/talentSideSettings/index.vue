<template>
  <div class="container">
    <div class="container-box">
      <div class="container-left-box">
        <div class="le-box">
          <div class="le-box-title">求职隐私</div>
          <ul class="le-ul">
            <li :class="setType =='set_resume'? 'hover': '' " @click="clickLeItems('set_resume')">谁能查看我的简历</li>
            <li :class="setType =='set_shield'? 'hover': '' " @click="clickLeItems('set_shield')">屏蔽公司</li>
            <li :class="setType =='set_protection'? 'hover': '' " @click="clickLeItems('set_protection')">手机号码保护</li>
            <li :class="setType =='set_realName'? 'hover': '' " @click="clickLeItems('set_realName')">真实姓名保护</li>
          </ul>
        </div>
        <div class="le-box">
          <div class="le-box-title">账号设置</div>
          <ul class="le-ul">
            <li :class="setType =='set_phone'? 'hover': '' " @click="clickLeItems('set_phone')">手机号码</li>
            <li :class="setType =='set_email'? 'hover': '' " @click="clickLeItems('set_email')">我的邮箱</li>
            <li :class="setType =='set_password'? 'hover': '' " @click="clickLeItems('set_password')">密码设置</li>
          </ul>
        </div>
      </div>
      <div class="container-right-box">
        <setPhone v-if="setType == 'set_phone' "/>
        <setEmail v-if="setType == 'set_email' "/>
        <setPassword v-if="setType == 'set_password' "/>
      </div>
    </div>
   
  </div>

</template>

<script>

export default {
  name: 'talentSideSettings',
  components: {
    
  },
  data(){
    return{
      setType:'set_resume',
    }
  },
  computed: {
    
  },
  methods: {
    clickLeItems(n){
      this.setType = n;
    },  
  },
};
</script>

<style lang="scss" scoped>
.container-box{
  width: 100%;
  display: flex;
  border-radius: 8px;
  background: #FFFFFF;
  .container-left-box{
    width: 238px;
    .le-box{
      width: 100%;
      margin-top: 1.2rem;
      text-align: left;
      .le-box-title{
        width: 100%;
        height: 40px;
        padding-left: 30px;
        font-size: 16px;
        font-weight: bold;
        color: #1F2E4D;
        line-height: 40px;
      }
      .le-ul{
        width: 100%;
        li{
          width: 100%;
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          padding-left: 30px;
          cursor: pointer;
          &:hover{
            background: #F4F8FF;
            color: $g_color;
          }
        }
        li.hover{
          background: #F4F8FF;
          color: $g_color;
        }
      }
    }
  }
  .container-right-box{
    flex: 1;
    border: 1px solid #F2F3F5;
    padding: 2rem;
  }
}

</style>
