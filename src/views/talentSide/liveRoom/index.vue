<template>
  <div class="container">
    <div class="sec-hd">
      <h3>精选直播</h3>
      <p>体验沉浸式求职</p>
    </div>  
    <div class="sec-bd">
      <div class=""></div>

    </div>
  </div>

</template>

<script>

export default {
  name: 'liveRoom',
  components: {

  },
  data(){
    return{
      liveList: [],
    }
  },
  created(){

  },
  computed: {
    
  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>
  .container-box{
    background: #fff;
  }
  .sec-hd{
    display: flex;
    margin-bottom: 24px;
    height: 34px;
  }
  .sec-hd h3 {
    font-weight: 600;
    font-size: 24px;
    height: 34px;
    line-height: 34px;
    color: #3e454d;
    margin-right: 12px;
  }
  .sec-hd p {
    font-size: 14px;
    color: #667280;
    align-self: flex-end;
    padding-bottom: 3px;
  }
</style>
