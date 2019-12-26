<template>
  <el-card>
      <bread-crumbs slot="header">
            <template slot="title">发布文章</template>
      </bread-crumbs>
       <el-form  label-width="80px">
              <el-form-item label='标题'>
                <el-input></el-input>
              </el-form-item>
              <el-form-item label='内容'>
                 <el-input type="textarea" :rows="4"></el-input>
              </el-form-item>
              <el-form-item label='封面'>
                  <el-radio-group>
                    <el-radio :label="3">单图</el-radio>
                    <el-radio :label="6">三图</el-radio>
                    <el-radio :label="9">无图</el-radio>
                    <el-radio :label="4">自动</el-radio>
                  </el-radio-group>
              </el-form-item>
              <el-form-item label='频道'>
                <el-select placeholder="请选择频道" v-model="radioForm.channel_id">
                  <el-option  v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <hr>
              <el-form-item label=''>
                <el-row>
                    <el-button type="primary">发表</el-button>
                    <el-button >存入草稿</el-button>
                </el-row>
              </el-form-item>
            </el-form>
  </el-card>
</template>

<script>
export default {
  data: function () {
    return {
      radioForm: {
        channel_id: null // 默认分类都不选择
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

<style>

</style>
