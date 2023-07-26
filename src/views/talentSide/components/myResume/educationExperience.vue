<template>
  <div class="container">
    <div class="educationExperience-box myResume-plate">
      <div class="myResume-plate-title-box">
        <span class="info-t">教育经历</span>
        <img src="../../../../assets/image/Frame_7.png" alt="" class="info-icon-img"/>
      </div>
      <div class="myResume-plate-list">
        <ul class="plate-list-ul">
          <li v-for="(item,index) in data" :key="index">
            <div class="li-title-box">
              <div class="li-name">
                <span class="li-name-1">{{ item.school }}</span>
                <span class="li-name-2">{{ item.school_date }}</span>
              </div>
              <div class="info-set">
                <span>编辑</span>
              </div>
            </div>
            <div class="items-sub-box">统招</div>
            <div class="items-text-box"> 大专| {{ item.specialty }}</div>
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

  // =====  教育经历   ↓=====
  .educationExperience-box{
    .myResume-plate-list{
      width: 100%;
      margin-top: 10px;
      .plate-list-ul{
        width: 100%;
        li{
          padding: 12px 10px 12px 20px;
          font-size: 14px;
          text-align: left;
          &:hover{
            background: #F7F8FA;
          }
          &:hover .info-set{
            display: block;
          }
          .li-title-box{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .li-name{
              flex: 1;
              text-align: left;
              color: $g_textColor;
              .li-name-1{
                font-size: 14px;
                font-weight: bold;
              }
              .li-name-2{
                color: #86909C;
                padding-left: 20px;
              }
            }

          }
          .items-sub-box{
            width: 60px;
            height: 22px;
            text-align: center;
            background: #FFF7E6;
            border-radius: 2px;
            opacity: 1;
            border: 1px solid #FFD591;
            font-size: 12px;
            font-weight: 400;
            color: #FA8C16;
            line-height: 20px;
            margin-top: 4px;
          }
          .items-text-box{
            margin-top: 0.8rem;
            color: $g_textColor;
            font-size: 14px;
            font-weight: 400;
            line-height: 22px;
          }
          
        }
        
      }
    }
  }
  // =====  教育经历  ↑=====





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
