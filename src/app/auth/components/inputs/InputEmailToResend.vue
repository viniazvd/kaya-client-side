<template>
  <q-field icon="mail" helper="exemplo: meuemail@gmail.com">
    <q-input
      type="text"
      float-label="E-mail"
      :value="this.emailToResend" 
      @input="this.emitValue"
      clearable
      @keyup.enter="emitKeyUp"
    />
  </q-field>
</template>

<script>
import { QField, QInput } from 'quasar'

export default {
  name: 'inputEmailToResend',

  props: ['emailToResend'],

  components: { QField, QInput },

  methods: {
    emitValue (value) {
      this.$emit('update:emailToResend', value)
    },
    emitKeyUp () {
      this.$emit('keyUp')
    }
  }
}
</script>
