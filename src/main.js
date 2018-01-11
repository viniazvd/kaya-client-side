require(`quasar/dist/quasar.${__THEME}.css`)

import Vue from 'vue'
import Quasar from 'quasar'
import Vuelidate from 'vuelidate'
import router from './router'
import store from './store'
// import { Http } from './support/pluggins/http'
import UserPlugin from './support/pluggins/user'
import Loader from './support/pluggins/loader'

Vue.config.productionTip = false
Vue.use(Quasar)
Vue.use(Vuelidate)
// Vue.use(Http)
Vue.use(UserPlugin)
Vue.use(Loader, store)

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-root',
    router,
    store,
    render: h => h(require('./Root').default),
    mounted () {
      return this.$httpp
    }
  })
})
