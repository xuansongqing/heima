<template>
<div class="zuoce">
  <div  class="title">
    <img src="../../assets/img/logo_admin.png" alt="">
  </div>
  <el-menu router background-color="#353b4e" text-color="#adafb5" active-text-color="#ffd04b">
      <el-menu-item @click="jumpHome">
        <span slot="title" index="/home">首页</span>
      </el-menu-item>
      <el-submenu index="1">
         <template slot="title">
           <span slot="title">内容管理</span>
         </template>
        <el-menu-item index="/home/publish">发布文章</el-menu-item>
        <el-menu-item index="/home/articles">内容列表</el-menu-item>
        <el-menu-item index="/home/comment">评论管理</el-menu-item>
        <el-menu-item index="/home/material">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
         <template slot="title">
           <span slot="title">粉丝管理</span>
         </template>
        <el-menu-item index="/home/fans">图文数据</el-menu-item>
        <el-menu-item index="/home/fans">粉丝概况</el-menu-item>
        <el-menu-item index="/home/fans">粉丝画像</el-menu-item>
        <el-menu-item index="/home/fans">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="/home/userinfo">账户信息</el-menu-item>
  </el-menu>
</div>
</template>

<script>
export default {
  methods: {
    jumpHome () {
      this.$router.push('/home')
    }
  }

}
</script>

  <style lang="less" scoped>
  .zuoce{
    width: 230px;
     .el-menu{
       border-right: none;
      }
  }
  .title{
    text-align: center;
    background-color:#2e2f32;
    padding: 15px 0;
    img{
      height: 30px;
    }
  }
</style>
