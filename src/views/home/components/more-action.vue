<template>
  <div class="more-action">
      <van-cell-group v-if="!isReport">
        <van-cell>不感兴趣</van-cell>
        <van-cell is-link @click="isReport=true">反馈垃圾内容</van-cell>
        <van-cell>拉黑作者</van-cell>
      </van-cell-group>
      <van-cell-group v-else>
        <van-cell @click="isReport=false">返回</van-cell>
        <van-cell>侵权</van-cell>
        <van-cell>色情</van-cell>
        <van-cell>暴力</van-cell>
        <van-cell>低俗</van-cell>
        <van-cell>不适</van-cell>
        <van-cell>错误</van-cell>
        <van-cell>其他</van-cell>
      </van-cell-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 单元格组是否显示---默认不显示
      isReport: false
    }
  }
}
</script>

<style lang="less" scoped>

</style>
