<template>
  <q-input
    :type="this.propType"
    :float-label="this.nameLabel"
    :value="this.prop" 
    @input="this.emitValue"
    clearable
    @keyup.enter="emitKeyUp"
  />
</template>

<script>
import { QInput } from 'quasar'

export default {
  name: 'myInput',

  props: {
    prop: {
      type: [String, Object],
      required: true,
      default: function () {
        return this.prop.trim()
      }
    },
    propType: {
      type: String,
      required: false,
      default: 'text'
    },
    nameLabel: {
      type: String,
      required: true
    }
  },

  components: { QInput },

  methods: {
    emitValue (value) {
      this.$emit('update:prop', value)
    },
    emitKeyUp () {
      this.$emit('keyUp')
    }
  }
}
</script>
