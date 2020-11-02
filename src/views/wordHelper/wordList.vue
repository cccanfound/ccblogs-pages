<template>
  <div :class="skin">
    <el-container direction="vertical" class="container" v-loading="loading">
      <img :src="slide" class="avatar-slide">
      <div class="example-app" v-if="ifShow">
        推荐pc端使用浏览器创建快捷方式或手机端使用此功能
        <img :src="wordMobile" class="wordMobile">
      </div>
      <el-header height="22px">
        <div class="mine-num">{{mineNum}} / 5461</div>
        <div class="head-info" @click="openTip"><i class="el-icon-info"></i></div>
        <div class="random" @click="randomly"><i class="el-icon-sort"></i></div>
      </el-header>
      <div >
        <div class="mine-container" >
          <div>
            <div class="main-list" v-show="sel === 1">
              <draggable
                class="board-column-content"
                group="wordDrag"
                filter=".un-draggable"
                id="content1">
                <div v-for="(element,index) in list1" :key="element.id" class="board-item" :id="element.id" @click="openDrawer(1,index,element.word_id)">
                  {{ element.content }}
                </div>
              </draggable>
              <p v-if="draggableLoading" class="un-draggable">loading...</p>
              <p v-if="noMore" class="un-draggable">no more</p>
              <p class="draggable-bottom"  v-infinite-scroll="load" infinite-scroll-immediate="true" infinite-scroll-disabled="disabled">bottom</p>
            </div>
            <div class="main-list" v-show="sel === 2">
              <draggable
                class="board-column-content"
                group="wordDrag"
                id="content2">
                <div v-for="(element,index) in list2" :key="element.id" class="board-item" :id="element.id" @click="openDrawer(2,index,element.word_id)">
                  {{ element.content }}
                </div>
              </draggable>
              <p v-if="draggableLoading" class="un-draggable">loading...</p>
              <p v-if="noMore" class="un-draggable">no more</p>
              <p class="draggable-bottom"  v-infinite-scroll="load" infinite-scroll-immediate="true" infinite-scroll-disabled="disabled">bottom</p>
            </div>
            <div class="main-list" v-show="sel === 3">
              <draggable
                class="board-column-content"
                group="wordDrag"
                id="content3">
                <div v-for="(element,index) in list3" :key="element.id" class="board-item" :id="element.id" @click="openDrawer(3,index,element.word_id)">
                  {{ element.content }}
                </div>
              </draggable>
              <p v-if="draggableLoading" class="un-draggable">loading...</p>
              <p v-if="noMore" class="un-draggable">no more</p>
              <p class="draggable-bottom"  v-infinite-scroll="load" infinite-scroll-immediate="true" infinite-scroll-disabled="disabled">bottom</p>
            </div>
            <div class="main-list" v-show="sel === 4">
              <draggable
                class="board-column-content"
                group="wordDrag"
                id="content4">
                <div v-for="(element,index) in list4" :key="element.id" class="board-item" :id="element.id" @click="openDrawer(4,index,element.word_id)">
                  {{ element.content }}
                </div>
              </draggable>
              <p v-if="draggableLoading" class="un-draggable">loading...</p>
              <p v-if="noMore" class="un-draggable">no more</p>
              <p class="draggable-bottom"  v-infinite-scroll="load" infinite-scroll-immediate="true" infinite-scroll-disabled="disabled">bottom</p>
            </div>
          </div>
        </div>
        <el-drawer
          :title="title"
          :show-close="false"
          :visible.sync="drawer"
          :direction="direction"
          :modal="false"
          :size="'40%'">
          <div class="drawer">
            <div >

            </div>
            <div class="phonetic">{{phonetic}}<i class="el-icon-video-play " @click="read()"></i></div>
            <div class="word-type"><div v-for="(item,index) in wordtype.split('@')">
              <tr>
                <td class="drawer-type">{{item}}</td><td class="drawer-explain">{{explaination.split('@')[index]}}</td>
              </tr>
            </div></div>
            <div class="sentence-title">Example Sentence</div>
            <div v-for="(element,index) in sentence.list" :key="index" class="sentence">{{element.english}}<span class="chinese">{{element.chinese}}</span> </div>
          </div>
        </el-drawer>
        <div class="mine-aside">
          <div class="side-item" :class="activeIndex == 1 ? 'down':'up'" @click="tab(1)" :style="{backgroundImage: 'url('+studding+')',backgroundSize: '100% 100%'}">
            <draggable
              v-show="sel != 1"
              class="board-column-select"
              id="select1"
              group="wordDrag"
              @add="add">
            </draggable>

          </div>
          <div class="side-item" :class="activeIndex == 2 ? 'down':'up'" @click="tab(2)" :style="{backgroundImage: 'url('+recognize+')',backgroundSize: '100% 100%'}">
            <draggable
              class="board-column-select"
              id="select2"
              group="wordDrag"
              @add="add">
            </draggable>
          </div>
          <div class="side-item" :class="activeIndex == 3 ? 'down':'up'" @click="tab(3)" :style="{backgroundImage: 'url('+memorize+')',backgroundSize: '100% 100%'}">
            <draggable
              class="board-column-select"
              id="select3"
              group="wordDrag"
              @add="add">
            </draggable>
          </div>
          <div class="side-item" :class="activeIndex == 4 ? 'down':'up'" @click="tab(4)" :style="{backgroundImage: 'url('+simple+')',backgroundSize: '100% 100%'}">
            <draggable
              class="board-column-select"
              id="select4"
              group="wordDrag"
              @add="add">
            </draggable>
          </div>
        </div>
      </div>
      <el-footer height="50px" class="mine-footer">
        <div class="addWordSlide">
          <el-slider
            v-model="addNumber"
            :max=20>
          </el-slider>
        </div>
        <div class="addWord" @click="addWord">OK<i class="el-icon-check"></i></div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import studding from '@/icons/svg/studingNew.png'
  import recognize from '@/icons/svg/recgnize.png'
  import memorize from '@/icons/svg/memorize.png'
  import simple from '@/icons/svg/simple.png'
  import slide from '@/icons/svg/slide.png'
  import wordApp from '@/icons/svg/wordApp.png'
  import wordMobile from '@/icons/svg/wordMobile.jpg'
  import draggable from 'vuedraggable'
  import {addWord, getWordList, changeWordState, searchSentences} from '@/api/word'
  import {mapGetters} from "vuex";
    export default {
      name: "wordList",
      components: {
        draggable
      },
      data() {
        return {
          loading :true,
          studding: studding,
          recognize: recognize,
          memorize: memorize,
          simple: simple,
          slide:slide,
          wordApp:wordApp,
          wordMobile:wordMobile,
          //以上图片
          activeIndex :1,  //选项卡
          tabPosition: 'right', //右侧按钮布局
          sel:1,
          drawer: false,//抽屉打开关闭
          direction: 'btt',//抽屉打开方向
          title: "", //抽屉标题
          phonetic:"",  //抽屉音标
          announce:"",  //抽屉发音
          wordtype: "",  //词性
          explaination: "",  //释义
          video:"",
          addNumber: 10,   //加入词汇个数
          sentence: [],  //例句
          draggableLoading: false, //下拉加载下一页的loading显示
          list1: [],
          list2: [],
          list3: [],
          list4: [],
          numInfo:[0,0,0,0],
          mineNum: 0,
          pageInfo: {"isLastPage":{1:true},"pageNum":{1:1}} //分页信息(初始化一条信息，防止数据还没获取到时就加载dom导致取出为undefine)
        }
      },
      computed: {
        //下拉加载下一页的no more显示
        noMore () {
          return this.pageInfo.isLastPage[this.activeIndex]
        },
        ////是否禁用下拉加载下一页（防止重复加载）
        disabled () {
          return this.draggableLoading || this.noMore
        },
        ifShow(){
          const screenWidth = document.body.clientWidth
          console.log(screenWidth)
          if(screenWidth>600){
            return true
          }
          return false
        },
        ...mapGetters([
          'skin'
        ])
      },
      methods: {
        tab(index) {
          this.activeIndex = index
          this.sel = index;
        },
        async getList(type,page) {
          try {
            const result = await getWordList(type - 1,page);
            if (result.data.code == 0) {
              if (result.data.data.total == 0 && type == 1) {
                this.$notify({
                  title: '没有词汇显示？',
                  message: ('拖动下方滑块选择添加数目后点击OK添加'),
                  duration: 6000
                })
              }
              if(result.data.data.pageNum==1){
                this['list' + type]=result.data.data.list
              }
              else{
                let _this=this
                result.data.data.list.forEach(function (item) {
                  _this['list' + type].push(item)
                });
              }
              //记录四个选项卡单词数量
              this.numInfo[type-1]=result.data.data.total
              this.mineNum = this.numInfo[0]+this.numInfo[1]+this.numInfo[2]+this.numInfo[3]
              this.pageInfo.isLastPage[type]=result.data.data.isLastPage
              this.pageInfo.pageNum[type]=result.data.data.pageNum
              this.loading=false
              this.draggableLoading = false
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
        openDrawer(tableIndex, wordIndex,id) {
          this.title = this['list' + tableIndex][wordIndex].content
          this.phonetic = this['list' + tableIndex][wordIndex].phonetic
          this.announce = this['list' + tableIndex][wordIndex].announce
          this.wordtype = this['list' + tableIndex][wordIndex].wordtype
          this.explaination = this['list' + tableIndex][wordIndex].explaination
          this.video = new Audio(this.announce)
          this.drawer = true
          searchSentences(id).then(
            (res) => {
              this.loading=false
              if (res.data.code === 0) {
                this.sentence=res.data.data
              } else {
                this.$message.error('失败，请联系管理员');
              }
            })

        },
        read() {
          let audio = this.video
          audio.play()
          let t;
          clearTimeout(t)
          t = setTimeout(function () {
            audio.pause()
            audio.currentTime = 0;
          }, 1000);
        },
        openTip() {
          const h = this.$createElement;
          this.$notify({
            title: '使用说明',
            message: h('i', {style: 'color: teal'}, '拖动下方滑块添加单词后，可以将单词分类拖入右侧四个按钮，四个按钮分别对正在背，已认识，' +
              '已背会，简单词，点击单词可以显示释义，slide区域可以上下滑动，滑动到底自动加载下一页，一页默认20词，为方便复习，recognize中添加随机打乱功能' +
              '，memorize中添加随机抽查功能'),
            duration: 20000
          })
        },
        //界面单词乱序重排
        randomly(){
          if(this['list' + this.activeIndex].length==0){
            this.$notify({
              title: '当前模块还没有单词，无法使用乱序功能'
            })
            return
          }
          let tempList = this['list' + this.activeIndex]
          this['list' + this.activeIndex].sort(function rnd(a,b) {
            return Math.random() > 0.5 ? -1 : 1
          })
          this.$set(this['list' + this.activeIndex],tempList)
          this.$notify({
            title: '当前模块随机乱序成功!'
          })
        },
        addWord() {
          addWord(this.addNumber).then(
            (res) => {
              if (res.data.code === 0) {
                this.$notify({
                  title: '成功添加' + res.data.data + '条',
                })
                this.getList(1,1)
              } else {
                this.$message.error('失败，请联系管理员');
              }
            })
        },
        //移动可拖拽单词到其他溴铵想卡
        add(evt) {
          let fromId = evt.from.id.charAt(evt.from.id.length - 1)
          let toId = evt.to.id.charAt(evt.to.id.length - 1)
          let result = this['list' + fromId].find(d => d.id == evt.item.id)
          //使用draggable的oldIndex如果本身列表移动过会带来很多不一致问题。所以目前只能采用遍历自定义id实现
          this['list' + fromId].some((item, i) => {
            if (item.id == evt.item.id) {
              this['list' + fromId].splice(i, 1)
              return true;
            }
          })
          this['list' + toId].push(result)
          //修改数据库
          this.changeWordState(evt.item.id, toId-1)
        },
        async changeWordState(id, state) {
          let data = await changeWordState(id, state);
          if (data.data.code != 0||data.data.data != 1) {
            this.$message({
              type: 'error',
              message: '错误，请联系管理员'
            })
          }
        },
        //下拉加载下一页
        load () {
          this.draggableLoading = true
          setTimeout(() => {
            this.getList(this.activeIndex, this.pageInfo.pageNum[this.activeIndex]+1)

          }, 2000)
        }
      },
      mounted() {
        this.getList(1,1)
        this.getList(2,1)
        this.getList(3,1)
        this.getList(4,1)

      }
    }
</script>

<style scoped lang="scss">
  .dark{
    background-color: #242424;
  }
  .example-app{
    height: 100%;
    position: absolute;
    margin-left: 420px;
  }
  .wordApp{
    float: left;
    height: auto;
    width: auto;
    max-height: 100%;
    display: flex;
  }
  .wordMobile
  {
    float: left;
    height: auto;
    width: auto;
    max-height: 100%;
    display: flex;
  }
  .container{
    @media only screen and (min-width: 601px) {
      ::-webkit-scrollbar{
        width: 10px;  /*滚动条宽度*/
        height: 100%;  /*滚动条高度*/
      }
      width: 350px;
      .avatar-slide{
        position: absolute;
        margin-left: 182px;
        width: 84px;
        height: 100%;
        pointer-events: none;
      }
    }
    @media only screen and (min-width: 0px) and (max-width: 600px) {
      ::-webkit-scrollbar{
        width: 10px;  /*滚动条宽度*/
        height: 100%;  /*滚动条高度*/
      }
      .avatar-slide{
        position: absolute;
        margin-left: 58%;
        width: 21%;
        height: 100%;
        pointer-events: none;
      }
    }

  }
  .drawer-type{
    width: 30px;
  }
  .drawer-explain{
    padding-right: 30px;
  }
  .board-column-content{

  }
  .board-column-select{
    opacity:0;
    width: 100%;
    height: 100%;
  }
  .addWordSlide{
    width: 70%;
    float: left;
  }
  .addWord{
    border-radius: 5px;
    background-color: #dbdee2;
    width: 21%;
    color: #97a8be;
    height: 30px;
    font-size: 14px;
    margin: 4px 0;
    padding: 9px 0px 9px 15px;
    display: inline-block;
    float: right;
  }
  .drawer{
    height: calc(40vh - 60px);
    overflow-y:auto;
    overflow-x:hidden;
  }
  .sentence-title{
    border-top: 1px solid #97a8be;
    font-weight: 600;
    overflow:hidden;
    padding-top: 5px;
    padding-left: 20px;
  }
  .sentence{
    margin-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .word-type{
    width: 100%;
    float: left;
    font-size: medium;
    padding-left: 10px;
    margin-top: 10px;
    margin-left: 10px;
    padding-bottom: 10px;
  }
  .explain-nation{
    float: left;
    width: calc(100% - 40px);
    font-size: medium;
    padding-left: 10px;
    margin-top: 10px;
    padding-bottom: 10px;

  }
  .phonetic{
    font-size: medium;
    padding-left: 23px;

  }

  .board-item{
    line-height: 32px;
    margin: 6px 0;
    padding-left: 15px;
    width: 70%;
    font-family: sans-serif;
    height: 32px;
    border-radius: 10px;
  }

  .block{
    width:100%;
  }
  .main-list{
    overflow: auto;
    height: calc(100vh - 122px);
    width: 100%;
  }

  .side-item{
    overflow-x: hidden;
    overflow-y: hidden;
    width: 70%;
    height: 20%;
    margin: 20px 16% 20px 8%;
    /*height: 22%;
    margin: 10px 16% 10px 8%;*/
  }
  .random{
    margin-right: 10px;
    margin-top: 7px;
    float: right;
  }
  .mine-num{
    margin-top: 7px;
    float: left;
    margin-left: 10px;
    font-size: 14px;
  }
  .head-info{
    margin-top: 7px;
    float: right;
  }
  .el-icon-video-play{
    display: inline-block;
    margin-left: 10px;
  }
  .mine-container{
    height: calc(100vh - 122px);
    width: 79%;
    overflow: hidden;
    float: left;
  }
  .mine-aside{
    height: calc(100vh - 122px);
    float: right;
    width: 21%;
  }
  .un-draggable{
    color: #97a8be;
    width: 100%;
    text-align: center;
  }
  p{
    margin: 1px 0;
  }
  .light{
    .mine-num{
      color: #97a8be;
    }
    .chinese{
      color: #97a8be;
    }
    .up{
      border-radius: 15px;
      box-shadow: 4px 4px 6px #d1d9e6c7, -2px -2px 6px #fafafa;
    }
    .down{
      border-radius: 15px;
      box-shadow: inset 6px 6px 9px #d1d9e6cc, inset -6px -6px 9px #fff;
    }
    .mine-aside {
      background: #ecf0f3;
    }
    .mine-footer{
      background: #ecf0f3;
    }
    .board-item{
      background-color: #e6eaef;
    }
    .mine-container{
      background: #ecf0f3;
    }
    .draggable-bottom{
      color: #ecf0f3;
    }
  }
  .dark{
    .el-icon-sort{
      color: #eae9e9;
    }
    .el-icon-info{
      color: #eae9e9;
    }
    .mine-num{
      color: #d9d9d9;
    }
    .chinese{
      color: #eae9e9;
    }
    .up{
      border-radius: 15px;
      box-shadow: 4px 4px 6px #111111, -2px -2px 6px #505050;
    }
    .down{
      border-radius: 15px;
      box-shadow: inset 4px 4px 9px #111111, inset -4px -4px 9px #505050;
    }
    .mine-aside {
      background:  #333333;
    }
    .mine-footer{
      background:  #333333;
    }
    .board-item{
      background-color: #242424;
      margin-bottom: 5px;
      /*margin-bottom: 12px;
      border-radius: 15px;
      box-shadow: 4px 4px 6px #111111, -2px -2px 6px #505050;*/
      color: #d9d9d9;
    }
    .mine-container{
      background: #333333;
    }
    .draggable-bottom{
      color: #333333;
    }
  }
</style>
<style>
  .el-footer{
    padding-right: 0;
  }
  .dark .el-header{
    background-color: #333333;
  }
  .light .el-header{
    background-color: #ecf0f3;
  }
  .dark .el-drawer__header {
    color: #eae9e9;
  }
  .light .el-drawer{
    background-color: #ecf0f3;
  }
  .dark .el-drawer{
    background-color: #242424;
    color: #d9d9d9;
  }
  .el-drawer :focus {
    outline: 0;
  }
  .el-drawer__header{
    /*color: red;*/
    font-size: 22px;
    margin-bottom: 10px;
    font-weight: bolder;
  }
  .el-notification{
    width : 200px;
  }
  .dark .el-slider__bar{
    background-color: #909090;
  }
  .light .el-slider__bar{
    background-color: #97a8be;
  }
  .el-slider__button{
    border: 2px solid #97a8be;
  }
</style>

