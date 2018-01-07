<template>
  <q-field icon="lock">
    <q-input
      type="password"
      float-label="Escolha uma nova senha"
      :value="this.newPassword" 
      @input="this.emitValue"
      clearable
      @keyup.enter="emitKeyUp" 
    />
  </q-field>
</template>

<script>
import { QField, QInput } from 'quasar'

export default {
  name: 'inputNewPassword',

  props: ['newPassword'],

  components: { QField, QInput },

  methods: {
    emitValue (value) {
      this.$emit('update:newPassword', value)
    },
    emitKeyUp () {
      this.$emit('keyUp')
    }
  }
}
</script>
