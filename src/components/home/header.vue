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
                 <img src="../../assets/img/beijing.jpg" alt="">
             </div>
             <el-dropdown  style="height:50px">
                  <span class="el-dropdown-link">
                    喜羊羊<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item>git地址</el-dropdown-item>
                    <el-dropdown-item divided>退出</el-dropdown-item>
                  </el-dropdown-menu>
             </el-dropdown>
            </el-row>
        </el-col>
      </el-row>
  </div>
</template>

<script>
export default {

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
