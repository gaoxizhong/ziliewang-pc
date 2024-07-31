<template>
  <div class="app-container">
    <el-form :inline="true" :model="data" class="demo-form-inline">

      <el-form-item label="申诉时间:">
        <el-date-picker
          v-model="data.AAB01_START"
          type="date"
          :picker-options="pickerOptions1"
          placeholder="申诉开始日期"
        />
      </el-form-item>
      <el-form-item label="">
        <el-date-picker
          v-model="data.AAB01_END"
          type="date"
          :picker-options="pickerOptions2"
          placeholder="申诉结束日期"
        />
      </el-form-item>
      <div class="placeholder"></div>
      <el-form-item label="整改级别:">
        <el-select v-model="data.levels" filterable clearable placeholder="全部">
          <el-option v-for="item of levels" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <div class="placeholder"></div>

      <el-form-item label="住院号码:">
        <el-input v-model="data.AAA28" placeholder="请输入住院号码" />
      </el-form-item>
      <div class="placeholder"></div>    
      <el-form-item label="申诉科室:">
        <el-select v-model="data.appeal_document" filterable clearable placeholder="申诉科室">
          <el-option v-for="item of deportments" :key="item.id" :label="item.name" :value="item.name" />
        </el-select>
      </el-form-item>
      <div class="placeholder"></div>

      <el-form-item label="入院时间:">
        <el-date-picker
          v-model="data.AAB01_start_time"
          type="date"
          :picker-options="pickerOptions1"
          placeholder="入院开始日期"
        />
      </el-form-item>
      <el-form-item label="">
        <el-date-picker
          v-model="data.AAB01_end_time"
          type="date"
          :picker-options="pickerOptions2"
          placeholder="入院结束日期"
        />
      </el-form-item>
      <div class="placeholder"></div>

      <el-form-item label="申诉医师:">
        <el-input v-model="data.appeal_docter" placeholder="申诉医师" />
      </el-form-item>

      <el-form-item label="质控医师:">
        <el-input v-model="data.case_docter" placeholder="质控医师" />
      </el-form-item>
      <div class="placeholder"></div>

      <el-form-item label="审核时间:">
        <el-date-picker
          v-model="data.examine_start_time"
          type="date"
          :picker-options="pickerOptions1"
          placeholder="审核开始日期"
        />
      </el-form-item>
      <el-form-item label="">
        <el-date-picker
          v-model="data.examine_end_time"
          type="date"
          :picker-options="pickerOptions2"
          placeholder="审核结束日期"
        />
      </el-form-item>
      <div class="placeholder"></div>

      <el-form-item label="缺陷描述:">
        <el-input v-model="data.case_docter" placeholder="请输入缺陷描述" />
      </el-form-item>
      <div class="placeholder"></div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {
          BLZT: '',
          level: '',
          ZKYS: '',
          BLDJ: '',
          AAA28: '',
          AAA01: '',
          AAC11N: '',
          AAB01_START: '',
          AAB01_END: '',
          AAC01_START: '',
          AAC01_END: ''
        }
      }
    }
  },
  data() {
    return {
      
      deportments: [],
      levels: [
        {
          id: 1,
          name: '必改'
        },
        {
          id: 2,
          name: '建议'
        }
      ],

      BLDJs: [
        {
          id: 1,
          name: '甲'
        },
        {
          id: 2,
          name: '乙'
        },
        {
          id: 3,
          name: '丙'
        }
      ],
      BLZTs: [
        {
          id: 0,
          name: '未改'
        },
        {
          id: 2,
          name: '已改'
        }
      ]
    }
  },
  created() {
    this.getDeportmentList()
  },
  methods: {
    onSubmit() {
      this.$emit('search')
    },
    onReset() {
      this.$emit('reset')
    },
    getDeportmentList() {
      getDeportmentList().then(res => {
        const { p } = res
        if (Object.keys(p.list).length) {
          for (const key in p.list) {
            this.deportments.push({
              id: key,
              name: p.list[key]
            })
          }
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container{
    .placeholder{
      width: 10px;
    }
    ::v-deep .el-form{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
    ::v-deep .el-form-item{
      margin-bottom: 8px;
      margin-right: 4px;
      display: flex;
      align-items: center;
    }
    ::v-deep .el-input__inner{
      height: 35px;
      line-height: 35px;
    }
    ::v-deep .el-button{
      padding: 10px 20px;
    }
    ::v-deep .el-input__icon{
      line-height: 35px;
    }
  }
</style>
