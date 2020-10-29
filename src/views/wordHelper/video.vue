<template>
  <div class="app-container">
    <div class="sound" @click="read">
      <i class="el-icon-video-play" ></i>
    </div>
  </div>
</template>


<script>
  export default {
    name: "video",
    data() {
      return {
      }
    },
    methods: {
      read(){
        if(!this.video){
          this.video = new Audio('/audio/abandon.mp3');
        }
        this.video.play();
      }
    }

  }
</script>

<style scoped>
  .el-icon-video-play{
    font-size: 28px;
  }
  .sound :hover{
    color: #909399;
  }
</style>
