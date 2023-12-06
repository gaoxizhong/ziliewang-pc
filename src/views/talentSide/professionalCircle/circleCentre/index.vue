<template>
  <div class="container" id="myProfessionalCircle">

    <div class="info-box">
      <!-- 左侧模块 开始 -->
      <div class="info-left-box">
        <div class="left-box user-top-box">
          <div class="user-top">
            <img :src="infoData.avatar?infoData.avatar:require('../../../../assets/image/img-user.jpg')" alt="" class="user-img"/>
            <p class="user-name">{{ infoData.real_name }}</p>
            <div class="gz-sx-btn" v-if="uid != see_uid">
              <div class="left" @click="clickAttention" v-if=" infoData.is_already_attention ==  2">
                <img src="../../../../assets/image/Frame_10.png" alt="" />
                <span>关注</span>
              </div>
              <div class="left" @click="clickCancelAttention" v-if=" infoData.is_already_attention ==  1">
                <img src="../../../../assets/image/Frame_10.png" alt="" />
                <span>已关注</span>
              </div>
              <div class="right">发私信</div>
            </div>
          </div>
          <div class="user-top-num">
            <div>
              <span class="title">{{ infoData.attention_num }}</span>
              <span class="text">关注</span>
            </div>
            <div>
              <span class="title">{{ infoData.fan_num }}</span>
              <span class="text">粉丝</span>
            </div>
          </div>
        </div>

        <div class="left-box user-m-box">
          <div class="m-items-box">
            <img src="../../../../assets/image/shopping-mall.png" alt="" />
            <span>就职于</span>
            <p>{{ infoData.company_name }}</p>
          </div>
          <div class="m-items-box">
            <img src="../../../../assets/image/handbag.png" alt="" />
            <span>职位</span>
            <p>{{ infoData.position }}</p>
          </div>
          <div class="m-items-box">
            <img src="../../../../assets/image/user-business.png" alt="" />
            <span>目前状态</span>
            <p>{{ infoData.work_status_desc }}</p>
          </div>
        </div>

      </div>
      <!-- 左侧模块 结束 -->
      <!-- 右侧模块 开始 -->
      <div class="info-right-box">
        <div class="info-right-top">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label=" `全部${count_list.all_count}` " name="first"></el-tab-pane>
            <el-tab-pane :label=" `动态${count_list.dynamic_state_count}` " name="second"></el-tab-pane>
            <el-tab-pane :label=" `评论${count_list.comment_count}` " name="fourth"></el-tab-pane>
          </el-tabs>
        </div>
        <div class="info-right-container">
          <!-- 列表项 开始 -->
          <div class="container-items-box" v-for="(item,index) in infoList" :key="index">
            <!-- <div class="right-container-title"><span>回忆那么真</span><span>发布了动态</span></div> -->
            <div class="right-container-item">
              <div class="title">
                <div class="title-left">
                  <img :src="infoData.avatar?infoData.avatar:require('../../../../assets/image/img-user.jpg')" alt="" />
                  <span>{{ infoData.name }}</span>
                </div>
                <div class="title-t">{{ item.createtime }}</div>
              </div>

              <div class="items-c-box">
                <div class="items-c-p">{{ item.content }}</div>
                <div class="items-img-box">
                  <img :src="item.images" alt="" />
                </div>
                <div class="items-bottom-btn">
                  <div class="bottom-btn-items">
                    <img src="../../../../assets/image/preview-open.png" alt="" />
                    <span>{{ item.comment_num }}阅读</span>
                  </div>
                  <div class="bottom-btn-items">
                    <img src="../../../../assets/image/thumbs-up.png" alt="" />
                    <span>{{ item.point_num }}赞</span>
                  </div>
                  <div class="bottom-btn-items">
                    <img src="../../../../assets/image/comment.png" alt="" />
                    <span>{{ item.read_num }}评论</span>
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
      infoList:[],
      count_list:{},
      see_uid:'',
      uid:''
    }
  },
  computed: {
    
  },
  created(){
    this.see_uid = this.$route.query.see_uid;
    this.uid = localStorage.getItem('realUid');
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
      this.$axios.post('/api/profession-circle/my',{
        see_uid: this.see_uid
      }).then( res =>{
        if(res.code == 0){
          this.infoData = res.data.users;
          this.infoList = res.data.list;
          this.count_list = res.data.count_list;
        }
      }).catch(e =>{
        console.log(e)
      })
    },
    // 点击关注
    clickAttention(){
      this.$axios.post('/api/user-attention/attention',{
        attention_uid: this.see_uid
      }).then( res =>{
        if(res.code == 0){
          this.$message.success('关注成功！');
          this.getUserProfile();
        }
      }).catch(e =>{
        console.log(e)
      })
    },
    // 取消关注
    clickCancelAttention(){
      this.$axios.post('/api/user-attention/cancel-attention',{
        attention_uid: this.see_uid
      }).then( res =>{
        if(res.code == 0){
          this.$message.success('取消成功！');
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
