const attrDefault = (type) => ({ // 图表属性结构
  type, // 前端cType图表类型
  color: { // 颜色设置
    borderColor: null,
    opacity: 1,
    value: null
  },
  size: { // 大小设置
    barBorderRadius: 0,
    barWidth: null,
    lineWidth: 2,
    pieRadiusOuterValue: 0.8,
    pieRadiusinnerValue: 0
  },
  label: { // 标签设置
    enabled: false,
    position: 'top'
    // type为bar top居外顶部 insideTop居内顶部 inside居内中间
    // type为line top居上 bottom居下
    // type为pie inside内部 outside外部 center中间
  },
  tooltip: { // 提示设置
    backgroundColor: 'rgba(50,50,50,0.7)'
  },
  line: { // 线型设置（对应type 为 line的）
    type: 'line' // step 垂直 smooth 曲线 line 直线
  },
  axis: {
    axisIndex: '0'
  }
})

// 配色方案
const colorScheme = {
  'customed': {
    name: '默认',
    colors: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
  },
  'dark': {
    name: '黑色',
    colors: ['#dd6b66', '#759aa0', '#e69d87', '#8dc1a9', '#ea7e53', '#eedd78', '#73a373', '#73b9bc', '#7289ab', '#91ca8c', '#f49f42']
  },
  'westeros': {
    name: '活力',
    colors: ['#516b91', '#59c4e6', '#edafda', '#93b7e3', '#a5e7f0', '#cbb0e3']
  },
  'essos': {
    name: '红色',
    colors: ['#893448', '#d95850', '#eb8146', '#ffb248', '#f2d643', '#ebdba4']
  },
  'wonderland': {
    name: '绿色',
    colors: ['#4ea397', '#22c3aa', '#7bd9a5', '#d0648a', '#f58db2', '#f2b3c9']
  },
  'walden': {
    name: '蓝色',
    colors: ['#3fb1e3', '#6be6c1', '#626c91', '#a0a7e6', '#c4ebad', '#96dee8']
  },
  'chalk': {
    name: '粉笔',
    colors: ['#fc97af', '#87f7cf', '#f7f494', '#72ccff', '#f7c5a0', '#d4a4eb', '#d2f5a6', '#76f2f2']
  },
  'infographic': {
    name: '信息',
    colors: ['#c1232b', '#27727b', '#fcce10', '#e87c25', '#b5c334', '#fe8463', '#9bca63', '#fad860', '#f3a43b', '#60c0dd', '#d7504b', '#c6e579', '#f4e001', '#f0805a', '#26c0c0']
  },
  'macarons': {
    name: '杏仁',
    colors: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa', '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050', '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089']
  },
  'roma': {
    name: '罗马',
    colors: ['#e01f54', '#001852', '#f5e8c8', '#b8d2c7', '#c6b38e', '#a4d8c2', '#f3d999', '#d3758f', '#dcc392', '#2e4783', '#82b6e9', '#ff6347', '#a092f1', '#0a915d', '#eaf889', '#6699ff', '#ff6666', '#3cb371', '#d5b158', '#38b6b6']
  },
  'shine': {
    name: '彩虹',
    colors: ['#c12e34', '#e6b600', '#0098d9', '#2b821d', '#005eaa', '#339ca8', '#cda819', '#32a487']
  },
  'purple-passion': {
    name: '紫色',
    colors: ['#9b8bba', '#e098c7', '#8fd3e8', '#71669e', '#cc70af', '#7cb4cc']
  },
  'halloween': {
    name: '万圣节',
    colors: ['#ff715e', '#ffaf51', '#ffee51', '#8c6ac4', '#715c87']
  }
}

// 单个图形属性选择绘图类型
const dataTypes = {
  'bar': {
    name: '柱形图',
    icon: 'icon_bar_polyline'
  },
  'line': {
    name: '线',
    icon: 'icon_polyline'
  }
}

export default {
  namespaced: true,
  attrDefault,
  colorScheme,
  dataTypes
}
