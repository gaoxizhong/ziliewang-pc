<template>
  <div class="conversations">
    <div class="conversation-list">
      <div class="conversation-list-container">
        <div class="conversation-list-content">

          <ConversationList @chatLocation="chatLocation"/>
          
        </div>
      </div>
    </div>
    <!-- 聊天部分 开始-->
    <div class="contact-main">
      <PrivateChat :infoData="profile.friend"  v-if="is_chat"/>
    </div>
    <!-- 聊天部分 结束-->
  </div>
</template>

<script>
import PrivateChat from './PrivateChat.vue';
import ConversationList from './conversationList.vue';
export default {
  name: 'Conversations',
  components: { 
    PrivateChat,
    ConversationList
  },
  data() {
    return {
      profile: {
        friend: null,
      },
      is_chat: false
    };
  },
  created() {

  },
  
  methods: {
    
    chatLocation (conversation) {
      this.profile.friend = JSON.parse(conversation);
      this.is_chat = false;
      this.$nextTick( () => {
        this.is_chat = true;
      })
    }
  },
};
</script>

<style scoped>
.conversations {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  color: #333333;
}
.conversation-list {
  width: 260px;
}

.conversation-list-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-right: #dbd6d6 1px solid;
}

.conversation-list-content {
  flex: 1;
  overflow-y: auto;
  padding: 10px 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.conversation-list-content::-webkit-scrollbar {
  display: none;
}
.contact-main {
  flex: 1;
  background: #FFFFFF;
}
</style>
