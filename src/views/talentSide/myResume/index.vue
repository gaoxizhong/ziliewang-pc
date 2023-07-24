<template>
  <!-- 我的简历页 -->
  <div class="container">
    <div class="tab-box">
      <div :class="is_titleTab == 1? 'hover':'' " @click="clickTitleTab(1)">预览简历</div>
      <div :class="is_titleTab == 2? 'hover':'' " @click="clickTitleTab(2)">刷新简历</div>
      <div :class="is_titleTab == 3? 'hover':'' " @click="clickTitleTab(3)">简历优化</div>
    </div>
    
    <div class="info-box">
      <div class="info-left-box">
        <!-- 个人信息 开始 -->
          <MyInfo v-if="infoData.basic_info" :data="infoData.basic_info" />  
        <!-- 个人信息 结束 -->

        <!-- 求职期望 开始 -->
        <div class="jobExpectation-box myResume-plate">
          <div class="myResume-plate-title-box">
            <span class="info-t">求职期望</span>
           <img src="../../../assets/image/Frame_7.png" alt="" class="info-icon-img"/>
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
        <!-- 求职期望 结束 -->

        <!-- 工作经历 开始 -->
        <div class="workExperience-box myResume-plate">
          <div class="myResume-plate-title-box">
            <span class="info-t">工作经历</span>
           <img src="../../../assets/image/Frame_7.png" alt="" class="info-icon-img"/>
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
        <!-- 工作经历 结束 -->
        <!-- 项目经历 开始 -->
        <div class="projectExperience-box myResume-plate">
          <div class="myResume-plate-title-box">
            <span class="info-t">项目经历</span>
           <img src="../../../assets/image/Frame_7.png" alt="" class="info-icon-img"/>
          </div>
          <div class="myResume-plate-list">
            <ul class="plate-list-ul">
              <li>
                <div class="li-title-box">
                  <div class="li-name">
                    <span class="li-name-1">鄞州非遗馆</span>
                    <span class="li-name-2">2014-2015</span>
                  </div>
                  <div class="info-set">
                    <span>删除</span>
                    <span>/</span>
                    <span>编辑</span>
                  </div>
                </div>
                <div class="items-sub-box">宁波彩壳广告有限公司·设计师</div>
                <div class="items-text-box">
                  负责非遗馆所有平面物料。展厅策划
                </div>
              </li>
              <li>
                <div class="li-title-box">
                  <div class="li-name">
                    <span class="li-name-1">鄞州非遗馆</span>
                    <span class="li-name-2">2014-2015</span>
                  </div>
                  <div class="info-set">
                    <span>删除</span>
                    <span>/</span>
                    <span>编辑</span>
                  </div>
                </div>
                <div class="items-sub-box">宁波彩壳广告有限公司·设计师</div>
                <div class="items-text-box">
                  负责非遗馆所有平面物料。展厅策划
                </div>
              </li>
            </ul>

          </div>
        </div>
        <!-- 项目经历 结束 -->
        <!-- 教育经历 开始 -->
        <div class="educationExperience-box myResume-plate">
          <div class="myResume-plate-title-box">
            <span class="info-t">教育经历</span>
           <img src="../../../assets/image/Frame_7.png" alt="" class="info-icon-img"/>
          </div>
          <div class="myResume-plate-list">
            <ul class="plate-list-ul">
              <li>
                <div class="li-title-box">
                  <div class="li-name">
                    <span class="li-name-1">金职院</span>
                    <span class="li-name-2">2014-2015</span>
                  </div>
                  <div class="info-set">
                    <span>编辑</span>
                  </div>
                </div>
                <div class="items-sub-box">统招</div>
                <div class="items-text-box"> 大专|工业设计</div>
              </li>

            </ul>

          </div>
        </div>
        <!-- 教育经历 结束 -->

      </div>
      <!-- 右侧模块 开始 -->
      <div class="info-right-box">
        <div class="right-box up-attachments-box">
          <div class="up-att-t">
            <span class="span-1">上传附件简历</span>
            <span class="span-2">去上传<i class="el-icon-arrow-right" style="margin-left:2px;"></i></span>
          </div>
          <div class="up-box-Instructions">在附件中展示更多优势与特长</div>
        </div>
      </div>
      <!-- 右侧模块 结束 -->
    </div>



  </div>

</template>

<script>
import MyInfo from "../components/myResume/myInfo.vue"
export default {
  name: 'myResume',
  components: {
    MyInfo,
  },
  data(){
    return{
      is_titleTab: 3,
      infoData:{}, // 信息
    }
  },
  computed: {
    
  },
  mounted(){

  },  
  created(){
    // 获取个人信息
    this.getUserProfile();
  },
  methods: {
    clickTitleTab(n){
      this.is_titleTab = n;
    },
    
   // 获取个人信息
   getUserProfile(){
      let that = this;
      that.$axios.post('/api/user/profile',{}).then(res =>{
        console.log(res.data)
        if(res.code == 0){
          this.infoData = res.data;
        }
      }).catch(e =>{
        console.log(e)
      })
    },
  },
};
</script>

<style lang="scss" scoped>
 .tab-box{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  div{
    margin-left: 12px;
    width: 92px;
    height: 32px;
    line-height: 32px;
    background: #FFFFFF;
    border-radius: 100px 100px 100px 100px;
    border: 1px solid $g_color;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    color: $g_color;
    cursor: pointer;
  }
  div.hover{
    background: $g_bg;
    color: #fff;
  }
 }
 .info-box{
  width: 100%;
  display: flex;
  margin-top: 20px;
  .info-left-box{
    flex: 1;
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
    // =====  工作经历/项目经历   ↓=====
    .workExperience-box,.projectExperience-box{
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

    // =====  工作经历/项目经历  ↑=====

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

  }
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

  .info-right-box{
    width: 406px;
    padding-left: 0.8rem;
    .right-box{
      background: #FFFFFF;
      border-radius: 6px ;
      opacity: 1;
      padding: 24px 24px 20px 24px;
    }
    .up-attachments-box{
      .up-att-t{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .span-1{
          font-size: 15px;
          font-weight: bold;
          color: $g_textColor;
          line-height: 24px;
        }
        .span-2{
          font-size: 14px;
          font-weight: 400;
          color: $g_color;
          line-height: 22px;
        }
      }
      .up-box-Instructions{
        font-size: 14px;
        font-weight: 400;
        color: #86909C;
        line-height: 22px;
        margin-top: 8px;
        text-align: left;
      }
    }
  }
 }



</style>
