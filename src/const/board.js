import chartConst from './chart'
import tableConst from './table'

// 用户图表类型
export const chartTypes = {
  // exactDatas 数值个数精确，exactDimensions 维度个数精确
  'table': {
    tip: '表格：任意维度和数值',
    attr: [
      { type: 'AttrTableColor', name: '颜色' }
    ],
    mType: 'table_01',
    drawType: 'table', // 使用tableAttr属性 && table/index.js
    available: { dimensions: 0, datas: 0 } // 不展示维度框 && 数值>=1
  },
  'line': {
    tip: '多系列折线图：需要至少1个维度，至少1个数值',
    attr: [
      { type: 'AttrColor', name: '颜色' },
      { type: 'AttrLineWired', name: '线宽' },
      { type: 'AttrLabel', name: '标签', position: { 'top': '居上', 'bottom': '居下' } },
      { type: 'AttrTooltip', name: '提示' }
    ],
    mType: 'charts_01',
    drawType: 'chart', // 使用chartAttr属性 && chart/index.js
    available: { dimensions: 1, datas: 1 } // 维度>=1 && 数值>=1
  },
  'bar': {
    tip: '多系列柱状图：需要至少1个维度，至少1个数值',
    attr: [
      { type: 'AttrColor', name: '颜色' },
      { type: 'AttrBarSize', name: '大小' },
      { type: 'AttrLabel', name: '标签', position: { 'inside': '居中', 'insideTop': '居内', 'top': '居外' } },
      { type: 'AttrTooltip', name: '提示' }
    ],
    mType: 'charts_01',
    drawType: 'chart', // 使用chartAttr属性 && chart/index.js
    available: { dimensions: 1, datas: 1 } // 维度>=1 && 数值>=1
  },
  'barStack': {
    tip: '堆叠柱状图：需要至少1个维度，至少1个数值',
    attr: [
      { type: 'AttrColor', name: '颜色' },
      { type: 'AttrBarSize', name: '大小' },
      { type: 'AttrLabel', name: '标签', position: { 'inside': '居中', 'insideTop': '居内', 'top': '居外' } },
      { type: 'AttrTooltip', name: '提示' }
    ],
    mType: 'charts_01',
    drawType: 'chart', // 使用chartAttr属性 && chart/index.js
    available: { dimensions: 1, datas: 1 } // 维度>=1 && 数值>=1
  },
  'pie': {
    tip: '饼图：需要至少1个维度，1个数值',
    attr: [
      { type: 'AttrColor', name: '颜色' },
      { type: 'AttrPieRadius', name: '半径' },
      { type: 'AttrLabel', name: '标签', position: { 'center': '居中', 'inside': '居内', 'outside': '居外' } },
      { type: 'AttrTooltip', name: '提示' }
    ],
    mType: 'charts_01',
    drawType: 'chart', // 使用chartAttr属性 && chart/index.js
    available: { dimensions: 1, datas: 1, exactDatas: true } // 维度>=1 && 数值===1
  },
  'barLine': {
    tip: '组合图：需要至少1个维度，至少2个数值',
    attr: [],
    mType: 'charts_01',
    drawType: 'chart', // 使用chartAttr属性 && chart/index.js
    available: { dimensions: 1, datas: 2 } // 维度>=1 && 数值>=2
  }
}

// 看板样式初始值
export const boardStyleDefault = () => ({
  background: {
    type: 'color',
    color: null,
    image: null
  },
  theme: 'customed'
  // moduleGap: true
})

// 看板设置初始值
export const boardSettingDefault = () => ({
  timingTask: {
    open: false,
    value: 10
  }
})

// 模块setting初始值
export const settingDefault = (obj) => ({
  chartAttr: {}, // echarts attr
  chartStyle: { // echarts样式设置
    color: {
      auto: true,
      scheme: null, // 配色方案
      map: null // 用户自定义颜色数组
    },
    axis: { // 轴线设置
      // color: '#333',
      enabled: true,
      type: 'solid',
      width: 1
    },
    hGrid: { // 纵向网格线设置
      // color: '#ccc',
      enabled: true,
      type: 'solid',
      width: 1
    },
    vGrid: { // 横向网格线设置
      // color: '#ccc',
      enabled: true,
      type: 'solid',
      width: 1
    },
    legend: { // 图例设置
      borderColor: null,
      enabled: true,
      position: 'top'
    },
    yAxis: {
      '0': {
        axisEnable: true,
        position: 'left',
        offset: 0,
        nameEnable: false,
        name: '',
        nameLocation: 'end'
      },
      '1': {
        axisEnable: false,
        position: 'right',
        offset: 0,
        nameEnable: false,
        name: '',
        nameLocation: 'end'
      }
    }
  },
  tableAttr: {}, // 表格attr
  tableStyle: { // 表格样式设置
    font: { // 表格字体样式
      type: 'auto', // 字体样式（自动，自定义）
      header: {
        fontFamily: '',
        fontAlign: 'center', // left: 居左，center：居中，right：居右
        color: null
      },
      body: {
        fontFamily: '',
        fontAlign: 'center', // left: 居左，center：居中，right：居右
        color: null
      }
    },
    style: { // 风格
      tableStyle: 1, // 风格
      themeColor: null// 主题颜色
    },
    format: { // 格式
      lineHeight: 5,
      columnWidth: [], // {[index]: [width]}
      serialNumber: false// 是否显示序号
    },
    interaction: { // 交互属性
      freezeDim: false// 是否冻结首列
    },
    pagination: { // 分页
      enable: false,
      display: ['total', 'sizes', 'prev', 'pager', 'next', 'jumper']// 显示内容
    }
  },
  title: { // 标题设置
    enabled: true,
    type: 'backgroundColor', // backgroundColor || backgroundImage
    color: null,
    backgroundColor: null,
    image: null,
    position: 'left',
    fontFamily: ''
  },
  background: { // 背景设置
    color: null,
    type: 'color', // color || image
    image: null
  },
  timingTask: {
    auto: true, // 根据看板的timingTask
    open: obj.timingTaskOpen,
    value: obj.timingTaskValue
  }
})

// 全部计算类型（用于INT类型）
export const computedTypes = {
  0: '无',
  1: '计数',
  2: '求和',
  3: '求平均',
  4: '求最大值',
  5: '求最小值'
}

// 部分计算类型（用于除INT之外类型）
export const partComputedTypes = {
  0: '无',
  1: '计数'
}

export const fontFamilies = ['Avenir', 'Arial', 'sans-serif', 'monospace', 'Courier New', '微软雅黑', '宋体', '黑体']

// 颜色选择器预设颜色
export const presetColors = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']

export const version = '0.0.1'

export default {
  namespaced: true,
  chartConst,
  tableConst
}
