<template>
  <div class="container">
    <div class="jobExpectation-box myResume-plate">
      <div class="myResume-plate-title-box">
        <span class="info-t">求职期望</span>
        <img src="../../../../assets/image/Frame_7.png" alt="" class="info-icon-img"/>
      </div>
      <div class="myResume-plate-list">
        <ul class="plate-list-ul">
          <li>
            <div class="li-name">
              <span class="li-name-1">首席执行官CEO/总裁/总经理</span>
              <span class="li-name-2">
                <span>8k - 13k x 12薪</span>
                <span>|</span>
                <span> 宁波</span>
                <span>|</span>
                <span>全部行业</span>
              </span>
            </div>
            <div class="info-set">
              <span>删除</span>
              <span>/</span>
              <span>编辑</span>
            </div>
          </li>
          <li>
            <div class="li-name">
              <span class="li-name-1">首席执行官CEO/总裁/总经理</span>
              <span class="li-name-2">
                <span>8k - 13k x 12薪</span>
                <span>|</span>
                <span> 宁波</span>
                <span>|</span>
                <span>全部行业</span>
              </span>
            </div>
            <div class="info-set">
              <span>删除</span>
              <span>/</span>
              <span>编辑</span>
            </div>
          </li>
        </ul>

      </div>
    </div>
  </div>

</template>

<script>
export default {
  components: {
  },
  props:{
    data:{
      typeof: Object,
      default() {
          return {
            data: {}
          }
        }
    }
  },
  data(){
    return{
      infoData: {},
    }
  },
  mounted(){
    console.log(this.data)
  },
  computed: {
    
  },
  methods: {
   
    clickRedactBtn(){
      this.infoData = JSON.parse(JSON.stringify(this.data));
      
    }, 

  },
};
</script>

<style lang="scss" scoped>
  .myResume-plate{
    width: 100%;
    border-radius: 6px;
    background: #fff;
    padding: 24px 30px;
    margin-bottom: 16px;
    .myResume-plate-title-box{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .info-t{
        font-size: 18px;
        font-weight: bold;
        color: $g_textColor;
        line-height: 24px;
      }
      .info-icon-img{
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
    }
  }
  // =====  求职期望   ↓=====
  .jobExpectation-box{
    .myResume-plate-list{
      width: 100%;
      margin-top: 10px;
      .plate-list-ul{
        width: 100%;
        li{
          padding: 12px 20px;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .li-name{
            flex: 1;
            text-align: left;
            color: $g_textColor;
            .li-name-1{
              font-weight: bold;
            }
            .li-name-2{
              span{
                padding-left: 16px;
              }
            }
          }
          &:hover{
            background: #F7F8FA;
          }
          &:hover .info-set{
            display: block;
          }
        }
        
      }
    }
  }
  // =====  求职期望   ↑=====
  .info-set{
    font-size: 14px;
    font-weight: 400;
    color: $g_color;
    cursor: pointer;
    display: none;
    span{
      padding-left: 6px;
    }
  }
  .mb20{
    margin-bottom: 20px;
  }
</style>
