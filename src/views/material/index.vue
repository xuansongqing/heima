<template>
  <el-card>
    <bread-crumbs slot="header">
        <template slot="title"> 素材管理 </template>
    </bread-crumbs>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部图片" name='all'>
            <div class="img-list">
                <el-card class="img-card" v-for="item in list" :key="item.id">
                    <img :src="item.url" alt="">
                    <el-row class="imgStyle" type="flex" align="middle" justify="space-around">
                        <i class="el-icon-star-on"></i>
                        <i class="el-icon-delete-solid"></i>
                    </el-row>
                </el-card>
            </div>
        </el-tab-pane>
        <el-tab-pane label="收藏图片" name='scend'>
             <div class="img-list">
                <el-card class="img-card" v-for="item in list" :key="item.id">
                    <img :src="item.url" alt="">
                </el-card>
            </div>
        </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: []
    }
  },
  methods: {
    // 切换页签
    handleClick () {
      this.getImg()
    },
    // 获取图片素材
    getImg () {
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'scend' }
      }).then((result) => {
        this.list = result.data.results
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
         }
     }
</style>
