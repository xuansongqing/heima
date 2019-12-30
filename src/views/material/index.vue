<template>
  <el-card v-loading="loading">
    <bread-crumbs slot="header">
        <template slot="title"> 素材管理 </template>
    </bread-crumbs>
    <el-row type="flex" justify="end">
         <el-upload action="" :http-request="uploadImg" :show-file-list="false">
           <el-button size="small" type="primary">上传图片</el-button>
         </el-upload>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部图片" name='all'>
            <div class="img-list">
                <el-card class="img-card" v-for="(item,index) in list" :key="item.id">
                    <img @click="openDialog(index)" :src="item.url" alt="">
                    <el-row class="imgStyle" type="flex" align="middle" justify="space-around">
                        <i @click=" cancelOrcollection(item)" class="el-icon-star-on" :style="{color: item.is_collected ? 'red' : '#000'}"></i>
                        <i @click="delImg(item.id)" class="el-icon-delete-solid"></i>
                    </el-row>
                </el-card>
            </div>
        </el-tab-pane>
        <el-tab-pane label="收藏图片" name='scend'>
             <div class="img-list">
                <el-card class="img-card" v-for="(item,index) in list" :key="item.id">
                    <img @click="openDialog(index)" :src="item.url" alt="">
                </el-card>
            </div>
        </el-tab-pane>
    </el-tabs>
     <el-row type="flex" justify="center" style="height:60px" align="middle">
                 <el-pagination background layout="prev, pager, next"
                :current-page="page.currentPage"
                :page-size="page.pageSize"
                :total="page.total"
                @current-change="changPage">
            </el-pagination>
        </el-row>
        <el-dialog @opened='openedEnd' :visible="dialogVisible" @close="dialogVisible=false">
            <el-carousel ref="myCarousel" indicator-position="outside" height='500px'>
              <el-carousel-item v-for="(item,index) in list" :key="index">
                <img :src="item.url" alt="" style="width:100%;height:100%">
              </el-carousel-item>
            </el-carousel>
        </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      loading: false,
      list: [],
      page: {
        total: 0, // 总页数
        pageSize: 8, // 每页条数
        currentPage: 1// 当前页数
      },
      dialogVisible: false, // 默认关闭弹层
      newindex: -1 // 默认给一个值
    }
  },
  methods: {
    openedEnd () {
      this.$refs.myCarousel.setActiveItem(this.newindex)
    },
    // 打弹层走马灯
    openDialog (index) {
      this.dialogVisible = true
      this.newindex = index
    },
    // 删除图片
    delImg (id) {
      this.$confirm('是否删除该图片?').then(() => {
        this.$axios({
          method: 'delete',
          url: `/user/images/${id}`
        }).then(result => {
          this.getImg()
        })
      })
    },
    // 取消或收藏
    cancelOrcollection (item) {
      this.$axios({
        method: 'put',
        url: `user/images/${item.id}`,
        data: {
          collect: !item.is_collected
        }
      }).then(result => {
        this.getImg()
      })
    },
    // 上传图片
    uploadImg (params) {
      this.loading = true
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        method: 'post',
        url: '/user/images',
        data
      }).then(result => {
        this.loading = false
        this.getImg()
      })
    },
    // 点击改变页数
    changPage (newPage) {
      this.page.currentPage = newPage
      this.getImg()
    },
    // 切换页签
    handleClick () {
      this.page.currentPage = 1
      this.getImg()
    },
    // 获取图片素材
    getImg () {
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'scend', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then((result) => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getImg()
  }
}
</script>

<style lang="less" scoped>
     .img-list{
          display: flex;
          flex-wrap: wrap;
         .img-card{
             width: 200px;
             height: 220px;
             margin: 20px 50px;
             position: relative;
            img{
                width: 100%;
                height: 100%;
            }
            .imgStyle{
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                font-size: 20px;
                height: 36px;
                background-color: #f4f5f6
            }
             i{
                cursor: pointer
              }
         }
     }
</style>
