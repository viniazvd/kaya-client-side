import * as types from './mutations-types'

export const setEmail = ({ commit }, email) => {
  commit(types.SET_EMAIL, email)
}
