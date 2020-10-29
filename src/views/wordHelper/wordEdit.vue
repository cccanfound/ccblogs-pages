<template>
  <el-form :model="editForm" ref="editForm" label-width="90px" class="edit-form" v-loading="loading">
    <span></span><el-button icon="el-icon-back" circle size="small"  @click="back"></el-button>
    <el-form-item
      prop="word"
      label="word"
      :rules="[
      { required: true, message: '请输入单词', trigger: 'blur' }
    ]"
    >
      <el-input v-model="editForm.word"></el-input>
    </el-form-item>
    <el-form-item
      prop="explaination"
      label="explain"
      :rules="[
      { required: true, message: '请输入释义', trigger: 'blur' }
    ]"
    >
      <el-input v-model="editForm.explaination"></el-input>
    </el-form-item>
    <el-form-item
      prop="phonetic"
      label="phonetic"
      :rules="[
      { required: true, message: '请输入音标', trigger: 'blur' }
    ]"
    >
      <el-input v-model="editForm.phonetic"></el-input>
    </el-form-item>
    <el-form-item
      prop="wordtype"
      label="type"
      :rules="[
      { required: true, message: '请输入词性', trigger: 'blur' }
    ]"
    >
      <el-input v-model="editForm.wordtype"></el-input>
    </el-form-item>
    <div
      v-for="(domain, index) in editForm.domains"
      :key="domain.key"
    >
      <div class="cent-title">例句{{ index }} <el-button   @click.prevent="removeDomain(domain)" icon="el-icon-close" circle size="mini"></el-button></div>
      <el-form-item :rules="{required: true, message: '例句不能为空', trigger: 'blur'}" :prop="'domains.' + index + '.english'" label="例句">
        <el-input v-model="domain.english"></el-input>
      </el-form-item>
      <el-form-item :rules="{required: true, message: '翻译不能为空', trigger: 'blur'}" :prop="'domains.' + index + '.chinese'" label="翻译">
        <el-input v-model="domain.chinese"></el-input>
      </el-form-item>
    </div>
    <el-form-item>
      <el-button type="primary" @click="submitForm('editForm')">提交</el-button>
      <el-button @click="addDomain">新增例句</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {searchWordById,editWord,addNewWord} from '@/api/word'
    export default {
      name: "wordEdit",
      data() {
        return {
          loading: false,
          editForm: {
            domains: [{
              english: '',
              chinese: ''
            }],
            id: '',
            word: '',
            explaination: '',
            phonetic: '',
            wordtype: ''
          }
        };
      },
      methods: {
        submitForm(formName) {
          this.loading=true
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let id=this.$route.query.id
              //修改
              if(id){
                editWord(this.editForm).then(
                  (res) => {
                    this.loading=false
                    if (res.data.code === 0) {
                      this.$notify({
                        title: '修改成功',
                        duration: 3000
                      })
                      this.$router.push({ path: '/wordHelper/setting' ,query:{word:this.editForm.word+''}})
                    } else {
                      this.$message.error(res.data.msg);
                    }
                  })
              }
              //新增
              else{

              }
            }
            else {
              console.log('error submit!!');
              return false;
            }

          });
        },
        /*resetForm(formName) {
          this.$refs[formName].resetFields();
        },*/
        removeDomain(item) {
          var index = this.editForm.domains.indexOf(item)
          if (index !== -1) {
            this.editForm.domains.splice(index, 1)
          }
        },
        addDomain() {
          this.editForm.domains.push({
            english: '',
            chinese: '',
            key: Date.now()
          });
        },
        search(id){
          this.loading=true
          searchWordById(id).then(
            (res) => {
              this.loading=false
              if (res.data.code === 0) {
                this.editForm=res.data.data
              } else {
                this.$message.error('失败，请联系管理员');
              }
            })
        },
        back(){
          this.$router.push({ path: '/wordHelper/setting' ,query:{word:this.editForm.word+''}})
        }
      },
      mounted() {
        if(this.$route.query.id){
          this.search(this.$route.query.id)
        }
      }
    }
</script>

<style scoped>
  span{
    margin-left: 20px;
  }
  .edit-form{
    margin-top: 10px;
    margin-right: 10px;
  }
  .cent-title{
    color: #606266;
    font-size: 14px;
    font-weight: 700;
    width: 100px;
    margin: 0 auto;
    padding-bottom: 10px;
    padding-left: 30px;
  }


</style>
<style>
</style>
