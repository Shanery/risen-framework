<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ['code', 'autodetect', 'language'],
})
</script>

<template>
  <a-box
    class="code-block"
    border-radius="medium"
    bg-color="#011627"
    padding="small"
    overflow="auto"
  >
    <highlightjs
      v-bind="$props"
    />
  </a-box>
</template>

<style lang="stylus" scoped>
.code-block {
  max-width 100%
}

pre {
  margin 0
}
</style>
