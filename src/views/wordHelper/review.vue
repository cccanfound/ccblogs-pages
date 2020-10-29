<template>
  <div>
    <div class="main">
      <el-collapse accordion >
        <div v-for="(item,index) in list" :key="index" class="list-item">
          <el-collapse-item>
            <template slot="title">
              {{item.content}}
            </template>
            <div>{{item.phonetic}}</div>
            <div>{{item.explaination}}</div>
          </el-collapse-item>
        </div>
      </el-collapse>
    </div>

    <div class="footer">
      <div class="WordSlide">
        <el-slider
          v-model="number"
          :max=20>
        </el-slider>
      </div>
      <el-button class="refresh" type="text" @click="refresh">refresh</el-button>
    </div>
  </div>

</template>
<script>
  import {searchRandomList} from '@/api/word'

  export default {
    name: 'DragKanbanDemo',
    data() {
      return {
        activeNames: ['1'],
        list:[],
        loading: true,
        number: 10,
      }
    },
    methods:{
      getList(size) {
        try {
          this.loading=true
          searchRandomList(size).then(
            (res) => {
              this.loading=false
              if (res.data.code === 0) {
                this.list=res.data.data
              } else {
                this.$notify({
                  title: res.data.msg
                })
              }
            })
        } catch (error) {
          console.log(error)
        }
      },
      refresh(){
        this.getList(this.number)
      }
    },
    mounted() {
      this.getList(10)
    }
  }
</script>
<style scoped>
  .main{
    overflow: auto;
    height: calc(100vh - 120px);
  }
  .footer{
    bottom: 20px;
    margin: 0 20px;
    width: 100%;
    position: absolute;
  }
  .WordSlide{
    width: 70%;
    float: left;
  }
  .refresh{
    color: #97a8be;
    margin-left: 10px;
  }
  .list-item{
    color: #97a8be;
    border-top: 1px solid #EBEEF5;
    border-bottom: 1px solid #EBEEF5;
  }
</style>
<style>
  .el-notification{
    width : 200px;
  }
  .el-collapse{
    margin-left: 30px;
    margin-right: 20px;
  }
  .el-slider__bar{
    background-color: #97a8be;
  }
  .el-slider__button{
    border: 2px solid #97a8be;
  }

</style>
