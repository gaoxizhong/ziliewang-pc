<template>
  <div class="login-container">
    <div class="login-header-box">
      <div class="header-nav-box">
        <img src="../../assets/image/log-2.png" alt="" class="logo"/>
        <div class="select-box">
          <div class="show-select-box">
            <span class="title">{{ tag == 'user'? '我是求职者' : '我是招聘方' }}</span>
            <img src="../../assets/image/Swap.png" alt="" class=""/>
            <span class="qh" @click="clickCRole">切换</span>
          </div>
          <div class="select-items-box" v-if="c_role">
            <p :class="tag == 'user'?'hover':'' " @click="clickRole('user')">我是求职者</p>
            <p :class="tag == 'company'?'hover':'' " @click="clickRole('company')">我是招聘方</p>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="home-container" :style="tag == 'user'? login_bgurl_1 : login_bgurl_2" > -->
    <div class="home-container" :style="login_bgurl_1">
      <div class="home-container-div">
        <div class="form-container-box">
          <!-- 登录模块 开始 -->
          <div class="signLogin-box" v-if="sign_login == 'login'">
            <div class="login-type-box">
              <span :class=" login_way == 2?'hover':'' " @click="clickTab(2)">密码登录</span>
              <span :class=" login_way == 1?'hover':'' " @click="clickTab(1)">快捷登录</span>
            </div>
            <form @submit.prevent="LoginUserInfo" class="form-container">
              <!-- 快捷登录  -->
              <div class="form-box" v-if="login_way == 1">
                <div class="input-box">
                  <el-input v-model="login_user.phone" auto-complete="on" type="tel" name="phone" placeholder="请输入手机号"></el-input>
                </div>
                <div class="input-box">
                  <el-input class="input" maxlength="4" placeholder="短信验证码" v-model="login_user.code" name="code"/>
                  <div class="send-vcode-btn" :style="{'color': isDisable?'#ababab':'#3377FF'}" :disabled="isDisable" @click.stop="click_code(2)">{{statusMsg}}</div>
                </div>
              </div>
              <!-- 密码登录  -->

              <div class="form-box" v-if="login_way == 2">
                <div class="input-box">
                  <el-input v-model="login_user.phone" type="tel" name="phone" placeholder="请输入手机号或邮箱"></el-input>
                </div>
                <div class="input-box">
                  <el-input type="password" v-model="login_user.password" name="password" placeholder="请输入密码" show-password></el-input>
                </div>
              </div>
              <div class="login-check-box">
                <el-checkbox v-model="login_user.loginChecked"></el-checkbox>
                <div class="login-check-text">已阅读并同意<span @click.stop="clickUserAgreement">《用户协议》</span>和<span @click.stop="clickPrivacyPolicy">《隐私政策》</span></div>
              </div>
              <button type="submit" class="login-btn">登录</button>
            </form>
            <div class="login-footer-box">
              <div @click="clickUserSign">用户注册</div>
              <div @click="clickChangePassword">忘记密码</div>
            </div>
          </div>
          <!-- 登录模块 结束 -->

          <!-- 注册模块 开始 -->
          <div class="signLogin-box" v-if="sign_login == 'sign'">
            <div class="login-type-box">
              <span class="hover">用户注册</span>
            </div>
            <form @submit.prevent="signUserInfo" autocomplete="off" class="form-container">
              <div class="form-box sign-form-box">
                <div class="input-box">
                  <el-input v-model="sign_user.name" type="text" name="name" placeholder="请输入姓名"></el-input>
                </div>
                <div class="input-box">
                  <el-input v-model="sign_user.id_card" type="number" name="id_card" placeholder="请输入身份证"></el-input>
                </div>
                <div class="input-box">
                  <el-input v-model="sign_user.email" type="email" name="phone" placeholder="请输入邮箱"></el-input>
                </div>
                <div class="input-box">
                  <el-input v-model="sign_user.password" type="password" name="password" placeholder="请输入密码" show-password></el-input>
                </div>
                <div class="input-box">
                  <el-input v-model="sign_user.phone" type="tel" name="phone" placeholder="请输入手机号"></el-input>
                </div>
                <!-- <div class="input-box">
                  <el-input class="input" maxlength="4" placeholder="短信验证码" v-model="sign_user.code" name="code"/>
                  <div class="send-vcode-btn" :style="{'color': isDisable?'#ababab':'#3377FF'}" :disabled="isDisable" @click.stop="click_code(2)">{{statusMsg}}</div>
                </div> -->
              </div>
              <div class="login-check-box">
                <el-checkbox v-model="sign_user.signChecked"></el-checkbox>
                <div class="login-check-text">已阅读并同意<span @click.stop="clickUserAgreement">《用户协议》</span>和<span @click.stop="clickPrivacyPolicy">《隐私政策》</span></div>
              </div>
              <button type="submit" class="login-btn">免费注册</button>
            </form>
            <div class="login-footer-box" style=" justify-content: center;">
              <div @click="clickUserLogin">已有账号去登录</div>
            </div>
          </div>
          <!-- 注册模块 结束 -->
          <!-- 修改密码 开始 -->
          <div class="signLogin-box" v-if="sign_login == 'changePassword'">
            <div class="login-type-box">
              <span class="hover">修改密码</span>
            </div>
            <form @submit.prevent="changePassword" autocomplete="off" class="form-container">
              <div class="form-box sign-form-box">
                <div class="input-box">
                  <el-input v-model="change_password.phone" type="tel" name="phone" placeholder="请输入手机号"></el-input>
                </div>
                <div class="input-box">
                  <el-input class="input" maxlength="4" placeholder="短信验证码" v-model="change_password.code" name="code"/>
                  <div class="send-vcode-btn" :style="{'color': isDisable?'#ababab':'#3377FF'}" :disabled="isDisable" @click.stop="click_code(3)">{{statusMsg}}</div>
                </div>
                <div class="input-box">
                  <el-input v-model="change_password.password" type="password" name="password" placeholder="新密码：8-16位字母、数字、字符，不支持空格" show-password></el-input>
                </div>
                <div class="input-box">
                  <el-input v-model="change_password.password_tow" type="password" name="password_tow" placeholder="请确认新密码" show-password></el-input>
                </div>
              </div>
              <button type="submit" class="login-btn">确认修改</button>
            </form>
            <button type="button" class="login-btn-qx" @click="clickUserLogin">取消</button>
          </div>
          <!-- 修改密码 结束 -->
        </div>
      </div>
    </div>
    <!-- 底部 开始  -->
    <div class="footer-box">
      <div class="footer-main">
        <div class="footer-nav"><a href="https://beian.miit.gov.cn/" target="_blank">浙ICP备2023022220号-3</a>&nbsp;&nbsp;Copyright&nbsp;&nbsp;@&nbsp;&nbsp;2006-2023&nbsp;&nbsp;自猎网&nbsp;&nbsp;AIl&nbsp;&nbsp;Rights Reserved</div>
        <div class="footer-certification"><a href="https://www.zilieai.com/images/xkz1.jpg" target="_blank">人才许可证</a> <a href="https://www.zilieai.com/images/yyzz.jpg" target="_blank">营业执照</a> 违法和不良信息举报:&nbsp;&nbsp;<a href="https://www.12377.cn" target="_blank">https://www.12377.cn</a></div>
      </div>
    </div>
    <!-- 底部 结束  -->
    <!-- 协议弹窗 -->
    <!-- 用户协议弹窗 -->
    <div>
      <userAgreement ref="userAgreement"/>
    </div>
    <!-- 隐私政策弹窗 -->
    <div>
      <privacyPolicy ref="privacyPolicy"/>
    </div>
  </div>
