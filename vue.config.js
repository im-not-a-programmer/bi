'use strict'

module.exports = {
  publicPath: '/',
  assetsDir: 'static',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.20.61:7001', // 钟圆
        // target: 'http://127.0.0.1:7001', // 本地
        changeOrigin: true
      },
      '/public': {
        // target: 'http://192.168.20.108:7001', // 钟圆
        target: 'http://127.0.0.1:7001', // 本地
        changeOrigin: true
      }
    }
  }
}
