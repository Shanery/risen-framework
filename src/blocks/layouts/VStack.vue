<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ['tag', 'row', 'spacing', 'justify', 'align'],
})
</script>

<template>
  <layout-flexbox
    direction="column"
    v-bind="$props"

    align="stretch"
  >
    <slot />
  </layout-flexbox>
</template>

<style scoped>

</style>
