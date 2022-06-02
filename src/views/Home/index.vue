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
          <!-- 搜索图标 -->
          <van-icon color="#fff" name="search" size="18px" @click="$router.push('/search')"/>
        </template>
      </van-nav-bar>
    </div>
    <!-- tab栏导航: 每个van-tab 代表一个标签导航，中间夹着内容，对应着下属列表内容 -->
    <!-- van-tabs循环了很多标签导航，与之一一对应的内容列表不是一开始就创建的，而是触发后创建的 -->
    <div class="tab">
      <van-tabs v-model="channelId" animated sticky offset-top="1.226667rem">
        <van-tab
          v-for="index in userChannelList"
          :title="index.name"
          :key="index.id"
          :name="index.id"
        >
          <article-list :channelID="channelId"></article-list>
        </van-tab>
      </van-tabs>
      <!-- 编辑频道图标 -->
      <van-icon
        name="plus"
        @click="showPopup"
        size="0.37333334rem"
        class="moreChannels"
      />
      <!-- 点击+号后的弹出层 -->
      <van-popup
        v-model="show"
        :style="{ height: '100vh', width: '100vw' }"
        get-container="body"
      >
        <ChannelEdit
          @close="show = false"
          :userList="userChannelList"
          :unSelectedList="unSelectedChannelList"
          @addChannel="addChannelFn"
          @removeChannel="removeChannelFn"
          v-model="channelId"
        >
        </ChannelEdit>
      </van-popup>
    </div>
  </div>
</template>

<script>
import {
  getUserChannelsAPI,
  getAllChannelsAPI,
  updateChannelAPI,
  deleteChannelAPI
} from '@/api/index.js'
import ArticleList from './components/ArticleList.vue'
import ChannelEdit from './channelEdit'
export default {
  data () {
    return {
      channelId: 0, // 导航栏默认选中
      allChannelList: [], // 所有频道列表
      userChannelList: [], // 用户选择频道列表
      // articleList: [] // 文章列表
      show: false // 控制频道管理弹出层
    }
  },
  // created 在首页打开就请求一次，后续不会更新，需要监测tab切换
  // 只要切换标签，都重新请求拿到新数据,需要吧文章列表数据放在articleList中，保持独立
  async created () {
    // 获得用户频道
    const res = await getUserChannelsAPI()
    this.userChannelList = res.data.data.channels // 保存用户频道列表
    // this.channelChange()
    const res1 = await getAllChannelsAPI()
    this.allChannelList = res1.data.data.channels
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
    showPopup () {
      this.show = true
    },
    // 添加频道
    async addChannelFn (channelObj) {
      // 把用户选择的频道数据推送给后台
      // 需要对存储频道数据的数组进行修改，后台要求id:频道id seq:顺序序号
      // 现在是频道id和频道名
      this.userChannelList.push(channelObj)
      //   const newArr = this.userChannelList.filter(obj => obj.id !== 0)// 筛选掉推荐频道
      //   // filter筛选出来后的newArr和userChannList保存的都是同一个对象的内存地址，所以后续删除会影响原频道数据中的name
      //   newArr.push(channelObj)
      //   newArr.forEach((obj, index) => {
      //     // delete 对象.属性 可以删除键值对
      //     delete obj.name
      //     obj.seq = index
      //   })
      //   await updateChannelAPI({
      //     channels: newArr
      //   })
      // }
      // 以上代码出现问题，新增时删除了频道名字
      const newArr = this.userChannelList.filter((obj) => obj.id !== 0) // 筛选掉推荐频道
      // filter筛选出来后的newArr和userChannList保存的都是同一个对象的内存地址，所以后续删除会影响原频道数据中的name
      const theNewArr = newArr.map((obj, index) => {
        const newObj = { ...obj }
        delete newObj.name
        newObj.seq = index
        return newObj // 用map方法收集新对象形成一个新数组
      })
      await updateChannelAPI({
        channels: theNewArr
      })
    },
    // 删除频道
    async removeChannelFn (channelObj) {
      const index = this.userChannelList.findIndex(obj => obj.id === channelObj.id)
      this.userChannelList.splice(index, 1)
      const res = await deleteChannelAPI({
        target: channelObj.id
      })
      console.log(res)
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  computed: {
    unSelectedChannelList () {
      const newArr = this.allChannelList.filter((bigobj) => {
        const index = this.userChannelList.findIndex((smallObj) => {
          return smallObj.id === bigobj.id
        })
        // 如果找到了
        if (index > -1) {
          return false
          // 不存入数组
        } else {
          return true
        }
      })

      return newArr
    }
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
// 设置 tabs 容器的样式
/deep/ .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

// 设置小图标的样式
.moreChannels {
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}
</style>
