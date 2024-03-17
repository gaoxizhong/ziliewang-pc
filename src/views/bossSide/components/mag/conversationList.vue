<template>
  <div class="mag-box">
    <div v-if="conversations.length">
      <div class="contact-list-title" v-if="title_show != 'navbarMag'">聊天记录</div>
      <div v-for="(item, key) in conversations" :key="key" @click="chatLocation(item)" class="conversation-box" :class="{actived: profile.friend && profile.friend.uid == item.userId}">
        <div class="conversation" @contextmenu.prevent.stop="e => showRightClickMenu(e,conversation)">
          <div class="avatar">
            <img :src="item.data.avatar"/>
            <div v-if="item.unread>0"
                class="unread-count">
              <span class="unread">{{ item.unread }}</span>
            </div>
          </div>
          <div class="conversation-message">
            <div class="conversation-top">
              <span class="conversation-name">{{ item.data.name }}</span>
              <div class="conversation-time">
                <div>{{ formatDate(item.lastMessage.timestamp) }}</div>
              </div>
            </div>
            <div class="conversation-bottom">
              <div class="conversation-content" v-if="item.lastMessage.recalled">
                <div v-if="item.type === 'private'">
                  {{ item.lastMessage.senderId === currentUser.id ? '你' : `"${item.data.name}"` }}撤回了一条消息
                </div>
                <div v-if="item.type === 'group'">
                  {{ item.lastMessage.senderId === currentUser.id ? '你' : `"${item.lastMessage.senderData.name}"` }}撤回了一条消息
                </div>
              </div>
              <div class="conversation-content" v-else>
                <div class="unread-text"
                      v-if="item.lastMessage.read === false && item.lastMessage.senderId === currentUser.id">
                  [未读]
                </div>
                <div v-if="item.type === 'private'">
                  {{ item.lastMessage.senderId === currentUser.id ? '我' : item.data.name }}:
                </div>
                <div v-else>
                  {{ item.lastMessage.senderId === currentUser.id ? '我' : item.lastMessage.senderData.name }}:
                </div>
                <span class="text" v-if="item.lastMessage.type === 'text'">{{item.lastMessage.payload.text}}</span>
                <span v-else-if="item.lastMessage.type === 'video'">[视频消息]</span>
                <span v-else-if="item.lastMessage.type === 'audio'">[语音消息]</span>
                <span v-else-if="item.lastMessage.type === 'image'">[图片消息]</span>
                <span v-else-if="item.lastMessage.type === 'file'">[文件消息]</span>
                <span v-else-if="item.lastMessage.type === 'resume'">[简历消息]</span>
                <span v-else-if="item.lastMessage.type === 'phone'">[交换联系方式消息]</span>
                <span v-else-if="item.lastMessage.type === 'interview'">[邀请面试消息]</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div v-else class="no-conversation">- 当前没有会话 -</div>
    <div v-if="rightClickMenu.visible" :style="{'left': rightClickMenu.x + 'px', 'top': rightClickMenu.y + 'px'}" class="action-box">
      <div class="action-item" @click="topConversation">{{ rightClickMenu.conversation.top ? '取消置顶' : '置顶' }}</div>
      <div class="action-item" @click="deleteConversation">删除聊天</div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from '../../../../utils/utils.js'

  export default {
    name: 'Conversations',
    components: {
      
    },
    props:{
      title_show:{
        type: String,
        default() {
          return ''
        }
      },
      laiyuan:{
        type: String,
        default() {
          return ''
        }
      },
    },
    data() {
      return {
        currentUser: {},
        conversations: [], // 会话列表
        // Conversation右键菜单
        rightClickMenu: {
          conversation: null,
          visible: false,
          x: null,
          y: null,
        },
        user_uid: '',
        profile: {
          friend: null,
        },
      };
    },
    created() {
      //隐藏Conversation右键菜单
      document.addEventListener('click', () => {
        this.hideRightClickMenu();
      });
      this.currentUser = {
        id: localStorage.getItem('realUid'),
        name: localStorage.getItem('name'),
        avatar: localStorage.getItem('realAvatar'),
      }
      this.listenConversationUpdate(); //监听会话列表变化
      this.loadConversations(); //加载会话列表
    },
    // 退出关闭
    beforeDestroy() {
      this.goEasy.im.off(this.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, this.renderConversations);
    },
    methods: {
      formatDate,
      loadConversations() {
        this.goEasy.im.latestConversations({
          onSuccess: (result) => {
            let content = result.content;
            this.renderConversations(content);
          },
          onFailed: (error) => {
            console.log('获取最新会话列表失败, code:' + error.code + 'content:' + error.content);
          },
        });
      },
      listenConversationUpdate() {
        // 监听会话列表变化
        this.goEasy.im.on(this.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, this.renderConversations);
      },
      renderConversations(content) {
        this.conversations = content.conversations; /// 会话列表
        if(this.laiyuan == 'is_nav'){
          this.chatLocation(content.conversations[0])
        }
      },
     
      showRightClickMenu(e, conversation) {
        this.rightClickMenu.conversation = conversation;
        this.rightClickMenu.visible = true;
        this.rightClickMenu.x = e.pageX;
        this.rightClickMenu.y = e.pageY;
      },
      hideRightClickMenu() {
        this.rightClickMenu.visible = false;
      },
      topConversation() {
        let conversation = this.rightClickMenu.conversation;
        let description = conversation.top ? '取消置顶' : '置顶';
        this.goEasy.im.topConversation({
          conversation: conversation,
          top: !conversation.top,
          onSuccess: function () {
            console.log(description, '成功');
          },
          onFailed: function (error) {
            console.log(description, '失败：', error);
          },
        });
      },
      deleteConversation() {
        if (confirm('确认要删除这条会话吗？')) {
          let conversation = this.rightClickMenu.conversation;
          this.goEasy.im.removeConversation({
            conversation: conversation,
            onSuccess: function () {
              console.log('删除会话成功');
            },
            onFailed: function (error) {
              console.log(error);
            },
          });
        }
      },
      chatLocation (conversation) {
        this.profile.friend = {
          uid: conversation.userId,
          name: conversation.data.name,
          avatar: conversation.data.avatar,
        };
        this.$emit( 'chatLocation',JSON.stringify(this.profile.friend) );
      }
    },
  };
