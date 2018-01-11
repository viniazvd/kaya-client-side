// const load = component => () => import(`../../app/auth/components/${component}.vue`)

const path = require('path')

const currentDir = __dirname

const load = name => () => {
  console.log(currentDir)
  console.log(path.join(currentDir, '../../app/auth/components', name))
  import(path.join(currentDir, '../../app/auth/components', name))
}

const lazyLoadingRoutes = routes =>
  routes.map(route => Object.assign(route, {component: load(route.component)}))

export default lazyLoadingRoutes
