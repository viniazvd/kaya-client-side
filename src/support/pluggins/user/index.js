import * as $user from '../../../domains/user/services'

let instaled = false

const install = Vue => {
  if (instaled) return

  Object.defineProperties(Vue.prototype, {
    $user: {
      get () {
        return $user
      }
    }
  })

  instaled = true
}

export default { install }
