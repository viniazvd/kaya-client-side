import Login from './components/Login'
import ForgotPassword from './components/ForgotPassword'
import ForgotEmail from './components/ForgotEmail'
import CreateAccount from './components/CreateAccount'

export default [
  { path: '/login', component: Login, meta: { requiresAuth: false } },
  { path: '/forgotPassword', component: ForgotPassword, meta: { requiresAuth: false } },
  { path: '/forgotEmail', component: ForgotEmail, meta: { requiresAuth: false } },
  { path: '/createAccount', component: CreateAccount, meta: { requiresAuth: false } }
]
