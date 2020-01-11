<template>
  <div class="container">

      <van-nav-bar title="搜索结果" left-arrow @click-left="$router.back()"></van-nav-bar>
      <van-tabbar router>
      <van-tabbar-item to='/' icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to='/question' icon="chat-o">问答</van-tabbar-item>
      <van-tabbar-item to='/video' icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item to='/user' icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'result'
}
</script>

<style lang="less" scoped>
</style>
