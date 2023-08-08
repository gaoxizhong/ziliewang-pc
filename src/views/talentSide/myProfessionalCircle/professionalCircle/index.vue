<template>
  <div>
    <div class="container-title-box">
      <el-tabs v-model="tag" @tab-click="handleClick">
        <el-tab-pane label="推荐" name="recommend"></el-tab-pane>
        <el-tab-pane label="热门" name="hot"></el-tab-pane>
        <el-tab-pane label="关注" name="attention"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="container info-box">
      <div class="info-left-box">
        <div class="info-right-container">
          <!-- 列表项 开始 -->
          <div class="container-items-box" v-for="(item,index) in dataList" :key="index">
            <div class="right-container-item" @click.stop="clicklistItems(item)">
              <div class="title">
                <div class="title-left" @click.stop="clickName(item)">
                  <img :src=" item.avatar ? item.avatar : require('../../../../assets/image/img-user.jpg' )" alt="" />
                  <span>{{ item.users.name }}</span>
                </div>
                <div class="title-t">{{ item.createtime }}</div>
              </div>

              <div class="items-c-box">
                <div>
                  <div class="items-c-p">{{ item.content }}</div>
                  <!-- <div class="items-img-box" v-if="item.images">
                    <img :src="img_item" alt="" v-for="(img_item,idx) in item.images" :key="idx"/>
                  </div> -->
                  <div class="items-img-box" v-if="item.images">
                    <img :src="item.images" alt="" />
                  </div>
                </div>
                <div class="items-bottom-btn">
                  <div class="bottom-btn-items">
                    <img src="../../../../assets/image/preview-open.png" alt="" />
                    <span>{{ item.read_num?item.read_num:0 }}阅读</span>
                  </div>
                  <div class="bottom-btn-items">
                    <img src="../../../../assets/image/thumbs-up.png" alt="" />
                    <span>{{ item.point_num?item.point_num:0 }}点赞</span>
                  </div>
                  <div class="bottom-btn-items">
                    <img src="../../../../assets/image/comment.png" alt="" />
                    <span>{{ item.comment_num?item.comment_num:0 }}评论</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <!-- 列表项 结束 -->
        </div>
      </div>
      <div class="info-right-box">
        <div class="info-right-top">
          <div class="title">热门职位</div>
          <ul>
            <li>
              <div class="li-title">
                <span class="li-text">软件测试/解决方案测试工...</span>
                <span class="li-xz">25-50K·13薪</span>
              </div>
              <div class="li-bottom-box">
                <div>华为云</div>
                <span>宁波</span>
              </div>
            </li>
            <li>
              <div class="li-title">
                <span class="li-text">软件测试/解决方案测试工...</span>
                <span class="li-xz">25-50K·13薪</span>
              </div>
              <div class="li-bottom-box">
                <div>华为云</div>
                <span>宁波</span>
              </div>
            </li>
            <li>
              <div class="li-title">
                <span class="li-text">软件测试/解决方案测试工...</span>
                <span class="li-xz">25-50K·13薪</span>
              </div>
              <div class="li-bottom-box">
                <div>华为云</div>
                <span>宁波</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
