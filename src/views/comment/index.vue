<template>
    <el-card v-loading='loading'>
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
        <el-row type="flex" justify="center" style="height:60px" align="middle">
          <el-pagination background layout="prev, pager, next"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            :total="page.total"
            @current-change="changPage">
            </el-pagination>
        </el-row>
    </el-card>

</template>

<script>
export default {
  data () {
    return {
      list: [],
      loading: false,
      page: {
        total: 0, // 总页数
        pageSize: 10, // 每页条数
        currentPage: 1 // 当前页数
      }
    }
  },
  methods: {
    // 点击改变页数
    changPage (newPage) {
      this.page.currentPage = newPage
      this.getComment()
    },
    getComment () {
      this.loading = true
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSiae }
      }).then((result) => {
        this.list = result.data.results
        this.page.total = result.data.total_count
        this.loading = false
      })
    },
    functionFormatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    // 打开或关闭评论
    openOrdown (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`确定${mess}评论吗？`, '提示', {}).then(() => {
        this.$axios({
          url: '/comments/status',
          method: 'put',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }
        }).then(result => {
          this.getComment()
        })
      })
    }
  },
  created () {
    this.getComment()
  }

}
</script>

<style>

</style>
