<template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
    <van-icon name="arrow-left" color="white" size="0.48rem" class="goback" @click="$router.back()"/>
    <van-search v-model="value" placeholder="请输入搜索关键词" background="#15839e" shape="round"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HmttIndex',

  data () {
    return {
      value: ''
    }
  },

  mounted () {},

  methods: {}
}
</script>

<style lang="less" scoped>
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #15839e;
  overflow: hidden;
  /*后退按钮*/
  .goback {
    padding-left: 14px;
  }
  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}
</style>
