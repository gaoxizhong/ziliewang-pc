

<template>
  <div class="text">
    <textarea placeholder="按 Ctrl + Enter 发送" v-model="content" @keyup="onKeyup"></textarea>
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
    }
  },
  data() {
    return {
      content: '',
      uid: null,
    };
  },
  watch: {
    currentId(newValue, oldValue) {
      this.currentId = newValue;
      this.getCurrentId();   
    }
  },
  methods: {
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
    getCurrentId(){
      this.uid = this.currentId;
      console.log(this.uid)
    },
    onKeyup(e) {
      if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
        this.sendMessage(this.content);
        this.content = '';
      }
    },
     // 发送消息
     sendMessage (content) {
      let that = this;
      let p = {
        friend_uid: that.uid,
        content: content
      }
      that.$axios.post('/api/user/chat',p).then( res =>{
        if(res.code == 0){
          that.originMessage = '';
          that.$emit('sendMessage',content)
        }else{
          that.$message.error({
            message:res.msg
          })
        }
      })
    },
    
  }
};
</script>
<style lang="scss" scoped>
.text {
  height: 140px;
  border-top: solid 1px #ddd;

  textarea {
    padding: 10px;
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    font-family: "Micrsofot Yahei";
    resize: none;
  }
}
</style>