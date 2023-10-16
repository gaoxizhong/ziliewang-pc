<template>
  <!-- 沟通页 -->
  <div class="container interaction-box">
    <div class="tab-box"></div>
    <div class="chat-window-box m-box">
      <div class="left-box">
        <div class="seach-box"></div>
        <div class="personAbility-box">

          <div class="personAbility-items-box" :class="selt_index == index?'hover':''" v-for="(item,index) in msgListData" :key="index" @click="clickmsgListData(item,index)">
            <img src="../../../assets/image/bossSide/img-user.jpg" alt="" />
            <div class="name-box">
              <div class="name-t">
                <span class="span-1" v-if="item.user">{{item.user.real_name}}</span>
                <!-- <span class="span-2">{{item.user.position?item.user.position:'暂无'}}</span> -->
              </div>
              <div class="sub-title">{{item.msg_content}}</div>
            </div>
            <span class="time">{{item.createtime}}</span>
          </div>

        </div>
      </div>
      <div class="right-box center-box" v-if="selt_info">
        <div class="seach-box">
          <div class="seach-box-info">
            <img src="../../../assets/image/bossSide/img-user.jpg" alt="" />
            <div class="name-t">
              <div class="span-1" v-if="selt_info.user">{{selt_info.user.real_name}}</div>
              <div class="span-2" v-if="selt_info.user">{{selt_info.user.position}}</div>
            </div>
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
            <dd class="bot clearfix" data-invalid-transfer="true" v-for="(item,index) in msgList" :key="index">
              <div :class=" item.msg_type == 1 ?'msg-recv':'msg-send' " class="msg" style="color:#fff">
                <div class="sender">
                  <!-- <span class="sender-text">{{item.name}}</span> -->
                  <span class="time-text">{{item.time}}</span>
                </div>
                <div class="msg-content-and-after">
                  <div class="msg-content">
                    <div v-html="item.content"></div>
                    <div class="msg-btn" v-if="item.msg_type == 1 && item.msg_status == 2" @click="clickAcceptBtn">接收邀请</div>
                  </div>
                </div>
              </div>
            </dd>
          </dl>

          <div id="msg_end" ref="msg_end" style="height:0px; overflow:hidden"></div>

        </div>


        <div class="theme-c clearfix" id="footer" style="display: block;">
          <div class="icon-btn-box">
            <div></div>
            <!-- <div class="footer-right">
              <div>
                <img src="../../../assets/image/bossSide/int-qjl.png" alt="" />
                <span>求简历</span>
              </div>
              <div>
                <img src="../../../assets/image/bossSide/int-yqms.png" alt="" />
                <span>邀面试</span>
              </div>
            </div> -->
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
        <img src="../../../assets/image/bossSide/icon-chat-welcome.png" alt="" />
        <div class="welcome-tips">
          <p>与您进行过沟通的 Boss 都会在左侧列表中显示</p>
        </div>
      </div>

    </div>
    
  </div>
</template>
<script>
export default {
  data(){
    return {
      uid: window.localStorage.getItem('uid'),
      viewHeight:'',
      originMessage:'',
      message:[], // 累计对话记录
      msgList:[   // 1为企业 msg-recv， 2为用户  msg-send
        {msg_type: 2,msg_status:1,content:'投递简历',time:'2023-10-16 10:00:00'},
        {msg_type: 1,msg_status:2,content:'发送面试邀请',time:'2023-10-16 10:00:00'},
      ],
      loading: false,
      source: null,
      page: 1,
      pagesize: 20,
      msgListData:[], // 左侧信息列表
      selt_index: -1,
      selt_info: '',
    }
  },
  mounted(){
    this.getSysMsgList();
  },
  methods:{
    onSendClcik(){

    },
    clickmsgListData(i,in_dx){
      let that = this;
      that.selt_info = i;
      that.selt_index = in_dx;
    },

    // 获取聊天列表
    getSysMsgList(){
      let that = this;
      that.$axios.post('/api/sys-msg/list',{
        page: that.page,
        pagesize: that.pagesize
      }).then( res =>{
        console.log(res)
        if(res.code == 0){
          that.msgListData = res.data;
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
      let p = {
        id: selt_info.id, // 消息id 
      }
      that.$axios.post('/api/user/receive-interview-invite',p).then( res =>{
        console.log(res)
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
  }
}
</script>
<style lang="scss" scoped>
  .interaction-box{
    min-height: calc(100vh - 70px);
    margin: 0 auto;
  }

  // 聊天页面样式
  .chat-window-box{
    padding: 0;
    width: 100%;
    flex: 1;
    display: flex;
    height: calc(100vh - 75px);
    .left-box{
      width: 300px;
      border-right: 1px solid #F2F3F5;
      .seach-box{
        width: 100%;
        height: 54px;
        border-bottom: 1px solid #F2F3F5;
      }

      .personAbility-box{
        .personAbility-items-box{
          width: 100%;
          padding: 0.8rem 0.6rem;
          display: flex;
          cursor: pointer;
          &>img{
            width: 2rem;
            height: 2rem;
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
                padding-left: 2px;
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
              color: #86909C;
              line-height: 20px;
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
    margin-top: 8px;
    cursor: pointer;
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
    box-shadow: 0 1px 10px 0 #e5e7eb;
    padding: 0 16px 12px 16px;
    .icon-btn-box{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      .footer-right{
        display: flex;
        align-items: center;
        &>div{
          display: flex;
          align-items: center;
          margin-left: 10px;
          cursor: pointer;
          img{
            width: 20px;
            height: 20px;
          }
          span{
            font-size: 14px;
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

</style>