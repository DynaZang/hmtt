<template>
  <!-- 一条文章单元格 -->
  <van-cell>
    <!-- 标题区域的插槽 -->
    <template #title>
      <div class="title-box">
        <!-- 标题 -->
        <span>{{ artobj.title }}</span>
        <!-- 单图 -->
        <img
          class="thumb"
          :src="artobj.cover.images[0]"
          v-if="artobj.cover.type === 1"
        />
      </div>
      <!-- 三张图片 -->
      <div class="thumb-box" v-if="artobj.cover.type > 1">
        <img
          v-for="(imgurl, index) in artobj.cover.images"
          :key="index"
          class="thumb"
          :src="imgurl"
        />
      </div>
    </template>
    <!-- label 区域的插槽 -->
    <template #label>
      <div class="label-box">
        <div>
          <span>{{ artobj.aut_name }}</span>
          <span>{{ artobj.comm_count }}评论</span>
          <span>{{ formatTime(artobj.pubdate) }}</span>
        </div>
        <!-- 反馈按钮 -->
        <van-icon name="cross" @click="show = true" />
        <!-- 反馈面板 -->
        <van-action-sheet
          v-model="show"
          :actions="actions"
          @select="onSelect"
          get-container = "body"
          :cancel-text="bottomText"
          @cancel="onCancel"
          @close="onClose"
        />
      </div>
    </template>
  </van-cell>
</template>

<script>
// 目标1: 点击反馈垃圾内容，实现数据切换
//  1.监听点击事件,区分用户点击那一个
//  2.切换action的数据
// 目标2: 二级反馈数据出现，取消按钮要变成返回
import { timeAgo } from '@/utils/date.js'
import { firstActions, secondActions } from '@/api/report.js'
export default {
  props: {
    artobj: Object // 文章对象
  },
  data () {
    return {
      show: false,
      actions: firstActions,
      bottomText: '取消'
    }
  },
  methods: {
    formatTime: timeAgo,
    onSelect (action) {
      // this.show = false
      // console.log(action)// 获取的是绑定的name
      // console.log(item)// 获取索引
      if (action.name === '反馈垃圾内容') {
        this.bottomText = '返回'
        this.actions = secondActions
      } else if (action.name === '不感兴趣') {
        this.$emit('disLike', this.artobj.art_id)
        this.show = false // 无论成功或者失败都让反馈面板消失
        // console.log(this.artobj.art_id)
      } else {
        this.$emit('reports', this.artobj.art_id, action.value) // 外面需要反馈类型的值
        this.actions = firstActions
        this.show = false
      }
    },
    onCancel () {
      if (this.bottomText === '返回') {
        this.show = true
        this.actions = firstActions
        this.bottomText = '取消'
      }
    },
    // 反馈面板关闭时
    onClose () {
      this.actions = firstActions
      this.bottomText = '取消'
    }
  }
}
</script>

<style scoped lang="less">
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span {
  margin: 0 3px;
  &:first-child {
    margin-left: 0;
  }
}
/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
