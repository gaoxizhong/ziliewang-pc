<template>
  <div class="bossSide-container interaction-box">
    <div class="chat-window-box">
      <buddyChart />
    </div>

    <!-- 面试邀请弹窗 开始 -->
    <div class="container-yqms">
      <el-dialog title="邀请面试" :center="false" :visible.sync="yqms_dialogVisible" width="800px" :before-close="yqms_handleClose">
        <div class="pc-preview-wrapper m-box">
          <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm">

            <el-form-item label="面试方式" prop="type">
              <el-select v-model="ruleForm.type" placeholder="面试方式">
                <el-option label="线上" value="1"></el-option>
                <el-option label="线下" value="2"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="开始时间" prop="begin_time">
              <el-date-picker
                v-model="ruleForm.begin_time"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm"
                >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="begin_time">
              <el-date-picker
                v-model="ruleForm.end_time"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm"
                >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="企业联系人" prop="staff">
              <el-input v-model="ruleForm.staff" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="ruleForm.phone" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="ruleForm.remark" placeholder="请输入"></el-input>
            </el-form-item>
            
            <el-form-item class="btn-box">
              <el-button type="primary" @click="submitForm">发送邀请</el-button>
              <!-- <el-button @click="resetForm">重置</el-button> -->
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
    <!-- 面试邀请弹窗 结束 -->
    <!-- 查看在线简历弹窗 开始 -->
    <div>
      <onlineResume :infoData="onlineResumeData" :basic_info="online_basic_info" :is_type="is_type" ref="onlineResume"/>
    </div>
    <!-- 查看在线简历弹窗 结束 -->
    <!-- 预览附件简历pdf 弹窗  -->
    <div class="container-pdf">
      <el-dialog title="附件预览" :center="false" :visible.sync="pdf_dialogVisible" width="800px" :before-close="pdf_handleClose">
        <div class="pdf-preview-box">
          <div class="pdfViewer" id="viewer">
            <pdf :src="src" style="width: 100%;" :page="i" v-for="i in numPages" :key="i" ref="pdf"></pdf>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import onlineResume from "../components/onlineResume.vue";
import pdf from 'vue-pdf';
import buddyChart from '../../bossSide/components/mag/buddyChart.vue';

