import { http } from '../../http'

let instaled = false

const install = Vue => {
  if (instaled) return

  Object.defineProperties(Vue.prototype, {
    $httpp: {
      get () {
        return http
      }
    }
  })

  instaled = true
}

export default { install }
