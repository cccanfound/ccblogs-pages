<template>
  <div :class="skin">
    <div class="main">
      <el-collapse accordion >
        <div v-for="(item,index) in list" :key="index" class="list-item">
          <el-collapse-item>
            <template slot="title">
              {{item.content}}
            </template>
            <div>{{item.phonetic}}</div>
            <div>{{item.explaination}}</div>
            <div class="recognize" @click="changeToRecognize(item.id)">修改为recognize</div>
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
  import {changeWordState, searchRandomList} from '@/api/word'
  import {mapGetters} from "vuex";

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
    computed: {
      ...mapGetters([
        'skin'
      ])
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
                console.log(this.list)
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
      },
      changeToRecognize(id){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.changeWordState(id, 1)
          }).catch(() => {

          });
      },
      async changeWordState(id, state) {
        let data = await changeWordState(id, state);
        if (data.data.code != 0||data.data.data != 1) {
          this.$message({
            type: 'error',
            message: '错误，请联系管理员'
          })
        }else{
          this.$message({
            type: 'info',
            message: '更改成功'
          })
        }
      }
    },
    mounted() {
      this.getList(10)
    }
  }
</script>
<style scoped lang="scss">
  .recognize{
    cursor: pointer;
    margin-top: 5px;
    display: inline-block;
    border-radius: 5px;
  }
  .dark{
    background-color: #333333;
    color: #d9d9d9;
    .footer{
      background-color: #333333;
    }
    .recognize{
      border: #d9d9d9 1px solid;
    }
  }
  .light{
    background-color: #ecf0f3;
    .footer{
      background-color: #ecf0f3;
    }
    .recognize{
      border: black 1px solid;
    }
  }
  .main{
    overflow: auto;
    height: calc(100vh - 120px);
  }
  .footer{
    bottom: 0;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
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
<style lang="scss">
  .el-message-box{
    width: 80%;
  }
  .dark{
    .el-collapse-item__header{
      background-color: #333333 !important;
      color: #d9d9d9;
    }
    .el-collapse-item__content{
      background-color: #333333 !important;
      color: #d9d9d9;
    }
  }
  .light {
    .el-collapse-item__header{
      background-color: #ecf0f3 !important;
    }
  }
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
