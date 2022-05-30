<template>
  <div>
    <!-- 头部导航 -->
    <div>
      <van-nav-bar fixed>
        <!-- v-slot可以简化为# -->
        <template #left>
          <img class="logo" src="@/assets/logo.png" alt="" />
        </template>
        <template #right>
          <van-icon color="#fff" name="search" size="18px" />
        </template>
      </van-nav-bar>
    </div>
    <!-- tab栏导航: 每个van-tab 代表一个标签导航，中间夹着内容，对应着下属列表内容 -->
    <!-- van-tabs循环了很多标签导航，与之一一对应的内容列表不是一开始就创建的，而是触发后创建的 -->
    <div class="tab" >
      <van-tabs v-model="channelId" animated sticky offset-top="1.226667rem" >
        <van-tab  v-for="index in userChannelList" :title="index.name" :key="index.id" :name = "index.id">
        <article-list :channelID = "channelId"></article-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { getUserChannelsAPI } from '@/api/index.js'
import ArticleList from './components/ArticleList.vue'
export default {
  data () {
    return {
      channelId: 0, // 导航栏默认选中
      userChannelList: [] // 用户选择频道列表
      // articleList: [] // 文章列表
    }
  },
  // created 在首页打开就请求一次，后续不会更新，需要监测tab切换
  // 只要切换标签，都重新请求拿到新数据,需要吧文章列表数据放在articleList中，保持独立
  async created () {
    // 获得用户频道
    const res = await getUserChannelsAPI()
    console.log(res)
    this.userChannelList = res.data.data.channels // 保存用户频道列表
    // this.channelChange()
  },
  methods: {
    // tab切换事件
    // async channelChange () {
    //   获得文章内容信息
    //   const res2 = await getAllArticleListAPI({
    //     channel_id: this.channelId,
    //     timestamp: (new Date()).getTime()
    //   })
    //   console.log(res2)
    //   this.articleList = res2.data.data.results
    // }
  },
  components: {
    ArticleList
  }
}
</script>
<style lang="less" scoped>
.van-nav-bar {
  background-color: #15839e;
}
.logo {
  width: 100px;
  height: 30px;
}
.tab {
  padding-top: 46px;
  // 顶部tab预留间距
}
</style>
