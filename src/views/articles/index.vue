<template>
  <el-card>
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
    .articles{
        margin-left:30px;
    }
</style>
