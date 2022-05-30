<template>
  <div>
    <!-- 文章列表！ -->
    <!-- list有个参数是immediate-check: 是否在初始化时立即执行滚动位置检查-->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <article-item
        v-for="obj in list"
        :key="obj.art_id"
        :artobj="obj"
      ></article-item>
    </van-list>
  </div>
</template>

<script>
/*
问题: 网页一进来就会触发两次获取信息，第一次是正常请求，第二次是onload请求，因为最开始第一页数据也是请求回来后才更新DOM，
此时标签先挂载了，没有高度，所以onload也判断触底更新了
*/
import ArticleItem from './ArticleItem.vue'
import { getAllArticleListAPI } from '@/api/index.js'
export default {
  props: {
    // list: Array // 文章列表数组(不再需要了，只要频道id)
    channelID: Number
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      theTimestamp: new Date().getTime()
    }
  },
  components: {
    ArticleItem
  },
  async created () {
    const res = await getAllArticleListAPI({
      channel_id: this.channelID,
      timestamp: this.theTimestamp
    })
    // 下一页第一篇文章的时间戳pre_timestamp
    this.list = res.data.data.results
    this.theTimestamp = res.data.data.pre_timestamp
  },
  methods: {
    async onLoad () {
      const res = await getAllArticleListAPI({
        channel_id: this.channelID,
        timestamp: this.theTimestamp
      })
      this.list = [...this.list, ...res.data.data.results]
      this.theTimestamp = res.data.data.pre_timestamp
      this.loading = false // 如果不关闭，底部一直是加载中状态
      if (res.data.data.pre_timestamp === null) { // 本次回来的数据没有下一页了
        this.finished = true
      }
    }
  }
}
</script>
