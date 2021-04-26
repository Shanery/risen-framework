<script lang="ts">
import Vue from 'vue'

import { cssVarProps, modifierProps } from '@/library-imports/css-variable-props'
import BaseElement from '../BaseElement.vue'

export default Vue.extend({
  extends: BaseElement,
  mixins: [
    cssVarProps({
      limit: {
        constantKey: 'limit',
        default: 'medium',
      },
      paddingX: {
        constantKey: 'spacing',
        default: 'medium',
      },
    }),
  ],
})
</script>

<template>
  <div 
    class="layout-limit"
    v-bind="elementBindings"
  >
    <div class="limit">
      <slot />
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.layout-limit {
  breakpointValues(padding-left, paddingX)
  breakpointValues(padding-right, paddingX)

  .limit {
    margin: 0 auto

    breakpointValues(max-width, limit, false)
  }
}
</style>
