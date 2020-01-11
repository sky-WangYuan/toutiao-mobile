<template>
  <div class="container">
    <!-- 头部 -->
    <van-nav-bar title="搜索中心"  left-text="返回"  left-arrow @click-left="$router.back()"></van-nav-bar>
    <!-- 中间组件 -->
    <div class="my-wapper">
      <router-view></router-view>
    </div>

    <!-- 底部 -->
    <van-tabbar router>
      <van-tabbar-item to='/' icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to='/question' icon="question-o">问答</van-tabbar-item>
      <van-tabbar-item to='/video' icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item to='/user' icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'search'
}
</script>

<style lang="less" scoped>
</style>
