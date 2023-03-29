<template>
  <div style="background-color: #171718;overflow: hidden">
    <!--头部导航-->
    <cc-top-sticky>
      <el-row style="background-color: #171718;">
        <el-col :span="6">
          <div style="float: left">
            <svg-icon icon-class="blogger" class-name="bloggerIcon"/>
          </div>
          <div class="bloggerName">Cc's Blogger</div>
        </el-col>
        <el-col :span="5" :offset="12">
          <div style="padding-top: 19px;float: right">
            <input
              class="searcher"
              placeholder="on-site search"
              v-model="input">
            </input>
          </div>
        </el-col>
      </el-row>
    </cc-top-sticky>

    <!--弹出联系方式-->
        <div class="contact">
          <svg-icon icon-class="turn-right" class-name="turnRightIcon"/>
        </div>


    <!--内容头部-->
    <div class="contentHead" :style="{backgroundImage: 'url(' + contentHeadImg + ') ',height: screenHeight+'px'}">
      <!--左上欢迎标志-->
      <div class="welcomeSign">
        <div style="width:fit-content;margin:0 auto;">Welcome</div>
        <div style="width:fit-content;margin:0 auto;">To My</div>
        <div style="width:fit-content;margin:0 auto;">Blogger</div>
      </div>
      <!--首页中间标题部分-->
      <div class="weLogName">FAIDILA'S WELOG</div>
      <div class="weLogPhase">IT IS A GREAT HONOR TO INVITE YOU HERE. PLEASE FEEL FREE TO GIVE ANY SUGGESTION. WEB
        DESIGN BORROWS FROM GIT
      </div>
      <div class="weLogPhase">THAT THERE'S SOME GOOD IN THIS WORLD,AND IT'S WORTH FIGHTING FOR</div>
      <div style="height: 35px;margin: 10px auto;width:fit-content;">
        <span class="follow">FOLLOW ME:</span>
        <div style="padding-top: 15px;display: inline-block">
          <svg-icon icon-class="weChat" @click="showContact('weChat')" @mouseover="handleOver(0)" @mouseleave="handleLeave(0)"
                    :class="iconHover[0]?'iconHover':''" class-name="connectIcon"/>
          <svg-icon icon-class="email" @click="showContact('weChat')" @mouseover="handleOver(1)" @mouseleave="handleLeave(1)"
                    :class="iconHover[1]?'iconHover':''" class-name="connectIcon"/>
          <svg-icon icon-class="qq" @click="showContact('weChat')" @mouseover="handleOver(2)" @mouseleave="handleLeave(2)"
                    :class="iconHover[2]?'iconHover':''" class-name="connectIcon"/>
          <svg-icon icon-class="phone" @click="showContact('weChat')" @mouseover="handleOver(3)" @mouseleave="handleLeave(3)"
                    :class="iconHover[3]?'iconHover':''" class-name="connectIcon"/>
        </div>
      </div>
    </div>

    <!--文章列表-->
    <div style="margin-top: 20px;">
      <div style="margin: 75px 10% 0 10%;display: flex;flex-wrap: wrap;">


        <div v-for="(element,index) in articleList" :key="element.id" class="articleWindow" @click="show(element.id)">
          <div class="picture" style="width:100%;-moz-background-size:100% 100%; background-size:100% 100%;"
               :style="element.picture==undefined?'':{backgroundImage: 'url(' + element.picture + ')'}"></div>
          <div class="info">
            <div class="articleAuthor">AUTHOR {{ element.author }} // {{ element.create_time }}</div>
            <div class="articleTitle">{{ element.title }}</div>
            <div class="articleDescribe" style="color: white">the benefits of collaborative maintainership, lessons
              learned from vintage technology.
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--底部-->
    <div style="width: 100%; bottom: 0;height: 50px; background-color: black">
      <div class="copyRight" style="margin-left: 6%;">
        Design By cc
      </div>
      <div class="copyRight" style="margin-left: 3%;">
        (Updated 04/2023)
      </div>
      <!--follow me-->
      <div style="height: 35px;position: relative;float: right;margin-bottom: 15px;margin-right: 6%">
        <span class="follow">FOLLOW ME:</span>
        <div style="padding-top: 15px;display: inline-block">
          <svg-icon icon-class="weChat" @mouseover="handleOver(0)" @mouseleave="handleLeave(0)"
                    :class="iconHover[0]?'iconHover':''" class-name="connectIcon"/>
          <svg-icon icon-class="email" @mouseover="handleOver(1)" @mouseleave="handleLeave(1)"
                    :class="iconHover[1]?'iconHover':''" class-name="connectIcon"/>
          <svg-icon icon-class="qq" @mouseover="handleOver(2)" @mouseleave="handleLeave(2)"
                    :class="iconHover[2]?'iconHover':''" class-name="connectIcon"/>
          <svg-icon icon-class="phone" @mouseover="handleOver(3)" @mouseleave="handleLeave(3)"
                    :class="iconHover[3]?'iconHover':''" class-name="connectIcon"/>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import CcTopSticky from '../../components/myComponents/CcTopSticky';
  import {getArticles} from "@/api/customer";

  export default {
    name: 'IndexForCustomer',
    components: {
      CcTopSticky
    },
    data() {
      return {
        iconHover: [false, false, false, false],
        articleList: [
          {title: 1, picture: './11.jpg', author: 1, time: 1},
          {title: 2, picture: './22.jpg', author: 2, time: 2},
          {title: 3, picture: './44.jpg', author: 3, time: 3},
          {title: 4, picture: './33.jpg', author: 4, time: 4},
          {title: 555555555, picture: './favicon.png', author: 555555555, time: 555555555}
        ],
        input: '',
        contentHeadImg: './for-customer-head.png',
        screenHeight: 0
      }
    },
    mounted() {
      //获取文章
      this.getArticles(1)
      this.screenHeight = (document.documentElement.clientHeight || document.body.clientHeight) - 75;
    },
    computed: {},
    watch: {},
    methods: {
      showContact(type){

      },
      show(id){
        if(id!=undefined) {
          this.$router.push({path: '/contentForCustomer', query: {id: id + ''}})
        }
      },
      //follow me 后面图标的移入移出事件
      handleOver(t) {
        this.$set(this.iconHover, t, true)
      },
      handleLeave(t) {
        this.$set(this.iconHover, t, false)
      },
      //获取文章列表
      async getArticles(page) {
        try {
          const result = await getArticles(page);
          if (result.data.code == 0) {
            if (result.data.data.total == 0 && type == 1) {
              this.$notify({
                title: '暂时还没有文章'
              })
            }
            this.articleList = result.data.data.list
            this.articleList[0].picture = "./11.jpg"
            this.articleList[1].picture = "./22.jpg"
            this.articleList[2].picture = "./33.jpg"
            this.articleList[3].picture = "./44.jpg"
            this.articleList[4].picture = "./55.jpg"
            this.articleList[5].picture = "./66.jpg"
            this.articleList[6].picture = "./77.jpg"
            this.articleList[7].picture = "./88.jpg"
            this.articleList[8].picture = "./99.jpg"
          } else {
            this.$message({
              type: 'error',
              message: '错误，请联系管理员'
            })
          }
        } catch (error) {
          console.log(error)
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #7f8485;
  $light_gray: #eee;

  .turnRightIcon {
    margin-top: 65px;
    height: 28px;
    width: 28px;
    fill: white;
  }

  .contact {
    position: fixed;
    right: 0;
    top: 17%;
    width: 200px;
    height: 160px;
    background-color: #218bff;
    border-radius: 10px 0px 0px 10px;

  }

  .weLogName {
    /*font-family: "Mona Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";*/
    font-family: "Apple Color Emoji";
    height: fit-content;
    margin: 0 auto;
    padding-bottom: 50px;
    padding-top: 10%;
    color: white;
    width: fit-content;
    /*font-family: "Blimone","Hubot Sans","Mona Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol" !important;*/
    font-feature-settings: "liga", "ss01", "ss02";
    font-weight: 400;
    line-height: 1;
    letter-spacing: -0.06em;
    word-spacing: .1em;
    font-size: clamp(2.75rem, 7vw, 5.125rem) !important;
  }

  .weLogPhase {
    font-family: "Mona Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    letter-spacing: .05em;
    height: fit-content;
    margin: 0 auto;
    padding-bottom: 8px;
    color: white;
    width: fit-content;
    font-size: clamp(1.025rem, 1.25vw, 1.4rem) !important;
    color: #9e9e9e;
  }

  .articleAuthor {
    color: #9e9e9e;
    font-size: 14px;
    margin-top: 20px;
    font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace !important;
    margin-bottom: 8px;
  }

  .articleTitle {
    color: white;
    font-family: "Mona Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: clamp(26px, 1.25vw, 30px) !important;
    font-weight: 600;
    width: fit-content;
  }

  .articleTitle:after {
    content: "";
    display: block;
    border-bottom: 1px solid #86dbaa; /*设置底部边颜色*/
    width: 0;
    /*  git采用的方式，但没整明白咋用
        background-image: linear-gradient(180deg, transparent 98.5%, #6ddb90 0);
        transition: background-size 1s cubic-bezier(0.16, 1, 0.3, 1);
        animation-delay: 0s !important;*/
  }

  .articleTitle:hover:after { /*鼠标hover，状态发生改变*/
    padding-right: 100%;
    transition: 0.2s all linear;
    transition-delay: 0.2s;
  }

  .articleTitle:hover {
    color: #64a5fe;
    /*color: #218bff;*/
    transition: 0.2s all linear;
    transition-delay: 0.2s;
  }

  .articleDescribe {
    margin-top: 10px;
    font-family: "Mona Sans", "Mona Sans Fallback", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 15px;
    line-height: 22px;
    word-wrap: break-word;
  }

  .welcomeSign {
    padding-top: 9px;
    position: relative;
    left: 14%;
    top: 15%;
    font-weight: 600;
    font-family: "Mona Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    word-wrap: break-word;
    color: white;
    width: 80px;
    height: 80px;
    font-size: 16px;
    letter-spacing: -.02em;
    border: 2px solid;
    border-image: linear-gradient(to right, #4b6ee8, #6cd992) 1;
  }

  .contentHead {
    margin-top: 75px;
    width: 100%;
  }

  .searcher {
    outline: none;
    padding: 6px 14px;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
    font-size: 14px;
    border-radius: 6px;
    font: inherit;
  }

  .articleWindow {
    cursor: pointer;
    /*border: 1px solid white;*/
    flex: 2 0.5 30%;
    padding: 2% 2% 2% 2%;
  }

  .picture:after {
    content: '';
    padding-top: 60%; // 通过计算来设置高度相对于宽度的百分比
    /*因为伪类默认是行内元素*/
    display: block;
  }


  .bloggerName {
    margin-left: 10px;
    float: left;
    height: 75px;
    line-height: 70px;
    font-size: 16px !important;
    color: #fff !important;
  }

  .bloggerIcon {
    vertical-align: top;
    margin-top: 18px;
    margin-left: 20px;
    margin-right: 15px;
    height: 28px;
    width: 28px;
    fill: white;
  }

  .connectIcon {
    margin-right: 20px;
    height: 24px;
    width: 24px;
    fill: #d5dce4;
  }

  .iconHover {
    fill: #218bff;
  }

  .follow {
    color: #c3c3c3;
    line-height: 36px;
    vertical-align: top;
    display: inline-block;
    margin: 9px 20px 0 0px;
    font-size: 18px !important;
    font-weight: 600 !important;
    letter-spacing: -0.04em;
    word-spacing: .1em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";

  }

  .copyRight {
    margin-top: 5px;
    height: 50px;
    position: relative;
    float: left;
    padding-bottom: 0;
    line-height: 50px;
    color: #c3c3c3;
    font-family: "Mona Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    line-height: 36px;
  }

  /*.login-container {*/
  /*  min-height: 100%;*/
  /*  width: 100%;*/
  /*  @media only screen and (min-width: 0px) and (max-width: 600px){*/
  /*    background: url("../../icons/svg/pkqback.png") no-repeat center;*/
  /*    background-size:100% 100%;*/
  /*  }*/
  /*  @media only screen and (min-width: 601px) {*/
  /*    background: url("../../icons/svg/backp.jpg") no-repeat center;*/
  /*    background-size:100% 100%;*/
  /*  }*/
  /*  overflow: hidden;*/


  /*}*/
</style>
