// 统一封装借口方法
// 每个方法负责请求一个url地址
// 逻辑页面中导入这个接口方法，就能使用请求了
// 好处：请求url路径，可以在这里统一进行管理
import axios from '@/utils/request.js'

// 获取所有频道列表
// 箭头函数要么就不要花括号和return，要么都加上
export const getAllChannelsAPI = () => {
  return axios({
    url: '/v1_0/channels',
    method: 'GET'
  })
}
