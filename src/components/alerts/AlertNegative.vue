<template>
  <q-alert
    class="my-alert"
    color="negative"
    icon="warning"
    position="bottom"
    dismissible
    :value="this.showAlert" 
    @input="this.emitValue">
    {{ alertMessage }}
  </q-alert>
</template>

<script>
import { QAlert } from 'quasar'

export default {
  name: 'negativeAlert',

  components: { QAlert },

  props: ['showAlert', 'alertMessage'],

  methods: {
    emitValue (value) {
      this.$emit('update:showAlert', value)
    }
  }
}
</script>

<style scoped>
.my-alert {
  position: relative;
  display: flex;
  justify-content: center;
}
</style>
