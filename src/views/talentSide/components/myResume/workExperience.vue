<template>
  <div class="container">
    <div class="workExperience-box myResume-plate">
      <div class="myResume-plate-title-box">
        <span class="info-t">工作经历</span>
        <img src="../../../../assets/image/Frame_7.png" alt="" class="info-icon-img" v-if="!is_creat" @click="clickCreat"/>
      </div>
      <div class="myResume-plate-list" v-if="!is_creat">
        <ul class="plate-list-ul">
          <li v-for="(item,index) in data" :key="index">
            <div class="li-title-box">
              <div class="li-name">
                <span class="li-name-1">{{ item.company_name }}</span>
                <span class="li-name-2">{{ item.begin_date }} - {{ item.end_date }}</span>
              </div>
              <div class="info-set">
                <span>删除</span>
                <span>/</span>
                <span>编辑</span>
              </div>
            </div>
            <div class="items-sub-box">{{ item.position }}</div>
            <div class="items-text-box">
              {{ item.responsibility_performance }}
            </div>
          </li>
        </ul>

      </div>

      <!-- 编辑状态模块 开始 -->
      <div class="redact-title-bottom" v-if="is_creat">
        <div class="redact-title-box">
          <span class="info-t">添加工作经历</span>
        </div>
        <div class="redact-item-box">

          <div class="mb20 redact-item">
            <div class="item-label">公司名称</div>
            <div class="item-content">
              <el-input v-model="infoData.desired_position" placeholder="请选择"></el-input>
            </div>
          </div>

          <div class="mb20 redact-item">
            <div class="item-label">所属行业</div>
            <div class="item-content">
              <el-input v-model="infoData.desired_location" autocomplete="on" spellcheck="false" placeholder="请选择" readonly="readonly"></el-input>
              <img src="../../../../assets/image/Frame_8.png" alt="" />
            </div>
          </div>

          <div class="mb20 redact-item">
            <div class="item-label">工作时间</div>
            <div class="item-content">
              <el-input v-model="infoData.desired_industry" autocomplete="on" spellcheck="false" placeholder="请选择" readonly="readonly"></el-input>
            </div>
          </div>
          <div class="mb20 redact-item"></div>
          <div class="mb20 redact-item redact-item1">
            <div class="item-label">职位名称</div>
            <div class="item-content">
              <el-input v-model="infoData.expected_salary" placeholder="请填写职位名称"></el-input>
            </div>
          </div>

          <div class="mb20 redact-item redact-item1">
            <div class="item-label">职责业绩</div>
            <div class="item-content">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="infoData.advantages_highlights">
              </el-input>
            </div>
          </div>

          <div class="form-btns">
            <el-button @click="clickInfoCancelBtn">取消</el-button>
            <el-button type="primary" @click="clickInfoVerifyBtn">确定</el-button>
          </div>

          </div>

      </div>
      <!-- 编辑状态模块 结束 -->


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
      is_creat: false

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
      this.is_creat = true
    },
    // 点击新建取消按钮
    clickInfoCancelBtn(){
      this.is_creat = false;
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
    .myResume-plate-title-box{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24px 30px;

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
  .redact-title-bottom{
    padding: 20px 30px;
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
    .redact-title-box{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .info-t{
        font-weight: bold;
        font-size: 16px;
        color: $g_textColor;
        line-height: 24px;
      }
    }
  }

  .redact-item-box{
    padding: 20px 0;
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
          font-size: 16px;
          &:last-of-type {
            margin-right: 0;
          }
          /deep/ .el-textarea__inner{
            font-size: 14px;
            &:focus{
              border-color: $g_color;
            }
          }
        }
        .radio-checked {
          border-color: $g_color;
          color: $g_color;
          background-color: #effbfa;
        }
        /deep/ .el-input__inner{
          height: 38px;
          line-height: 38px;
          cursor: pointer;
        }
        img{
          width: 21px;
          height: 18px;
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 2;
        }
      }
    }
    .redact-item.redact-item1{
      width: 100%;
    }
    
    .form-btns{
      // position: absolute;
      // bottom: 20px;
      // right: 15px;
      text-align: right;
      margin-right: 16px;
      /deep/ .el-button{
        padding: 0;
        width: 100px;
        height: 40px;
        line-height: 40px;
      }
    }
  }
</style>
