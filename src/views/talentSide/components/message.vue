<template>
  <!-- <div class="message" v-scroll-bottom="session.messages"> -->
  <div class="message" ref="scrollbar">
    <ul v-if="session">
      
      <li class="bot clearfix" :style="`margin:${!item.content?0:''}`" v-for="(item,index) in session.chat_list" :key="index">
        <div class="main" :class="{ self: item.friend_uid != my_uid }" style="color:#fff" v-if="item.content">
          <img class="msg-avatar" width="30" height="30" :src="item.user_avatar ? item.user_avatar : require('../../../assets/image/bossSide/img-user.jpg')" />
          <div class="sender">
            <span class="time-text">{{item.createtime}}</span>
          </div>
          <div class="msg-content-and-after">
            <div class="msg-content">
              <div class="text" v-html="item.content"></div>
            </div>
          </div>
        </div>
      </li>
      <el-empty description="暂无消息..." v-if="!session.chat_list || session.chat_list.length<=0 "></el-empty>
    </ul>
  </div>
</template>
<script>
export default {
  props:{
    currentId:{
      type: Number,
      default() {
        return 0
      }
    },
    selt_info:{
      type: Object,
      default() {
        return {}
      }
    },
    content:{
      type: String,
      default() {
        return ''
      }
    },
  },
  data(){
    return {
      my_uid: window.localStorage.getItem('realUid'),
      uid: null,
      viewHeight:'',
      originMessage:'',
      loading: false,
      source: null,
      session: {},
    }
  },
  watch: {
    currentId(newValue, oldValue) {
      this.currentId = newValue;
      this.getCurrentId();   
    },
    selt_info(newValue, oldValue){
      this.selt_info = newValue;
      this.getSessionlist();   
    },
    content(newValue, oldValue){
      this.content = newValue;
      this.getShowMessage();   
    },
  },
  methods:{
            /**
     * 获取当前时间 格式：yyyy-MM-dd HH:MM:SS
    */
    getCurrentTime() {
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
    zeroFill(i) {
      if (i >= 0 && i <= 9) {
        return "0" + i;
      } else {
        return i;
      }
    },
    getShowMessage(){
      let content = this.content;
      this.session.chat_list.push({
        friend_uid: this.session.attention_uid,
        user_avatar: this.$store.state.user.realAvatar,
        content,
        createtime: this.getCurrentTime(),
      })
      this.scrollBottom(); // 页面滚动到底部
    },
    getCurrentId(){
      this.uid = this.currentId;
    },
    getSessionlist(){
      this.session = this.selt_info;
      console.log(this.session)
      this.scrollBottom(); // 页面滚动到底部
    },
    
    // 发送消息后滚动到底部
    scrollBottom: function () {
      var that = this;
      this.$nextTick(function () {
        var container = that.$refs.scrollbar;
        container.scrollTop = 999999999;
      });
    },
  },
  // directives: {
  //   'scroll-bottom'() {
  //     this.$nextTick(() => {
  //       this.el.scrollTop = this.el.scrollHeight - this.el.clientHeight;
  //     });
  //   }
  // }
};
</script>
<style lang="scss" scoped>
.message {
  padding: 10px 15px;
  overflow-y: scroll;
  li {
    margin-bottom: 15px;
  }

  .time {
    margin: 7px 0;
    text-align: center;

    >span {
      display: inline-block;
      padding: 0 18px;
      font-size: 12px;
      color: #fff;
      border-radius: 2px;
      background-color: #dcdcdc;
    }
  }

  .msg-avatar {
    float: left;
    margin: 0 10px 0 0;
    border-radius: 50%;
    width: 40px;
    height: 40px;

  }
  .sender{
    font-size: 12px;
    color: rgba(36,46,51,.4);
    display: block;
    min-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: right;
  }

  .text {
    display: inline-block;
    position: relative;
    padding: 0 10px;
    max-width: calc(100% - 40px);
    min-height: 30px;
    line-height: 2.5;
    font-size: 12px;
    text-align: left;
    word-break: break-all;
    background-color: #fafafa;
    border-radius: 4px;

    &:before {
      content: " ";
      position: absolute;
      top: 9px;
      right: 100%;
      border: 6px solid transparent;
      border-right-color: #fafafa;
    }
  }

  .self {
    text-align: right;

    .msg-avatar {
      float: right;
      margin: 0 0 0 10px;
    }

    .text {
      background-color: #14b8a6;

      &:before {
        right: inherit;
        left: 100%;
        border-right-color: transparent;
        border-left-color: #14b8a6;
      }
    }
  }
}
</style>