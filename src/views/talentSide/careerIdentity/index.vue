<template>
  <div class="container" id="myProfessionalCircle">

    <div class="info-box">
      <!-- 左侧模块 开始 -->
      <myProfessionalCircleLeft :infoData="infoData"/>
      <!-- 左侧模块 结束 -->
      <!-- 右侧模块 开始 -->
      <router-view></router-view>
      <!-- 右侧模块 结束 -->
    </div>
  </div>
</template>

<script>
import myProfessionalCircleLeft from './components/myProfessionalCircleLeft.vue';
import videoDialog from '../components/videoDialog.vue';

export default {
  name: 'careerIdentity',
  components: {
    myProfessionalCircleLeft,
    videoDialog
  },
  data(){
    return{
      infoData:{}, // 信息
    }
  },
  computed: {
    
  },
  mounted(){
    // 获取用户职圈信息
    this.getMyProfessionCircle();
  },
  methods: {
    // 获取用户职圈信息
    getMyProfessionCircle(){
      this.$axios.post('/api/profession-circle/my',{}).then( res =>{
        if(res.code == 0){
          this.infoData = res.data.users;
        }else{
          this.$message.error({
            message:res.msg
          })
        }
      }).catch(e =>{
        console.log(e)
      })
    },
   
  }
};
</script>

<style lang="scss" scoped>
  .info-box{
    width: 100%;
    display: flex;
    text-align: left;
  }
</style>
