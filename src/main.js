require(`quasar/dist/quasar.${__THEME}.css`)

// core
import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'
import store from './store'

// utils
import Vuelidate from 'vuelidate'

// pluggins
import HttpPlugin from './support/pluggins/http'
import UserPlugin from './support/pluggins/user'
import Loader from './support/pluggins/loader'

// Defina false para previnir a exibição da dica sobre o modo de produção ao iniciar o Vue.
Vue.config.productionTip = false

// // registering core
Vue.use(Quasar)

// // registering utils
Vue.use(Vuelidate)

// registering pluggins
Vue.use(HttpPlugin)
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
    render: h => h(require('./Root').default)
  })
})
