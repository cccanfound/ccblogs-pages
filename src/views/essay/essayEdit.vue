<template>
  <div class="components-container">
    <div style="margin-top: 15px;" class="title">
      <div class="title-type">
        <el-select v-model=type slot="prepend" placeholder="请选择">
        <el-option label="私密" value="0"></el-option>
        <el-option label="公开" value="1"></el-option>
        </el-select>
      </div>
      <div class="title-title">
        <el-input placeholder="请输入标题" v-model="title" class="input-with-select"></el-input>
      </div>
      <el-popover
        placement="bottom"
        width="400"
        trigger="click">
        <el-input placeholder="填入首页图片" v-model="picture" ></el-input>
        <div :style="picture==undefined?'':{backgroundImage: 'url(' + picture + ')'}" class="image"></div>
        <el-button slot="reference">首页图片</el-button>
      </el-popover>
    </div>
    <div class="content">
      <tinymce v-model="content" :height="520" ></tinymce>
    </div>
    <div class="editor-title" v-html="picture" />
    <el-button type="primary" @click="commit">提交</el-button>
    <div class="editor-content" v-html="content" />

  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  import { addEssay,updateEssay } from "@/api/essay";

    export default {
      name: "essayEdit",
      components: { Tinymce },
      data() {
        return {
          id: 'new',
          type: '',
          title: '',
          content: '',
          picture:''
        }
      },
      methods: {
        commit(){
          if(this.id!='new'){
            console.log('update')
            updateEssay(this.id,this.type,this.title,this.content,this.picture).then(
              (res) => {
                this.loading=false
                if (res.data.code === 0) {
                  this.$notify({
                    title: '更新成功',
                    duration: 3000
                  })
                  //this.$router.push({ path: '/essay/essayCatalog'})
                } else {
                  this.$message.error(res.data.msg);
                }
              })
          }
          else{
            addEssay(this.type,this.title,this.content).then(
              (res) => {
                this.loading=false
                if (res.data.code === 0) {
                  this.$notify({
                    title: '编辑成功',
                    duration: 3000
                  })
                  //this.$router.push({ path: '/essay/essayCatalog'})
                } else {
                  this.$message.error(res.data.msg);
                }
              })
          }
        }

      },
      mounted() {
        if(this.$route.query.list!=undefined){
          this.type=this.$route.query.list.type
          this.title=this.$route.query.list.title
          this.content=this.$route.query.list.content
          this.id=this.$route.query.list.id
          this.picture=this.$route.query.list.picture
        }
      }
    }
</script>

<style scoped>
  .components-container{
    margin: 20px;
  }
  .title{
    height: 40px;
  }
  .title-type{
    width: 100px;
    float: left;
  }
  .title-title{
    width: calc(100% - 299px);
    float: left;
  }
  .content{
    margin-top: 20px;
  }
  .image {
    height: 200px;
    width: 150px;
    background-size: 100%;
  }
</style>
<style>
  .tinymce-content p {
    padding: 0;
    margin: 2px 0;
  }
</style>
