<script lang="ts">
import Vue from 'vue'

import { cssVarProps, modifierProps } from '@/library-imports/css-variable-props'
import BaseElement from '../BaseElement.vue'

export default Vue.extend({
  extends: BaseElement,
  props: {
    icon: {
      type: String,
      default: 'question-circle',
    },
  },
  mixins: [
    cssVarProps({
      size: {
        constantKey: 'iconSize',
        default: 'medium',
      },
    }),
    modifierProps({

    }),
  ],
})
</script>

<template>
  <span
    class="atom-icon"
    v-bind="elementBindings"
  >
    <slot>
      <fa-icon :icon="icon" />
    </slot>
  </span>
</template>

<style lang="stylus" scoped>
.atom-icon {
  width 1rem
  height 1rem
  flex-shrink 0

  display grid
  align-content center

  breakpointValues(width, size)
  breakpointValues(height, size)

  > * {
    width 100%
    height 100%
  }

}
</style>
