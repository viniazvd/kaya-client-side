import * as types from './mutations-types'

export default {
  [types.SET_EMAIL] (state, email) {
    state.email = email
  }
}
