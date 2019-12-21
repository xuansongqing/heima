<template>
  <div class="login">
      <el-card class="login-card">
          <div class="title">
            <img src="../../assets/img/logo_index.png" alt="">
        </div>
        <!-- 表单 -->
        <el-form :model="loginForm" :rules="loginRules" ref="LoginRef">
            <!-- 表单域 -->
            <el-form-item  prop="mobile">
                <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input v-model="loginForm.code" placeholder="验证码" class="inputId"></el-input>
                <el-button plain class="btn">发送验证码</el-button>
            </el-form-item>
            <el-form-item  prop="agree">
                 <el-checkbox v-model="loginForm.agree">我已读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width:100%" @click="ruleForm">登录</el-button>
            </el-form-item>

        </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        agree: false // 是否同意协议
      },
      loginRules: {
        mobile: [{ required: true, message: '请输入手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确' }],
        code: [{ required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '手机号格式不正确' }
        ],
        agree: [
          { validator: function (rule, value, callback) {
            if (value) {
              callback()
            } else {
              callback(new Error('未同意 '))
            }
          }
          }
        ]
      }
    }
  },
  methods: {
    ruleForm () {
      this.$refs.LoginRef.validate((isOk) => {
        if (isOk) {
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginForm
          }).then((result) => {
            window.localStorage.setItem('user-token', result.data.token)
            this.$router.push('/')
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login{
    background-image:url("../../assets/img/beijing.jpg");
    height: 100vh;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-card{
        height: 350px;
        width: 440px;
        .title{
              text-align: center;
              margin-bottom: 20px;
               img{
            height: 45px;
            }
        }
        .inputId{
            width: 60%
        }
        .btn{
            float: right;
        }
    }
}
</style>
