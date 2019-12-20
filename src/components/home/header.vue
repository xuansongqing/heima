<template>
  <div class="header-top">
      <el-row>
        <el-col :span="12">
            <i class="el-icon-s-fold"></i>
            江苏传智播客
        </el-col>
        <el-col :span="12">
            <el-row type="flex" justify="end">
             <el-input placeholder="请输入内容"  style="width:260px">
                <el-button slot="append" icon="el-icon-search"></el-button>
             </el-input>
             <span>消息</span>
             <div class="headerImg">
                 <img :src="!userInfo.photo ? userInfo.photo : defaultImg" alt="">
             </div>
             <el-dropdown  style="height:50px" @command="handleCommand">
                  <span class="el-dropdown-link">
                    {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="info">个人信息</el-dropdown-item>
                    <el-dropdown-item command="git">git地址</el-dropdown-item>
                    <el-dropdown-item command="lgout" divided>退出</el-dropdown-item>
                  </el-dropdown-menu>
             </el-dropdown>
            </el-row>
        </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/img/beijing.jpg')
    }
  },

  created () {
    let token = localStorage.getItem('user-token')
    this.$axios({
      url: '/user/profile',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((result) => {
      this.userInfo = result.data.data
    })
  },
  methods: {
    handleCommand (command) {
      if (command === 'info') {

      } else if (command === 'git') {
        window.location.href = 'https://github.com/xuansongqing/heima/commits/master'
      } else {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    }
  }

}
</script>

<style lang="less" scoped >
    .headerImg{
        img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin: 10px;
        }
    }
    .header-top{
        line-height: 60px;
        .el-input{
            margin-top: 10px;
            padding-right: 10px;

        }
    }
</style>