</script>

<style scoped lang="scss">

  .mag-box{
    width: 100%;
  }
  .no-conversation {
    text-align: center;
    color: #666666;
    font-size: 14px;
  }
  .conversation-box{
    padding: 10px 5px;
  }
  .conversation-box.actived{
    background: #eee;
  }
  .conversation {
    display: flex;
    cursor: pointer;
  }

  .unread-count {
    position: absolute;
    top: -10px;
    left: -6px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    color: white;
    background: #d02129;
  }

  .unread-count .unread {
    display: block;
    font-size: 12px;
    text-align: center;
    line-height: 18px;
  }

  .conversation-message {
    flex: 1;
    // padding-left: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .conversation-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: right;
  }

  .conversation-name {
    font-size: 14px;
    font-weight: 500;
    color: $g_textColor;
  }

  .conversation-time {
    flex: 1;
    color: #B9B9B9;
    display: flex;
    flex-direction: column;
    font-size: 14px;
  }

  .conversation-bottom {
    display: flex;
    color: #666666;
    font-size: 13px;
    margin-top: 4px;
  }

  .conversation-content {
    display: flex;
    width: 100%;
    color: #b3b3b3;
  }

  .conversation-content .text {
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    white-space: nowrap;
    word-break: break-all;
  }

  .conversation-bottom .unread-text {
    color: #d02129;
    width: auto;
  }

  .conversation .avatar {
    width: 36px;
    height: 36px;
    position: relative;
  }

  .conversation .avatar img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }

  .router-link-active {
    background: #eeeeee;
  }

  .action-box {
    width: 100px;
    height: 60px;
    background: #ffffff;
    border: 1px solid #cccccc;
    position: fixed;
    z-index: 100;
    border-radius: 5px;
  }

  .action-box .action-item {
    padding-left: 15px;
    line-height: 30px;
    font-size: 13px;
    color: #262628;
    cursor: pointer;
  }

  .action-box .action-item:hover {
    background: #dddddd;
  }

  .chat {
    flex: 1;
    display: flex;
  }
  .contact-main {
    flex: 1;
    background: #FFFFFF;
  }
  .contact-list-title {
    margin: 10px 20px;
    font-size: 14px;
  }
</style>
