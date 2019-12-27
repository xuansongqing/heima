<template>
  <el-card class="articlesCard">
       <bread-crumbs slot="header">
           <template slot="title">内容列表</template>
       </bread-crumbs>
       <el-form class="articles">
           <el-form-item label="文章状态 :">
                <!-- 放置一个单选组  文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部-->
               <el-radio-group v-model="radioForm.status" @change="changeSan">
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
                <el-select placeholder="请选择频道" v-model="radioForm.channel_id" @change="changeSan">
                    <!-- el-option label是显示值 value是存储值 -->
                  <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
           </el-form-item>
           <el-form-item label="时间选择 :">
               <el-date-picker
                    @change="changeSan"
                    value-format="yyyy-MM-dd"
                    v-model="radioForm.dataRang"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
       </el-form>
       <el-row class="title" type="flex" align="middle">
           <span>共找到{{page.total}}条符合条件的内容</span>
       </el-row>
       <div class="item-articles" v-for="item in list" :key="item.id.toString()">
           <!-- 左侧 -->
            <div class="left">
                <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt="">
                <div class="info">
                    <span>{{item.title}}</span>
                    <el-tag :type='item.status | filtersType' class="infoTabl">{{item.status | filtersStatus}}</el-tag>
                    <span class="infoData">{{item.pubdate}}</span>
                </div>
            </div>
            <!-- 右侧 -->
            <div class="right">
                <span><i class="el-icon-edit" @click="toModify(item.id)"> 修改 </i></span>
                <span @click="delArticles(item.id)"><i class="el-icon-delete"> 删除 </i></span>
            </div>
       </div>
      <el-row type="flex" justify="center" style="height:60px" align="middle">
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size='page.pageSizw'
              :current-page='page.currentPage'
              :total="page.total"
              @current-change="changePage">
            </el-pagination>
       </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      radioForm: {
        status: 5, // 默认选中全部
        channel_id: null, // 默认分类都不选择
        dataRang: [] // 时间
      },
      channels: [], // 频道值
      list: [],
      defaultImg: require('../../assets/img/beijing.jpg'),
      page: {
        total: 0, // 总页数
        pageSize: 10, // 每页条数
        currentPage: 1// 当前页数
      }
    }
  },
  filters: {
    //    文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
    filtersStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filtersType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  methods: {
    // 修改参数
    toModify (id) {
      this.$router.push(`/home/publish/${id.toString()}`)
    },
    // 删除数据
    delArticles (id) {
      this.$confirm('是否删除该数据?').then(result => {
        this.$axios({
          method: 'delete',
          url: `/articles/${id.toString()}`
        }).then(result => {
          // 提示
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          // 重拉数据
          this.getEncapsulation()
        })
      })
    },
    // 改变页码
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getEncapsulation()
    },
    // 改变条件
    changeSan () {
      this.page.currentPage = 1
      this.getEncapsulation()
    },
    // 封装
    getEncapsulation () {
      let params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        status: this.radioForm.status === 5 ? null : this.radioForm.status,
        channel_id: this.radioForm.channel_id,
        begin_pubdate: this.radioForm.dataRang.length ? this.radioForm.dataRang[0] : null, // 开始时间
        end_pubdate: this.radioForm.dataRang.length > 1 ? this.radioForm.dataRang[1] : null // 结束时间
      }
      this.getArticles(params)
    },
    // 获取内容列表数据
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
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
    this.getArticles({ page: 1, per_page: 10 })
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
                      width: 80px;
                      text-align: center;
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
