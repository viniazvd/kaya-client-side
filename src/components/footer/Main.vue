<template>
  <div>
    
    <!-- Layout footer -->
    <q-toolbar slot="footer">
      footer
    </q-toolbar>

  </div>
</template>

<script>
import { QLayout, QSideLink, QItemMain, QToolbar, QToolbarTitle, QTabs, QTab, QBtn, QIcon } from 'quasar-framework'

export default {
  name: 'myFooter',
  components: { QLayout, QSideLink, QItemMain, QToolbar, QToolbarTitle, QTabs, QTab, QBtn, QIcon },

  data () {
    return {
    }
  }
}
</script>