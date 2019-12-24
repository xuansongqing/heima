<template>
  <el-card class="articlesCard">
       <bread-crumbs slot="header">
           <template slot="title">内容列表</template>
       </bread-crumbs>
       <el-form class="articles">
           <el-form-item label="文章状态 :">
                <!-- 放置一个单选组  文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部-->
               <el-radio-group v-model="radioForm.status">
                   <el-radio :label="5">全部</el-radio>
                   <el-radio :label="0">草稿</el-radio>
                   <el-radio :label="1">待审核</el-radio>
                   <el-radio :label="2">审核通过</el-radio>
                   <el-radio :label="3">审核失败</el-radio>
               </el-radio-group>
               <!-- {{ radioForm }} -->
           </el-form-item>
           <el-form-item label="频道列表 :">
               <!-- {{ channels }} -->
                <el-select placeholder="请选择" v-model="radioForm.channel_id">
                    <!-- el-option label是显示值 value是存储值 -->
                  <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
           </el-form-item>
           <el-form-item label="时间选择 :">
               <el-date-picker
                    v-model="radioForm.dataRang"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
       </el-form>
       <el-row class="title" type="flex" align="middle">
           <span>共找到62299条符合条件的内容</span>
       </el-row>
       <div class="item-articles" v-for="item in 20" :key="item">
           <!-- 左侧 -->
            <div class="left">
                <img src="../../assets/img/beijing.jpg" alt="">
                <div class="info">
                    <span>他天天好好体会一年一零年一篇</span>
                    <el-tag class="infoTabl">标签一</el-tag>
                    <span class="infoData">2019-12-24 17:59:46</span>
                </div>
            </div>
            <!-- 右侧 -->
            <div class="right">
                <span><i class="el-icon-edit"> 修改 </i></span>
                <span><i class="el-icon-delete"> 删除 </i></span>
            </div>
       </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      radioForm: {
        status: 5, // 默认选中全部
        channel_id: null, // 默认分类都不选择
        dataRang: []
      },
      channels: [] // 频道值
    }
  },
  methods: {
    // 获取全部频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style lang="less" scoped>
    .articlesCard{
     .articles{
        margin-left:30px;
        }
    .title{
        height: 60px;
        border-bottom: 1px dashed #ccc;
      }
      .item-articles{
          display: flex;
          justify-content: space-between;
          padding: 20px 0;
          border-bottom: 1px solid #f2f3f5;
          .left{
              display: flex;
              img{
                 width: 200px;
                 height: 100px;
                 border-radius: 5px;
              }
              .info{
                  margin-left: 10px;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-around;
                  .infoData{
                      color: #ccc;
                      font-size: 12px;
                  }
                  .infoTabl{
                      width: 60px;
                  }
              }
          }
          .right{
              span{
                 font-size: 14px;
                 margin-right: 10px;
                 cursor: pointer;
              }
          }
      }
    }

</style>
