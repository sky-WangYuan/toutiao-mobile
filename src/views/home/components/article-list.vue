<template>
  <div class="scroll-wrapper">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="downLoading" @refresh="onRefresh" :success-text="refreshSuccessText">
      <!-- 上拉加载 -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in articles" :key="item.art_id.toString()">
          <div class="article_item">
            <h3 class="van-ellipsis">{{item.title}}</h3>
            <!-- 三图模式 -->
            <div class="img_box" v-if="item.cover.type===3">
              <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[0]" />
              <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[1]" />
              <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[2]" />
            </div>
            <!-- 单图模式 -->
            <div class="img_box" v-if="item.cover.type===1">
              <van-image lazy-load class="w100" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
            </div>
            <!-- 底部评论 -->
            <div class="info_box">
              <span>{{item.aut_name}}</span>
              <span>{{item.comm_count}}评论</span>
              <span>{{item.pubdate | relTime}}</span>
              <!-- 子组件给父组件传值-- 大数字id-->
              <span class="close" v-if="user.token" @click="$emit('zichuanfu',item.art_id.toString())">
                <van-icon name="cross"></van-icon>
              </span>
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      loading: false, // 是否开启上拉加载状态
      finished: false, // 完成
      articles: [], // 存放渲染文章的数组
      downLoading: false, // 是否开启----下拉刷新---状态
      refreshSuccessText: '更新成功', // 下拉显示的文本
      timestamp: null // 定义时间戳，告诉服务器现在需要什么样的时间数据
    }
  },
  // 传值
  props: {
    channel_id: {
      type: Number,
      required: true, // 必填项
      dafault: null
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    // 上拉加载--数据添加在尾部
    async onLoad () {
      await this.$sleep(1000)
      let data = await getArticles({ channel_id: this.channel_id, timestamp: this.timestamp || Date.now() })
      this.articles.push(...data.results) // results是后台接口文档中的返回值
      this.loading = false // 关闭状态
      if (data.pre_timestamp) {
        this.timestamp = data.pre_timestamp
      } else {
        this.loading = false
      }
      // console.log('加载中')
      // setTimeout(() => {
      //   if (this.articles.length < 50) {
      //     let arr = Array.from(
      //       Array(10),
      //       (value, index) => this.articles.length + index + 1
      //     )
      //     this.articles.push(...arr)
      //     this.loading = false
      //   } else {
      //     this.finished = true
      //   }
      // }, 1000)
    },
    // 下拉刷新--数据添加在头部
    async onRefresh () {
      await this.$sleep(1000)
      const data = await getArticles({ channel_id: this.channel_id, timestamp: Date.now() })
      this.downLoading = false // 关掉下拉状态
      if (data.results.length) { // 如果有数据
        this.articles = data.results // 将历史数据覆盖掉
        this.finished = false // 打开下拉状态
        this.timestamp = data.pre_timestamp// 赋值历史时间戳
        this.refreshSuccessText = `更新了${data.results.length}条数据`
      } else {
        // 如果没有数据更新的话，只需提示
        this.refreshSuccessText = `已经是最新数据`
      }
      // console.log('下拉刷新')
      // setTimeout(() => {
      //   // setTimeout模拟延迟
      //   let arr = Array.from(Array(10), (value, index) => '追加' + index + 1) // 快速生成的假数据方法(模拟数据,索引从0开始，加1为了直观看效果)
      //   this.articles.unshift(...arr) // 将新数据添加在数组头部
      //   this.downLoading = false
      //   this.refreshSuccessText = `更新了${arr.length}条数据`
      // }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      width: 100%;
      height: 180px;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span {
      padding-right: 10px;
      &.close {
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>
