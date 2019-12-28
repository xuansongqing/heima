<template>
  <div class='image'>
      <div class="cover-image-item" v-for="(item,index) in list" :key="index" @click="openDialog(index)">
          <img :src="item ? item : defaultImg" alt="">
      </div>
      <!-- 弹层 -->
      <el-dialog :visible='dialogVisible' @close="closeDialog">
          <!-- 素材库 上传图片 -->
          <material-image @selectOneImg="receiveImg"></material-image>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false, // 控制弹层
      selectIndex: -1 // 用来存储点击的哪个图片的下标
    }
  },
  methods: {
    receiveImg (url) {
    //   alert(this.selectIndex)
      this.$emit('selectTwoImg', url, this.selectIndex)
      this.closeDialog()
    },
    // 弹层
    openDialog (index) {
      this.dialogVisible = true // 打开弹层
      this.selectIndex = index // 记录当前点击的是哪个图片
    },
    closeDialog () {
      this.dialogVisible = false // 关闭弹层
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
