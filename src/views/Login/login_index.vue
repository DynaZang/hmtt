
<template>
  <div>
    <van-nav-bar title="黑马头条 - 登录" />
  </div>
</template>

<script>
export default {
  name: 'login_Index'
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
