<template>
  <div class="dashboard-container">
    <div class="dashboard-text">{{ changeName }}</div>
    <el-row v-loading="loading">
      <el-col :span="8" v-for="(element,index) in list" :key="index" >
        <el-card :body-style="{ padding: '0px' }" style="width: 80%;">
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
          <div style="padding: 14px;">
            <span>{{ element.title }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ element.create_time }}</time>
              <el-button type="text" class="button" @click="show(element.id)">查看</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDashBoardList } from "@/api/word";

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
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
          this.list=result.data.data.list;
          this.loading = false;
          console.log(this.list)
          //记录四个选项卡单词数量
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
    }
  },
  mounted() {
    this.getDashBoard(1)
    if(mapGetters.name.length!=0){
      this.changeName = mapGetters.name
    }

  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.el-col-8{
  width: 25%;
  margin-bottom: 30px;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
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
