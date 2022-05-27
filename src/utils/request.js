// 基于axios封装网络请求
import ajax from 'axios'
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
