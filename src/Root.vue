<template>
  <div id="q-root">
    <Navbar v-if="this.isAuthenticated()" />
    
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from './components/navbar/Main'

export default {
  name: 'root',

  components: { Navbar },

  methods: {
    ...mapGetters(['isAuthenticated'])
  }
}
</script>
