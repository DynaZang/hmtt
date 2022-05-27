<template>
  <div>
    黑马头条移动版本
  </div>
</template>

<script>
import { getAllChannelsAPI } from '@/api'
export default {
  async created () {
    try {
      const res = await getAllChannelsAPI()
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style >
</style>
