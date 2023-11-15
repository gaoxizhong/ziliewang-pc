<!-- 现场课堂 -->
<template>
  <div class="bossSide-container">
    <div class="center">
      <div class="live">
      <div id="dplayer"></div>
      </div>
    </div>
  </div>
</template>
<script>
/*
  我这里使用的是m3u8流，你们也可以选择其他方式，dplayer官网都有详细介绍。
*/
let Hls = require('hls.js');
import DPlayer from 'dplayer';
export default {
  name: "Live",
  methods: {
    // 直播
    live(){
          const dp = new DPlayer({
            live:true,
            container: document.getElementById('dplayer'),
            video: {
                url: 'https://live.carvedu.com/a/b.m3u8?auth_key=1589281526-0-0-02d0913b6a725efdb53f0deed823e418', // 示例地址
                type: 'customHls',
                customType: {
                    customHls: function (video, player) {
                        const hls = new Hls();
                        hls.loadSource(video.src);
                        hls.attachMedia(video);
                    },
                },
            },
          });
    }
  },
  mounted() {
    this.live();
  },
};
</script>
<style scoped>
#dplayer{
  width: 100%; 
  height: 500px;
}
</style>