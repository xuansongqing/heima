<template>
    <el-card>
        <bread-crumbs slot="header">
            <template slot="title">账户信息</template>
        </bread-crumbs>
        <el-form label-width='100px' :model="formData" :rules="rules" ref="myForm">
            <el-form-item label="头像 :">
                <el-upload  action='' :show-file-list='false' class="upload-img" :http-request="uploadImg">
                  <img :src="formData.photo ? formData.photo : defaultImg" alt="">
                </el-upload>
            </el-form-item>
            <el-form-item label='用户名 :' prop='name'>
                <el-input v-model="formData.name" style="width:60%"></el-input>
            </el-form-item>
            <el-form-item label='简介 :' prop='intro'>
                 <el-input v-model="formData.intro" style="width:60%"></el-input>
            </el-form-item>
            <el-form-item label='邮箱:' prop='email'>
                 <el-input v-model="formData.email" style="width:60%"></el-input>
            </el-form-item>
            <el-form-item label='手机号 :' prop='mobile'>
                 <el-input v-model="formData.mobile" style="width:60%" disabled></el-input>
            </el-form-item>
            <el-form-item >
                <el-button type="primary" @click="saveUserInfo">保存信息</el-button>
            </el-form-item>
        </el-form>

    </el-card>
</template>

<script>
import evenBus from '../../utile/evenBus.js'
export default {
  data () {
    return {
      formData: {
        name: '',
        intro: '',
        email: '',
        mobile: '',
        photo: ''
      },
      rules: {
        name: [{ required: 'true', message: '请输入用户名称' },
          { min: 1, max: 8, message: '长度1至8个字符' }],
        email: [{ required: 'true', message: '请输入邮箱地址' },
          { pattern: /^([0-9A-Za-z\-.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g, message: '邮箱格式不正确' }]
      },
      defaultImg: require('../../assets/img/beijing.jpg')
    }
  },
  methods: {
    // 头像
    uploadImg (parmas) {
      let data = new FormData()
      data.append('photo', parmas.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(result => {
        this.formData.photo = result.data.photo
      })
    },
    // 保存用户信息
    saveUserInfo () {
      this.$refs.myForm.validate().then(() => {
        this.$axios({
          url: '/user/profile',
          method: 'patch',
          data: this.formData
        }).then(result => {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          // 认为保存成功 通知header组件更新信息
          evenBus.$emit('updataUserInfo')
        })
      })
    },
    // 获取用户信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then((result) => {
        // console.log(result)
        this.formData = result.data
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
    .upload-img{

        img{
            margin-left: 30px;
            width: 100px;
            height: 100px;
            border-radius: 50%
        }
    }
</style>
