<template>
  <div class="container">
    <div class="info-title-box myResume-plate">
      <div class="info-title-top" v-if=" !redact_info ">
        <img :src="require('../../../../assets/image/img-user.jpg')" alt="" />
        <div style="flex: 1;padding-left: 0.9rem;">
          <div class="info-1">
            <span class="info-name">{{ data.name }}</span>
            <span class="info-set" @click="clickRedactBtn(1)">编辑</span>
          </div>
          <ul class="info-2">
            <li>
              <img src="../../../../assets/image/Frame_1.png" alt="">
              <span>{{ data.birth_year_month }}</span>
            </li>
            <li>
              <img src="../../../../assets/image/Frame_2.png" alt="">
              <span>{{ data.work_year }}</span>
            </li>
            <li>
              <img src="../../../../assets/image/Frame_5.png" alt="">
              <span>宁波</span>
            </li>
            <li>
              <img src="../../../../assets/image/Frame_5.png" alt="">
              <span v-if="data.work_status == 2">在职不考虑</span>
              <span v-if="data.work_status == 3">在职，看看新机会</span>
              <span v-if="data.work_status == 4">离职</span>
            </li>
          </ul>
          <ul class="info-2">
            <li>
              <img src="../../../../assets/image/Frame_6.png" alt="">
              <span>{{ data.phone }}</span>
            </li>
            <li>
              <img src="../../../../assets/image/Frame_4.png" alt="">
              <span>{{ data.email }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="redact-title-top" v-else>

        <div class="mb20 redact-item">
          <div class="item-label">姓名</div>
          <div class="item-content">
            <el-input v-model="infoData.name" placeholder="请输入姓名" clearable></el-input>
          </div>
        </div>

        <div class="mb20 redact-item">
          <div class="item-label">邮箱</div>
          <div class="item-content">
            <el-input v-model="infoData.email" placeholder="请输入邮箱" clearable></el-input>
          </div>
        </div>

        <div class="mb20 redact-item">
          <div class="item-label">性别</div>
          <div class="item-content">
            <div class="radio-item" :class="radio == 1 ? 'radio-checked':'' " @click="clickRadio(1)">男</div>
            <div class="radio-item" :class="radio == 2 ? 'radio-checked':'' " @click="clickRadio(2)">女</div>
          </div>
        </div>
        
        <div class="form-btns">
          <el-button @click="clickInfoCancelBtn">取消</el-button>
          <el-button type="primary" @click="clickInfoVerifyBtn">确定</el-button>
        </div>
        
      </div>
      <div class="info-title-bottom" v-if="!redact_spot">
        <div class="jobExpectation-title-box">
          <span class="info-t">优势亮点</span>
          <span class="info-set" @click="clickRedactBtn(2)">编辑</span>
        </div>
        <div class="info-title-x">{{ data.advantages_highlights?data.advantages_highlights:'暂无' }}</div>
      </div>
      <div class="redact-title-bottom" v-else>
        <div class="jobExpectation-title-box">
          <span class="info-t">优势亮点</span>
        </div>
        <div class="textarea-box">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="infoData.advantages_highlights">
          </el-input>
        </div>
        <div class="form-spotbtns">
          <el-button @click="clickSpotCancelBtn">取消</el-button>
          <el-button type="primary" @click="clickSpotVerifyBtn">确定</el-button>
        </div>
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
      redact_info: false, 
      redact_spot: false,
      infoData: {},
      radio: 0,
    }
  },
  mounted(){
  
  },
  computed: {
    
  },
  methods: {
    clickRadio(n){
      this.infoData.radio = n;
      this.radio = n;
      console.log(this.infoData)
    },
    clickRedactBtn(n){
      this.infoData = JSON.parse(JSON.stringify(this.data));
      this.radio = this.infoData.radio;
      if(n == 1){
        this.redact_info = true;
      }else if(n == 2){
        this.redact_spot = true;
      }
      
    }, 
    // 点击编辑个人信息取消按钮
    clickInfoCancelBtn(){
      this.redact_info = false;
    },
    // 点击编辑个人信息确定按钮
    clickInfoVerifyBtn(){

      this.redact_info = false;
    },
    // 点击优势亮点取消按钮
    clickSpotCancelBtn(){
      this.redact_spot = false;
    },
    // 点击优势亮点确定按钮
    clickSpotVerifyBtn(){

      this.redact_spot = false;
    },

  },
};
</script>

