
<template>
  <div>
    <van-nav-bar title="黑马头条 - 登录" />
    <div>
      <!-- van-form整体表单组件， @submit ->提交 -->
      <van-form @submit="onSubmit">
      <!-- van-field 输入框（表单项目）
      输入框name属性="用户名"，在表单提交时，默认收集一个提交对象，往后台发送的参数名就是name里的值
      label代表输入框左侧的名字
      :属性名="表达式"
      属性名="字符串" -->
        <van-field
          v-model="user.mobile"
          required
          name="mobile"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写11位手机号' , pattern: /^1[3-9]\d{9}$/}]"
        />
        <van-field
          v-model="user.code"
          required
          type="password"
          name="code"
          label="密码"
          placeholder="请输入6位密码"
          :rules="[{ required: true, message: '请填写密码' , pattern: /\d{6}/}]"
        />
        <div style="margin: 16px">
        <!-- button标签：round -> 是否为圆形
          round后面没有值，默认为true, 要改成false 应该写成 :round = "false"-->
          <van-button round block :loading="isLoading" :disabled="isLoading"  type="info" native-type="submit" loading-text="正在登录中···"
            >登录</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
// 目标1：实现了顶部导航和页面标志->自定义样式
// 目标2：实现表单组件->读，改，加
// 目标3：收集表单后，调用接口->查看结果
// 目标4：点击登录提示("正在登录中  ··")，防止用户频繁点击
// 目标5：登录持久化：存储token
import { loginAPI } from '@/api/index.js' // 使用的是分别暴露的方式，引入的时候要使用{ }
import { Notify } from 'vant'
import { setToken } from '@/utils/token.js'
export default {
  name: 'login_Index',
  data () {
    return {
      isLoading: false,
      user: {
        mobile: '13812345678', // 手机号
        code: '246810' // 验证码（密码必须是246810，后台规定的）
      }
    }
  },
  methods: {
    async onSubmit (values) {
      this.isLoading = true
      // 点击后就启用等待和禁用按钮
      try {
        // console.log('submit', values)
        // 也可以用this.user
        const res = await loginAPI(values)// this.user也可以
        console.log(res)
        Notify({ type: 'success', message: '登录成功！！！' })
        setToken(res.data.data.token)
      } catch (err) {
        Notify({ type: 'danger', message: '帐号或者密码错误' })
      }
      // values表示收集的参数名和值
      this.isLoading = false
      // 请求结束就禁用等待和启用按钮
    }
  }
}
</script>
<!-- scope实现私有化样式的原理:通过给DOM元素结构上以及css样式上添加一个不重复的标记，来保证其唯一性，以此达到样式的私有化-->
<style scoped lang="less">
// /* 此类名是van-nav-bar组件内的根标签 */
// 一般不用这种方法修改样式
// .van-nav-bar{
//   background-color: #007bff;
// }
// /* 选择器没有选中,此选择器的名字是van-nav-bar标签，scoped尝试把此选择器后+属性选择器来匹配页面标签。
// .van-nav-bar__title{
//   color:white;
// } */
// // lang='less' 当前style标签是less语法
// /deep/ .van-nav-bar__title{
//   color: white;
// }
</style>
