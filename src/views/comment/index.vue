<template>
    <el-card style="margin-top:10px">
        <bread-crumbs slot="header">
            <template slot="title"> 评论管理 </template>
        </bread-crumbs>
        <el-table :data="list">
            <el-table-column prop="title" width="600px" label="标题"></el-table-column>
            <el-table-column :formatter="functionFormatter" prop="comment_status" label="评论状态"></el-table-column>
            <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
            <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="obj">
                  <el-button size="small" type="text">修改</el-button>
                  <el-button size="small" type="text" @click="openOrdown(obj.row)">{{obj.row.comment_status ? '关闭' : '打开'}}评论</el-button>
              </template>
            </el-table-column>
        </el-table>
    </el-card>

</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    getCommon () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' }
      }).then((result) => {
        this.list = result.data.results
      })
    },
    functionFormatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    openOrdown (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`确定${mess}评论吗？`, '提示', {}).then(() => {
        this.$axios({
          url: '/comments/status',
          method: 'put',
          params: { article_id: row.id },
          data: { allow_comment: !row.comment_status }
        }).then(result => {
          this.getCommon()
        })
      })
    }
  },
  created () {
    this.getCommon()
  }

}
</script>

<style>

</style>
