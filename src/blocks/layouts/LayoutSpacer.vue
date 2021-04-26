<script lang="ts">
import Vue from 'vue'

import { cssVarProps, modifierProps } from '@/library-imports/css-variable-props'
import BaseElement from '../BaseElement.vue'

export default Vue.extend({
  extends: BaseElement,
  mixins: [
    cssVarProps({
      spacing: {
        default: 'medium',
      },
    }),
  ],
})
</script>

<template>
  <div class="layout-spacer"
    v-bind="elementBindings"
  />
</template>

<style lang="stylus" scoped>
.layout-spacer {
  breakpointValues(width, spacing)
  breakpointValues(height, spacing)
}
</style>
