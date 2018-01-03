import * as types from './mutations-types'

export default {
  [types.SET_USER] (state, user) {
    state.user = user
  },
  [types.SET_TOKEN] (state, token) {
    state.token = token
  }
}
