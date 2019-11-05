import * as types from './types'

export default {
  [types.SET_BOARD_DATA] (state, obj) {
    state.board = { ...state.board, ...obj }
  }
}
