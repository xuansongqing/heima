<template>
    <el-card>
        <bread-crumbs slot="header">
            <template slot="title">账户信息</template>
        </bread-crumbs>
        <el-form label-width='100px'>
            <el-form-item label="头像 :">
                <el-upload  action='' :show-file-list='false' class="upload-img">
                  <img src="../../assets/img/beijing.jpg" alt="">
                </el-upload>
            </el-form-item>
            <el-form-item label='用户名 :'>
                <el-input style="width:60%"></el-input>
            </el-form-item>
            <el-form-item label='简介 :'>
                 <el-input style="width:60%"></el-input>
            </el-form-item>
            <el-form-item label='邮箱:'>
                 <el-input style="width:60%"></el-input>
            </el-form-item>
            <el-form-item label='手机号 :'>
                 <el-input style="width:60%" disabled></el-input>
            </el-form-item>
            <el-form-item >
                <el-button type="primary">保存信息</el-button>
            </el-form-item>
        </el-form>

    </el-card>
</template>

<script>
export default {

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
