<template>
    <el-container>
        <el-aside style="min-height:100vh;background-color:#353b4e;width:230px">
          <zuoce></zuoce>
        </el-aside>
        <el-container>
            <el-header style="height:60px;background-color:#cccccc">
                <header-top ></header-top>
            </el-header>
            <el-main >
                <!-- 二级路由容器 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>

export default {

}
</script>

<style>

</style>
