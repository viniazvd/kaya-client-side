<template>
  <div>
    <!-- Layout footer -->
    <q-toolbar slot="footer">
      footer
    </q-toolbar>

  </div>
</template>

<script>
import { QToolbar } from 'quasar'

export default {
  name: 'myFooter',
  components: { QToolbar },

  data () {
    return {
    }
  }
}
</script>