<template>
      <!-- 职位弹窗 -->
      <div class="dialogVisible-pop-box" v-if="dialogVisible">
      <div class="mask-box"></div>
      <div class="dialog-container">
        <div class="dialog-header">
          <h3 class="title">请选择职城市</h3>
          <div class="dialog-header-input">
            <!-- <el-input type="text" v-model="dialogVisible_seach"></el-input> -->
          </div>
          <img src="../../../../assets/image/icon-close.png" alt="" @click="clickClose"/>
        </div>
        <div class="dialog-body">
          <div class="body-left-box">
            <div class="left-list-box">
              <ul>
                <li :class="selt_item == index? 'active':'' " v-for="(item,index) in position.industryList" :key="index" @click="click_industryListLi(item,index)">{{ item.industry }}</li>
              </ul>
            </div>
          </div>
          <div class="body-right-box">
            <div class="right-list-box">
              <div class="category-list-items">
                <ul>
                  <li :class="selt_item == index? 'active':'' " v-for="(items,idx) in item.position_list" :key="idx" @click="click_position_list(items.category_name)">{{ items.category_name }}</li>
                </ul>
              </div>
              
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
</template>

<script>
let pcas = require('../../assets/json/pc-code.json');
export default {
  props: {
   
  },
  data() {
    return {
      dialogVisible: false,
      options: pcas,

    }
  },
  methods: {
    clickClose(){
      this.dialogVisible = false;
    },
  }
}
</script>

<style scoped>

</style>
