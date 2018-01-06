import { http } from '../../../support/http'

export const postLogin = (email, password) => {
  return http.post('auth/signin', { email, password })
    .then(response => response.data)
}

export const getEmailToken = email => {
  return http.post('auth/forgot-password', { email })
  // .then(response => response.data.result.msg)
}
