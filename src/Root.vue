<template>
  <div id="q-root">
    <Navbar v-if="this.isAuthenticated()" />

    <div v-else class="link-site" v-once>
      <a href="https://espacokaya.com.br/">
        <h5>Visite o nosso site</h5>
      </a>
    </div>

    <q-inner-loading :visible="this.showLoader">
      <q-spinner-gears size="300px" color="primary" />
    </q-inner-loading>

    <router-view v-if="!this.isAuthenticated()" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from './components/navbar/Main'
import { QInnerLoading, QSpinnerGears } from 'quasar'

export default {
  name: 'root',

  components: { Navbar, QInnerLoading, QSpinnerGears },

  methods: {
    ...mapGetters(['isAuthenticated'])
  },

  computed: {
    showLoader () {
      return this.$store.state.loader.loading
    }
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

