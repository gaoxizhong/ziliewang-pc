<template>
  <div class="chat-container">
    <div class="chat-title">
      <img :src="friend.avatar" class="chat-avatar"/>
      <div class="chat-name">{{ friend.name }}</div>
    </div>
    <div class="chat-main" ref="scrollView">
      <div class="message-list" ref="messageList">
        <div v-if="history.loading" class="history-loading">
          <img src="../../../../assets/images/pending.gif"/>
        </div>
        <div v-else :class="history.allLoaded ? 'history-loaded':'load'" @click="loadHistoryMessage(false)">
          {{ history.allLoaded ? '已经没有更多的历史消息' : '获取历史消息' }}
        </div>
        <div v-for="(message, index) in history.messages" :key="index">
          <!-- 时间 -->
          <div class="time-tips">{{ renderMessageDate(message, index) }}</div>

          <div class="message-phone-box" @contextmenu.prevent.stop="e => showActionPopup(message)" v-if="message.type === 'phone' && message.payload.way_status == 1">你已向对方发送交换联系方式</div>
          <div class="message-phone-box" @contextmenu.prevent.stop="e => showActionPopup(message)" v-if="message.type === 'phone' && message.payload.way_status == 3">你已同意对方索要联系方式</div>

          <!-- boss 发送过来的手机号 ↓ -->
          <div class="message-phone-universal-card" @contextmenu.prevent.stop="e => showActionPopup(message)" v-if="message.type === 'phone' && message.payload.way_status == 2">
            <h4 class="message-phone-universal-card-header">手机号</h4>
            <div class="message-phone-universal-card-content">
              <span>{{ message.payload.name }}的手机号：{{ message.payload.phone }}</span>
            </div>
          </div>
          <!-- boss 发送过来的手机号 ↑ -->
          <!-- boss 索要手机号 ↓ -->
          <div class="message-phone-universal-card" @contextmenu.prevent.stop="e => showActionPopup(message)" v-if="message.type === 'phone' && message.payload.way_status == 4">
            <h4 class="message-phone-universal-card-header">手机号</h4>
            <div class="message-phone-universal-card-content">
              <span>对方请求交换联系方式</span>
            </div>
            <div class="message-phone-universal-card-footer">
              <div class="message-phone-universal-card-btn-main message-phone-universal-card-btn" @click="clickPhoneBtn(3)">同意交换</div>
            </div>
          </div>
          <!-- boss 发送过来的手机号 ↑ -->

          <!-- <div class="message-recalled" v-if="message.recalled">
            <div v-if="message.senderId !== currentUser.id">{{ friend.name }}撤回了一条消息</div>
            <div v-else class="message-recalled-self">
              <div>你撤回了一条消息</div>
              <span v-if="message.type === 'text' && Date.now()-message.timestamp< 60 * 1000 " @click="editRecalledMessage(message.payload.text)">重新编辑</span>
            </div>
          </div> -->
          <!-- 内容区域 开始 -->
          <div class="message-item"  v-if="message.type != 'phone'">
            <!-- 多选按钮 -->
            <!-- <div class="message-item-checkbox" v-if="messageSelector.visible && message.status !== 'sending'">
              <input class="input-checkbox" type="checkbox" :value="message.messageId" v-model="messageSelector.ids" @click="selectMessages">
            </div> -->

            <div class="message-item-content" :class="{ self: message.senderId === currentUser.id }">
              <!-- 头像 开始 -->
              <div class="sender-info">
                <img v-if="currentUser.id === message.senderId" :src="currentUser.avatar" class="sender-avatar"/>
                <img v-else :src="friend.avatar" class="sender-avatar"/>
              </div>
              <!-- 头像 结束 -->

              <div class="message-content" @contextmenu.prevent.stop="e => showActionPopup(message)">
              <!-- <div class="message-content"> -->
                <div class="message-payload">
                  <!-- 加载中 icon -->
                  <div class="pending" v-if="message.status === 'sending'"></div> 
                  <!--  发送失败 icon -->
                  <div class="send-fail" v-if="message.status === 'fail'"></div> 

                  <!-- 内容 开始 -->
                  <div v-if="message.type === 'text'" class="content-text" v-html="emoji.decoder.decode(message.payload.text)"></div>
                  <!-- 内容 结束 -->
                  <!-- 简历 开始 -->
                  <a v-if="message.type === 'resume'" :href="message.payload.resume" target="_blank" download="download">
                    <div class="content-file" title="点击下载">
                      <div class="file-info">
                        <span class="file-name">个人简历</span>
                      </div>
                      <img class="file-img" src="../../../../assets/image/icon-zxjl.png"/>
                    </div>
                  </a>
                  <!-- 简历 结束 -->
                  <!-- 交换联系方式 开始 -->
                  
                  <!-- 交换联系方式 结束 -->
                  <!-- 图片 开始 -->
                  <div v-if="message.type === 'image'" class="content-image" @click="showImagePreviewPopup(message.payload.url)">
                    <img :src="message.payload.url" :style="{height:getImageHeight(message.payload.width,message.payload.height)+'px'}"/>
                  </div>
                  <!-- 图片 结束 -->

                  <!-- 文件 开始 -->
                  <a v-if="message.type === 'file'" :href="message.payload.url" target="_blank" download="download">
                    <div class="content-file" title="点击下载">
                      <div class="file-info">
                        <span class="file-name">{{ message.payload.name }}</span>
                        <span class="file-size">{{ (message.payload.size / 1024).toFixed(2) }}KB</span>
                      </div>
                      <img class="file-img" src="../../../../assets/images/file-icon.png"/>
                    </div>
                  </a>
                  <!-- 文件 结束 -->
                  <!-- 视频 开始 -->
                  <goeasy-video-player v-if="message.type === 'video'" :thumbnail="message.payload.thumbnail" :src="message.payload.video.url" />
                  <!-- 视频 结束 -->
                </div>
                <div v-if="currentUser.id === message.senderId" :class="message.read ?'message-read':'message-unread'">
                  <div v-if="message.senderId === currentUser.id">{{ message.read ? '已读' : '未读' }}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 内容区域 结束 -->
        </div>
      </div>
    </div>
    <div class="chat-footer" :style="`height:${is_pop == 'pop'?'120':'140'}px;`">
      <!-- <div class="action-delete" v-if="messageSelector.visible">
        <img class="delete-btn" src="../../../../assets/images/delete.png" @click="deleteMultipleMessages"/>
        <div>删除</div>
      </div> -->
      <div class="action-box">
        <div class="action-bar">
          <!-- 常用语 -->
          <div class="action-item">
            <div v-if="cyy.visible" class="sentence-panel">
              <div class="header">
                <h3 class="title">常用语</h3>
                <a href="javascript:0;" target="_blank" class="set-btn"></a>
              </div>
              <ul>
                <li @click="clickCyy('我可以把我的简历发您看看吗?')">我可以把我的简历发您看看吗?</li>
                <li @click="clickCyy('您好！我可以去贵公司面试吗?')">您好！我可以去贵公司面试吗?</li>
                <li @click="clickCyy('您好！希望可以和您聊聊，谢谢！')">您好！希望可以和您聊聊，谢谢！</li>
              </ul>
            </div>
            <i class="iconfont icon-changyongyu" title="常用语" @click="showCyyBox"></i>
          </div>
          <!-- 表情 -->
          <!-- <div class="action-item">
            <div v-if="emoji.visible" class="emoji-box">
              <img
                v-for="(emojiItem, emojiKey, index) in emoji.map"
                class="emoji-item"
                :key="index"
                :src="emoji.url + emojiItem"
                @click="chooseEmoji(emojiKey)"
              />
            </div>
            <i class="iconfont icon-biaoqing" title="表情" @click="showEmojiBox"></i>
          </div> -->
          <!-- 图片 -->
          <div class="action-item">
            <label for="img-input" v-if="userVipRank > 0">
              <i class="iconfont icon-tupian" title="图片"></i>
            </label>
            <label  @click="clickvipRank_0" v-else>
              <i class="iconfont icon-tupian" title="图片"></i>
            </label>
            <input v-show="false" id="img-input" accept="image/*" multiple type="file" @change="sendImageMessage"/>
          </div>
          <!-- 视频 -->
          <!-- <div class="action-item">
            <label for="video-input"><i class="iconfont icon-film" title="视频"></i></label>
            <input v-show="false" id="video-input" accept="video/*" type="file"
                   @change="sendVideoMessage"/>
          </div> -->
          <!-- 文件 -->
          <div class="action-item">
            <label for="file-input" v-if="userVipRank > 0">
              <i class="iconfont icon-wenjianjia" title="文件"></i>
            </label>
            <label @click="clickvipRank_0" v-else>
              <i class="iconfont icon-wenjianjia" title="文件"></i>
            </label>
            <input v-show="false" id="file-input" type="file" @change="sendFileMessage"/>
          </div>
          <i class="vline"></i>
          <div class="btn-resume toolbar-btn unable" title="发送简历" @click="clickToolbarBtn('resume')">发简历</div>
          <div class="btn-resume toolbar-btn unable" title="交换联系方式" @click="clickPhoneBtn(1)">交换联系方式</div>
        </div>

        <!-- GoEasyIM最大支持3k的文本消息，如需发送长文本，需调整输入框maxlength值 -->
        <div class="input-box" @click.stop="clickInput">
          <textarea ref="input" @focus="onInputFocus" @keyup.enter="sendTextMessage" placeholder="输入内容...." v-model="text" maxlength="700"  class="input-content"></textarea>
        </div>
        <div class="send-box">
          <button class="send-button" @click="sendTextMessage">发送</button>
        </div>
      </div>
    </div>
    <!-- 语音播放器 -->
    <!-- <audio ref="audioPlayer" @ended="onAudioPlayEnd" @pause="onAudioPlayEnd"></audio> -->
    <!-- 图片预览弹窗 -->
    <div v-if="imagePreview.visible" class="image-preview">
      <img :src="imagePreview.url" alt="图片"/>
      <span class="close" @click="hideImagePreviewPopup">×</span>
    </div>
    <!-- 消息删除撤回弹窗 -->
    <div class="action-popup" v-if="actionPopup.visible" @click="actionPopup.visible = false">
      <div class="action-popup-main">
        <div class="action-item" @click="deleteSingleMessage">删除</div>
        <div class="action-item" v-if="actionPopup.recallable" @click="recallMessage">撤回</div>
        <div class="action-item" @click="showCheckBox">多选</div>
        <div class="action-item" @click="actionPopup.visible = false">取消</div>
      </div>
    </div>

  </div>
