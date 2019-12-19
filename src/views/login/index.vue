<template>
  <div class="login">
      <el-card class="login-card">
          <div class="title">
            <img src="../../assets/img/logo_index.png" alt="">
        </div>
        <!-- 表单 -->
        <el-form>
            <!-- 表单域 -->
            <el-form-item>
                <el-input v-model="input" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="input" placeholder="验证码" class="inputId"></el-input>
                <el-button plain class="btn">发送验证码</el-button>
            </el-form-item>
            <el-form-item>
                 <el-checkbox v-model="checked">我已读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width:100%">主要按钮</el-button>
            </el-form-item>

        </el-form>
      </el-card>
  </div>
</template>

<script>
export default {

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
