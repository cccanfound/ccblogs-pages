<template>
  <div>
    <el-button icon="el-icon-back" circle size="small"  @click="back"></el-button>
    <el-tree
      @node-contextmenu="rightClick"
      :data="data"
      node-key="id"
      draggable>
    </el-tree>
    <el-button class="save" type="text" @click="save">Save</el-button>
    <div id="tool">
      <div @click="editTitle">编辑</div>
      <div @click="del">删除</div>
    </div>
  </div>

</template>

<script>
    import {updateCatalog,delEssay} from "@/api/essay";
    var $ = require('jquery');
    function close(e){
      if (!document.querySelector('#tool').contains(e.target)) {
        document.removeEventListener('click', close);
        $('#tool').css("display","none");
      }
    }

    export default {
        name: "essayCatalogEdit",
      data() {
        return {
          data: [],
          defaultProps: {
            children: 'children',
            label: 'label'
          },
          event:'',
          editData:'',
          node:''
        };
      },
      methods:{
        back(){
          this.$router.push({ path: '/essay/essayCatalog' })
        },
        save(){
          updateCatalog(this.data).then(
            (res) => {
              this.loading=false
              if (res.data.code === 0) {
                this.$notify({
                  title: '编辑成功',
                  duration: 3000
                })
              } else {
                this.$message.error(res.data.msg);
              }
            })
        },
        deleteEssay(essayId){
          delEssay(essayId,this.data).then(
            (res) => {
              this.loading=false
              if (res.data.code === 0) {
                this.$notify({
                  title: '删除文章成功',
                  duration: 3000
                })
              } else {
                this.$message.error(res.data.msg);
              }
            })
        },
        //右键显示编辑菜单事件
        rightClick(event,editData,node){

          let top = event.layerY+32+(node.level-1)*26
          $('#tool').css("display","block");
          $('#tool').css("top",top);
          $('#tool').css("left",event.layerX+10);
          this.event = event
          this.editData = editData
          this.node = node
          //绑定全局点击事件，隐藏编辑框
          document.addEventListener('click', close);
        },
        editTitle(){
          this.$prompt('请输入标题', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputValue: this.editData.label
          }).then(({ value }) => {
            this.editData.label = value
          }).catch(() => {
          });
        },
        del(){
          //没有子节点时才可以删除。即只能删除本篇文章
          if(this.node.childNodes.length==0){
            this.$confirm('确定要删除这篇文章嘛?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              //从父节点中找到文章并删除
              console.log(this.node)
              const parent = this.node.parent;
              const children = parent.data.children||parent.data
              console.log(this.editData.id)
              console.log(children)
              const index = children.findIndex(d => d.id === this.editData.id);
              console.log(index)
              if(index>=0){
                children.splice(index, 1);
                this.deleteEssay(this.editData.id)
              }
              else{
                this.$message({
                  type: 'info',
                  message: '请保存后再删除'
                });
              }

            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          }else{
            this.$message({
              type: 'info',
              message: '没有子文章的文章才能被删除'
            });
          }

        }
      },
      mounted() {
        this.data = this.$route.query.data
      }
    }
</script>

<style scoped>
  #tool{
    display: none;
    border-radius: 5px;
    font-size: 14px;
    padding-left: 10px;
    height: 65px;
    width: 50px;
    background-color: black;
    color: white;
    position: absolute;
  }
  #tool div{
    cursor: pointer;
    padding-top: 10px;
  }
</style>