</template>

<script>
  import {formatDate} from '../../../../utils/utils.js'
  import EmojiDecoder from '../../../../utils/EmojiDecoder';
  import GoeasyVideoPlayer from "../../../../components/GoEasyVideoPlayer";

  const IMAGE_MAX_WIDTH = 200;
  const IMAGE_MAX_HEIGHT = 150;
  export default {
    name: 'PrivateChat',
    components: {
      GoeasyVideoPlayer,
    },
    props:{
      infoData:{
        type: Object,
        default() {
          return {}
        }
      },
      is_pop:{
        type: String,
        default() {
          return ''
        }
      }
    },
    data() {
      const emojiUrl = 'https://imgcache.qq.com/open/qcloud/tim/assets/emoji/';
      const emojiMap = {
        '[么么哒]': 'emoji_3@2x.png',
        '[乒乓]': 'emoji_4@2x.png',
        '[便便]': 'emoji_5@2x.png',
        '[信封]': 'emoji_6@2x.png',
        '[偷笑]': 'emoji_7@2x.png',
        '[傲慢]': 'emoji_8@2x.png',
      };
      return {
        userProfile:{}, // 个人信息
        userVipRank: 0,
        currentUser: null,
        friend: null,

        to: {},//用于创建消息时传入

        history: {
          messages: [],
          allLoaded: false,
          loading: true
        },

        text: '',

        // 常用语
        cyy: {
          visible: false,
        },
        //定义表情列表
        emoji: {
          url: emojiUrl,
          map: emojiMap,
          visible: false,
          decoder: new EmojiDecoder(emojiUrl, emojiMap),
        },
      
        // 图片预览弹出框
        imagePreview: {
          visible: false,
          url: ''
        },
        audioPlayer: {
          playingMessage: null,
        },
        // 展示消息删除弹出框
        actionPopup: {
          visible: false,
          message: null,
          recallable: false,
        },
        // 消息选择
        messageSelector: {
          visible: false,
          ids: []
        },
      };
    },
    created() {
      this.userVipRank = localStorage.getItem('userVipRank');
      this.friend = this.infoData; // 好友信息
      this.currentUser = {  // 我的信息
        id: localStorage.getItem('realUid'),
        name: localStorage.getItem('name'),
        avatar: localStorage.getItem('realAvatar'),
      };
      this.to = {
        type: this.GoEasy.IM_SCENE.PRIVATE,
        id: this.friend.uid,
        data: {name: this.friend.name, avatar: this.friend.avatar},
      };
      // 获取历史记录
      this.loadHistoryMessage(true);

      this.goEasy.im.on(this.GoEasy.IM_EVENT.PRIVATE_MESSAGE_RECEIVED, this.onReceivedPrivateMessage);

      // 获取个人信息
      this.getUserProfile();
    },
    beforeDestroy() {
      this.goEasy.im.off(this.GoEasy.IM_EVENT.PRIVATE_MESSAGE_RECEIVED, this.onReceivedPrivateMessage);
    },
    methods: {
      formatDate,
      onReceivedPrivateMessage(message) {
        if (message.senderId === this.friend.uid) {
          this.history.messages.push(message);
          this.markPrivateMessageAsRead();
        }
        this.scrollToBottom();
      },
      /**
       * 核心就是设置高度，产生明确占位
       *
       * 小  (宽度和高度都小于预设尺寸)
       *    设高=原始高度
       * 宽 (宽度>高度)
       *    高度= 根据宽度等比缩放
       * 窄  (宽度<高度)或方(宽度=高度)
       *    设高=MAX height
       *
       * @param width,height
       * @returns number
       */
      getImageHeight(width, height) {
        if (width < IMAGE_MAX_WIDTH && height < IMAGE_MAX_HEIGHT) {
          return height;
        } else if (width > height) {
          return IMAGE_MAX_WIDTH / width * height;
        } else if (width === height || width < height) {
          return IMAGE_MAX_HEIGHT;
        }
      },
      playAudio(audioMessage) {
        let playingMessage = this.audioPlayer.playingMessage;

        if (playingMessage) {
          this.$refs.audioPlayer.pause();
          // 如果点击的消息正在播放，就认为是停止播放操作
          if (playingMessage === audioMessage) {
            return;
          }
        }

        this.audioPlayer.playingMessage = audioMessage;
        this.$refs.audioPlayer.src = audioMessage.payload.url;
        this.$refs.audioPlayer.load();
        this.$refs.audioPlayer.currentTime = 0;
        this.$refs.audioPlayer.play();
      },
      onAudioPlayEnd() {
        this.audioPlayer.playingMessage = null;
      },
      // 点击 交换联系方式
      clickPhoneBtn(n){
        let userProfile = this.userProfile;
        let payload = {
          real_phone: userProfile.basic_info.real_phone,
          phone: userProfile.basic_info.phone,
          real_name: userProfile.basic_info.real_name,
          name: userProfile.basic_info.name,
          way_status: n,  // 1. 向对方发起交换联系方式发出请求,2.boss 发送过来的手机号(boss同意) 3.同意对方索要联系方式 4. boss发送交换联系方式发出请求
        }
        this.goEasy.im.createCustomMessage({
          type: 'phone',  //字符串，可以任意自定义类型 phone 联系方式
          text: '交换联系方式',
          payload,
          to: this.to,
          onSuccess: (message) => {
            this.sendMessage(message);
          },
          onFailed: (err) => {
            console.log("创建消息err:", err);
          }
        });
      },
      // 点击 发简历按钮
      clickToolbarBtn(){
        let userProfile = this.userProfile;
        let payload = {
          resume: userProfile.basic_info.curriculum_vitae
        }
        this.goEasy.im.createCustomMessage({
          type: 'resume',  //字符串，可以任意自定义类型 resume 简历
          text: '发送简历',
          payload,
          to: this.to,
          onSuccess: (message) => {
            console.log(message)
            this.sendMessage(message);
          },
          onFailed: (err) => {
            console.log("创建消息err:", err);
          }
        });
      },
      // 发送按钮事件
      sendTextMessage() {
        if (!this.text.trim()) {
          this.$message.error({
            message:'输入不能为空!'
          })
          return
        }
        console.log(this.to)
        this.goEasy.im.createTextMessage({
          text: this.text,
          to: this.to,
          onSuccess: (message) => {
            this.sendMessage(message);
            this.text = '';
          },
          onFailed: (err) => {
            console.log("创建消息err:", err);
          }
        });
      },
      onInputFocus () {
        this.emoji.visible = false;
      },
      clickInput(){
        this.$refs.input.focus();
      },
      // 点击常用语 icon
      showCyyBox(){
        this.cyy.visible = !this.cyy.visible;
      },
      // 点击常用语列表
      clickCyy(text){
        this.text = text;
        this.cyy.visible = false;
      },
      // 点击表情
      showEmojiBox() {
        this.emoji.visible = !this.emoji.visible;
      },
      chooseEmoji(emojiKey) {
        this.text += emojiKey;
        this.emoji.visible = false;
      },
      sendImageMessage(e) {
        let fileList = [...e.target.files];
        fileList.forEach((file) => {
          this.goEasy.im.createImageMessage({
            file: file,
            to: this.to,
            onProgress: function (progress) {
              console.log(progress)
            },
            onSuccess: (message) => {
              this.sendMessage(message);
            },
            onFailed: (e) => {
              console.log('error :', e);
            }
          });
        })
      },

      sendVideoMessage(e) {
        const file = e.target.files[0];
        this.goEasy.im.createVideoMessage({
          file: file,
          to: this.to,
          onProgress: function (progress) {
            console.log(progress)
          },
          onSuccess: (message) => {
            this.sendMessage(message);
          },
          onFailed: (e) => {
            console.log('error :', e);
          }
        });
      },

      sendFileMessage(e) {
        const file = e.target.files[0];
        this.goEasy.im.createFileMessage({
          file: file,
          to: this.to,
          onProgress: function (progress) {
            console.log(progress)
          },
          onSuccess: (message) => {
            this.sendMessage(message);
          },
          onFailed: (e) => {
            console.log('error :', e);
          }
        });
      },
      sendMessage(message) {
        this.history.messages.push(message);
        this.scrollToBottom();
        this.goEasy.im.sendMessage({
          message: message,
          onSuccess: (message) => {
            console.log('发送成功', message);
          },
          onFailed: function (error) {
            if (error.code === 507) {
              alert('发送失败，没有配置OSS存储');
              console.log('发送失败，没有配置OSS存储');
            } else {
              console.log('发送失败:', error);
            }
          }
        });
      },
      showActionPopup(message) {
        const MAX_RECALLABLE_TIME = 3 * 60 * 1000; //3分钟以内的消息才可以撤回
        this.messageSelector.ids = [message.messageId];
        if ((Date.now() - message.timestamp) < MAX_RECALLABLE_TIME && message.senderId === this.currentUser.id && message.status === 'success') {
          this.actionPopup.recallable = true;
        } else {
          this.actionPopup.recallable = false;
        }
        this.actionPopup.visible = true;
      },
      deleteSingleMessage() {
        this.actionPopup.visible = false;
        this.deleteMessage();
      },
      deleteMultipleMessages() {
        if (this.messageSelector.ids.length > 0) {
          this.messageSelector.visible = false;
          this.deleteMessage();
        }
      },
      deleteMessage() {
        let conf = confirm("确认删除？");
        if (conf === true) {
          let selectedMessages = [];
          this.history.messages.forEach((message) => {
            if (this.messageSelector.ids.includes(message.messageId)) {
              selectedMessages.push(message);
            }
          });
          this.goEasy.im.deleteMessage({
            messages: selectedMessages,
            onSuccess: () => {
              selectedMessages.forEach((message) => {
                let index = this.history.messages.indexOf(message);
                if (index > -1) {
                  this.history.messages.splice(index, 1);
                }
              });
              this.messageSelector.ids = [];
            },
            onFailed: (error) => {
              console.log('error:', error);
            },
          });
        } else {
          this.messageSelector.ids = [];
        }
      },
      recallMessage() {
        let selectedMessages = [];
        this.history.messages.forEach((message) => {
          if (this.messageSelector.ids.includes(message.messageId)) {
            selectedMessages.push(message);
          }
        });
        this.actionPopup.visible = false;
        this.goEasy.im.recallMessage({
          messages: selectedMessages,
          onSuccess: () => {
            console.log('撤回成功');
          },
          onFailed: (error) => {
            console.log('撤回失败,error:', error);
          }
        });
      },
      editRecalledMessage(text) {
        this.text = text;
      },
      showImagePreviewPopup(url) {
        this.imagePreview.visible = true;
        this.imagePreview.url = url;
      },
      hideImagePreviewPopup() {
        this.imagePreview.visible = false;
      },
      showCheckBox() {
        this.messageSelector.ids = [];
        this.messageSelector.visible = true;
        this.actionPopup.visible = false;
      },
      selectMessages(e) {
        if (e.target.checked) {
          this.messageSelector.ids.push(e.target.value)
        } else {
          let index = this.messageSelector.ids.indexOf(e.target.value);
          if (index > -1) {
            this.messageSelector.ids.splice(index, 1);
          }
        }
      },
      loadHistoryMessage(scrollToBottom) {
        this.history.loading = true;
        //历史消息
        let lastMessageTimeStamp = null;
        let lastMessage = this.history.messages[0];
        if (lastMessage) {
          lastMessageTimeStamp = lastMessage.timestamp;
        }
        this.goEasy.im.history({
          userId: this.friend.uid,
          lastTimestamp: lastMessageTimeStamp,
          limit: 10,
          onSuccess: (result) => {
            console.log(result)
            this.history.loading = false;
            let messages = result.content;
            if (messages.length === 0) {
              this.history.allLoaded = true;
            } else {
              if (lastMessageTimeStamp) {
                this.history.messages = messages.concat(this.history.messages);
              } else {
                this.history.messages = messages;
              }
              if (messages.length < 10) {
                this.history.allLoaded = true;
              }
              if (scrollToBottom) {
                this.scrollToBottom();
                //收到的消息设置为已读
                this.markPrivateMessageAsRead();
              }
            }
          },
          onFailed: (error) => {
            //获取失败
            this.history.loading = false;
            console.log('获取历史消息失败, code:' + error.code + ',错误信息:' + error.content);
          },
        });
      },
      markPrivateMessageAsRead() {
        this.goEasy.im.markMessageAsRead({
          id: this.to.id,
          type: this.to.type,
          onSuccess: function () {
            console.log('标记私聊已读成功');
          },
          onFailed: function (error) {
            console.log('标记私聊已读失败', error);
          },
        });
      },
      scrollToBottom() {
        this.$nextTick(() => {
          this.$refs.scrollView.scrollTop = this.$refs.messageList.scrollHeight;
        });
      },
      renderMessageDate(message, index) {
        if (index === 0) {
          return this.formatDate(message.timestamp);
        } else {
          if (message.timestamp - this.history.messages[index - 1].timestamp > 5 * 60 * 1000) {
            return this.formatDate(message.timestamp);
          }
        }
        return '';
      },

      clickvipRank_0(){
        this.$message.error("需要升级为VIP会员才可发送文件!");
        return
      },
      // 获取个人信息
      getUserProfile(){
        let that = this;
        that.$axios.post('/api/user/profile',{}).then(res =>{
          if(res.code == 0){
            this.userProfile = res.data;
          }
        }).catch(e =>{
          console.log(e)
        })
      },

    },
  };
