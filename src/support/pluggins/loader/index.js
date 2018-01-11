import loaderFactory from './loaderFactory'
import registerStore from './registerStore'

let instaled = false

const install = (Vue, store) => {
  if (instaled) return

  registerStore(store)

  Object.defineProperty(Vue.prototype, '$loader', {
    get () {
      return loaderFactory(this)
    }
  })

  instaled = true
}

export default { install }
