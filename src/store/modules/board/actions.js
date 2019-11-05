import * as types from './types'
import { boardStyleDefault, boardSettingDefault } from '@/const/board'
import { ApiBoardCreate, ApiBoardFindBoardDetailById, ApiBoardSave, ApiBoardFindAllBoard,
  ApiBoardUpdateBoard, ApiBoardDeleteBoardById, ApiBoardPublishBoard } from '@/services/api/board'
import { ApiModuleData, ApiModuleCreate, ApiModuleDeleteModuleById } from '@/services/api/module'
import { ApiDatasetAll, ApiDatasetFindFieldsByTableId } from '@/services/api/dataset'

export default {
  // 创建看板
  async createBoard ({ commit }, param) {
    let res = await ApiBoardCreate(param)
    return res
  },
  // 根据看板ID获取看板详情
  async findBoardDetailById ({ commit, dispatch }, boardId) {
    let res = await ApiBoardFindBoardDetailById(boardId)
    if (res.status) {
      commit(types.SET_BOARD_DATA, res.data)
      // 初始化看板style,setting字段
      if (!res.data.style || !res.data.setting) {
        dispatch('saveBoard', {
          ...res.data,
          ...{ style: res.data.style || boardStyleDefault() },
          ...{ setting: res.data.setting || boardSettingDefault() }
        })
      }
    }
  },
  // 保存看板
  async saveBoard ({ commit }, obj) {
    let res = await ApiBoardSave(obj)
    if (res.status) {
      commit(types.SET_BOARD_DATA, obj)
    }
  },
  // 根据参数计算模块绘图数据
  async getModuleDrawData ({ commit }, module) {
    let res = await ApiModuleData(module)
    if (res.status) { return res.data }
  },
  // 获取全部数据集
  async getDatasetAll ({ commit }, module) {
    let res = await ApiDatasetAll(module)
    if (res.status) { return res.data }
  },
  // 根据根据tableId查询字段
  async findFieldsByTableId ({ commit }, param) {
    let res = await ApiDatasetFindFieldsByTableId(param)
    if (res.status) { return res.data }
  },
  // 创建模块
  async createModule ({ commit }, param) {
    let res = await ApiModuleCreate(param)
    if (res.status) { return res }
  },
  // 删除模块
  async deleteModuleById ({ commit }, param) {
    let res = await ApiModuleDeleteModuleById(param)
    return res.status
  },
  // 获取所有看板
  async findAllBoard () {
    let res = await ApiBoardFindAllBoard()
    if (res.status) { return res.data }
  },
  // 编辑看板名称
  async updateBoard ({ commit }, param) {
    let res = await ApiBoardUpdateBoard(param)
    return res.status
  },
  // 删除看板
  async deleteBoardById ({ commit }, id) {
    await ApiBoardDeleteBoardById(id)
  },
  // 发布/取消发布看板
  async publishBoard ({ commit }, param) {
    let res = await ApiBoardPublishBoard(param)
    return res.status
  }
}
