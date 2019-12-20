<template>
    <el-container>
        <el-aside style="height:100vh;background-color:#353b4e;width:230px">
          <zuoce></zuoce>
        </el-aside>
        <el-container>
            <el-header>头部</el-header>
            <el-main>内容区域</el-main>
        </el-container>
    </el-container>
</template>

<script>
import zuoCe from '../../components/home/zuoce'
export default {
  components: {
    'zuoce': zuoCe
  }
}
</script>

<style>

</style>
