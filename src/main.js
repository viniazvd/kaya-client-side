require(`quasar/dist/quasar.${__THEME}.css`)

import Vue from 'vue'
import Quasar from 'quasar'
import Vuelidate from 'vuelidate'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(Quasar)
Vue.use(Vuelidate)

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
    render: h => h(require('./Root').default)
  })
})
