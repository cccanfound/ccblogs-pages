<template>
  <div class="app" :class="skin">
    <el-button icon="el-icon-back" circle size="small"  @click="back" v-if="$route.query.visible=='yes'"></el-button>
    <el-button class="edit" type="text" @click="edit" v-if="$route.query.visible=='yes'">Edit</el-button>
    <div class="content">
      <div class="editor-title" v-html="list.title" />
      <div class="editor-time" v-html="list.createTime" />
      <div id="content" class="editor-content" v-html="list.content" />
    </div>
    <el-backtop></el-backtop>
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
          detailInfo: {},
          list: ""
        }
      },
      computed: {
        ...mapGetters([
          'skin'
        ])
      },
//nextTick方法，意思是在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
      watch: {
        /*list: function () {
          this.$nextTick(function () {
            import("./prismcolor.css")
            import("./prism.js")
            Prism.highlightAllUnder(document.getElementById("content"));
          })
        }*/
      },
        methods: {
        edit() {
          this.$router.push({path: '/essay/essayEdit', query: {list: this.list}})
        },
        showEssay(id) {
          getEssay(id).then(
            (res) => {
              this.loading = false
              if (res.data.code === 0) {
                this.list = res.data.data
                this.list.createTime = this.list.createTime.substring(0, 10) + '&nbsp&nbsp' + this.list.createTime.substring(14, 19)
                let t;
               /* clearTimeout(t)
                t = setTimeout(function (){
                  import("./prism.css")
                  import("./prism.js")

                }, 3000);*/

              } else {
                this.$notify({
                  title: res.data.msg
                })
              }
            })
        },
        back() {
          this.$router.push({path: '/essay/essayCatalog'})
        },
      },
      mounted() {
        this.showEssay(this.$route.query.id)
        console.log(this.$route.query)
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
  p {margin: 4px 0;line-height: 22px;}
  ul {margin-top: 0;margin-bottom: 0;padding-top: 0;padding-bottom: 0;}
  .catl{
    li {margin: 4px; list-style-type: none;}
    color: #29b83f;
  }
  h1,h2,h3,h4 {font-weight:normal;font-size:16px;line-height: 22px;margin: 2px;}
  .content img{
    max-width: 100%;
    @media only screen and (min-width: 0px) and (max-width: 600px){
      width: auto;
      height: auto;
    }
  }



</style>

