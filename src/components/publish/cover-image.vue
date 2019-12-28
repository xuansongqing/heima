<template>
  <div class='image'>
      <div class="cover-image-item" v-for="(item,index) in list" :key="index" @click="openDialog">
          <img :src="item ? item : defaultImg" alt="">
      </div>
      <el-dialog :visible='dialogVisible' @close="dialogVisible = false" title="选择图片"></el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false // 控制弹层
    }
  },
  methods: {
    openDialog () {
      this.dialogVisible = true // 打开弹层
    }
  }
}
</script>

<style lang="less" scoped>
    .image{
        margin:20px 80px;
        display: flex;
        .cover-image-item{
            width: 250px;
            height: 250px;
            border:1px solid #ccc;
            padding: 10px;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
