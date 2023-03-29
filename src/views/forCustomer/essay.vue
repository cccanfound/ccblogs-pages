<template>

  <div style="background-color: #171718;color: #d9d9d9;">
    <cc-top-sticky>
      <el-row style="height:75px;background-color: #171718;">
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
              placeholder="search info"
              v-model="input">
            </input>
          </div>
        </el-col>
      </el-row>
    </cc-top-sticky>
    <div class="app" style="padding-top: 120px">
      <!--左侧文章标题和简介-->
      <div class="articleDescribe">
        <div class="essay-title" v-html="list.title"/>
        <div class="essay-time" v-html="list.createTime"/>
        <div class="author" v-html="list.author"/>
        <div style="line-height: 22px;color: #9e9e9e ">amplifies the voices of the open source community
        </div>
      </div>
      <!--contactMe-->
      <!--滚动到一定程度固定-->
      <div class="contactMe" :class="[scrollArrive?'fix':'']">
        <div style="">
          <svg-icon icon-class="weChat" class-name="connectIcon"/>
          <svg-icon icon-class="email" class-name="connectIcon"/>
          <svg-icon icon-class="qq" class-name="connectIcon"/>
          <svg-icon icon-class="phone" class-name="connectIcon"/>
        </div>
      </div>

      <div class="content">
        <div id="content" class="editor-content line-numbers" v-html="list.content"/>
      </div>
      <el-backtop></el-backtop>
    </div>
  </div>
</template>

<script>
    import {getEssay} from "@/api/essay";
    import CcTopSticky from '../../components/myComponents/CcTopSticky';

    const $ = require('jquery');

    export default {
        name: "essayContent",
        components: {
            CcTopSticky
        },
        data() {
            return {
                detailInfo: {},
                list: "",
                input: '',
                scrollArrive: false
            }
        },
        computed: {},
//nextTick方法，意思是在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
        watch: {
            list: function () {
                this.$nextTick(function () {
                    import("../essay/prismnew.css")
                    import("../essay/prismnew.js")
                })
            }
        },
        methods: {
            showEssay(id) {
                getEssay(id).then(
                    (res) => {
                        this.loading = false
                        if (res.data.code === 0) {
                            this.list = res.data.data
                            this.list.createTime = this.list.createTime.substring(0, 10) + '&nbsp&nbsp' + this.list.createTime.substring(14, 19)
                            console.log(this.list)
                            let t;

                        } else {
                            this.$notify({
                                title: res.data.msg
                            })
                        }
                    })
            },
            handleScroll() {
                // 获取滚动条滚动的距离
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
                // 判断是否需要隐藏 sticky
                if (scrollTop > 230) {
                    this.scrollArrive = true
                } else {
                    this.scrollArrive = false
                }
                this.lastScrollTop = scrollTop;
            }
        },
        mounted() {
            this.showEssay(this.$route.query.id)
            window.addEventListener('scroll', this.handleScroll);
        },
        destroyed() {
            window.removeEventListener('scroll', this.handleScroll);
        }
    }
</script>
<style scoped lang="scss">

  .essay-title {
    font-family: "Mona Sans", "Mona Sans Fallback", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 18px !important;
    line-height: 20px !important;
    font-weight: 600;

  }

  .essay-time {
    color: #9e9e9e;
    margin-top: 10px;
    font-size: 15px !important;
    line-height: 25px !important;

  }

  .connectIcon {
    margin-bottom: 25px;
    height: 30px;
    width: 30px;
    /*fill: #d5dce4;*/
    fill: #4969ed;
  }

  .connectIcon :hover {
    fill: white;
  }

  .contactMe {
    position: absolute;
    top: calc(380px);
    left: 6%;
    width: 50px;
    height: 180px;

  }

  .fix {
    top: 150px;
    position: fixed;
  }

  .articleDescribe {
    text-overflow: ellipsis;
    padding-top: 25px;
    position: absolute;
    width: 13%;
    height: 200px;
    margin-left: 4%;
    margin-top: 60px;
    border-color: #4969ED !important;
    border-top: 1px solid;
    box-sizing: border-box;
  }

  .bloggerName {
    margin-left: 10px;
    float: left;
    height: 75px;
    line-height: 70px;
    font-size: 16px !important;
    color: #fff !important;
  }

  .searcher {
    outline:none;
    padding: 6px 14px;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
    font-size: 14px;
    border-radius: 6px;
    font: inherit;
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

  .app {
    min-height: 100ch;
    width: 100%;
    padding-bottom: 50px;
  }

  .content {

    padding-top: 20px;
    background-color: #242424;
    @media only screen and (min-width: 0px) and (max-width: 600px) {
      width: 93%;
      margin-left: 3%;
      margin-right: 3%;
    }
    @media only screen and (min-width: 601px) {
      margin-left: 23%;
      margin-right: 15%;
      width: 62%;
    }
  }


</style>

<style lang="scss">
  blockquote {
    border-left: 2px solid #ccc;
    margin-left: 1.5rem;
    padding-left: 1rem;
  }

  p {
    margin: 4px 0;
    line-height: 22px;
  }

  ul {
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
  }

  .catl {
    li {
      margin: 4px;
      list-style-type: none;
    }

    color: #29b83f;
  }

  h1, h2, h3, h4 {
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    margin: 2px;
    color: white !important;
  }

  .content img {
    max-width: 100%;
    @media only screen and (min-width: 0px) and (max-width: 600px) {
      width: auto;
      height: auto;
    }
  }


</style>
