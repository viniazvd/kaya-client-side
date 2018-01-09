const Main = () => import('./components/Main')

export default [
  { path: '/home', component: Main, meta: { requiresAuth: true } }
]
