<template>
  <div class="container info-box">
    <div class="info-left-box">
      <div class="info-right-container">
        <!-- 列表项 开始 -->
        <div class="container-items-box">
          <div class="right-container-item">
            <div class="title">
              <div class="title-left" @click.stop="clickName(infoData)">
                <img :src="infoData.users.avatar" alt="" class="avatar-img"/>
                <span>{{ infoData.users.name }}</span>
              </div>
              <div class="title-t">{{ infoData.createtime }}</div>
            </div>

            <div class="items-c-box">
              <div>
                <div class="items-c-p">{{ infoData.content }}</div>
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
                  <span>{{ infoData.read_num }} 阅读</span>
                </div>
                <div class="bottom-btn-items" @click="clickPoint">
                  <img src="../../../../assets/image/thumbs-up.png" alt="" />
                  <span>{{ infoData.point_num }} {{infoData.laud_status == 1 ? '已赞':'赞'}}</span>
                </div>
                <div class="bottom-btn-items" @click.stop="clickComment(infoData)">
                  <img src="../../../../assets/image/comment.png" alt="" />
                  <span>{{ infoData.comment_num }} 评论</span>
                </div>
              </div>
            </div>
            <div class="fabu-box" v-if="is_content">
              <el-input type="text" v-model="content" placeholder="评论千万条，友善第一条"></el-input>
              <el-button type="primary" @click="clickInfoVerifyBtn">发布</el-button>
            </div>
            <!-- 评论模块 开始 -->
            <div class="comment-box">
              <div class="comment-title-box"><span>{{ infoData.comment_num }}</span>评论</div>

              <div class="comment-list-box">
                <ul>
                  <li v-for="(items,index) in infoData.comment_list" :key="index">
                    <div class="title">
                      <div class="title-left" @click.stop="clickName(items)">
                        <img :src="items.avatar" alt="" class="avatar-img"/>
                        <span>{{ items.name }}</span>
                        <!-- <img src="../../../../assets/image/right-one.png" alt="" class="right-one"/>
                        <span>小花</span> -->
                      </div>
                      <div class="title-t">{{ items.createtime }}</div>
                    </div>
                    <div class="items-c-box">

                      <div class="items-c-p">{{ items.content }}</div>

                      <div class="items-bottom-btn">
                        <div class="bottom-btn-items" @click="clickPoint('commentID',items.id)">
                          <img src="../../../../assets/image/thumbs-up.png" alt="" />
                          <span>{{ items.point_num }} {{items.laud_status == 1 ? '已赞':'赞'}}</span>
                        </div>
                        <div class="bottom-btn-items">
                          <img src="../../../../assets/image/comment.png" alt="" />
                          <span>{{ items.comment_num }} 回复</span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

            </div>
            <!-- 评论模块 结束 -->
          </div>
        </div>
        <!-- 列表项 结束 -->
      </div>
    </div>
    <!-- 右侧模块 开始 -->
    <div class="info-right-box">
      <!-- 热门推荐 -->
      <hotRecommendation />
    </div>
    <!-- 右侧模块 结束 -->
  </div>

</template>

<script>
import hotRecommendation from '../components/hotRecommendation.vue';
export default {
  name: 'circleDetails',
  components: {
    hotRecommendation,
  },
  data(){
    return{
      infoData:{},
      content:'',
      id: '',
      is_content: false, // 评论框展示判断
    }
  },

  created(){
    this.id = this.$route.query.id;
  },
  mounted(){
    //获取职圈详情
    this.getInfoData();
  },
  computed: {
    
  },
  methods: {
    // 获取详情
   async getInfoData(){
      await this.$axios.post('/api/profession-circle/detail',{
        profession_circle_id: this.id
      }).then( res =>{
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
      let uid = localStorage.getItem('realUid');
      if(uid == i.uid){
        // 是自己
        this.$router.push({ path:'/myProfessionalCircle' })
      }else{
        this.$router.push({
          path:'/circleCentre',   //跳转的路径
          query:{           //路由传参时push和query搭配使用 ，作用时传递参数
            see_uid:i.uid,
          }
        })
      }
      
    },
    // 点击评论
    clickComment(i){
      this.is_content = true;
    },
    // 发布评论
    clickInfoVerifyBtn(){
      let p = {
        profession_circle_id: this.id,
        content: this.content
      }
      this.$axios.post('/api/profession-circle/comment',p).then( res =>{
        if( res.code == 0 ){
          this.content = '';
          this.is_content = false;
          //获取职圈详情
          this.getInfoData();
        }
      }).catch( e =>{
        console.log(e)
      })
    },
    // 点击点赞
    clickPoint(s,id){
      let infoData = this.infoData;
      let p = {
        profession_circle_id: this.id,
      }
      if(s == 'commentID'){
        // 职圈评论id
        p.comment_id = id;
      }
      this.$axios.post('/api/profession-circle/point',p).then( res =>{
        if( res.code == 0 ){
          this.content = '';
          this.is_content = false;
          infoData.point_num++;
          this.infoData = infoData;
        }
      }).catch( e =>{
        console.log(e)
      })
    }
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
                img.avatar-img{
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
                  margin-right: 8px;
                }
                img.right-one{
                  width: 16px;
                  height: 16px;
                  margin: 0 8px;
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
              margin-top: 1rem;
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
            .comment-box{
              width: 100%;
              margin-top: 2rem;
              .comment-title-box{
                font-size: 0.8rem;
                font-weight: bold;
                color: $g_textColor;
                line-height: 24px;
                position: relative;
                display: flex;
                align-items: center;
                &::after{
                  width: 3px;
                  height: 70%;
                  content: '';
                  background: $g_bg;
                  position: absolute;
                  left: 0;
                  top: 50%;
                  transform: translateY(-50%);
                }
                span{
                  padding: 0 0.5rem;
                }
              }
              .comment-list-box{
                width: 100%;
                margin-top: 0.8rem;
                ul{
                  width: 100%;
                  li{
                    width: 100%;
                    margin-top: 0.8rem;
                    .items-bottom-btn{
                      margin-top: 0.4rem;
                    }
                  }
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
    }
  }
</style>
