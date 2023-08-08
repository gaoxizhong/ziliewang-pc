<template>
  <div class="container info-box">
    <div class="info-left-box">
      <div class="info-right-container">
        <!-- 列表项 开始 -->
        <div class="container-items-box">
          <div class="right-container-item">
            <div class="title">
              <div class="title-left" @click.stop="clickName(infoData)">
                <img src="../../../../assets/image/img-user.jpg" alt="" />
                <span>匿名用户</span>
              </div>
              <div class="title-t">2023-08-03 18:20:33</div>
            </div>

            <div class="items-c-box">
              <div>
                <div class="items-c-p">我的职圈123</div>
                <!-- <div class="items-img-box" v-if="item.images">
                  <img :src="img_item" alt="" v-for="(img_item,idx) in item.images" :key="idx"/>
                </div> -->
                <div class="items-img-box" v-if="infoData.images">
                  <img :src="infoData.images" alt="" />
                </div>
              </div>
              <div class="items-bottom-btn">
                <div class="bottom-btn-items">
                  <img src="../../../../assets/image/preview-open.png" alt="" />
                  <span>0 阅读</span>
                </div>
                <div class="bottom-btn-items">
                  <img src="../../../../assets/image/thumbs-up.png" alt="" />
                  <span>0 点赞</span>
                </div>
                <div class="bottom-btn-items">
                  <img src="../../../../assets/image/comment.png" alt="" />
                  <span>0评论</span>
                </div>
              </div>
            </div>
            <div class="fabu-box">
              <el-input type="text" v-model="content" placeholder="评论千万条，友善第一条"></el-input>
              <el-button type="primary" @click="clickInfoVerifyBtn">发布</el-button>
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

</template>

<script>
export default {
  name: 'circleDetails',
  components: {
  },
  data(){
    return{
      infoData:{}
    }
  },
  computed: {
    
  },
  methods: {
    // 获取详情
    getInfoData(){
      this.$axios.post('',{}).then( res =>{
        if( res.code == 0 ){
          this.infoData = res.data;
        }
      }).catch( e =>{
        console.log(e)
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
    // 发布评论
    clickInfoVerifyBtn(){

    },
  },
};
</script>

<style lang="scss" scoped>
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
            .fabu-box{
              width: 100%;
              height: auto;
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-top: 20px;
              padding: 0 20px;
              /deep/ .el-button{
                padding: 0;
                width: 100px;
                height: 2rem;
                line-height: 2rem;
                margin-left: 20px;
              }
              /deep/ .el-button--primary{
                background-color: $g_color;
                border-color: $g_color;
              }
              /deep/ .el-input__inner{
                height: 2rem;
                line-height: 2rem;
                font-size: 0.7rem;
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
