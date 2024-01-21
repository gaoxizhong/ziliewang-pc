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
            <!-- <div class="items-sub-box">统招</div> -->
            <div class="items-text-box"> {{ item.education_background }} | {{ item.specialty }}</div>
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
                type="month"
                value-format="yyyy-MM-dd"
                placeholder="开始时间"
                @change="begin_date_change"
                >
              </el-date-picker>
              <span class="span-line"> 至 </span>
              <el-date-picker
                v-model="infoData.end_date"
                type="month"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd"
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
      education_backgroundList: ['博士','硕士','本科','大专','中专/中技','高中','初中及以下'], //学历
      list_id: '', // 选中的列表id
     
      startDate:''
    }
  },
  mounted(){
  
  },
  computed: {
    pickerOptions(){
      let that = this;
      return {
        disabledDate(time) {
          let maxDate = Date.parse(that.startDate);
          return time.getTime() <= maxDate;
        }
      }
      
    }
  },
  methods: {
    begin_date_change(e){
      this.startDate = new Date(e);
      this.infoData.end_date = '';
    },
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
  @import '../../../../styles/myResume.scss';

</style>
