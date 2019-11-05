/* eslint-disable */'use strict'// 看板import http from 'xd-http'// 创建看板export const ApiBoardCreate = (params = null, query = null) => http.$POST('api/board/create', params, query, {}, false)// 看板保存export const ApiBoardSave = (params = null, query = null) => http.$POST('api/board/save', params, query, {}, false)// 根据看板ID获取看板详情export const ApiBoardFindBoardDetailById = (id, query = {}, params = null) => http.$GET(`api/board/findBoardDetailById/${id}`, query, params, {}, false)// 获取所有看板export const ApiBoardFindAllBoard = (query = {}, params = null) => http.$GET('api/board/findAllBoard', query, params, {}, false)// 编辑看板名称export const ApiBoardUpdateBoard = (params = null, query = null) => http.$POST('api/board/updateBoard', params, query, {}, false)// 删除看板export const ApiBoardDeleteBoardById = (id, params = null, query = null) => http.$DELETE(`api/board/deleteBoardById/${id}`, params, query, {}, false)// 发布看板和取消发布看板export const ApiBoardPublishBoard = (params = null, query = null) => http.$POST('api/board/publishBoard', params, query, {}, false)// 获取发布或未发布的看板列表export const ApiBoardFindPublishedBoard = (published, query = {}, params = null) => http.$GET(`api/board/findPublishedBoard/${published}`, query, params, {}, false)