import { http } from '../../../support/http'

export const postCreateAccount = ({ name, email, password }) => {
  return http.post('auth/signup', { name, email, password })
}

export const postLogin = (email, password) => {
  return http.post('auth/signin', { email, password })
    .then(response => response.data)
}

export const getEmailToken = email => {
  return http.post('auth/forgot-password', { email })
  // .then(response => response.data.result.msg)
}

export const getEmails = () => {
  return http.get('user')
    .then(response => response.data.results.users)
}

export const postNewPassword = ({ token, email, newPassword }) => {
  return http.post('auth/change-password', { token, email, newPassword })
}
