<template>
  <div>
    <el-tabs v-model="activeName">
    <el-tab-pane label="素材图片" name="first">
        <div class="image-item">
            <el-card v-for="item in list" :key="item.id" class="image-card">
                 <img @click="clickImg(item.url)" :src="item.url" alt="">
            </el-card>
        </div>
        <el-row type="flex" justify="center" style="height:60px" align="middle">
           <el-pagination
             background
             layout="prev, pager, next"
             :current-page="page.currentPage"
             :page-size="page.pageSize"
             :total="page.total"
             @current-change="changPage">
           </el-pagination>
        </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="second">
        上传图片
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first', // 默认选中素材库
      list: [], // 接受图片
      page: {
        total: 0, // 总页数
        pageSize: 8, // 每页条数
        currentPage: 1// 当前页数
      }
    }
  },
  methods: {
    // 点击图片
    clickImg (url) {
      this.$emit('selectOneImg', url) //  点击图片时  => 要把图片传给显示的封面 自定义事件
    },
    // 点击改变页数
    changPage (newPage) {
      this.page.currentPage = newPage
      this.getImage()
    },
    // 获取图片素材
    getImage () {
      this.$axios({
        url: '/user/images',
        method: 'get',
        params: { collect: false, page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getImage()
  }

}
</script>

<style lang="less" scoped>
    .image-item{
         display: flex;
         flex-wrap: wrap;
         justify-content: space-around;
        .image-card{
            width: 150px;
            height: 150px;
            margin: 20px 0;
             img {
                   width: 100%;
                   height: 100%;
                 }
        }
    }
</style>
