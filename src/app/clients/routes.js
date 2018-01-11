const load = component => () => import(`./components/${component}.vue`)

export default [
  { path: '/clients', component: load('Main'), meta: { requiresAuth: true } }
]
