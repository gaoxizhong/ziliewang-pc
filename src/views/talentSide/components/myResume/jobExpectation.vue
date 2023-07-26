<template>
  <div class="container">
    <div class="jobExpectation-box myResume-plate">
      <div class="myResume-plate-title-box">
        <span class="info-t">求职期望</span>
        <img src="../../../../assets/image/Frame_7.png" alt="" class="info-icon-img" @click="clickCreat"/>
      </div>
      <div class="myResume-plate-list">
        <ul class="plate-list-ul">
          <li v-for="(item,index) in data" :key="index">
            <div class="li-name">
              <span class="li-name-1">{{ item.desired_position }}/{{ item.job_preference }}</span>
              <span class="li-name-2">
                <span>{{ item.expected_salary }}</span>
                <span>|</span>
                <span>{{ item.desired_location }}</span>
                <span>|</span>
                <span>{{ item.desired_industry }}</span>
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
      // 数组/对象的默认值应当由一个工厂函数返回
      type: Array,
      default() {
        return []
      }
    }
  },
  data(){
    return{
      infoData: [],
    }
  },
  mounted(){

  },
  computed: {
    
  },
  methods: {
   
    clickRedactBtn(){
      this.infoData = JSON.parse(JSON.stringify(this.data));
      
    }, 
    clickCreat(){

    }

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
        width: 22px;
        height: 22px;
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
