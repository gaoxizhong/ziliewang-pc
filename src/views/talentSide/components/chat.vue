<template>
  <div class="chat-window-box m-box">
    <!-- 左侧 列表 开始 -->
    <div class="left-box" v-if="!is_type || is_type == ''">
      <div class="seach-box"></div>
      <div class="personAbility-box">
        <div class="personAbility-items-box" :class="id == item.id?'hover':''" v-for="(item,index) in sysMsgListData" :key="index" @click="clickmsgListData(item)">
          <img :src="item.company_user_avatar?item.company_user_avatar:require('../../../assets/image/bossSide/img-user.jpg')" alt="" />
          <div class="name-box">
            <div class="name-t">
              <span class="span-1">{{item.company_user_name}}</span>
              <span class="span-2" v-if="item.company">{{item.company.company_name}}</span>
            </div>
            <div class="sub-title">{{item.chat_list[item.chat_list.length-1].content}}</div>
          </div>
          <span class="time">{{item.createtime}}</span>
        </div>

      </div>
    </div>
    <!-- 左侧 列表 结束 -->
    <div class="right-box center-box" v-if="selt_info">
      <div class="seach-box">
        <div class="seach-box-info">
          <img :src="selt_info.company_user_avatar?selt_info.company_user_avatar:require('../../../assets/image/bossSide/img-user.jpg')" alt="" />
          <div class="name-t">
            <div class="span-1">{{selt_info.company_user_name}}</div>
            <div class="span-2" v-if="selt_info.company">{{selt_info.company.company_name}}</div>
          </div>
        </div>
        <div class="job-1">
          <span class="job-title">沟通职位：</span>
          <span class="blue" v-if="selt_info.companyposition">{{selt_info.companyposition.position_name}}</span>
        </div>
        <!-- <img src="../../../assets/image/bossSide/fileSearch.png" alt="" class="fileSearch-img" @click="onlineResume"/> -->
      </div>
      <div class="job-box scrollbar" id="content" ref="scrollbar">
        <div class="job-1">
          <span class="job-title">沟通职位：</span>
          <span class="blue" v-if="selt_info.companyposition">{{selt_info.companyposition.position_name}}</span>
        </div>
        <div></div>

        <dl class="messages" style="margin-bottom: 12px;">
          <dt><h4><a href="javascript:0;" id="show-history"></a></h4></dt>

          <dd class="bot clearfix" :style="`margin:${!item.content?0:''}`"  data-invalid-transfer="true" v-for="(item,index) in msgList" :key="index">
            <div :class=" item.type == 1 ?'msg-send':'msg-recv' " class="msg" style="color:#fff" v-if="item.content">
              <img :src="item.user_avatar?item.user_avatar:require('../../../assets/image/bossSide/img-user.jpg')" class="msg-avatar" v-if="item.type == 1"/>
              <img :src="item.company_user_avatar?item.company_user_avatar:require('../../../assets/image/bossSide/img-user.jpg')" class="msg-avatar" v-else/>
              <div class="sender">
                <!-- <span class="sender-text">{{item.name}}</span> -->
                <span class="time-text">{{item.createtime}}</span>
              </div>
              <div class="msg-content-and-after">
                <div class="msg-content">
                  <div v-html="item.content"></div>
                  <!-- <div class="msg-btn" v-if="item.msg_type == 1 && item.msg_status == 2" @click="clickAcceptBtn">接收邀请</div> -->
                </div>
              </div>
            </div>
          </dd>

          <!-- 邀请面试 开始-->
          <dd class="bot clearfix" v-if="selt_info.msg_type == 2 || selt_info.msg_type == 5" >
            <div class="msg msg-recv" style="color:#fff">
            <div class="sender">
                <span class="time-text">{{selt_info.createtime}}</span>
              </div>
              <div class="msg-content-and-after">
                <div class="msg-content">
                  <div>对方向您发送了面试邀请</div>
                  <div class="msg-btn" @click="clickAcceptBtn" v-if="selt_info.msg_type == 2">接受面试邀请</div>
                  <div class="msg-btn"  @click="clickViewInterviewInfo" v-if="selt_info.msg_type == 5">已接受，查看面试信息</div>
                </div>
              </div>
            </div>
          </dd>
          <!-- 邀请面试 结束 -->
          <!-- 求简历 开始-->
          <dd class="bot clearfix" v-if="selt_info.msg_type == 2 || selt_info.msg_type == 6" >
            <div class="msg msg-recv" style="color:#fff">
            <div class="sender">
                <span class="time-text">{{selt_info.createtime}}</span>
              </div>
              <div class="msg-content-and-after">
                <div class="msg-content">
                  <div>对方请求获取您的简历</div>
                  <div class="msg-btn" @click="clickSendResumeBtn" v-if="selt_info.msg_type == 6">发送简历</div>
                  <div class="msg-btn msg-btn-5" v-if="selt_info.msg_type == 7">已发送</div>
                </div>
              </div>
            </div>
          </dd>
          <!-- 求简历 结束 -->
        </dl>

        <div id="msg_end" ref="msg_end" style="height:0px; overflow:hidden"></div>

      </div>


      <div class="theme-c clearfix" id="footer" style="display: block;">
        <div class="icon-btn-box">
          <div class="footer-left">
            <el-dropdown class="avatar-container" trigger="click" placement="top">
              <div class="username-wrapper">常用语</div>
              <el-dropdown-menu slot="dropdown" class="user-dropdown">
                <el-dropdown-item divided >
                  <span style="display: block" @click="clickCyy('我可以把我的简历发您看看吗?')">我可以把我的简历发您看看吗?</span>
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <span style="display: block" @click="clickCyy('您好！我可以去贵公司面试吗?')">您好！我可以去贵公司面试吗?</span>
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <span style="display: block" @click="clickCyy('您好！希望可以和您聊聊，谢谢！')">您好！希望可以和您聊聊，谢谢！</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="footer-right">
            <div @click="clickContactBtn">
              <img src="../../../assets/image/bossSide/int-yqms.png" alt="" />
              <span>交换联系方式</span>
            </div>
            <div @click="clickSendResumeBtn('fsjl')">
              <img src="../../../assets/image/bossSide/int-qjl.png" alt="" />
              <span>投递简历</span>
            </div>
          </div>
        </div>
        <div class="ui-editor clearfix">
          <div class="textbox">
            <div class="n-input-wrapper">
              <el-input placeholder="请输入内容..." v-model="originMessage" clearable  @keydown.enter.native="searchEnterFun($event)"></el-input>
            </div>
            <el-button class="btn-send" :loading="loading" id="btnSend"
              :style="{'color': originMessage != ''?'#fff':'#00000040','background-color': originMessage !=''?'rgb(20 184 166)':'#f5f5f5','border-color': originMessage !=''?'rgb(20 184 166)':'#f5f5f5'}"
              @click="onSendClcik"
            >
              <span>发送</span>
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="right-box chat-no-data" v-else>
      <!-- <img src="../../../assets/image/bossSide/icon-chat-welcome.png" alt="" /> -->
      <!-- <div class="welcome-tips">
        <p>与Boss沟通，左侧列表中显示</p>
      </div> -->
      <!-- <el-empty description="与企业沟通，左侧列表中显示"></el-empty> -->
      <el-empty description="暂无消息..."></el-empty>
    </div>

  </div>
