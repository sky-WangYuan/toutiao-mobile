<template>
  <div>
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()"></van-nav-bar>
    <van-cell-group>
      <van-field
        v-model.trim="loginForm.mobile"
        required
        label="手机号"
        placeholder="请输入手机号"
        :error-message="errMsg.mobile"
        @blur="mobileBlur"
      />
      <van-field
        v-model.trim="loginForm.code"
        type="tel"
        required
        label="验证码"
        placeholder="请输入验证码"
        :error-message="errMsg.code"
        @blur="codeBlur"
      >
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="btn-box">
      <van-button type="info" block round size="small" @click="login">登陆</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      // 错误提示信息
      errMsg: {
        mobile: '',
        code: ''
      }
    }
  },
  // 方法
  methods: {
    // 判断手机号
    mobileBlur () {
      // 不能是空值
      if (!this.loginForm.mobile) {
        this.errMsg.mobile = '手机号不能为空'
        return false
      }
      // 格式问题---.test 检测某个字符串是否匹配某个模式
      if (!/^1[3-9]\d{9}$/.test(this.loginForm.mobile)) {
        this.errMsg.mobile = '手机号格式不对'
        return false
      }
      this.errMsg.mobile = '' // 当答案正确时，把错误信息清空
      return true
    },

    // 判断验证码
    codeBlur () {
      // 不能为空
      if (!this.loginForm.code) {
        this.errMsg.code = '验证码不能为空'
        return false
      }
      if (!/^\d{6}$/.test(this.loginForm.code)) {
        this.errMsg.code = '验证码必须是6位'
        return false
      }
      this.errMsg.code = ''
      return true
    },

    // 点击登陆
    async login () {
      if (this.mobileBlur() && this.codeBlur()) {
        // console.log('验证通过')

        const data = await login(this.loginForm) // 获取结果--有token 需要更新token
        this.updateUser({ user: data }) // 更新用户信息
        // 登陆成功信息
        this.$notify({ type: 'success', message: '登陆成功', duration: 1000 }) // vant插件里面的notify方法

        // 跳转--redirectUrl（登陆未遂）--如果有redirectUrl，跳转到redirectUrl，否则返回登录页
        let { redirectUrl } = this.$route.query // 解构出当前路由信息
        this.$router.push(redirectUrl || '/') // 有redirectUrl跳否则回登陆
      }
    },
    ...mapMutations(['updateUser']) // 将store下的index方法 用mapMutations方法映射到方法中
  }
}
</script>

<style lang="less" scoped>
.btn-box {
  padding: 20px;
}
</style>
