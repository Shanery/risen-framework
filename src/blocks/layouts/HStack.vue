<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ['tag', 'row', 'spacing', 'justify', 'align', 'wrap'],
})
</script>

<template>
  <layout-flexbox
    direction="row"
    v-bind="$props"
  >
    <slot />
  </layout-flexbox>
</template>

<style scoped>

</style>
