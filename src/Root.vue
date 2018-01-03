<template>
  <div id="q-root">
    <div v-if="this.isLogged()">
      <Navbar />
    </div>
    
    <div v-else>
      <Auth />
    </div>
  
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Auth from './app/auth/components/Main'
import Navbar from './components/navbar/Main'

export default {
  name: 'root',

  components: { Auth, Navbar },

  methods: {
    ...mapGetters(['isLogged'])
  }
}
</script>