export default {
  name: 'myProfessionalCircle',
  components: {
  },
  data(){
    return{
      tag: 'recommend',
      page: 1,
      dataList:[]
    }
  },
  computed: {
    
  },
  mounted(){
    this.getList();
  },
  methods: {
    handleClick(tab, event){
      console.log(tab)
      this.page = 1;
      this.getList();
    },
    getList(){
      this.$axios.post('/api/profession-circle/index',{
        page: this.page,
        tag: this.tag
      }).then(res =>{
        if(res.code == 0){
          this.dataList = res.data
        }
      })
    },
    // 点击头像、名称
    clickName(i){
      console.log(i)
      this.$router.push({
        path:'/myCircle',   //跳转的路径
        query:{           //路由传参时push和query搭配使用 ，作用时传递参数
          id:i.id,
        }
      })
    },
    // 点击列表
    clicklistItems(i){
      this.$router.push({
        path:'/circleDetails',   //跳转的路径
        query:{           //路由传参时push和query搭配使用 ，作用时传递参数
          id:i.id,
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
  .container-title-box{
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    background: #FFFFFF;
    /deep/ .el-tabs{
        height: 100%;
        .el-tabs__header {
          height: 100%;
          .el-tabs__nav-wrap{
            height: 100%;
            line-height: 3rem;
            &::after{
              height: 0;
            }
            .el-tabs__nav-scroll {
              height: 100%;
              padding: 0 20px;
              .el-tabs__item.is-active{
                color: $g_color;
              }
              .el-tabs__active-bar{
                bottom: 1px;
                background-color: $g_bg;
              }
            }
          }
        }
      }
  }
  .info-box{
    width: 1200px !important;
    margin: 0 auto;
    margin-top: 1rem;
    width: 100%;
    display: flex;
    text-align: left;
    .info-left-box{
      flex: 1;
      .info-right-container{
        .container-items-box{
          background: #fff;
          .right-container-title{
            margin-top: 1rem;
            width: 100%;
            height: 44px;
            line-height: 44px;
            border-bottom: 1px solid #F2F3F5;
            span{
              margin-left: 20px;
              font-size: 14px;
              color: #86909C;
              line-height: 22px;
            }

          }
          .right-container-item{
            padding: 1.2rem;
            margin-top: 0;
            &:nth-child(1){
              margin-top: 0;
            }
            .title{
              display: flex;
              align-items: center;
              justify-content: space-between;
              .title-left{
                display: flex;
                align-items: center;
                cursor: pointer;
                img{
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
                  margin-right: 8px;
                }
                span{
                  font-size: 14px;
                  font-weight: 400;
                  color: #4E5969;
                  line-height: 22px;
                }
              }
             
              .title-t{
                font-size: 14px;
                font-weight: 400;
                color: #86909C;
                line-height: 22px;
              }
            }
            .items-c-box{
              width: 100%;
              padding-left: 2rem;
              .items-c-p{
                font-size: 14px;
                font-weight: 400;
                color: #1F2E4D;
                line-height: 28px;
              }
              .items-img-box{
                width: 100%;
                height: auto;
                display: flex;
                flex-wrap: wrap;
                margin-top: 0.8rem;
                img{
                  width: 140px;
                  height: 100px;
                  margin-left: 0.5rem;
                  &:nth-child(1){
                    margin: 0;
                  }
                }
              }
            }
            .items-bottom-btn{
              display: flex;
              align-items: center;
              margin-top: 0.8rem;
              .bottom-btn-items{
                margin-right: 16px;
                display: flex;
                align-items: center;
                cursor: pointer;
                img{
                  width: 14px;
                  height: 14px;
                  margin-right: 4px;
                  display: inline-block;
                }
                span{
                  font-size: 14px;
                  font-weight: 400;
                  color: #86909C;
                  line-height: 22px;
                }
              }
            }
          }

        }
        
      }
    }
    .info-right-box{
      width: 19rem;
      padding-left: 0.8rem;
      .info-right-top{
        width: 100%;
        height: auto;
        padding: 0.8rem 1.1rem;
        background: #FFFFFF;
        border-radius: 4px 4px 4px 4px;
        .title{
          font-size: 0.8rem;
          font-weight: bold;
          color: $g_textColor;
          line-height: 1.2rem;
        }
        ul{
          margin-top: 1rem;
          width: 100%;
          li{
            width: 100%;
            height: auto;
            padding: 0.6rem 0.7rem;
            font-size: 0.7rem;
            cursor: pointer;
            &:hover{
              background: #F4F8FF;
            }
            .li-title{
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-weight: bold;
              .li-text{
                flex: 1;
                color: $g_textColor;
                line-height: 22px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .li-xz{
                width: auto;
                color: #FF4D4F;
                line-height: 22px;
              }
            }
            .li-bottom-box{
              margin-block: 0.8rem;
              display: flex;
              align-items: center;
              justify-content: space-between;
              div{
                font-size: 12px;
                font-weight: 400;
                color: #86909C;
                line-height: 20px;
              }
            }
          }
        }
      }
    }
  }
</style>
