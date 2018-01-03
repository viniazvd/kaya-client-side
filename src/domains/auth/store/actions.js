import { postLogin } from '../services'
import * as types from './mutations-types'

export const doLogin = ({ commit }, user) => {
  return postLogin(user.email, user.password)
    .then(data => {
      commit(types.SET_USER, data.result.user)
      localStorage.setItem('user', data.result.user)

      commit(types.SET_TOKEN, data.result.token)
      localStorage.setItem('token', data.result.token)
    })
    .catch(error => console.log(`Erro ao logar: ${error}`))
}

// export const doLogout = ({ commit }) => {
//   commit(types.SET_USER, {})
//   commit(types.SET_TOKEN, '')
// }
