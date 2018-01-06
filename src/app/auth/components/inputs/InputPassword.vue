<template>
  <q-field icon="lock">
    <q-input
      type="password"
      float-label="Senha"
      :value="this.password" 
      @input="this.emitValue"
      clearable
      @keyup.enter="emitKeyUp" 
    />
  </q-field>
</template>

<script>
import { QField, QInput } from 'quasar'

export default {
  name: 'inputPassword',

  props: ['password'],

  components: { QField, QInput },

  methods: {
    emitValue (value) {
      this.$emit('update:password', value)
    },
    emitKeyUp () {
      this.$emit('keyUp')
    }
  }
}
</script>
