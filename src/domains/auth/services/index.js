import { http } from '../../../support/http'

export const postLogin = (email, password) => {
  return http.post('auth/signin', { email, password })
    .then(response => response.data)
}

// export const getVerifyToken = (token) => {
//   return http.post('/auth/verify', { token })
//     .then(response => response.data)
// }

// export const getRefreshToken = (token) => {
//   return http.post('/auth/refresh', { token })
//     .then(response => response.data)
// }
