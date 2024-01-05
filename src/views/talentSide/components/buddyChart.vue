<template>
  <div class="chat-window-box">
    <!-- 左侧信息列表 开始 -->
    <div class="chat-sidebar">
      <div class="list">
        <ul>
          <li v-for="(item,index) in sessions" :key="index" :class="{ active: item.id === currentId }" @click="selectSession(item)">
            <img class="avatar"  width="30" height="30" :alt="item.name" src="https://zlw0720.oss-cn-beijing.aliyuncs.com/avatar/20231222/adf79811dadb6f5cea85c19e36cc3517.png">
            <p class="name">{{item.name}}</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 左侧信息列表 结束 -->
    <div class="chat-main">
      <message></message>
      <text></text>
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
      msgList:[],  // type 1为用户 msg-recv， 2为企业 msg-send
      sessions:[{name:'好友一',},{name:'好友二'}], // 左侧信息列表
      loading: false,
      source: null,
      page: 1,
      pagesize: 20,
      currentId: null, // 好友id
      selt_info:{}, // 选中的左侧列表对象
    }
  },
  mounted(){
    this.company_id = this.company_id;
    console.log(this.company_id)
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
    selectSession(i){
      let that = this;
      that.selt_info = i;
      that.currentId = i.id;
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
          let sessions = res.data;
          that.sessions = sessions;

          if(that.company_id){
            sessions.forEach( ele =>{
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
  // 聊天页面样式
  .chat-window-box{
    padding: 0;
    width: 100%;
    flex: 1;
    display: flex;
    height: calc(100vh - 180px);
    // height: 100%;
    text-align: left;
    background: #fff;
    border-radius: 6px;
    .chat-sidebar, .chat-main {
      height: 100%;
    }
    .chat-sidebar {
      float: left;
      width: 300px;
      color: #333;
        background-color: #e7e6e58c;
        padding: 10px;
        border-radius: 6px;
      .list {
        li {
          padding:10px;
          cursor: pointer;
          transition: background-color .1s;

          &:hover {
            background-color:#c7c5c4;
          }
          &.active {
            background-color:#c7c5c4;
          }
        }
        .avatar, .name {
            vertical-align: middle;
        }
        .avatar {
          border-radius: 50%;
          width: 40px;
          height: 40px;
        }
        .name {
            display: inline-block;
            margin: 0 0 0 15px;
        }
      }
    }
    .chat-main {
        position: relative;
        overflow: hidden;
        background-color: #eee;
    }
    .chat-text {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
    }
    .chat-message {
        height: calc(100% - 160px);
    }
  }
  
  

</style>
