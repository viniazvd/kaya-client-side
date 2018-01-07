<template>
  <q-field icon="vpn_key">
    <q-input
      type="text"
      float-label="Token recebido pelo e-mail"
      :value="this.token" 
      @input="this.emitValue"
      clearable
      @keyup.enter="emitKeyUp" 
    />
  </q-field>
</template>

<script>
import { QField, QInput } from 'quasar'

export default {
  name: 'inputToken',

  props: ['token'],

  components: { QField, QInput },

  methods: {
    emitValue (value) {
      this.$emit('update:token', value)
    },
    emitKeyUp () {
      this.$emit('keyUp')
    }
  }
}
</script>
