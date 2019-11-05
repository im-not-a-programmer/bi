import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import NProgress from 'nprogress'
import http from 'xd-http'
import 'nprogress/nprogress.css'
import 'normalize.css/normalize.css'
import './registerServiceWorker'
import './components/element-ui/index'
import '@/assets/iconfont/iconfont.js'
import '@/assets/styles/index.less'
import '@/assets/styles/element-variables.scss'
import { Message, MessageBox } from 'element-ui'
import echarts from 'echarts'
import themeConst from '@/assets/theme/index'

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$ELEMENT = { size: 'mini' }
http.setOptions({
  timeout: 10000, // 设置超时时长
  baseURL: process.env.NODE_ENV === 'production' ? '/node' : '/',
  requestSuccess: (config) => { NProgress.start() }, // 发送请求成功的回调
  requestError: (error) => { console.log(error); NProgress.done() }, // 发送请求失败的回调
  responseSuccess: (response) => { NProgress.done() }, // 请求响应成功的回调
  responseError: (error) => { console.log(error); NProgress.done() }, // 请求响应失败的回调
  commonErrorHandling: (message, res) => { Message.error(message || '未知异常') } // 统一错误处理的回调
})
Vue.config.productionTip = false

// 注册echarts主题
for (let themeName in themeConst) {
  echarts.registerTheme(themeName, themeConst[themeName])
}
// findIndex Polyfill 兼容IE浏览器
if (!Array.prototype.findIndex) {
  // eslint-disable-next-line
  Object.defineProperty(Array.prototype, 'findIndex', {
    value: function (predicate) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined')
      }
      let o = Object(this)
      let len = o.length >>> 0
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function')
      }
      let thisArg = arguments[1]
      let k = 0
      while (k < len) {
        let kValue = o[k]
        if (predicate.call(thisArg, kValue, k, o)) {
          return k
        }
        k++
      }
      return -1
    }
  })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
