const user = localStorage.getItem('user')
const token = localStorage.getItem('token')

export default {
  user: user || {},
  token: token || ''
}
