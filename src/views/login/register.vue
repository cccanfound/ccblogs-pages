<template>
  <div class="regist">
    <el-form ref="ruleForm" class="register-form" :model="ruleForm" :rules="loginRules">
      <h3>Register</h3>
      <el-form-item prop="userName">
        <el-input v-model="ruleForm.userName" placeholder="Username" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" placeholder="Password" show-password />
      </el-form-item>
      <el-form-item prop="confirm">
        <el-input v-model="ruleForm.confirm" placeholder="Confirm" show-password />
      </el-form-item>
      <el-form-item>
        <el-col :span="12">
          <el-button style="width: 95%" type="primary" @click="submitForm('ruleForm',ruleForm)">我填好啦</el-button>
        </el-col>
        <el-col :span="12">
          <el-button style="width: 100%" @click="resetForm('ruleForm')">我要重写</el-button>
        </el-col>
      </el-form-item>
    </el-form>
    <div class="tips">
      <el-link style="" @click.native.prevent="login">已经有账号了？点我去登陆</el-link>
    </div>
  </div>
</template>

<script>
import { registerApi } from '@/api/user'

export default {
  name: 'Register',
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Don\'t forget me'))
      } else {
        callback()
      }
    }
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Don\'t forget me'))
      } else {
        if (value.length < 6) {
          callback(new Error('The password can not be less than 6 digits'))
        }
        callback()
      }
    }
    var validateConfirm = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Don\'t forget me'))
      } else {
        if (value !== this.ruleForm.password) {
          callback(new Error('Please enter the same password'))
        }
        callback()
      }
    }
    return {
      ruleForm: {
        userName: '',
        password: '',
        confirm: ''
      },
      loginRules: {
        userName: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        confirm: [{ required: true, trigger: 'blur', validator: validateConfirm }]
      }
    }
  },
  methods: {
    submitForm(formName, ruleForm) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          registerApi(ruleForm.userName, ruleForm.password, ruleForm.confirm).then(
            (res) => {
              if (res.data.code === 0) {
                this.$confirm('太棒了！你完成了注册！你可真是个小天才！现在立刻去登陆吗?', 'Congratulation!', {
                  confirmButtonText: '去登陆',
                  cancelButtonText: '留在这里发呆',
                  type: 'success '
                }).then(() => {
                  this.$router.push({ path: '/' })
                }).catch(() => {
                  this.$message({
                    type: 'success',
                    message: '留在本页'
                  })
                })
              } else {
                this.$alert(res.data.msg, '注册失败', {
                  confirmButtonText: '确定'
                })
              }
            }
          )
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    login() {
      this.$router.push({ path: '/' })
    }
  }
}

</script>

<style lang="scss">
  $bg:#2d3a4b;
  $cursor: #fff;
  .regist {
    min-height: 100%;
    width: 100%;
    @media only screen and (min-width: 0px) and (max-width: 600px){
      background: url("../../icons/svg/registerBack.jpg") no-repeat center;
      background-size:100% 100%;
    }
    @media only screen and (min-width: 601px) {
      background: url("../../icons/svg/registerBack.jpg") no-repeat center;
      background-size: 100% 100%;
    }
    overflow: hidden;
    h3{
      font-size: 26px;
      color: #eee;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .el-form-item__error{
      font-size: 15px;
    }
    .register-form{
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }
    .el-form{
      .el-input{
        input {
          color: $cursor;
          background: transparent;
        }
      }
    }
    .tips {
      position: relative;
      width: 520px;
      font-size: 14px;
      margin: 0 auto;
      padding: 0 35px 0 35px;

      .el-link {
        justify-content: left;
        position: relative;
        color: #fff;
      }
    }
  }
</style>
<style>
  .el-message-box{
    width: 70%;
    max-width: 420px;
  }
</style>
