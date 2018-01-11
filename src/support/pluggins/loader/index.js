import loaderFactory from './loaderFactory'
import registerStore from './registerStore'

export const Loader = (Vue, store) => {
  registerStore(store)

  Object.defineProperty(Vue.prototype, '$loader', {
    get () {
      return loaderFactory(this)
    }
  })
}