</template>

<script>
import { getToken, setToken, removeToken } from '@/utils/auth';
import userAgreement from "../../components/userAgreement.vue";
import privacyPolicy from "../../components/privacyPolicy.vue";
import Footer from '../../components/footer';

export default {
  name: 'Login',
  components:{
    userAgreement,
    privacyPolicy,
    Footer
  },
  data() {
    return {
      c_role: false,
      tag: 'user',
      login_bgurl_1:{},
      login_bgurl_2:{},
      sign_login: 'login', // sign、注册； login、登录
      login_way: 2, // 登录方式 1、快捷登录 2、密码登录
      login_user: { // 登录信息
        phone: '',
        password:'',
        code:'',
        loginChecked: false,
      },
      sign_user: { // 注册信息
        name:'',
        id_card:'',
        phone: '',
        password:'',
        code:'',
        email:'',
        signChecked: false,
      },
      change_password: { // 修改密码
        phone: '',
        code:'',
        password:'',
        password_tow:'',
      },
      isDisable: false,
      statusMsg:'获取验证码',
      // zc_statusMsg:'获取验证码',
      // dl_statusMsg: '获取验证码',
      is_yzmlogin: false, // 验证码登录状态
      redirect: undefined,
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
    localStorage.setItem('tag', ''); // 用户身份 user、人才端 company、企业端缓存
    this.login_bgurl_1 = this.$root.login_bgurl_1;
    this.login_bgurl_2 = this.$root.login_bgurl_2;
    this.$nextTick(() => {
      this.preUrl = !!this.$route.query.preUrl ? this.$route.query.preUrl : undefined
    })
  },
  methods: {
    // 点击切换
    clickCRole(){
      this.c_role = !this.c_role;
    },  
    // 切换角色
    clickRole(n){
      this.tag = n;
      console.log(this.tag)
      localStorage.setItem('tag',n);
      this.c_role = false;
      this.sign_login = 'login'; // sign、注册； login、登录
      this.login_way = 2; // 登录方式 1、快捷登录 2、密码登录
      
    },
    // 点击注册登录框tab
    clickTab(n){
      this.login_way = n;
      this.isDisable = false;
      this.statusMsg = `获取验证码`;
    },
    // 点击用户注册
    clickUserSign(){
      console.log(this.tag)
      if(this.tag == 'company'){
        this.$router.push('/bossSignIn')
      }else{
       this.sign_login = 'sign';
      }
    }, 
    clickUserLogin(){
      this.sign_login = 'login';
    },
    // 点击忘记密码
    clickChangePassword(){
      this.sign_login = 'changePassword';
    },
    // 用户登录
    LoginUserInfo(){
      let that = this;
      let login_way = that.login_way;
      let login_user = that.login_user;
      if(login_user.phone ==''){
        that.$message.error({
          message:'请输入手机号'
        })
        return
      }
        // 1 快捷登录
      if( login_way == 1 && login_user.code ==''){
        that.$message.error({
          message:'请输入验证码'
        })
        return
      }
       // 2 密码登录
      if( login_way == 2 && login_user.password ==''){
        that.$message.error({
          message:'请输入密码'
        })
        return
      }
      if( !login_user.loginChecked ){
        that.$message.error({
          message:'请勾选用户协议及隐私协议'
        })
        return
      }
      let p = {
        phone:login_user.phone,
        tag: that.tag 
      }
      if(login_way == 1){
        p.code = login_user.code,
        p.login_type = 'code_login'
      }else{
        p.password = login_user.password,
        p.login_type = 'pass_login'
      }
      that.$axios.post('/api/login',p).then( res =>{
        let data = res.data;
        setToken(data.token);   // 缓存
        localStorage.setItem('tag', data.tag); // 用户身份 user、人才端 company、企业端缓存
        if(data.tag == 'user'){
          // 求职者
          localStorage.setItem('name', data.user.real_name); // 用户名缓存
          localStorage.setItem('realAvatar', data.user.avatar); // 用户头像缓存
          localStorage.setItem('realUid', data.user.uid); // 用户uid缓存
          this.$store.dispatch('user/set_realAvatar', data.user.avatar); // vuex
          this.$store.dispatch('user/SET_NAME', data.user.real_name);

          setTimeout(() => {
            this.$router.push('/talentSide');
          }, 1000);
        }
        if(data.tag == 'company'){
          // 企业端
          localStorage.setItem('realUid', data.user.id); // 用户uid缓存
          setTimeout(() => {
            this.$router.push('/dashboard');
          }, 1000);
        }
        
      }).catch( e=>{
        console.log(e)
      })

    },
    // 点击免费注册
    signUserInfo(e){
      let that = this;
      let sign_user = that.sign_user;
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/

      if(sign_user.name ==''){
        that.$message.error({
          message:'请输入姓名'
        })
        return
      }
      if(sign_user.id_card ==''){
        that.$message.error({
          message:'请输入身份证号'
        })
        return
      }
      
      if(sign_user.email ==''){
        that.$message.error({
          message:'请输入邮箱'
        })
        return
      }
      if ( !mailReg.test(sign_user.email) ){
       this.$message.error({
          message:'请输入正确的邮箱格式'
        })
        return
      }
      if(sign_user.password ==''){
        that.$message.error({
          message:'请输入密码'
        })
        return
      }
      if(sign_user.phone ==''){
        that.$message.error({
          message:'请输入手机号'
        })
        return
      }
      // if(sign_user.code ==''){
      //   that.$message.error({
      //     message:'请输入验证码'
      //   })
      //   return
      // }
      
      if( !sign_user.signChecked ){
        that.$message.error({
          message:'请勾选用户协议及隐私协议'
        })
        return
      }
      let p = {
        tag: that.tag,
        name: sign_user.name,
        id_card: sign_user.id_card,
        email: sign_user.email,
        password: sign_user.password,
        phone: sign_user.phone,
      };

      that.$axios.post('/api/register',p).then( res =>{
        console.log(res)
        if(res.code == 0){
          that.$message.success({
            message:'注册成功'
          })
          
          that.$axios.post('/api/login',{
            phone: p.phone,
            password: p.password,
            tag: that.tag,
            login_type: 'pass_login'
          }).then( res =>{
            let data = res.data;
            setToken(data.token);   // 缓存
            localStorage.setItem('tag', data.tag); // 用户身份 user、人才端 company、企业端缓存
            if(data.tag == 'user'){
              // 求职者
              localStorage.setItem('name', data.user.real_name); // 用户名缓存
              localStorage.setItem('realAvatar', data.user.avatar); // 用户头像缓存
              localStorage.setItem('realUid', data.user.uid); // 用户uid缓存
              this.$store.dispatch('user/set_realAvatar', data.user.avatar); // vuex
              this.$store.dispatch('user/SET_NAME', data.user.real_name);
              setTimeout(() => {
                this.$router.push('/myResume');
              }, 1000);
            }
          }).catch( e=>{
            console.log(e)
          })
          // setTimeout(()=>{
          //   this.sign_login = 'login';
          // },1500)
          return
        }else{
          that.$message.error({
            message:res.data.msg
          })
          return
        }

      }).catch( e =>{
        console.log(e)
      })

    },  
    changePassword(e){
      let that = this;
      let change_password = that.change_password;
      if(change_password.phone ==''){
        that.$message.error({
          message:'请输入手机号'
        })
        return
      }
      if(change_password.password ==''){
        that.$message.error({
          message:'请输入密码'
        })
        return
      }
      if(change_password.password_tow ==''){
        that.$message.error({
          message:'请再次输入密码'
        })
        return
      }
    
      if(change_password.code ==''){
        that.$message.error({
          message:'请输入验证码'
        })
        return
      }
      let p = {
        phone: change_password.phone,
        code: change_password.code,
        password: change_password.password,
        password_tow: change_password.password_tow,
        tag: that.tag 

      };

      that.$axios.post('/api/register',p).then( res =>{
        if(res.code == 0){
          that.$message.success({
            message:'修改成功'
          })
          setTimeout(()=>{
            this.sign_login = 'login';
          },1500)
          return
        }
        if(res.code == 1){
          that.$message.error({
            message:res.data.msg
          })
          return
        }

      }).catch( e =>{
        console.log(e)
      })

    },  

    // 点击注册、登录获取验证码
    click_code(ty){
      let that = this;
      let type = ty; // 1、注册； 2、登录 3、忘记密码
      let phone = '';
      if(type == 1){
        phone = that.newuser.phone
      }
      if(type == 2){
        phone = that.login_user.phone
      }
      if(type == 3){
        phone = that.change_password.phone
      }

      let event = '';
      if(type == 1){
        // 注册
        event = 'register'
      }
      if(type == 2){
        // 登录
        event = 'login'
      }
      if(type == 3){
        // 修改密码
        event = 'changepwd'
      }
      if(type == 4){
        // 修改手机号
        event = 'changephone'
      }

      if(phone == ''){
        this.$message.error({
          message:'请输入手机号'
        })
        return
      }
      
      if(that.isDisable){
        return
      }
      that.isDisable = true;
      let p ={
        phone,
        event,
        tag: that.tag 

      }
      that.$axios.post('/api/sms/send',p).then(res =>{
        if(res.code == 0){ 
          that.$message({
            showClose: true,
            message: '发送成功，请注意短信查收！',
            type: 'success'
          })
          let count = 60;
          that.statusMsg = `${count--}秒后重新发送`;
          let timerid = window.setInterval(function() {
            that.statusMsg = `${count--}秒后重新发送`;
            if (Number(count)<= 0) {
              window.clearInterval(timerid);
              that.isDisable = false;
              
              that.statusMsg = `获取验证码`;

            }
          }, 1000)
        }else{
          this.$message.error({
            message:res.msg
          })
          that.isDisable = false;
        }
      }).catch( e=>{
        that.isDisable = false;

      })
    },

    // 点击用户协议
    clickUserAgreement(){
      this.$refs.userAgreement._data.dialogVisible = true;
    },
    // 点击隐私协议
    clickPrivacyPolicy(){
      this.$refs.privacyPolicy._data.dialogVisible = true;

    },
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
    width: $view_width;
    max-width: $view_max_width;
    height: 100%;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 50px 0 20px;
    .logo{
      height: 36px;
    }
  }
}
.home-container{
  width: 100%;
  height: calc(100vh - 50px);
  position: relative;
}
.home-container-div{
  width: $view_width;
  max-width: $view_max_width;
  height: 100%;
  margin: 0 auto;
  position: relative;
  button.login-btn{
    width: 100%;
    color: #FFFFFF;
    font-size: 14px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    margin-top: 12px;
    height: 40px;
    background: $g_bg;
    box-shadow: 0px 2px 0px 0px rgba(0,0,0,0.04);
    border-radius: 2px 2px 2px 2px;
    opacity: 1;
    border: 1px solid $g_color;
  }
  button.login-btn-qx{
    width: 100%;
    color: $g_textColor;
    font-size: 14px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    margin-top: 12px;
    height: 40px;
    background: #FFFFFF;
    box-shadow: 0px 2px 0px 0px rgba(0,0,0,0.02);
    border-radius: 2px 2px 2px 2px;
    opacity: 1;
    border: 1px solid #E5E6EB;
  }
}
.form-container-box{
  width: 380px;
  height: auto;
  background: rgba(255,255,255,0.8);
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  position: absolute;
  top: 50%;
  right: 20px;
  z-index: 9999;
  transform: translateY(-52%);
  padding: 20px 30px;

  .select-box{
    padding: 0;
    position: relative;
    .show-select-box{
      display: flex;
      align-items: center;
      font-size: 15px;
      .title{
        font-weight: bold;
        color: $g_textColor;
      }
      .title-dec{
        padding: 10px 0;
        color: $g_color;
      }
      &>img{
        cursor: pointer;
      }
    }
  }
  // .select-items-box{
  //   padding-bottom: 20px;
  // }
}
.signLogin-box{
  width: 100%;
  height: 100%;
}
.login-type-box{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  span{
    flex: 1;
    text-align: center;
    font-size: 18px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #4E5969;
    line-height: 28px;
    position: relative;
    padding: 6px 0;
    cursor: pointer;
  }
  span.hover{
    font-weight: bold;
    color: $g_textColor;
    &::after{
      content: '';
      width: 36px;
      height: 3px;
      background: $g_color;
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
    }
  }
}
.form-box{
  padding: 12px 0;
}
.sign-form-box .input-box{
  margin-top: 10px;
}
.input-box {
  position: relative;
  display: flex;
  margin-top: 26px;
  width: 100%;
  .send-vcode-btn {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    color: $g_color;
    display: flex;
    align-items: center;
    background-color: transparent;
    border: none;
    padding: 0 10px;
    outline: none;
    cursor: pointer;
    transition: background-color .3s,color .3s;
    margin-top: 0;
    font-size: 14px;
  }
  /deep/ .el-input__inner {
    font-size: 14px;
    padding: 14px 10px;
    width: 100%;
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    outline: none;
    box-sizing: border-box;
    display: block;
    box-shadow: none;
    transition: border .3s;
    background-color: #fff;
    resize: none;
  }
}
.form-box /deep/ .el-input__inner:hover{
  border-color: $g_color;
}
.form-box /deep/ .el-input.is-active .el-input__inner, .form-box /deep/ .el-input__inner:focus{
  border-color: $g_color;
  outline: 0;
}
.login-check-box{
  margin-top: 20px;
  display: flex;
  align-items: center;
  .login-check-text{
    font-size: 12px;
    margin-left: 4px;
    span{
      color: $g_color;
      cursor: pointer;
    }
  }
  /deep/ .el-checkbox__input.is-checked .el-checkbox__inner{
    background: $g_bg;
    border-color: $g_bg;
  }
  /deep/ .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: $g_bg;
  }
  .el-checkbox{
    margin-right: 4px;
    margin-top: -2.5px;
  }
}
.login-footer-box{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  div{
    cursor: pointer;
    color: #4E5969;
    font-size: 14px;
    text-align: center;
    &:hover{
      color: $g_color;
    }
  }
}
.select-box{
  width: auto;
  height: 32px;
  // background: #F4F8FF;
  border-radius: 2px;
  opacity: 1;
  position: relative;
  .show-select-box{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    span.qh{
      font-size: 14px;
      font-weight: 400;
      color: #86909C;
      line-height: 16px;
      cursor: pointer;
    }
    img{
      width: 14px;
      height: 14px;
      margin: 0 8px;
    }
  }
  .select-items-box{
    position: absolute;
    top: 34px;
    left: 24px;
    width: 144px;
    height: 90px;
    background: #FFFFFF;
    box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.08);
    border-radius: 4px;
    opacity: 1;
    border: 1px solid #F2F3F5;
    padding: 10px 0;
    z-index: 99999;
    p{
      font-size: 14px;
      font-weight: bold;
      color: $g_textColor;
      width: 100%;
      height: 32px;
      line-height: 32px;
      opacity: 1;
      cursor: pointer;
      text-align: center;
      
      &:hover{
        background: #F4F8FF;
      }
    }
    p.hover{
      background: #F4F8FF;
    }
  }
}
.footer-box{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: #888;
  min-width: 1220px;
  padding-top: 24px;
  padding-bottom: 6px;

  .footer-main div{
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 14px;
    line-height: 24px;
    a{
      color: #fff;
      &:hover{
        color: #fff;
      }  
    }
  }
}















































@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

</style>
