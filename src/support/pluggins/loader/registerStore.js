import storeLoader from '../../../domains/loader/store'

const registerStore = store => {
  store.registerModule('loader', { ...storeLoader })
}

export default registerStore
