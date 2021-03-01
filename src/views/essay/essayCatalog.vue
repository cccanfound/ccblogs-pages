<template>
  <div class="app" :class="skin">
    <div class="search">
      <div class="logo" >SEARCH</div>
      <div class="edit" >By Title</div>
      <input
        class="input"
        placeholder="search info"
        v-model="input">
      </input>
      <i class="el-icon-search" @click="search"></i>
      <div class="content">
        <div v-for="(element,index) in searchData">
          <div class="title-info" v-html="ruleTitle(index)" @click="showEssay(element.id)"></div>
        </div>
      </div>
    </div>
    <div class="catalog">
      <div class="logo">CATALOG</div>
      <div class="edit" type="text" @click="edit">Edit Catalog</div>
      <div class="content">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" ></el-tree>
      </div>
    </div>

  </div>
</template>

<script>
  import {getCatalog, searchEssay} from "@/api/essay";
  import {mapGetters} from "vuex";

    export default {
        name: "essayCatalog",
        data() {
          return {
            data: [{ 'label': '还没有文章喔' }],
            searchData: [],
            defaultProps: {
              children: 'children',
              label: 'label'
            },
            loading: false,
            input: ''
          }
      },
      computed: {
        ruleTitle() {
          return function(index) {
            let titleString = this.searchData[index].label;

            if (!titleString) {
              return '';
            }
            if (this.input && this.input.length > 0) {
              console.log(titleString)
              // 匹配关键字正则
              let replaceReg = new RegExp(this.input, 'g');
              // 高亮替换v-html值
              let replaceString = '<span class="search-text">' + this.input + '</span>';
              // 开始替换
              titleString = titleString.replace(replaceReg, replaceString);
            }
            return titleString;
          }
        },
        ...mapGetters([
          'skin'
        ])
      },
      methods:{
        handleNodeClick(data) {
          if(data.id!=undefined){
            let {href} = this.$router.resolve({
              path: '/essay/essayContent',
              query:{id:data.id+''}
            })
            window.open(href, '_blank');
          }
        },
        showEssay(id) {
          if(id!=undefined) {
            this.$router.push({path: '/essay/essayContent', query: {id: id + ''}})
          }
        },
        edit() {
          this.$router.push({path: '/essay/essayCatalogEdit',query: {data:this.data}})
        },
        getCatalog() {
          getCatalog().then(
            (res) => {
              this.loading=false
              if (res.data.code === 0) {
                this.data=res.data.data
              } else {
                this.$message.error(res.data.msg);
              }
            })
        },
        search(){
          if(this.input==undefined||this.input==''){
            this.$notify({
              title: '搜索条件不能为空',
              duration: 3000
            })
            return
          }
          searchEssay(this.input).then(
            (res) => {
              this.loading=false
              if (res.data.code === 0) {
                this.searchData=res.data.data
              } else {
                this.$notify({
                  title: res.data.msg
                })
              }
            })
        }

      },
      mounted() {
        this.getCatalog();
      }
    }
</script>

<style scoped lang="scss">
.dark{
  z-index: -100;
  overflow: hidden;
  width: 100%;
  min-height: calc(100vh - 50px);
  background-color: #242424;
  color: #d9d9d9;
}
  .catalog{
    margin-top: 30px;
    margin-left: 20px;
    float: left;
    @media only screen and (min-width: 0px) and (max-width: 600px){
      width: 80%;
    }
    @media only screen and (min-width: 601px) {
      width: 60%;
    }
  }
  .light .catalog .logo{
    border-bottom: solid black 4px;
  }
  .dark .catalog .logo{
    border-bottom: solid #d9d9d9 4px;
  }
  .catalog .logo{
    margin-left: 20px;
    padding-bottom: 10px;
    font-weight: bold;
  }
  .catalog .edit{
    padding-left: 20px;
    cursor: pointer;
    margin-top: 15px;
    font-weight: bold;
  }
  .catalog .content{
    margin-top: 15px;
  }
  .search{
    margin-right: 50px;
    margin-top: 30px;
    float: right;
    padding-right: 20px;
    @media only screen and (min-width: 0px) and (max-width: 600px){
      width: 80%;
      margin-right: calc(20% - 40px);
    }
    @media only screen and (min-width: 601px) {
      width: calc(40% - 130px);
    }
  }
  .search .edit{
    cursor: pointer;
    margin-top: 15px;
    font-weight: bold;
  }
  .light .search .logo{
    border-bottom: solid black 4px;
  }
  .dark .search .logo{
    border-bottom: solid #d9d9d9 4px;
  }
  .search .logo{
    padding-bottom: 10px;
    font-weight: bold;

  }
  .light .search input{
    border: 2px black solid;
  }
  .dark .search input{
    border: 2px #d9d9d9 solid;
  }
  .search input{
    margin-top: 15px;
    height: 30px;
    width: 60%;
  }
  .dark .search .content{
    margin-top: 15px;
    cursor: pointer;
    font-size: 14px;
    color: #d9d9d9;
    line-height: 2;
  }
  .light .search .content{
    margin-top: 15px;
    cursor: pointer;
    font-size: 14px;
    color: #606266;
    line-height: 2;
  }
  .el-icon-search{
    margin-left: 10%;
    font-size: 25px;
  }
</style>
<style>
  .dark .search-text{
    color: white;
    font-weight: bolder;
  }
  .light .search-text{
    color: black;
    font-weight: bolder;
  }
  .dark .el-tree-node__content{
    background-color: #242424;
    color: #d9d9d9;

  }
  .dark .el-tree-node:focus>.el-tree-node__content{
    background-color: #373737 !important;
  }
  .dark .el-tree-node:hover>.el-tree-node__content{
    background-color: #373737 !important;
  }
</style>
