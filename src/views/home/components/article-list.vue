<template>
  <div class="scroll-wrapper">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="downLoading" @refresh="onRefresh" :success-text="refreshSuccessText">
      <!-- 上拉加载 -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell :title="item" v-for="item in articles" :key="item" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false, // 是否开启上拉加载状态
      finished: false, // 完成
      articles: [], // 存放的数组
      downLoading: false, // 是否开启----下拉刷新---状态
      refreshSuccessText: '更新成功'// 下拉显示的文本
    }
  },
  methods: {
    // 上拉加载--数据添加在尾部
    onLoad () {
      // console.log('加载中')
      setTimeout(() => {
        if (this.articles.length < 50) {
          let arr = Array.from(
            Array(10),
            (value, index) => this.articles.length + index + 1
          )
          this.articles.push(...arr)
          this.loading = false
        } else {
          this.finished = true
        }
      }, 1000)
    },
    // 下拉刷新--数据添加在头部
    onRefresh () {
      // console.log('下拉刷新')
      setTimeout(() => { // setTimeout模拟延迟
        let arr = Array.from(Array(10), (value, index) => '追加' + index + 1) // 快速生成的假数据方法(模拟数据,索引从0开始，加1为了直观看效果)
        this.articles.unshift(...arr) // 将新数据添加在数组头部
        this.downLoading = false
        this.refreshSuccessText = `更新了${arr.length}条数据`
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
