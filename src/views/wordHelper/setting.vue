<template>
  <div class="setting">
    <el-form ref="searchForm" :model="searchForm" class="edit-form" :rules="formRules">
      <el-row :gutter="10">
        <el-col :span="16"> <el-form-item prop="searchInfo"><div class="search"><el-input v-model="searchForm.searchInfo"></el-input></div></el-form-item>
        </el-col>
        <el-col :span="3"><el-button @click="search('searchForm')" icon="el-icon-search" size="small" circle></el-button></el-col>
        <el-col :span="4"><el-button icon="el-icon-plus" circle size="small"></el-button></el-col>
      </el-row>
    </el-form>

    <el-table
      v-loading="loading"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="word"
        label="word"
        width="100">
      </el-table-column>
      <el-table-column
        prop="explaination"
        label="explaination"
        width="150">
      </el-table-column>
      <el-table-column
        prop="phonetic"
        label="phonetic"
        width="100">
      </el-table-column>
      <el-table-column
        prop="wordType"
        label="wordType"
        width="100">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="50">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  import {searchWords} from '@/api/word'
  export default {
    data() {
      return {
        searchForm:{
          searchInfo: ''
        },
        formRules: {
          searchInfo: [
            {required: true,message: "搜索信息不能为空",trigger: "blur"}
          ]
        },
        tableData: [],
        loading: false
      };
    },
    methods: {
      search(formName) {
        this.loading=true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            searchWords(this.searchForm.searchInfo).then(
              (res) => {
              this.loading=false
                if (res.data.code === 0) {
                  this.tableData=res.data.data.list
                } else {
                  this.$message.error('失败，请联系管理员');
                }
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      edit(id){
        this.$router.push({ path: '/wordHelper/wordEdit' ,query:{id:id}})
      }
    },
    mounted() {
      if(this.$route.query.word){
        this.searchForm.searchInfo=this.$route.query.word
        this.search('searchForm')
      }
    }
  }
</script>

<style scoped>
  .edit-form{
    margin-left: 20px;
    margin-top: 20px;
  }
  .info-name{
    font-size: medium;
    padding-left: 15px;
    min-height: 40px;
    line-height: 40px;
  }
</style>
<style>
  .el-table__empty-block
  .search
  .el-input{
    height: 32px;
  }
  .el-input__inner{
    height: 32px;
  }
  .el-form-item__content{
    line-height: 32px;
    margin-left: 0;
  }
  .setting .el-table__empty-block{
    text-align: left;
  }
</style>

