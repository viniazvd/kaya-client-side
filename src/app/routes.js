import { routes as auth } from './auth'
import { routes as home } from './home'
import { routes as clients } from './clients'

export default [ ...auth, ...home, ...clients ]
