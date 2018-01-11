import * as types from './mutations-type'

export default {
  [types.SET_LOADER] (state, value) {
    state.loading = value
  }
}
