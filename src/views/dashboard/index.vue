<template>
  <div class="dashboard-container" :class="skin">
    <div class="text"><p>{{ changeName }}</p><p>移动端可长按标题显示超长部分</p></div>
    <div v-loading="loading" v-for="(element,index) in list" :key="index">
      <div class="card" @click="show(element.id)">
        <div :style="element.picture==undefined?'':{backgroundImage: 'url(' + element.picture + ')'}" class="image"></div>
        <div class="desc">
          <div @mouseenter="enter" @mouseleave="leave" class="title">{{ element.title }}</div>
          <div class="time">{{ element.create_time }}</div>
          <div class="auth">auth:{{ element.username }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDashBoardList } from "@/api/word";

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'skin'
    ])
  },
  data() {
    return {
      loading :true,
      list: [],
      changeName: "如需使用其他功能，请先登陆"
    }
  },

  methods: {
    async getDashBoard(page) {
      try {
        const result = await getDashBoardList(page);
        if (result.data.code == 0) {
          if (result.data.data.total == 0 && type == 1) {
            this.$notify({
              title: '暂时还没有文章'
            })
          }
          this.list=result.data.data.list
          this.loading = false;
          console.log(this.list)
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
    show(id){
      if(id!=undefined) {
        this.$router.push({path: '/essay/essayContent', query: {id: id + '',visible:'no'}})
      }
    },
    enter: function(e){
      e.target.className='title-hover'
    },
    leave: function(e){
      e.target.className='title'
    }
  },
  mounted() {
    if(this.name.length!=0){
      this.changeName='欢迎你呀，'+this.name
    }
    this.getDashBoard(1)
  }
}
</script>

<style lang="scss" scoped>
  .dark{
    z-index: -100;
    overflow: hidden;
    width: 100%;
    min-height: calc(100vh - 50px);
    background-color: #242424;
    color: #d9d9d9;
  }
  .text{
    margin-left: 10px;
    font-size: 13px;
    color: #999;
    margin-bottom: -20px;
    line-height: 2px;
  }
.dashboard {
  &-container {
    padding: 10px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.card{
  @media only screen and (min-width: 601px) {
    margin-top: 20px;
    margin-left: 40px;
    width: 150px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    float: left;
    height: 290px;
  }
  @media only screen and (min-width: 0px) and (max-width: 600px) {
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
    width: calc(33% - 20px);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    float: left;
    height: 230px;
    -webkit-touch-callout:none;
    -webkit-user-select:none;
    -khtml-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }
}
.image {
  @media only screen and (min-width: 601px) {
    height: 200px;
    width: 100%;
    background-size: 100%;
  }
  @media only screen and (min-width: 0px) and (max-width: 600px) {
    height: 150px;
    width: 100%;
    background-size: 100%;
  }
}
.desc{
  @media only screen and (min-width: 601px) {
    margin: 14px;
    font-size: 13px;
}
  @media only screen and (min-width: 0px) and (max-width: 600px) {
    margin: 8px;
    font-size: 12px;
  }

}
.title{
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.title-hover{
  width: 100%;
}
.time {
  color: #999;
}
.auth {
  color: #999;
  float: right;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}



.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