<style lang="scss" scoped>
  .myResume-plate{
    width: 100%;
    border-radius: 6px;
    background: #fff;
    margin-bottom: 16px;
    .jobExpectation-title-box{
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
  .info-title-box{
    .info-title-top{
      width: 100%;
      display: flex;
      padding: 24px 30px;

      img{
        width: 64px;
        height: 64px;
        border-radius: 50%;
      }

      .info-1{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .info-name{
          font-size: 18px;
          font-weight: bold;
          color: $g_textColor;
        }

      }
      .info-2{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        li{
          display: flex;
          align-items: center;
          margin-top: 8px;
          margin-left: 30px;
          line-height: 22px;
          img{
            width: 14px;
            height: 14px;
          }
          span{
            font-size: 14px;
            color: $g_textColor;
            padding-left: 4px;
          }
        }
        li:nth-of-type(1){
          margin-left: 0;
        }
      }
    }
    .redact-title-top{
      padding: 24px 15px;
      background: #F4F5F7;
      text-align: left;
      position: relative;
      .redact-item{
        display: inline-block;
        width: 50%;
        vertical-align: top;
        padding: 0 15px;
        .item-label{
          font-size: 14px;
          text-align: right;
          vertical-align: middle;
          color: #495060;
          line-height: 1;
          box-sizing: border-box;
          float: none;
          display: inline-block;
          padding: 0 0 10px;
        }
        .item-content {
          position: relative;
          line-height: 32px;
          display: flex;
          .radio-item{
            flex: 1;
            min-width: auto;
            line-height: 36px;
            display: inline-block;
            border: 1px solid #e3e7ed;
            background-color: #fff;
            text-align: center;
            cursor: pointer;
            color: #9fa3b0;
            margin-right: 20px;
            white-space: nowrap;
            position: relative;
            vertical-align: middle;
            &:last-of-type {
              margin-right: 0;
            }
          }
          .radio-checked {
            border-color: $g_color;
            color: $g_color;
            background-color: #effbfa;
          }
        }
      }
      .redact-item:nth-child(odd) {
        margin-bottom: 0;
      }
      .form-btns{
        position: absolute;
        bottom: 26px;
        right: 15px;
        text-align: right;
        padding: 0 15px;
      }
    }
    .info-title-bottom{
      padding: 24px 30px;
      .info-title-x{
        padding: 10px 0;
        margin-top: 6px;
        font-size: 12px;
        font-weight: 400;
        color: #4E5969;
        line-height: 22px;
        text-align: left;
      }
    }
    .redact-title-bottom{
      padding: 24px 30px;
      background: #F4F5F7;
      text-align: left;
      position: relative;
      .textarea-box{
        width: 100%;
        margin-top: 10px; 
        font-size: 14px;
        /deep/ .el-textarea__inner{
          font-size: 14px;
          &:focus{
            border-color: $g_color;
          }
        }
      }
      .form-spotbtns{
        margin-top: 16px;
        width: 100%;
        text-align: right;
      }
    }
    /deep/ .el-button{
      padding: 10px 30px;
    }
    /deep/ .el-button--primary{
      background-color: $g_color;
      border-color: $g_color;
    }
  }
  .info-set{
    font-size: 14px;
    font-weight: 400;
    color: $g_color;
    cursor: pointer;
  }
  .mb20{
    margin-bottom: 20px;
  }
</style>
