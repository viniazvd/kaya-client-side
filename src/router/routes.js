import { routes as app } from '../app'

const root = [
  { path: '/', redirect: '/login' }
]

export default [...root, ...app]
