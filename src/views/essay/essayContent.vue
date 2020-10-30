<template>
  <div class="app" :class="skin">
    <el-button icon="el-icon-back" circle size="small"  @click="back"></el-button>
    <el-button class="edit" type="text" @click="edit">Edit</el-button>
    <div class="content">
      <div class="editor-title" v-html="list.title" />
      <div class="editor-time" v-html="list.createTime" />
      <div class="editor-content" v-html="list.content" />
    </div>
  </div>
</template>

<script>
    import {getEssay} from "@/api/essay";
    import {mapGetters} from 'vuex'
    const $ = require('jquery');

    export default {
        name: "essayContent",
      data() {
        return {
          list:{}
        }
      },
      computed:{
        ...mapGetters([
          'skin'
        ])
      },
      methods:{
        edit(){
          this.$router.push({path: '/essay/essayEdit',query: {list:this.list}} )
        },
        showEssay(id){
          getEssay(id).then(
            (res) => {
              this.loading=false
              if (res.data.code === 0) {
                this.list=res.data.data
                this.list.createTime=this.list.createTime.substring(0,10)+'&nbsp&nbsp'+this.list.createTime.substring(14,19)
                console.log(this.list)
              } else {
                this.$notify({
                  title: res.data.msg
                })
              }
            })
        },
        back(){
          this.$router.push({ path: '/essay/essayCatalog' })
        },
      },
      mounted() {
        this.showEssay(this.$route.query.id)
      }
    }
</script>

<style scoped lang="scss">
  .dark{
    background-color: #181818;
    color: #d9d9d9;
  }
  .light{
    background-color: #EFEFEF;
  }
  .dark .content{
    background-color: #242424;
  }
  .light .content{
    background-color: #FBFBFB;
  }
  .dark .editor-title{
    border-bottom: solid  #d9d9d9 4px;
  }
  .light .editor-title{
    border-bottom: solid  black 4px;
  }
  .app{
    min-height: 100ch;
    width: 100%;
    padding-bottom: 50px;
  }
  .content{
    padding-top: 20px;
    @media only screen and (min-width: 0px) and (max-width: 600px){
      width: 94%;
      margin-left: 3%;
      margin-right: 3%;
    }
    @media only screen and (min-width: 601px) {
      margin-left: 15%;
      margin-right: 15%;
      width: 70%;
    }
  }
  .editor-title{
    margin-right: 10%;
    padding-bottom: 23px;
    font-weight: bolder;
    font-size: 18px;
  }
  .editor-time{
    margin-top: -24px;
    float: right;
    margin-right: 10%;
    font-weight: bolder;
    font-size: 14px;
  }
  .editor-content{
    margin-top: 20px;
  }
</style>
<style lang="scss">
  .content img{
    max-width: 100%;
    @media only screen and (min-width: 0px) and (max-width: 600px){
      width: auto;
      height: auto;
    }
  }

</style>
