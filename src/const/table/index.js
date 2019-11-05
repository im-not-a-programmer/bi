const attrDefault = (type) => ({ // 表格属性结构
  type, // 前端cType图表类型
  color: { // 颜色设置
    color: null,
    opacity: 1
  },
  shape: { // 形状设置
    type: '',
    color: ''
  }
})

export default {
  namespaced: true,
  attrDefault
}
