// 此文件封装3个方法，用于操作token
// 封装的目的：代码分层，方便修改
const key = 'itheima'
// 设置
export const setToken = (token) => {
  localStorage.setItem(key, token)
}
// 导出
export const getToken = () => localStorage.getItem(key)
// 删除
export const deleteToken = () => localStorage.removeItem(key)
