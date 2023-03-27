<template>
  <div style="background-color: #171718;overflow: hidden">
    <!--头部-->
    <cc-top-sticky>
      <el-row>
        <el-col :span="6">
          <div style="float: left">
            <svg-icon icon-class="blogger" class-name="bloggerIcon"/>
          </div>
          <div class="title">Cc's Blogger</div>
        </el-col>
        <el-col :span="5" :offset="12">
          <div style="padding-top: 19px;float: right">
            <input style="
padding: 6px 14px;font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
font-size: 14px;border-radius: 6px;font: inherit;"
              class="input"
              placeholder="search info"
              v-model="input">
            </input>
          </div>

        </el-col>
      </el-row>





    </cc-top-sticky>

    <!--内容-->
    <div style="margin-top: 0; margin-bottom: 50px; height: 1000px"> <!--:style="{height: calcHeight}"-->
      <!-- follow me-->
      <div style="margin-top: 75px;display: flex;flex-wrap: wrap;">
        <div v-for="(element,index) in articleList" :key="element.id" class="articleWindow">
          <div :style="element.picture==undefined?'':{backgroundImage: 'url(' + element.picture + ')'}" class="image"></div>
          <div class="desc">
            <div class="title">{{ element.title }}</div>
            <div class="time">{{ element.create_time }}</div>
            <div class="auth">auth:{{ element.username }}</div>
          </div>
        </div>
      </div>

    </div>

    <!--底部-->
    <div style="width: 100%;position: fixed;bottom: 0;height: 50px; background-color: black">
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
    import { getArticles } from "@/api/customer";

    export default {
        name: 'IndexForCustomer',
        components: {
            CcTopSticky
        },
        data() {
            return {
                iconHover: [false, false, false, false],
                articleList:[]
            };
        },
        mounted() {
          this.getArticles(1)
        },
        computed: {

        },
        watch: {},
        methods: {
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
                        this.articleList=result.data.data.list
                        console.log(result.data.data.list)
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
  $dark_gray: #bec3c4;
  $light_gray: #eee;

  .articleWindow{
    flex: 0 0 30%;
  }

  .title {
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
    margin: 7px 20px 0 20px;
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
    font-family: "Mona Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
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
