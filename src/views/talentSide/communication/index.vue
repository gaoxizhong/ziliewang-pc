<template>
  <!-- 沟通页 -->
  <div class="container interaction-box">
    <div class="tab-box"></div>
    <Chat :is_type="is_type" ref="chat"/>
  </div>
</template>
<script>
import Chat from "../components/chat.vue"
export default {
  components: {
    Chat
  },
  data(){
    return {
      uid: window.localStorage.getItem('uid'),
      viewHeight:'',
    }
  },
  mounted(){
    this.getSysMsgList();
  },
  methods:{
 
  }
}
</script>
<style lang="scss" scoped>
  .interaction-box{
    height: calc(100vh - 100px);
    margin: 0 auto;
  }


</style>