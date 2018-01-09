import store from '../store'

const isAuthenticated = () => store.getters.isAuthenticated

export default (to, from, next) => {
  // se está autenticado
  // e está indo para uma rota que não precisa de autenticação
  if (isAuthenticated() && !to.meta.requiresAuth) {
    next('/home')
    return false
  }

  // se não está autenticado
  // e está indo para uma rota que precisa de autenticação
  if (!isAuthenticated() && to.meta.requiresAuth) {
    next('/login')
    return false
  }

  next()
}
