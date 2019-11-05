import NProgress from 'nprogress'

export default (name) => {
  return (resolve) => {
    NProgress.start()
    import(/* webpackChunkName: "[request]" */ `../views/${name}.vue`).then(mod => {
      resolve(mod)
    }).finally(() => {
      NProgress.done()
    })
  }
}
