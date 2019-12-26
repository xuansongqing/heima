<template>
  <el-card>
      <bread-crumbs slot="header">
            <template slot="title">发布文章</template>
      </bread-crumbs>
       <el-form ref="publishFrom" label-width="80px" :model="formData" :rules="publishRules">
              <el-form-item label='标题' prop="title">
                <el-input v-model="formData.title"></el-input>
              </el-form-item>
              <el-form-item label='内容' prop="content">
                 <el-input type="textarea" :rows="4" v-model="formData.content"></el-input>
              </el-form-item>
              <el-form-item label='封面' prop="cover">
                  <el-radio-group v-model="formData.cover.type">
                    <el-radio :label="1">单图</el-radio>
                    <el-radio :label="3">三图</el-radio>
                    <el-radio :label="0">无图</el-radio>
                    <el-radio :label="-1">自动</el-radio>
                  </el-radio-group>
              </el-form-item>
              <el-form-item label='频道' prop="channel_id" >
                <el-select placeholder="请选择频道" v-model="formData.channel_id">
                  <el-option  v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <hr>
              <el-form-item>
                <el-row>
                    <el-button type="primary" @click="publishArticles">发表</el-button>
                    <el-button  @click="publishArticles">存入草稿</el-button>
                </el-row>
              </el-form-item>
            </el-form>
  </el-card>
</template>

<script>
export default {
  data: function () {
    return {
      channels: [], // 频道值
      formData: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 1, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: '' // 放置封面数组
        },
        channel_id: null // 频道id
      },
      publishRules: {
        title: [{ required: true, message: '请输入标题名称' }, { min: 5, max: 30, message: '长度在 5 到 30 个字符' }],
        content: [{ required: true, message: '请输入文章内容' }],
        channel_id: [{ required: true, message: '请选择频道列表' }]
      } // 规则
    }
  },
  methods: {
    // 手动校验
    publishArticles () {
      this.$refs.publishFrom.validate(isOk => {
        alert(1)
      })
    },
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
