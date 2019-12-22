<template>
    <el-card style="margin-top:10px">
        <bread-crumbs slot="header">
            <template slot="title"> 评论管理 </template>
        </bread-crumbs>
        <el-table>
            <el-table-column width="600px" label="标题"></el-table-column>
            <el-table-column label="评论状态"></el-table-column>
            <el-table-column label="总评论数"></el-table-column>
            <el-table-column label="粉丝评论数"></el-table-column>
            <el-table-column label="操作"></el-table-column>
        </el-table>
    </el-card>

</template>

<script>
export default {

}
</script>

<style>

</style>
