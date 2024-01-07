<template>
  <div class="chat-window-box">
    <!-- 左侧信息列表 开始 -->
    <div class="chat-sidebar">
      <div class="list">
        <ul>
          <li class="personAbility-items-box" v-for="(item, index) in sessions" :key="index" :class="{ active: item.users.uid === currentId }"
            @click="selectSession(item)">
            <img :src="item.users.avatar ? item.users.avatar:require('../../../assets/image/bossSide/img-user.jpg')" alt="" />
            <div class="name-box">
              <div class="name-t">
                <span class="span-1">{{item.users.real_name}}</span>
              </div>
              <div class="sub-title">{{item.chat_list[item.chat_list.length-1].content}}</div>
            </div>
            <!-- <span class="time">{{item.createtime}}</span> -->
          </li>
        </ul>
      </div>
    </div>
    <!-- 左侧信息列表 结束 -->
    <div class="chat-main">
      <message :currentId="currentId" :content="content" :selt_info="selt_info"></message>
      <messagetext :currentId="currentId" @sendMessage="sendMessage"></messagetext>
    </div>
  </div>
</template>

<script>
import Message from './message';
import messagetext from './messagetext';
export default {
  components: { 
    Message,
    messagetext
  },
  props: {
    is_type: {
      type: String,
      default() {
        return ''
      }
    },
  },
  data() {
    return {
      viewHeight: '',
      sessions: [], // 左侧信息列表
      loading: false,
      page: 1,
      pagesize: 20,
      currentId: null, // 好友id
      selt_info: {}, // 选中的左侧列表对象
      content: '',

    }
  },
  mounted() {
    this.getSysMsgList();
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

    selectSession(i) {
      let that = this;
      that.selt_info = i;
      that.currentId = i.users.uid;
      // that.scrollBottom(); // 页面滚动到底部
    },

    // 获取聊天列表
    getSysMsgList() {
      let that = this;
      that.$axios.post('/api/user/friend/chat/list', {
        page: that.page,
        pagesize: that.pagesize
      }).then(res => {
        if (res.code == 0) {
          let sessions = res.data;
          that.sessions = sessions;
          sessions.forEach(ele => {
            if (ele.uid == that.currentId) {
              console.log(ele)
              that.selectSession(ele)
            }
          })

        } else {
          that.$message.error({
            message: res.msg
          })
        }
      })
    },
    sendMessage(e){
      this.content = e;
    },
    //滚动到底部
    scrollBottom: function () {
      var that = this;
      this.$nextTick(function () {
        var container = that.$refs.scrollbar;
        container.scrollTop = 999999999;
      });
    },

  }
}
</script>

<style lang="scss" scoped>
// 聊天页面样式
.chat-window-box {
  padding: 0;
  width: 100%;
  flex: 1;
  display: flex;
  // height: calc(100vh - 180px);
  height: 100%;
  text-align: left;
  background: #fff;
  border-radius: 6px;

  .chat-sidebar,
  .chat-main {
    height: 100%;
  }

  .chat-sidebar {
    float: left;
    width: 300px;
    color: #333;
    border-right: 1px solid #e9e9e9;
    .list {
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
          &.active{
            background: #f0f0f0;
          }
          &:hover{
            background: #f0f0f0;
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
      .avatar,
      .name {
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
    background-color: #fff;
    flex: 1;
  }

  .text {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
  }

  .message {
    height: calc(100% - 140px);
  }
}
@media screen and (max-width: 1366px) {
  .chat-window-box .chat-sidebar {
    width: 240px;
  }
  .chat-window-box .chat-sidebar .list .name {
    margin: 0 0 0 6px;
  }
  .chat-window-box .chat-sidebar .list li{
    padding: 6px;
  }
}
</style>