</script>

<style scoped>
  .chat-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .chat-title {
    height: 40px;
    padding: 10px 10px 0 10px;
    display: flex;
    align-items: center;
    font-size: 18px;
  }

  .chat-avatar {
    width: 35px;
    height: 35px;
  }

  .chat-name {
    width: 400px;
    font-size: 15px;
    margin-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
  }

  .chat-main {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    flex: 1;
    scrollbar-width: thin;
  }

  .chat-main::-webkit-scrollbar {
    width: 0;
  }

  .chat-main .history-loaded {
    text-align: center;
    font-size: 12px;
    color: #cccccc;
    line-height: 20px;
  }

  .chat-main .load {
    text-align: center;
    font-size: 12px;
    color: #d02129;
    line-height: 20px;
    cursor: pointer;
  }

  .history-loading {
    width: 100%;
    text-align: center;
  }

  .time-tips {
    color: #999;
    text-align: center;
    font-size: 12px;
    margin-top: 8px;
  }

  .message-list {
    padding: 0 10px;
  }

  .message-item {
    display: flex;
  }

  .message-item-checkbox {
    height: 50px;
    margin-right: 15px;
    display: flex;
    align-items: center;
  }

  .input-checkbox {
    position: relative;
  }

  .message-item-checkbox input[type="checkbox"]::before, .message-item-checkbox input[type="checkbox"]:checked::before {
    content: "";
    position: absolute;
    top: -3px;
    left: -3px;
    background: #FFFFFF;
    width: 18px;
    height: 18px;
    border: 1px solid #cccccc;
    border-radius: 50%;
  }

  .message-item-checkbox input[type="checkbox"]:checked::before {
    content: "\2713";
    background-color: #d02129;
    width: 18px;
    color: #FFFFFF;
    text-align: center;
    font-weight: bold;
  }

  .message-item-content {
    flex: 1;
    margin: 5px 0;
    overflow: hidden;
    display: flex;
  }

  .sender-info {
    margin: 0 5px;
  }

  .sender-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .message-content {
    max-width: calc(100% - 100px);
  }

  .message-payload {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }

  .pending {
    background: url("../../../../assets/images/pending.gif") no-repeat center;
    background-size: 13px;
    width: 15px;
    height: 15px;
  }

  .send-fail {
    background: url("../../../../assets/images/failed.png") no-repeat center;
    background-size: 15px;
    width: 18px;
    height: 18px;
    margin-right: 3px;
  }

  .message-read {
    color: gray;
    font-size: 12px;
    text-align: end;
    height: 16px;
  }

  .message-unread {
    color: #d02129;
    font-size: 12px;
    text-align: end;
    height: 16px;
  }

  .content-text {
    display: flex;
    align-items: center;
    text-align: left;
    background: #eeeeee;
    font-size: 14px;
    font-weight: 500;
    padding: 6px 8px;
    margin: 3px 0;
    line-height: 25px;
    white-space: pre-line;
    overflow-wrap: anywhere;
    border-radius: 8px;
    word-break: break-all;
  }

  .content-image {
    display: block;
    cursor: pointer;
  }

  .content-image img {
    height: 100%;
  }

  .content-audio {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .content-audio .audio-facade {
    min-width: 12px;
    background: #eeeeee;
    border-radius: 7px;
    display: flex;
    font-size: 14px;
    padding: 8px;
    margin: 5px 0;
    line-height: 25px;
    cursor: pointer;
  }

  .content-audio .audio-facade-bg {
    background: url("../../../../assets/images/voice.png") no-repeat center;
    background-size: 15px;
    width: 20px;
  }

  .content-audio .audio-facade-bg.play-icon {
    background: url("../../../../assets/images/play.gif") no-repeat center;
    background-size: 20px;
  }

  .content-order {
    border-radius: 5px;
    border: 1px solid #eeeeee;
    padding: 8px;
    display: flex;
    flex-direction: column;
  }

  .content-order .order-id {
    font-size: 12px;
    color: #666666;
    margin-bottom: 5px;
  }

  .content-order .order-body {
    display: flex;
    font-size: 13px;
    padding: 5px;
  }

  .content-order .order-img {
    width: 70px;
    height: 70px;
    border-radius: 5px;
  }

  .content-order .order-name {
    margin-left: 10px;
    width: 135px;
    color: #606164;
  }

  .content-order .order-count {
    font-size: 12px;
    color: #666666;
    flex: 1;
  }

  .content-file {
    width: 240px;
    height: 65px;
    font-size: 15px;
    background: #FFFFFF;
    border: 1px solid #eeeeee;
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
  }

  .content-file:hover {
    background: #f1f1f1;
  }

  .file-info {
    width: 194px;
    text-align: left;
  }

  .file-name {
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    word-break: break-all;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .file-size {
    font-size: 12px;
    color: #ccc;
  }

  .file-img {
    width: 40px;
    height: 40px;
  }

  .message-item .self {
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    flex-direction: row-reverse;
  }

  .message-item .self .audio-facade {
    flex-direction: row-reverse;
  }

  .message-item .self .audio-facade-bg {
    background: url("../../../../assets/images/voice.png") no-repeat center;
    background-size: 15px;
    width: 20px;
    -moz-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  .message-item .self .play-icon {
    background: url("../../../../assets/images/play.gif") no-repeat center;
    background-size: 20px;
    -moz-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  .message-recalled {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 28px;
    font-size: 13px;
    text-align: center;
    color: grey;
    margin-top: 10px;
  }

  .message-recalled-self {
    display: flex;
  }

  .message-recalled-self span {
    margin-left: 5px;
    color: #D02129;
    cursor: pointer;
  }

  .chat-footer {
    border-top: 1px solid #dcdfe6;
    width: 100%;
    background: #FFFFFF;
  }

  .action-delete {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
  }

  .delete-btn {
    width: 25px;
    height: 25px;
    padding: 10px;
    background: #f5f5f5;
    border-radius: 50%;
    cursor: pointer;
    margin-bottom: 10px;
  }

  .action-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .action-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 6px 10px 0 10px;
  }

  .action-bar .action-item {
    text-align: left;
    padding: 4px 0;
    position: relative;
  }

  .action-bar .action-item .iconfont {
    font-size: 23px;
    margin: 0 8px;
    z-index: 3;
    color: #606266;
    cursor: pointer;
  }

  .action-bar .action-item .iconfont:focus {
    outline: none;
  }

  .action-bar .action-item .iconfont:hover {
    color: #d02129;
  }
  /*================ 常用语 样式  ↓  =================*/
  .sentence-panel{
    position: absolute;
    z-index: 15;
    bottom: 60px;
    left: 0;
    width: 400px;
    background: #fff;
    box-shadow: 0 3px 11px 0 rgba(0,0,0,.2);
    border-radius: 8px;
  }
  .sentence-panel .header {
    line-height: 34px;
    height: 34px;
    background: linear-gradient(90deg,#dee7fb,#fcfbfa);
    border-radius: 8px 8px 0 0;
    font-weight: 400;
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .sentence-panel .header .title {
    height: 16px;
    font-size: 13px;
    color: #666;
    line-height: 16px;
    padding: 0;
  }
  .sentence-panel .header .set-btn {
    font-size: 13px;
    color: #00a6a7;
    cursor: pointer;
  }
  .sentence-panel ul {
    overflow: auto;
    max-height: 180px;
    padding: 4px;
    background: #fff;
  }

  .sentence-panel:after {
    position: absolute;
    bottom: -5px;
    left: 14px;
    width: 10px;
    height: 10px;
    content: "";
    transform: rotate(135deg);
    background: #fff;
    box-shadow: 16px 3px 11px 0 rgba(0,0,0,.1);
  }
  
  .sentence-panel li {
    height: 34px;
    line-height: 34px;
    border-radius: 4px;
    z-index: 1;
    overflow: hidden;
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0 12px 0 24px;
    font-size: 13px;
    font-weight: 400;
    color: #333;
    border: none;
    position: relative;
  }
  .sentence-panel li:before {
    content: "";
    position: absolute;
    top: 14px;
    left: 10px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #d9d9d9;
  }
  /*================ 常用语 样式  ↑  =================*/
  .emoji-box {
    width: 210px;
    position: absolute;
    top: -111px;
    left: -11px;
    z-index: 2007;
    background: #fff;
    border: 1px solid #ebeef5;
    padding: 12px;
    text-align: justify;
    font-size: 14px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    word-break: break-all;
    border-radius: 4px;
  }

  .emoji-item {
    width: 38px;
    height: 38px;
    margin: 0 2px;
  }

  .input-box {
    padding: 0 10px;
    flex: 1;
  }

  .input-content {
    border: none;
    resize: none;
    display: block;
    padding: 5px 0;
    box-sizing: border-box;
    width: 100%;
    color: #606266;
    outline: none;
    background: #FFFFFF;
    word-break: break-all;
    font-size: 14px;
  }

  .send-box {
    padding: 5px 10px;
    text-align: right;
  }

  .send-button {
    width: 70px;
    height: 30px;
    font-size: 14px;
    border: 1px solid #d02129;
    background-color: #ffffff;
    color: #d02129;
    border-radius: 5px;
  }

  .action-popup {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(51, 51, 51, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .action-popup-main {
    width: 150px;
    height: 120px;
    background: #ffffff;
    z-index: 100;
    border-radius: 10px;
    overflow: hidden;
  }

  .action-popup-main .action-item {
    text-align: center;
    line-height: 40px;
    font-size: 15px;
    color: #262628;
    border-bottom: 1px solid #efefef;
    cursor: pointer;
  }

  .image-preview {
    max-width: 750px;
    max-height: 500px;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9998;
  }

  .image-preview img {
    max-width: 750px;
    max-height: 500px;
  }

  .image-preview .close {
    font-size: 50px;
    line-height: 24px;
    cursor: pointer;
    color: #FFFFFF;
    position: absolute;
    top: 10px;
    right: 5px;
    z-index: 1002;
  }

  .order-box {
    width: 848px;
    position: absolute;
    left: -281px;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2007;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(33, 33, 33, 0.7);
  }

  .order-list {
    width: 300px;
    background: #F1F1F1;
    border-radius: 5px;
  }

  .order-list .title {
    font-weight: 600;
    font-size: 15px;
    color: #000000;
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .order-list .title span {
    font-size: 28px;
    font-weight: 400;
    cursor: pointer;
  }

  .order-list .order-item {
    padding: 10px;
    background: #FFFFFF;
    margin: 10px;
    border-radius: 5px;
    cursor: pointer;
  }

  .order-list .order-id {
    font-size: 12px;
    color: #666666;
    margin-bottom: 5px;
  }

  .order-list .order-body {
    display: flex;
    font-size: 13px;
    justify-content: space-between;
  }

  .order-list .order-img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }

  .order-list .order-name {
    width: 160px;
  }

  .order-list .order-count {
    font-size: 12px;
    color: #666666;
    flex: 1;
  }
  .vline {
    display: inline-block;
    margin-right: 20px;
    margin-left: 0;
    margin-top: 5px;
    width: 1px;
    height: 12px;
    vertical-align: middle;
    background: #e0e0e0;
    margin: 0 10px;
  }
  .toolbar-btn {
    height: 22px;
    border-radius: 4px;
    border: 1px solid #e6e8eb;
    padding: 0 10px;
    line-height: 23px;
    vertical-align: top;
    margin-right: 10px;
    box-sizing: content-box;
    cursor: pointer;
    position: relative;
    display: inline-block;
    font-size: 12px;
  }
  .unable {
    color: #999;
  } 
  /* ============ 交换联系方式  ↓ ==================*/
  .message-phone-box{
    width: auto;
    text-align: center;
    font-size: 13px;
    color: #d02129;
    padding: 10px;
  }
  .message-phone-universal-card{
    max-width: 260px;
    margin: 10px auto;
    background: #fff;
    border: 1px solid rgba(202,208,217,.7);
    border-radius: 6px;
  }
  .message-phone-universal-card-header{
    padding: 6px 16px;
    color: #356ce9;
    font-weight: 500;
    font-size: 15px;
    line-height: 21px;
    background: linear-gradient(270deg,#f2f6ff,rgba(227,236,255,.85));
    border-radius: 6px 6px 0 0;
  } 
  .message-phone-universal-card-content{
    padding: 8px 16px;
    color: #222;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px
  }
  .message-phone-universal-card-footer {
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
  }
  .message-phone-universal-card-btn{
    width: 111px;
    padding: 6px 0;
    color: #222;
    font-size: 13px;
    text-align: center;
    border: 1px solid #cad0d9;
    border-radius: 16px;
    cursor: pointer;
  }
  .message-phone-universal-card-btn-main {
    color: #0058ff;
    border: 1px solid #0058ff;
  }

  /* ============ 交换联系方式  ↑ ==================*/

</style>
