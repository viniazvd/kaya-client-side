<template>
  <div id="q-root">
    <Navbar v-if="this.isAuthenticated()" />

    <div v-else class="link-site" v-once>
      <a href="https://espacokaya.com.br/">
        <h5>Visite o nosso site</h5>
      </a>
    </div>

    <router-view v-if="!this.isAuthenticated()" />
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

<style scoped>
.link-site {
  padding-top: 30px;
  text-decoration: underline;
  text-align: center;
}
</style>

