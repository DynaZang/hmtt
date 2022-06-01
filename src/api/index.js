// 统一封装借口方法
// 每个方法负责请求一个url地址
// 逻辑页面中导入这个接口方法，就能使用请求了
// 好处：请求url路径，可以在这里统一进行管理
import request from '@/utils/request.js'

// 登录接口
// axios内部，会把参数对象转成json字符串格式发给后台
// axios内部，会自动携带请求参数（headers）
export const loginAPI = ({ mobile, code }) => request({
  url: '/v1_0/authorizations',
  method: 'POST',
  // 请求体写在data
  data: {
    mobile,
    code
  }
})
// 获取所有频道列表
// 箭头函数要么就不要花括号和return，要么都加上
export const getAllChannelsAPI = () => {
  return request({
    url: '/v1_0/channels',
    method: 'GET'
  })
}
// 获取用户频道列表
// 不登陆时默认返回后台设置的默认频道
export const getUserChannelsAPI = () =>
  request({
    url: '/v1_0/user/channels'
  })
// 获取文章新闻推荐
export const getAllArticleListAPI = ({ channel_id, timestamp }) =>
  request({
    url: '/v1_0/articles',
    params: {
      channel_id,
      timestamp
    }
  })
// 对文章不喜欢
export const articlesDislikeAPI = ({ target }) =>
  request({
    url: '/v1_0/article/dislikes',
    method: 'POST',
    data: {
      target: target
    }
  })
// 文章举报
export const articleReportsAPI = ({ target, type, remark }) => {
  return request({
    url: '/v1_0/article/reports',
    method: 'POST',
    data: {
      target: target,
      type: type,
      remark: 'remark'
    }
  })
}
