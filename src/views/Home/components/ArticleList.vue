<template>
  <div>
    <!-- 文章列表！ -->
    <!-- list有个参数是immediate-check: 是否在初始化时立即执行滚动位置检查-->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        offset="50"
      >
        <article-item
          v-for="obj in list"
          :key="obj.art_id"
          :artobj="obj"
          @disLike="disLikeFn"
          @reports="reportsFn"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
/*
问题: 网页一进来就会触发两次获取信息，第一次是正常请求，第二次是onload请求，因为最开始第一页数据也是请求回来后才更新DOM，
此时标签先挂载了，没有高度，所以onload也判断触底更新了
*/
import ArticleItem from './ArticleItem.vue'
import { getAllArticleListAPI, articlesDislikeAPI, articleReportsAPI } from '@/api/index.js'
import { Notify } from 'vant'
import { secondActions } from '@/api/report'
export default {
  props: {
    // list: Array // 文章列表数组(不再需要了，只要频道id)
    channelID: Number
  },
  data () {
    return {
      list: [],
      loading: false, // 底部加载
      finished: false,
      theTimestamp: new Date().getTime(),
      isLoading: false // 顶部加载
    }
  },
  components: {
    ArticleItem
  },
  async created () {
    this.getArticleList()
  },
  methods: {
    // 网络请求方法
    async getArticleList () {
      const res = await getAllArticleListAPI({
        channel_id: this.channelID,
        timestamp: this.theTimestamp
      })
      console.log(res)
      // 下一页第一篇文章的时间戳pre_timestamp
      this.list = [...this.list, ...res.data.data.results]
      // 下一页第一篇文章的时间戳pre_timestamp
      this.theTimestamp = res.data.data.pre_timestamp
      this.loading = false // 如果不关闭，底部一直是加载中状态
      if (res.data.data.pre_timestamp === null) {
        // 本次回来的数据没有下一页了
        this.finished = true
      }
      // 顶部刷新状态改为false
      this.isLoading = false
    },
    // 底部加载方法
    async onLoad () {
      if (this.list.length === 0) { // 第一次上面判断还是触底（触发onload时自动把loading改成true了）
      // 如果不改回来，下次触底就不会触发onload方法了
        this.loading = false// 如果页面没有数据，没有高度，让这次onLoad不继续执行（不会出现key重复的错误）
        return
      }
      this.getArticleList()
    },
    // 顶部刷新
    async onRefresh () {
      this.list = []
      this.theTimestamp = new Date().getTime()
      this.getArticleList()
    },
    // 反馈不感兴趣
    async disLikeFn (id) {
      // console.log(`id ${id}`)
      try {
        await articlesDislikeAPI({ target: id })
        // res没什么有用信息，所以await往下放行，证明响应成功
        Notify({ type: 'success', message: '反馈成功' })
      } catch (err) {
        // Notify({ type: 'warning', message: '反馈失败-联系程序员' })
      }
    },
    async reportsFn (id, type) {
      try {
        await articleReportsAPI({ target: id, type: secondActions[type].name })
        Notify({ type: 'success', message: '举报成功' })
      } catch (err) {
        Notify({ type: 'warning', message: '举报失败-联系程序员' })
      }
    }
  }
}

</script>
