import { chartTypes } from '@/const/board'

export default {
  board: state => state.board,
  currentModuleFn: state => moduleId => moduleId ? state.board.modules[moduleId] : {},
  theme: state => state.board.style ? state.board.style.theme : '',
  drawTypeFn: state => cType => chartTypes[cType].drawType
}
