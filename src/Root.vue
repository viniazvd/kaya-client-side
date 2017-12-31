<template>
  <!-- Don't drop "q-root" class -->
  <div id="q-root">
    <Menu></Menu>
    <router-view />
  </div>
</template>

<script>
import Menu from './components/navbar/Main'

export default {
  name: 'root',

  components: { Menu }
}
</script>
