<template>
  <div class="container">
    <div class="workExperience-box myResume-plate">
      <div class="myResume-plate-title-box">
        <span class="info-t">工作经历</span>
        <img src="../../../../assets/image/Frame_7.png" alt="" class="info-icon-img"/>
      </div>
      <div class="myResume-plate-list">
        <ul class="plate-list-ul">
          <li>
            <div class="li-title-box">
              <div class="li-name">
                <span class="li-name-1">宁波荣胜网络科技有限公司</span>
                <span class="li-name-2">2014-2015</span>
              </div>
              <div class="info-set">
                <span>删除</span>
                <span>/</span>
                <span>编辑</span>
              </div>
            </div>
            <div class="items-sub-box">设计总监</div>
            <div class="items-text-box">
              负责规划方案设计的技术指导工作；2、负责公司开发产品总体效果的控制；3、组织落实规划建筑、室内装修的设计方案及施工图；4、负责组织审查建筑专业的图纸并提
            </div>
          </li>
          <li>
            <div class="li-title-box">
              <div class="li-name">
                <span class="li-name-1">宁波荣胜网络科技有限公司</span>
                <span class="li-name-2">2014-2015</span>
              </div>
              <div class="info-set">
                <span>删除</span>
                <span>/</span>
                <span>编辑</span>
              </div>
            </div>
            <div class="items-sub-box">设计总监</div>
            <div class="items-text-box">
              负责规划方案设计的技术指导工作；2、负责公司开发产品总体效果的控制；3、组织落实规划建筑、室内装修的设计方案及施工图；4、负责组织审查建筑专业的图纸并提
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
  // =====  工作经历   ↓=====
  .workExperience-box{
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
                font-size: 15px;
                font-weight: bold;
              }
              .li-name-2{
                color: #86909C;
                padding-left: 30px;
              }
            }

          }
          .items-sub-box{
            font-size: 14px;
            font-weight: 400;
            color: #4E5969;
            line-height: 22px;
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
  // =====  工作经历  ↑=====
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
