<template>
  <div class="container">
    <div class="educationExperience-box myResume-plate">
      <div class="myResume-plate-title-box">
        <span class="info-t">教育经历</span>
        <img src="../../../../assets/image/Frame_7.png" alt="" class="info-icon-img" v-if="!is_creat" @click="clickCreat"/>
      </div>
      <div class="myResume-plate-list" v-if="!is_creat">
        <ul class="plate-list-ul">
          <li v-for="(item,index) in data" :key="index">
            <div class="li-title-box">
              <div class="li-name">
                <span class="li-name-1">{{ item.school }}</span>
                <span class="li-name-2">{{ item.school_date }}</span>
              </div>
              <div class="info-set">
                <span @click="clickDelete(item.id,index)">删除</span>
                <span>/</span>
                <span @click="clickUpdate(item)">编辑</span>
              </div>
            </div>
            <div class="items-sub-box">统招</div>
            <div class="items-text-box"> 大专| {{ item.specialty }}</div>
          </li>

        </ul>

      </div>

      
      <!-- 编辑状态模块 开始 -->
      <div class="redact-title-bottom" v-if="is_creat">
        <div class="redact-title-box">
          <span class="info-t">添加教育经历</span>
        </div>
        <div class="redact-item-box">

          <div class="mb20 redact-item">
            <div class="item-label">学校名称</div>
            <div class="item-content">
              <el-input v-model="infoData.school" placeholder="学校名称"></el-input>
            </div>
          </div>

          <div class="mb20 redact-item">
            <div class="item-label">学历</div>
            <div class="item-content">
              <el-select v-model="infoData.education_background" placeholder="请选择">
                <el-option
                  v-for="item in education_backgroundList"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="mb20 redact-item">
            <div class="item-label">专业</div>
            <div class="item-content">
              <el-input v-model="infoData.specialty" placeholder="专业"></el-input>
            </div>
          </div>

          <div class="mb20 redact-item">
            <div class="item-label">在校时间</div>
            <div class="item-content">
              <el-date-picker
                v-model="infoData.begin_date"
                type="year"
                format="yyyy"
                value-format="yyyy"
                placeholder="开始时间">
              </el-date-picker>
              <span class="span-line"> 至 </span>
              <el-date-picker
                v-model="infoData.end_date"
                type="year"
                format="yyyy"
                value-format="yyyy"
                placeholder="结束时间">
              </el-date-picker>
            </div>
          </div>

          <!-- <div class="mb20 redact-item redact-item1">
            <div class="item-label">在校经历（选填）</div>
            <div class="item-content">
              <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                v-model="infoData.erformance">
              </el-input>
            </div>
          </div> -->

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
      infoData: {
        school: '', // 毕业学校
        education_background: '', // 学历
        specialty:'', // 专业
        begin_date: '', // 开始时间
        end_date: '', // 结束时间
        erformance: '', // 在校经历（选填）
      },
      is_creat: false,
      education_backgroundList: ['初中及一下','中专/中技','高中','大专','本科','硕士','博士'], //学历
      list_id: '', // 选中的列表id
    }
  },
  mounted(){
  
  },
  computed: {
    
  },
  methods: {
    clickCreat(){
      this.is_creat = true
    },
    // 点击新建取消按钮
    clickInfoCancelBtn(){
      this.is_creat = false;
      this.list_id = '';
    },
    // 点击创建、编辑确认按钮
    clickInfoVerifyBtn(){
      const p = Object.assign({},this.infoData);
      if(p.school == ''){
        this.$message.warning('毕业学校不能为空!');
        return
      }
      if(p.education_background == ''){
        this.$message.warning('学历不能为空!');
        return
      }
      if(p.specialty == ''){
        this.$message.warning('专业不能为空!');
        return
      }
      if(p.begin_date == ''){
        this.$message.warning('开始时间不能为空!');
        return
      }
      if(p.end_date == ''){
        this.$message.warning('结束时间不能为空!');
        return
      }
      p.school_date = p.begin_date + '-' + p.end_date; //在校时间
      
      const subCallback= ()=>{
        setTimeout(() => {
          this.is_creat = false;
          this.list_id = '';
          this.$emit('refreshInfo');
        }, 1000);
      }
      let api = '';
      let text = '';
      if(this.list_id){
        p.id = this.list_id;
        // 编辑修改
        api = '/api/education-experience/update';
        text = '修改成功'
      }else{
        // 创建教育经历
        api = '/api/education-experience/create';
        text = '创建成功'
      }
      this.createWorkExperience(p,api,text,subCallback);
    },
    // 创建教育经历
    createWorkExperience(data,api,text,f){
      let that = this;
      let p = Object.assign({},data);
      that.$axios.post(api,p).then( res =>{
        if(res.code == 0){
          that.$message.success( text );
          return f()
        }
      })
    },
    //点击删除
    clickDelete(id,idx){
      let that = this;
      let data = that.data;
      that.$axios.post('/api/education-experience/delete',{
        id,
      }).then( res =>{
        if(res.code == 0){
          that.$message.success( '删除成功！' );
          data.splice(idx);
          that.data = data;
        }
      })
    },
    // 点击列表编辑
    clickUpdate(e){
      const infoData = this.infoData;
      const obj= Object.assign({},e);
      this.list_id = obj.id;
      for(var key in infoData){
        infoData[key] = obj[key]
      }
      this.infoData = infoData;
      this.is_creat = true;
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
        /deep/ .el-select{
          width: 100%;
          .el-input.is-focus .el-input__inner{
            border-color: $g_color;
          }
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
        .span-line{
          margin: 0 10px;
          font-size: 14px;
        }
      }
      .login-check-box{
        margin-top: 6px;
        display: flex;
        align-items: center;
        .login-check-text{
          font-size: 14px;
          margin-left: 8px;
          span{
            color: $g_color;
          }
        }
        /deep/ .el-checkbox__input.is-checked .el-checkbox__inner{
          background: $g_bg;
          border-color: $g_bg;
        }
        /deep/ .el-checkbox__input.is-focus .el-checkbox__inner {
          border-color: $g_bg;
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
      /deep/ .el-button--primary{
        background-color: $g_color;
        border-color: $g_color;
      }
    }
  }
</style>
