const load = component => () => import(`./components/${component}.vue`)

export default [
  { path: '/login', component: load('Login'), meta: { requiresAuth: false } },
  { path: '/forgotPassword', component: load('ForgotPassword'), meta: { requiresAuth: false } },
  { path: '/forgotEmail', component: load('ForgotEmail'), meta: { requiresAuth: false } },
  { path: '/createAccount', component: load('CreateAccount'), meta: { requiresAuth: false } }
]
