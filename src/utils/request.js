// 基于axios封装网络请求
import ajax from 'axios'
import router from '@/router'
import { Notify } from 'vant'
import { getToken } from '@/utils/token'
// 新建一个axios实例
const axios = ajax.create({
  baseURL: 'http://toutiao.itheima.net', // 基地址
  timeout: 20000 // 20s超时时间（请求20s无响应判定超时）
})

// export default axios
// 上面的方法有局限性，导出的axios方法在使用时
/*
  在逻辑页面调用时，传入的这5个配置名字
  axios({
    url: '请求地址',
    method: '请求方式',
    params: {
      '用?传参,要求是对象',
    },
    data:{
      '请求体传参'
    },
    headers:{'请求头'}
  })
// 以后要更新request.js里封装网络请求的工具，里面的东西换了，外部调用就对应不上了。
*/
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 如果需要携带token，拦截请求后添加
  // ?.是可选链操作符，如果前面对象里没有length，整个对象返回undefined
  if (getToken()?.length > 0 && config.headers.Authorization === undefined) {
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // http响应状态为2xx, 3xx就进入这里
  // 对响应数据做点什么
  return response
}, function (error) {
  console.log(error)
  // http响应状态为4xx，5xx报错就进入这里
  // 401错误就要跳转登录
  if (error.response.status === 401) {
    Notify({ type: 'warning', message: '身份过期，请重新登录' })
    router.replace('/login')
    // 不能使用this.$router,因为this不是vue组件对象，调用不到router
    // 解决方法: 引入@/router下的router对象
  }
  return Promise.reject(error)
})
// export时包装一下，保证以后更换新的工具时可以复用，给method，params等赋默认值
export default ({ url, method = 'GET', params, data, headers }) => {
  return axios({
    url: url,
    method: method,
    params: params,
    data: data,
    headers: headers
  })
}
/*
以后换库, 只需要改这里, 逻辑页面不用动, 保证代码的复用性和独立性(高内聚低耦合)
  return $.ajax({
    url: url,
    type: method,
    data: data,
    header: headers
  })
*/
