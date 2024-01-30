<template>
  <!-- 个人信息 -->
  <div class="container">
    <div class="container-box" v-if="infoData">
      <div class="container-left-box">
        <div class="le-box">
          <div class="le-box-title">求职隐私</div>
          <ul class="le-ul">
            <li :class="setType =='set_resume'? 'hover': '' " @click="clickLeItems('set_resume')">谁能查看我的简历</li>
            <li :class="setType =='set_shield'? 'hover': '' " @click="clickLeItems('set_shield')">屏蔽公司</li>
            <li :class="setType =='phone_protect'? 'hover': '' " @click="clickLeItems('phone_protect')">手机号码保护</li>
            <li :class="setType =='name_protect'? 'hover': '' " @click="clickLeItems('name_protect')">真实姓名保护</li>
          </ul>
        </div>
        <div class="le-box">
          <div class="le-box-title">账号设置</div>
          <ul class="le-ul">
            <li :class="setType =='set_phone'? 'hover': '' " @click="clickLeItems('set_phone')">手机号码</li>
            <li :class="setType =='set_email'? 'hover': '' " @click="clickLeItems('set_email')">我的邮箱</li>
            <li :class="setType =='set_password'? 'hover': '' " @click="clickLeItems('set_password')">密码设置</li>
            <li :class="setType =='set_expressions'? 'hover': '' " @click="clickLeItems('set_expressions')">常用语设置</li>
          </ul>
        </div>
      </div>
      <div class="container-right-box">
        <el-scrollbar style="height:100%;" ref="scrollbar">
          <!-- 谁能查看我的简历 -->
          <div class="container-right-items" id="set_resume">
            <div class="title">谁能查看我的简历</div>
            <div class="radio-group-box">
              <el-radio-group v-model="resume_radio" @change="resume_change">
                <el-radio :label="1">
                  <h2>企业HR、猎头</h2>
                  <span>系统会将您的简历推给HR或猎头，找工作选此选项</span>
                </el-radio>
                <el-radio :label="2">
                  <h2>猎头</h2>
                  <span>系统只会将您的简历推给猎头，但您主动投递时，HR可以查看您的简历</span>
                </el-radio>
                <el-radio :label="3">
                  <h2>企业HR</h2>
                  <span>系统只会将您的简历推给HR，但您主动投递时，猎头可以查看您的简历</span>
                </el-radio>
                <el-radio :label="4">
                  <h2>均不可查看</h2>
                  <span>除非您主动投递，招聘方将看不到您的简历。记得寻找工作机会时及时开放您的简历</span>
                </el-radio>
              </el-radio-group>
            </div>
          </div>
          <!-- 屏蔽公司 -->
          <div class="container-right-items" id="set_shield">
            <div class="title">屏蔽公司</div>
            <div class="info-box">你可以屏蔽HR或猎头所在公司</div>
            <button @click="clickSetShield">
              <img src="../../../assets/image/Frame_11.png" alt="" />
              <span>添加屏蔽公司</span>
            </button>

            <div class="shield-boss-box">
              <div v-for="(item,index) in shieldBossList" :key="index" class="items-box">
                <span class="items-name">南京金碧房地产开发有限公司</span>
                <span class="items-cancel">取消屏蔽</span>
              </div>
            </div>
          </div>
          <!-- 手机号码保护 -->
          <div class="container-right-items" id="phone_protect">
            <div class="title">手机号码保护</div>
            <div class="info-box">开启后，当企业HR和猎头联系你时对其隐藏真实手机号码</div>
            <div class="phone-protect-box">
              <span class="phone-protect-title">手机号码保护</span>
              <el-switch v-model="is_phone_protect" @change="changePhoneProtect"></el-switch>
            </div>
          </div>
          <!-- 手机号码保护 -->
          <div class="container-right-items" id="name_protect">
            <div class="title">真实姓名保护</div>
            <div class="info-box">开启后对外展示名称将展示 "张**明"</div>
            <div class="phone-protect-box">
              <span class="phone-protect-title">真实姓名保护</span>
              <el-switch v-model="is_name_protect" @change="changeNameProtect"></el-switch>
            </div>
          </div>
          <!-- 手机号码 -->
          <div class="container-right-items" id="set_phone">
            <div class="title">手机号码</div>
            <div class="info-box" >当前手机号: {{ basic_info.phone }}</div>
            <button @click="clickSetPhone">修改手机号</button>
          </div>
          <!-- 我的邮箱 -->
          <div class="container-right-items" id="set_email">
            <div class="title">我的邮箱</div>
            <div class="info-box">当前邮箱: {{ basic_info.email }}</div>
            <button  @click="clickSetEmail">修改邮箱</button>

          </div>
          <!-- 密码设置 -->
          <div class="container-right-items" id="set_password">
            <div class="title">密码设置</div>
            <div class="info-box">当前登录账号: {{ basic_info.phone }}</div>
            <button @click="clickSetPassword">密码设置</button>
          </div>
          <!-- 常用语设置 -->
          <div class="container-right-items" id="set_expressions">
            <div class="title">常用语设置</div>
            <ul class="phraseslist-box">
              <li class="phrases-item" v-for="(item,index) in phraseslist" :key="index">
                <p>{{ item.name }}</p>
                <div class="item-i">
                  <i class="el-icon-edit" ></i>
                  <i class="el-icon-delete"></i>
                </div>
              </li>
            </ul>
            <button @click="clickSetPhrases">添加常用语</button>
          </div>
        </el-scrollbar>
      </div>
    </div>

    <!-- 弹窗功能 -->
      <!-- 屏蔽公司 弹窗 -->
     <div class="setShieldVisible">
      <el-dialog title="添加公司" :visible.sync="setShieldVisible" width="500px" :before-close="closeShieldVisible">
        <div class="cententinfo-box">
          <div class="demo-input-suffix">
            <span>公司名称:</span>
            <el-input v-model="corporation" type="text" name="corporation" placeholder="公司名称"></el-input>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="setShieldVisible = false">取 消</el-button>
          <el-button type="primary" @click="clickShieldCorporationQR">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 修改手机号 弹窗 -->
    <div class="setPhoneVisible">
      <el-dialog title="修改手机号" :visible.sync="setPhoneVisible" width="500px" :before-close="closePhoneVisible">
        <div class="cententinfo-box">
          <div class="cententinfo-title">手机号: {{ basic_info.phone }}</div>
          <div class="demo-input-suffix">
            <span>新手机号:</span>
            <el-input v-model="phone" type="number" name="phone" placeholder="新手机号"></el-input>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="setPhoneVisible = false">取 消</el-button>
          <el-button type="primary" @click="clickPhoneQR">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 修改邮箱 弹窗 -->
    <div class="setEmailVisible">
      <el-dialog title="修改邮箱" :visible.sync="setEmailVisible" width="500px" :before-close="closeEmailVisible">
        <div class="cententinfo-box">
          <div class="cententinfo-title">请输入新邮箱，修改之后简历与登录邮箱将同步完成修改</div>
          <div class="demo-input-suffix">
            <span>新邮箱:</span>
            <el-input v-model="email" type="email" name="email" placeholder="请输入新的登录邮箱"></el-input>
          </div>
          <div class="demo-input-suffix">
            <span>验证码:</span>
            <el-input  maxlength="6" placeholder="验证码" v-model="email_code" name="code"/>
            <div class="send-vcode-btn" :style="{'color': isDisable?'#ababab':'#3377FF'}" :disabled="isDisable" @click.stop="">{{statusMsg}}</div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="setEmailVisible = false">取 消</el-button>
          <el-button type="primary" @click="clickEmailQR">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 修改密码 弹窗 -->
    <div class="setPasswordVisible">
      <el-dialog title="密码设置" :visible.sync="setPasswordVisible" width="500px" :before-close="closePasswordVisible">
        <div class="cententinfo-box">
          <div class="cententinfo-title">手机号: {{ basic_info.phone }}</div>
          <div class="demo-input-suffix">
            <span>新密码:</span>
            <el-input v-model="password" type="password" name="password" placeholder="8-16位字母、数字、字符，不支持空格" show-password></el-input>
          </div>
          <!-- <div class="demo-input-suffix">
            <span>再次输入:</span>
            <el-input v-model="password_tow" type="password" name="password" placeholder="8-16位字母、数字、字符，不支持空格" show-password></el-input>
          </div> -->
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="setPasswordVisible = false">取 消</el-button>
          <el-button type="primary" @click="clickPasswordQR">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 常用语 弹窗 -->
    <div class="setPasswordVisible">
      <el-dialog title="常用语" :visible.sync="setPhrasesVisible" width="500px" :before-close="closePhrasesVisible">
        <div class="cententinfo-box">
          <div class="demo-input-suffix">
            <el-input type="textarea" :rows="3" v-model="phrases" name="Phrases" placeholder="添加常用语" show-password></el-input>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="setPhrasesVisible = false">取 消</el-button>
          <el-button type="primary" @click="clickPhrasesQR">确 定</el-button>
        </span>
      </el-dialog>
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
      resume_radio: 1,
      infoData:{},
      basic_info: {},
      phraseslist: [ // 常用语列表
        {id:1,name:'我可以把我的简历发给您看看吗？'},
        {id:2,name:'我可以把我的简历发给您看看吗？'}
      ],
      setType:'set_resume',
      setPasswordVisible: false,
      setPhoneVisible: false,
      setEmailVisible: false,
      setShieldVisible: false, // 屏蔽公司
      setPhrasesVisible: false, // 常用语
      password:'',
      phone:'',
      email:'',
      email_code:'',
      phrases:'',
      isDisable: false,
      statusMsg:'获取验证码',
      corporation:'', // 公司名称
      shieldBossList:[{}],
      is_phone_protect: true,
      is_name_protect: true
    }
  },
  computed: {
    
  },
  created(){
   this.setType = this.$route.query.setType || 'set_resume';
  },
  mounted(){
    // 获取个人信息
    this.getUserProfile();
    this.clickLeItems(this.setType);
  },
  methods: {
    // 手机号码保护
    changePhoneProtect(e){
      let is_phone_protect = e ? 1 : 2;
      this.$axios.post('/api/user/save',{
        is_phone_protect,
      }).then(res =>{
        if(res.code == 0){
          this.is_phone_protect = e
        }else{
          this.is_phone_protect = !e
        }
      }).catch(error =>{
        console.log(error)
        this.is_phone_protect = !e
      })
    },
    // 姓名保护
    changeNameProtect(){
      this.$axios.post('/api/user/save',{
        is_name_protect,
      }).then(res =>{
        if(res.code == 0){
         this.is_name_protect = e
        }else{
          this.is_name_protect = !e
        }
      }).catch(error =>{
        console.log(error)
        this.is_name_protect = !e
      })
    },
    // 关闭 屏蔽公司弹窗
    closeShieldVisible(){
      this.setShieldVisible = false;
    },
    // 关闭 修改手机号码弹窗
    closePhoneVisible(){
      this.setPhoneVisible = false;
    },
    // 关闭 修改邮箱弹窗
    closeEmailVisible(){
      this.setEmailVisible = false;
    },
    // 关闭 修改密码弹窗
    closePasswordVisible(){
      this.setPasswordVisible = false;
    },
    closePhrasesVisible(){
      this.setPhrasesVisible = false;
    },
    //
    clickLeItems(n){
      let that = this;
      this.setType = n;
      var _dom = document.getElementById(n);
      setTimeout(() => {
        that.$refs.scrollbar.wrap.scrollTop = _dom.offsetTop
      },500);
     
    },  
    // 获取个人信息
    async getUserProfile(){
      let that = this;
      await that.$axios.post('/api/user/profile',{}).then(res =>{
        console.log(res.data)
        if(res.code == 0){
          this.infoData = res.data;
          this.basic_info = res.data.basic_info;
          let is_phone_protect = res.data.basic_info.is_phone_protect;
          let is_name_protect = res.data.basic_info.is_name_protect;
          if(is_phone_protect == 1){
            this.is_phone_protect = true
          }else{
            this.is_phone_protect = false
          }
          if(is_name_protect == 1){
            this.is_name_protect = true
          }else{
            this.is_name_protect = false
          }
        }
      }).catch(e =>{
        console.log(e)
      })
    },
    //谁能查看我的简历
    resume_change(e){
      console.log(e)
    },
    // 点击设置邮箱
    clickSetEmail(){
      this.setEmailVisible = true;
    },
    // 点击设置密码
    clickSetPassword(){
      this.setPasswordVisible = true;
    },
    // 点击修改手机号
    clickSetPhone(){
      this.setPhoneVisible = true;
    },
    // 点击添加公司
    clickSetShield(){
      this.setShieldVisible = true;
    },
    // 点击添加常用语
    clickSetPhrases(){
      this.setPhrasesVisible = true;
    },
    // 添加屏蔽的公司
    clickShieldCorporationQR(){
      let that = this;
      let p = {
        corporation: that.corporation,
      };
      that.$axios.post('',p).then( res =>{
        if(res.code == 0){
          that.$message.success({
            message:'添加成功'
          })
          setTimeout(()=>{
             // 获取个人信息
             that.getUserProfile();
             that.setShieldVisible = false;
          },1500)
          return
        }
        if(res.code == 1){
          that.$message.error({
            message:res.msg
          })
          return
        }

      }).catch( e =>{
        console.log(e)
      })
    },
    // 确认常用语
    clickPhrasesQR(){
      let that = this;
      let p = {
        phrases: that.phrases,
      };
      let url = '';
      if(that.phrases_id){
        p.id = that.phrases_id
      }
      that.$axios.post('',p).then( res =>{
        if(res.code == 0){
          if(that.phrases_id){
            that.$message.success({
              message:'修改成功'
            })
          }else{
            that.$message.success({
              message:'添加成功'
            })
          }
          
          setTimeout(()=>{
             // 获取列表信息
            //  that.getUserProfile();
             that.setPhrasesVisible = false;
          },1500)
          return
        }else{
          that.$message.error({
            message:res.msg
          })
          return
        }

      }).catch( e =>{
        console.log(e)
      })
    },
    // 确认修改密码
    clickPasswordQR(){
      let that = this;
      let p = {
        password: that.password,
      };
      that.$axios.post('/api/user/change-pwd',p).then( res =>{
        if(res.code == 0){
          that.$message.success({
            message:'修改成功'
          })
          setTimeout(()=>{
             // 获取个人信息
             that.getUserProfile();
             that.setPasswordVisible = false;
          },1500)
          return
        }else{
          that.$message.error({
            message:res.msg
          })
          return
        }

      }).catch( e =>{
        console.log(e)
      })
    },
    // 确认修改邮箱
    clickEmailQR(){
      let that = this;
      let p = {
        email: that.email,
      };
      that.$axios.post('',p).then( res =>{
        if(res.code == 0){
          that.$message.success({
            message:'修改成功'
          })
          setTimeout(()=>{
             // 获取个人信息
             that.getUserProfile();
             that.setPhoneVisible = false;
          },1500)
          return
        }
        if(res.code == 1){
          that.$message.error({
            message:res.msg
          })
          return
        }

      }).catch( e =>{
        console.log(e)
      })
    },
    // 确认修改手机号
    clickPhoneQR(){
      let that = this;
      let p = {
        phone: that.phone,
      };
      that.$axios.post('/api/user/change-phone',p).then( res =>{
        if(res.code == 0){
          that.$message.success({
            message:'修改成功'
          })
          setTimeout(()=>{
             // 获取个人信息
             that.getUserProfile();
             that.setPhoneVisible = false;
          },1500)
          return
        }
        if(res.code == 1){
          that.$message.error({
            message:res.msg
          })
          return
        }

      }).catch( e =>{
        console.log(e)
      })
    },
    handleClose(){

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
        color: $g_textColor;
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
    padding: 0 2rem 2rem 2rem;
    height: calc(100vh - 85px);
    overflow-y: auto;
    & /deep/ .el-scrollbar__wrap{
      overflow-x: hidden;
    }
    .container-right-items{
      width: 100%;
      padding: 2rem 0;
      border-bottom: 1px solid #F2F3F5;
      text-align: left;
      .title{
        font-size: 16px;
        font-weight: bold;
        color: $g_textColor;
        line-height: 24px;
      }
      .info-box{
        font-size: 14px;
        font-weight: 400;
        color: #86909C;
        line-height: 22px;
      }
      .phone-protect-box{
        width: 100%;
        display: flex;
        margin-top: 1.5rem;
        .phone-protect-title{
          font-size: 14px;
          font-weight: bold;
          color: $g_textColor;
          line-height: 22px;
        }
        .el-switch{
          margin-left: 16.5rem;
        }
        /deep/ .el-switch.is-checked .el-switch__core{
          border-color: $g_color;
          background-color: $g_bg;
        }
      }
      button{
        width: auto;
        padding: 0 16px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        background: $g_bg;
        border-radius: 30px;
        opacity: 1;
        border: 1px solid $g_bg;
        color: #FFFFFF;
        font-size: 14px;
        text-transform: uppercase;
        transition: transform 80ms ease-in;
        margin-top: 12px;
        img{
          width: 12px;
          height: 12px;
        }
        span{
          margin-left: 6px;
        }
      }
      .radio-group-box{
        width: 100%;

        .el-radio{
          width: 100%;
          margin-top: 16px;
          display: flex;
          /deep/ .el-radio__input{
            .el-radio__inner{
              width: 18px;
              height: 18px;
            }
          }
          /deep/ .el-radio__input.is-checked .el-radio__inner {
            border-color: $g_color;
            background: $g_bg;
          }
          .el-radio__label{
            margin-left: 12px;
            h2{
              font-size: 14px;
              font-weight: 400;
              color: $g_textColor;
              line-height: 22px;
            }
            span{
              font-size: 12px;
              font-weight: 400;
              color: #86909C;
              line-height: 20px;
            }
          }
         
          
        }
      }
      .shield-boss-box{
        width: 100%;
        .items-box{
          margin-top: 14px;
          width: 100%;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #F7F8FA;
          border-radius: 4px;
          padding: 0 10px;
          .items-name{
            flex: 1;
            font-size: 12px;
            font-weight: 400;
            color: $g_textColor;
            line-height: 20px;
          }
          .items-cancel{
            font-size: 12px;
            font-weight: 400;
            color: $g_color;
            line-height: 20px;
            cursor: pointer;
          }
        }
      }
    }
  }



}
.container{
  /deep/ .el-dialog{
    min-width: 420px;
    top: 50%;
    transform: translateY(-50%);
    margin-top: 0 !important;
    .el-dialog__header{
      text-align: left;
      .el-dialog__title{
        font-size: 15px;
        color: $g_textColor;
      }
    }
    .el-dialog__body{
      height: auto;
      overflow: hidden;
      padding: 20px 0;
      margin: 0 20px;
      border-top: 1px solid #F2F3F5;
      .cententinfo-box{
        width: 100%;
        .cententinfo-title{
          font-size: 14px;
          font-weight: 400;
          color: $g_textColor;
          line-height: 22px;
          text-align: left;
        }
        .demo-input-suffix{
          width: 100%;
          display: flex;
          align-items: center;
          margin-top: 20px;
          position: relative;
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
          span{
            width: auto;
            font-size: 14px;
            font-weight: 400;
            color: #000000;
            line-height: 22px;
          }
          .el-input {
            position: relative;
            font-size: 14px;
            flex: 1;
            margin-left: 10px;
           }
          .el-input__inner {
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
          .el-input__inner:hover{
            border-color: $g_color;
          }
          .el-input.is-active .el-input__inner, .el-input__inner:focus{
            border-color: $g_color;
            outline: 0;
          }

        }

      }
    }
    .el-button{
      padding: 0;
      width: 100px;
      height: 40px;
      line-height: 40px;
    }
    .el-button--primary{
      background-color: $g_color;
      border-color: $g_color;
    }

    
  }
}
.phraseslist-box{
  width: auto;
  padding: 0 10px;
  margin-top: 13px;
}
.phraseslist-box>li.phrases-item{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 22px;
  margin-bottom: 4px;
  background: #fff;
  font-size: 15px;
  font-weight: 400;
  color: #333;
  line-height: 28px;
  position: relative;
}
.phraseslist-box>li.phrases-item:before {
  content: "";
  position: absolute;
  top: 21px;
  left: 8px;
  width: 6px;
  height: 6px;
  background: #d9d9d9;
  border-radius: 50%;
}
.phraseslist-box>li.phrases-item:hover{
  box-shadow: 0 4px 16px 0 hsla(0,0%,60%,.2);
  border-radius: 8px;
}
.item-i{
  display: flex;
  align-items: center;
  font-size: 18px;
  &>i{
    margin-left: 10px;
    cursor: pointer;
    &:hover{
      color: $g_color;
    }
  }
}
</style>