export default {
  components: {
    onlineResume,
    pdf,
    buddyChart
  },
  data() {
    return {
      tabStatus: 1, //消息类型 1.投递 2.邀请 3.不合适 4.其他
      uid: window.localStorage.getItem('uid'),
      originMessage:'',
      message:[], // 累计对话记录
      msgList:[],  // type 1为用户 msg-recv， 2为企业 msg-send
      sysMsgListData:[], // 左侧信息列表
      loading: false,
      yqms_dialogVisible: false,
      ruleForm:{
        type:'',
        begin_time:'',
        end_time:'',
        staff:'',
        phone:'',
        remark:''
      },
      page: 1,
      pagesize: 20,
      user_uid:'', // 对方uid
      selt_index: -1,
      selt_info: '',
      onlineResumeData:{}, // 在线简历
      online_basic_info:{}, // 在线简历个人信息
      is_type:'',
      pdfUrl:'',
      src: "",
      pdf_dialogVisible: false,
      numPages: 0

    }
  },
  created(){
    this.user_uid = this.$route.query.user_uid;
  },
  mounted(){
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
    pdf_handleClose(done) {
      this.pdf_dialogVisible = false;
    },
    yqms_handleClose(done) {
      this.yqms_dialogVisible = false;
    },
    clickStatus(n){
      this.tabStatus = n;
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
        uid: that.selt_info.uid,
        content: that.originMessage
      }
      let showMessage = { // 页面展示的我的提问
        type: 2,
        content:that.originMessage,
        createtime: this.getCurrentTime(),
      }
      that.$axios.post('/api/company/find-user',p).then( res =>{
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
      that.user_uid = i.uid;
      that.msgList = i.chat_list;
      that.scrollBottom(); // 页面滚动到底部
    },


    // 邀请面试
    clickYqms(){
      this.yqms_dialogVisible = true;
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
          sysMsgListData.forEach( ele =>{
            if(ele.uid == that.user_uid){
              console.log(ele)
              that.clickmsgListData(ele)
            }
          })
          // that.selt_info = that.sysMsgListData[that.selt_index]
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    // 查看在线简历
    onlineResume(){
      let that = this;
      let selt_info = that.selt_info;
      that.$axios.post('/api/company/resume/detail',{
        uid: selt_info.uid
      }).then( res =>{
        if(res.code == 0){
          that.onlineResumeData = res.data;
          that.online_basic_info = res.data.basic_info;
          that.$refs.onlineResume._data.zx_dialogVisible = true;
          // that.zx_dialogVisible = true;
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    // 点击附件简历名称---预览
    clickVitae(url){
      this.pdfUrl = url;
      // 有时PDF文件地址会出现跨域的情况,这里最好处理一下
      this.src = pdf.createLoadingTask(this.pdfUrl);
      this.getPDFnums(this.pdfUrl);
      this.pdf_dialogVisible = true;
    },
    //计算pdf页码总数
    getPDFnums(url) {
      this.loading = true
      //let loadURL = pdf.createLoadingTask(url)
      let loadURL = pdf.createLoadingTask({
        url: url,//你的pdf地址
      })

      loadURL.promise.then(pdf => {
          this.numPages = pdf.numPages
          this.$set(this, 'docsPDF.numPages', pdf.numPages)
          this.loading = false
      }).catch(err => {
          this.loading = false;
          this.loadingError = true;
      })
    },
    // 点击发送面试邀请
    submitForm(){
      let that = this;
      let selt_info = that.selt_info;
      let p = {
        status: 2, //1.待查看2.发送邀请 3.不合适 4.已参加 5已超时
        uid: selt_info.uid, // 用户 
        id: selt_info.company_interview_id, // 面试信息id 
        company_id: selt_info.company_id, // 企业id
        position_id: selt_info.position_id,  // 岗位信息id
        system_msg_id: selt_info.id,  // 消息id
        type_id:  selt_info.type_id,
        type: that.ruleForm.type,
        begin_time: that.ruleForm.begin_time,
        end_time: that.ruleForm.end_time,
        staff: that.ruleForm.staff,
        phone: that.ruleForm.phone,
        remark: that.ruleForm.remark
      }
      console.log(p)
      that.$axios.post('/api/company-interview/edit',p).then( res =>{
        if(res.code == 0){
          that.$message.success({
            message:'发送面试邀请成功'
          })
          this.yqms_dialogVisible = false;
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    click_bhs(n){
      let that = this;
      let selt_info = that.selt_info;
      let p = {
        status: n, //1.待查看 2 发出邀请 3不合适  6求简历
        uid: selt_info.uid, // 用户 
        id: selt_info.company_interview_id, // 面试信息id 
        company_id: selt_info.company_id, // 企业id
        position_id: selt_info.position_id,  // 岗位信息id
        system_msg_id: selt_info.id,  // 消息id
        type_id:  selt_info.type_id,
      }
      that.$axios.post('/api/company-interview/edit',p).then( res =>{
        if(res.code == 0){
          if(n == 3){
            that.$message.success({
              message:'已添加为不合适'
            })
          }
          if(n == 6){
            that.$message.success({
              message:'发送成功！'
            })
          }
          
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },



  //滚动到底部
    scrollBottom:function(){
      var that=this;
      this.$nextTick(function(){
          var container = that.$refs.scrollbar;
          container.scrollTop = 999999999;
      });
    },
  
  }
}
</script>

<style lang="scss" scoped>
  .interaction-box{
    height: 100%;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 75px);
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .tab-box{
    height: auto;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .tab-left{
      width: auto;
      display: flex;
      align-items: center;
      &>div{
        width: auto;
        height: 1.7rem;
        line-height: 1.7rem;
        padding: 0 10px;
        background: #FFFFFF;
        border-radius: 4px;
        border: 1px solid #E5E6EB;
        margin-right: 4px;
        text-align: center;
        font-size: 0.7rem;
        font-weight: 400;
        color: $g_textColor;
        cursor: pointer;
      }
      &>div.hover-items{
        color: $g_color;
        border-color: $g_color;
      }
    }
    .tab-right{
      width: 124px;
      height: 32px;
      line-height: 32px;
      border-radius: 6px;
      background: $g_bg;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      img{
        width: 14.3px;
        height: 14.3px;
      }
      span{
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        padding-left: 4px;
      }
    }
  }
  // 聊天页面样式
  .chat-window-box{
    padding: 0;
    width: 100%;
    margin: 0 auto;
    flex: 1;
    display: flex;
    height: calc(100vh - 120px);
    margin-top: 15px;
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
          padding: 0.8rem 6px;
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
              color: #86909C;
              line-height: 20px;
            }
          }
        }
        .fileSearch-img{
          width: 18px;
          height: 18px;
          margin-right: 10px;
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
  .content-box{
    width: 100%;
    height: auto;
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
  .msg-btn{
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
            width: 18px;
            height: 18px;
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

  .container-pdf /deep/ .el-dialog{
    min-width: 320px;
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
      height: calc(100vh - 128px);
      overflow: hidden;
      padding: 20px;
      .pdf-preview-box{
        width: 794px;
        height: calc(100vh - 172px);
        overflow-y: auto;
        overflow-x: hidden;
      }
    }
    
  }

</style>