const path = require('path')
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        modifyVars: {
          // 直接覆盖变量
          // 'text-color': '#111',
          // 'border-color': '#eee',
          // 'nav-bar-background-color': '#007bff',
          // 'nav-bar-text-color': 'white',
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          // __dirname（两个下划线），是node下的全局内置变量，显示当前文件夹的绝对路径
          hack: `true; @import "${path.resolve(__dirname, 'src/styles/cover.less')}";`
        }
      }
    }
  }
})
