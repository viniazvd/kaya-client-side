const load = component => () => import(`./components/${component}.vue`)

export default [
  { path: '/home', component: load('Main'), meta: { requiresAuth: true } }
]
