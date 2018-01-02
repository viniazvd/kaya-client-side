<template>
  <q-alert
    class="my-alert"
    color="negative"
    icon="warning"
    position="bottom"
    dismissible
    v-model="this.isActived"
  >
    Dado inválido
  </q-alert>
</template>

<script>
import QAlert from 'quasar'

export default {
  name: 'alert-validate',
  props: ['isActived'],
  components: { QAlert }
}
</script>

<style scoped>
.my-alert {
  margin-left: 448px;
  margin-right: 446px;
  margin-bottom: 115px;
}
</style>