</template>

<script>
export default {
  props:{
    is_type:{
      type: String,
      default() {
        return ''
      }
    },
    company_id:{
      type: Number,
      default() {
        return 0
      }
    }
  },
  data(){
    return {
      uid: window.localStorage.getItem('uid'),
      viewHeight:'',
      originMessage:'',
      message:[], // 累计对话记录
      msgList:[],  // type 1为用户 msg-recv， 2为企业 msg-send
      sysMsgListData:[], // 左侧信息列表
      loading: false,
      source: null,
      page: 1,
      pagesize: 20,
      selt_index: -1,
      selt_info: '',
      id: 0
    }
  },
  mounted(){
    this.company_id = this.company_id;
    this.getSysMsgList();
  },
  methods:{
    /**
     * 获取当前时间 格式：yyyy-MM-dd HH:MM:SS
    */
    getCurrentTime(){
        var date = new Date();//当前时间
        var month = this.zeroFill(date.getMonth() + 1);//月
        var day = this.zeroFill(date.getDate());//日
        var hour = this.zeroFill(date.getHours());//时
        var minute = this.zeroFill(date.getMinutes());//分
        var second = this.zeroFill(date.getSeconds());//秒

        //当前时间
        var curTime = date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        return curTime;
    },

    /**
     * 补零
     */
    zeroFill(i){
      if (i >= 0 && i <= 9) {
          return "0" + i;
      } else {
          return i;
      }
    },

    // 回车键点击
    searchEnterFun(e){
      var keyCode = window.event?e.keyCode:e.which;
      if(keyCode == 13){
        this.onSendClcik();
      }
    },
    onSendClcik(){
      let that = this;
      let p = {
        position_id: that.selt_info.id,
        company_id: that.selt_info.company_id,
        company_uid: that.selt_info.company.uid,
        content: that.originMessage
      }
      let showMessage = { // 页面展示的我的提问
        type:1,
        content:that.originMessage,
        createtime: this.getCurrentTime(),
      }
      that.$axios.post('/api/user/find-company',p).then( res =>{
        if(res.code == 0){
          that.msgList.push(showMessage);
          that.originMessage = '';
          that.scrollBottom(); // 页面滚动到底部
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    clickmsgListData(i){
      let that = this;
      that.selt_info = i;
      that.id = i.id;
      that.msgList = i.chat_list;
      that.scrollBottom(); // 页面滚动到底部
    },

    // 获取聊天列表
    getSysMsgList(){
      let that = this;
      that.$axios.post('/api/sys-msg/list',{
        page: that.page,
        pagesize: that.pagesize
      }).then( res =>{
        if(res.code == 0){
          let sysMsgListData = res.data;
          that.sysMsgListData = sysMsgListData;
          console.log(that.company_id)
          if(that.company_id){
            sysMsgListData.forEach( ele =>{
              if(ele.company_id == that.company_id){
                console.log(ele)
                that.clickmsgListData(ele)
              }
            })
          }
         
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    // 点击接收面试邀请按钮
    clickAcceptBtn(){
      let that = this;
      let selt_info = that.selt_info;
      console.log(selt_info)
      let p = {
        id: selt_info.type_id, 
      }
      that.$axios.post('/api/user/receive-interview-invite',p).then( res =>{
        if(res.code == 0){
          that.$message.success({
            message:'接收面试邀请成功'
          })
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    // 交换联系方式
    clickContactBtn(){
      let that = this;
      let selt_info = that.selt_info;
      let p = {
        // id: selt_info.type_id, 
        position_id: selt_info.position_id,
        company_id: selt_info.company_id,
        company_uid: selt_info.company.uid,
      }
      let showMessage = { // 页面展示的我的提问
        type:1,
        content: '交换联系方式',
        user_avatar: this.$store.state.user.realAvatar,
        createtime: this.getCurrentTime(),
      }
      that.msgList.push(showMessage);
      that.originMessage = '';
      that.scrollBottom(); // 页面滚动到底部
      return
      that.$axios.post('',p).then( res =>{
        if(res.code == 0){
          
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    //  发送简历
    clickSendResumeBtn(t){
      let that = this;
      let selt_info = that.selt_info;
      let tag = t;
      let p = {
        // id: selt_info.type_id, 
        position_id: selt_info.position_id,
        company_id: selt_info.company_id,
        company_uid: selt_info.company.uid,
      }
      that.$axios.post('/api/user/send-resume',p).then( res =>{
        if(res.code == 0){
          that.$message.success({
            message:'发送简历成功！'
          })
          if(tag == 'fsjl'){
            let showMessage = { // 页面展示的我的提问
              type:1,
              content: '发送简历',
              user_avatar: this.$store.state.user.realAvatar,
              createtime: this.getCurrentTime(),
            }
            that.msgList.push(showMessage);
            that.originMessage = '';
            that.scrollBottom(); // 页面滚动到底部
          }
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    // 查看面试信息详情
    clickViewInterviewInfo(){

    },
    //滚动到底部
    scrollBottom:function(){
      var that=this;
      this.$nextTick(function(){
          var container = that.$refs.scrollbar;
          container.scrollTop = 999999999;
      });
    },
    clickCyy(text){
      this.originMessage = text;
      this.onSendClcik();
    }
  }
}
</script>

<style lang="scss" scoped>
  // 聊天页面样式
  .chat-window-box{
    padding: 0;
    width: 100%;
    flex: 1;
    display: flex;
    // height: calc(100vh - 75px);
    height: 100%;
    .left-box{
      width: 340px;
      border-right: 1px solid #F2F3F5;
      .seach-box{
        width: 100%;
        height: 54px;
        border-bottom: 1px solid #F2F3F5;
      }

      .personAbility-box{
        .personAbility-items-box{
          width: 100%;
          padding: 8px 6px;
          display: flex;
          cursor: pointer;
          &>img{
            width: 34px;
            height: 34px;
            border-radius: 50%;
          }
          &.hover{
            background: #e1dfdf59;
          }
          &:hover{
            background: #e1dfdf59;
          }

          .name-box{
            flex: 1;
            padding-left: 6px;
            .name-t{
              display: flex;
              align-items: center;
              .span-1{
                font-size: 14px;
                font-weight: 500;
                color: #1F2E4D;
                line-height: 22px;
              }
              .span-2{
                padding-left: 4px;
                font-size: 12px;
                color: #1F2E4D;
                line-height: 20px;
              }
            }
            .sub-title{
              font-size: 12px;
              font-weight: 400;
              color: #86909C;
              line-height: 20px;    
              text-overflow: ellipsis;
              overflow: hidden;
              /*弹性盒模型*/
              display: -webkit-box;
              /*上下垂直*/
              -webkit-box-orient: vertical;
              /*当属性值为3，表示超出3行隐藏。限制在一个块元素显示的文本的行数，需要和上面两个属性结合*/
              -webkit-line-clamp: 1;
            }
          }
          .time{
            width: auto;
            font-size: 12px;
            font-weight: 400;
            color: #86909C;
            line-height: 20px;
          }

        }
      }
    }
    .right-box{
      flex: 1;
      width: 100%;
      // height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .seach-box{
        width: 100%;
        height: 54px;
        border-bottom: 1px solid #F2F3F5;
        padding: 0 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .seach-box-info{
          display: flex;
          align-items: center;
          img{
            width: 34px;
            height: 34px;
            border-radius: 50%;
          }
          .name-t{
            padding-left: 4px;
            .span-1{
              font-size: 14px;
              font-weight: 500;
              color: #1F2E4D;
              line-height: 22px;
            }
            .span-2{
              font-size: 12px;
              line-height: 20px;
              span{
                color: $g_color;
              }
            }
          }
        }
        .fileSearch-img{
          width: 18px;
          height: 18px;
        }

      }

      .job-box{
        padding: 10px 30px 30px 30px;
        background: #fff;
        flex: 1;
      }

    }
    div.job-1{
      display: flex;
      align-items: center;
      .job-title{
        font-size: 14px;
        font-weight: 400;
        color: #86909C;
        line-height: 22px;
      }
      .blue{
        font-size: 14px;
        font-weight: 400;
        color: #3377FF;
        line-height: 22px;
        padding-left: 4px;
      }
    }
  }
  
  .scrollbar {
    overflow: auto;
  }

  #content, #footer {
    padding: 12px 16px;
    width: 100%;
  }
  #content {
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background: #fff;
    flex: 1;
  }
  dd, dl, dt, li, ol, ul {
    list-style: none;
  }
  .msg {
    float: right;
    width: 100%;
    position: relative;
    color: #fff;
    font-size: 14px;
    word-wrap: break-word;
    -webkit-border-radius: 18px;
    border-radius: 18px;
    text-align: left;
  }

  .messages {
    width: 100%;
    position: relative;
    padding-top: 0;
  }
  .messages dd, .messages dt {
      margin-top: 10px;
      overflow: hidden;
  }
  .messages dt {
      text-align: center;
  }
  .messages dt:first-child {
      margin-top: 0;
  }
  .messages h3, .messages h4 {
    color: #999;
    font-size: 14px;
    font-weight: 400;
  }
  .msg-recv {
    float: left;
    color: inherit!important;
  }
  .messages .msg-recv {
    color: #222!important;
    margin-left: 48px;
  }

  .messages .msg>img {
    position: absolute;
    top: 5px;
    left: -50px;
    width: 38px;
    height: 38px;
    border-radius: 50%;
  }
  .messages .msg-recv>img {
      top: 5px;
      left: -48px;
      right: auto;
  }
  .messages .msg-recv>img, .messages .msg-send>img {
      display: inline-block;
  }
  .sender, .msg .sender {
    font-size: 12px;
    color: rgba(36,46,51,.4);
    display: block;
    min-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: right;
  }
  .msg-recv .sender {
    left: 8px;
    text-align: left;
  }
  .msg .msg-content-and-after{
    display: flex;
    align-items: center;
  }
  .msg .msg-content-and-after .msg-btn{
    width: 120px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    font-size: 14px;
    color: #fff;
    background: #14b8a6;
    margin: 20px;
    cursor: pointer;
  }
  .msg .msg-content-and-after .msg-btn.msg-btn-5{
    background-color: #07c160;
    cursor: not-allowed;
    opacity: 0.5;
  }
  .msg-recv .sender .sender-text {
      display: inline-block;
  }
  .msg-recv .sender .time-text {
      padding-left: 10px;
  }
  .msg .msg-content {
    margin-top: 2px;
    padding: 8px 12px;
    word-wrap: break-word;
    -webkit-border-radius: 18px;
    border-radius: 8px;
    -webkit-transition: .2s;
    transition: .2s;
    display: inline-block;
    background-color: #fff;
    position: relative;
    max-width: 320px;
  }
  .bot .msg .msg-content {
      float: right;
      min-height: 32px;
  }
  .msg.msg-recv .msg-content {
    background-color: #f3f5fa;
    border: unset;
    color: #000;
  }
  .bot .msg.msg-recv .msg-content {
    float: left;
  }
  .bot .msg .more-msg-box {
    width: 100%;
    float: left;
  }
  .messages .msg-send {
    margin-right: 48px;
  }
  .messages .msg.msg-send>img {
    top: 0;
    left: auto;
    right: -48px;
  }
  .msg.msg-send .sender {
    text-align: right;
  }
  .msg.msg-send .msg-content-and-after {
    flex-flow: row-reverse;
  }
  .msg .sender-text {
    display: none;
  }
  .msg.msg-send .msg-content, .msg.robot-msg-send .msg-content {
    float: right;
  }
  .msg.msg-send .msg-content, .msg.robot-msg-send .msg-content {
    background-color: #14b8a6;
    border: unset;
  }

  #show-history {
    color: #242e3380;
    color: #242e33\0;
    font-size: 12px;
  }
  #footer {
    z-index: 1;
    background-color: #fff;
    // box-shadow: 0 1px 10px 0 #e5e7eb;
    padding: 0 0 12px 0;
    .icon-btn-box{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4px 8px;
      border-top: 1px solid #e9e9e9;
      .footer-right{
        display: flex;
        align-items: center;
        &>div{
          display: flex;
          align-items: center;
          margin-left: 10px;
          cursor: pointer;
          img{
            width: 14px;
            height: 14px;
          }
          span{
            font-size: 12px;
            font-weight: 400;
            color: #86909C;
            line-height: 22px;
            margin-left: 2px;
          }
          &:hover span{
            color: $g_textColor;
          }
        }
      }
    }
  }
  .ui-editor {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ui-editor .textbox {
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1280px;
  }
  .ui-editor textarea {
    display: block;
    width: 100%;
    min-height: 40px;
    max-height: 160px;
    padding: 0 98px 0 0;
    color: #242e33;
    font-size: 14px;
    outline: 0;
    resize: none;
    border: 0;
    overflow-y: auto;
    word-wrap: break-word;
    word-break: break-all;
    line-height: 20px;
  }
  .ui-editor .n-input-wrapper{
    flex: 1;
  }
  .ui-editor .n-input-wrapper >>> .el-input__inner:hover,.ui-editor .n-input-wrapper >>> .el-input__inner:focus{
    border-color: #14b8a6;
  }
  .ui-editor .btn-send {
    width: auto;
    z-index: 21;
    font-size: 14px;
    padding: 2px 40px;
    color: #242e33;
    line-height: 35px;
    border-radius: 3px;
    border: 1px solid #e6e6e6;
    background: #f5f5f5;
    margin-left: 20px;
    cursor: pointer;
  }

  .container-yqms /deep/ .el-dialog{
    min-width: 320px;
    top: 50%;
    transform: translateY(-50%);
    margin-top: 0 !important;
    background: #F7F9FC;
    .el-dialog__header{
      text-align: left;
      background: #fff;
      padding: 16px 20px;
      .el-dialog__title{
        font-size: 16px;
        color: $g_textColor;
      }
    }
    .el-dialog__body{
      height: auto;
      overflow: overlay;
      padding: 16px;
      display: flex;
      .pc-preview-wrapper{
        flex: 1;
        color: #414a60;
        line-height: 26px;
      }

    }
  }
  .footer-left{
    .username-wrapper{
      cursor: pointer;
      color: #14b8a6;
    }
  }
  
  /deep/ .el-dropdown-menu{
    padding: 0;
    margin: 0;
  }
  /deep/ .el-dropdown-menu__item:focus, /deep/ .el-dropdown-menu__item:not(.is-disabled):hover{
    color: $g_color;
  }
  /deep/ .el-dropdown-menu__item--divided{
    margin-top: 0;
    border-top: none;
  }
  /deep/ .el-dropdown-menu__item{
    line-height: 22px;
  }
  /deep/ .el-dropdown-menu__item, .el-menu-item{
    padding: 0 10px;
  }
  @media screen and (max-width: 1366px) {
    .chat-window-box .left-box[data-v-0474381f] {
      width: 280px;
    }
  }
</style>
