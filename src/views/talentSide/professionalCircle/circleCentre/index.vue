<template>
  <div class="container" id="myProfessionalCircle">

    <div class="info-box">
      <!-- 左侧模块 开始 -->
      <div class="info-left-box">
        <div class="left-box user-top-box">
          <div class="user-top">
            <img src="../../../../assets/image/img-user.jpg" alt="" class="user-img"/>
            <p class="user-name">回忆那么美</p>
            <div class="gz-sx-btn">
              <div class="left">
                <img src="../../../../assets/image/Frame_10.png" alt="" />
                <span>关注</span>
              </div>
              <div class="right">发私信</div>
            </div>
          </div>
          <div class="user-top-num">
            <div>
              <span class="title">2</span>
              <span class="text">关注</span>
            </div>
            <div>
              <span class="title">2</span>
              <span class="text">粉丝</span>
            </div>
          </div>
        </div>

        <div class="left-box user-m-box">
          <div class="m-items-box">
            <img src="../../../../assets/image/shopping-mall.png" alt="" />
            <span>就职于</span>
            <p>宁波荣胜网络科技有限公司</p>
          </div>
          <div class="m-items-box">
            <img src="../../../../assets/image/handbag.png" alt="" />
            <span>职位</span>
            <p>设计主管</p>
          </div>
          <div class="m-items-box">
            <img src="../../../../assets/image/user-business.png" alt="" />
            <span>目前状态</span>
            <p>离职中</p>
          </div>
        </div>

      </div>
      <!-- 左侧模块 结束 -->
      <!-- 右侧模块 开始 -->
      <div class="info-right-box">
        <div class="info-right-top">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全部10" name="first"></el-tab-pane>
            <el-tab-pane label="动态5" name="second"></el-tab-pane>
            <el-tab-pane label="评论5" name="fourth"></el-tab-pane>
          </el-tabs>
        </div>
        <div class="info-right-container">
          <!-- 列表项 开始 -->
          <div class="container-items-box">
            <div class="right-container-title"><span>回忆那么真</span><span>发布了动态</span></div>
            <div class="right-container-item">
              <div class="title">
                <div class="title-left">
                  <img src="../../../../assets/image/img-user.jpg" alt="" />
                  <span>匿名用户</span>
                </div>
                <div class="title-t">2023-02-19</div>
              </div>

              <div class="items-c-box">
                <div class="items-c-p">
                  如果你没有任何工作经历，还想了解夕阳代加工制造业的兴衰成败，你可以加入这个公司该公司会让你深刻了解体会到***丝公司逆袭成功以后的一系列头疼问题，在这里你体会到的是社会最底层的痛苦挣扎...
                </div>
                <div class="items-img-box">
                  <img src="../../../../assets/image/demo2.png" alt="" />
                  <img src="../../../../assets/image/demo2.png" alt="" />
                </div>
                <div class="items-bottom-btn">
                  <div class="bottom-btn-items">
                    <img src="../../../../assets/image/preview-open.png" alt="" />
                    <span>1801阅读</span>
                  </div>
                  <div class="bottom-btn-items">
                    <img src="../../../../assets/image/thumbs-up.png" alt="" />
                    <span>15点赞</span>
                  </div>
                  <div class="bottom-btn-items">
                    <img src="../../../../assets/image/comment.png" alt="" />
                    <span>2评论</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <!-- 列表项 结束 -->

        </div>
      </div>
      <!-- 右侧模块 结束 -->

    </div>

  </div>
</template>

<script>
import { getToken, setToken, removeToken } from '@/utils/auth';
export default {
  name: 'myProfessionalCircle',
  components: {
  },
  data(){
    return{
      activeName: 'first',
      infoData:{}, // 信息
    }
  },
  computed: {
    
  },
  mounted(){
    // 获取用户信息
    this.getUserProfile();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 获取用户信息
    getUserProfile(){
      this.$axios.post('',{}).then( res =>{
        if(res.code == 0){
        this.infoData = res.data;
        }
      }).catch(e =>{
        console.log(e)
      })
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../../../../styles/professionalCircle.scss';

</style>
