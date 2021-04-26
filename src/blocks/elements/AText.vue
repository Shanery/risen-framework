<script lang="ts">
import Vue from 'vue'

import { cssVarProps, modifierProps } from '@/library-imports/css-variable-props'
import BaseElement from '../BaseElement.vue'

export default Vue.extend({
  extends: BaseElement,
  props: {
    tag: {
      type: String,
      default: 'p',
    },
  },
  mixins: [
    cssVarProps({
      size: {
        constantKey: 'fontSize',
        default: 'p',
      },
      align: {},
      weight: {
        constantKey: 'fontWeight',
      },
      family: {
        constantKey: 'fontFamily',
        default: 'text',
      },
      fontStyle: {},
      letterSpacing: {},
      lineHeight: {},
      color: {},
      transform: {
        constantKey: 'textTransform',
      },
      whiteSpace: {},
    }),
  ],
})
</script>

<template>
  <component
    class="atom-text"
    :is="tag"
    v-bind="elementBindings"
  >
    <slot />
  </component>
</template>

<style lang="stylus" scoped>
.atom-text {
  margin 0
  breakpointValues(font-size, size)
  breakpointValues(font-weight, weight)
  breakpointValues(font-family, family)
  breakpointValues(font-style, fontStyle)
  breakpointValues(letter-spacing, letterSpacing)
  breakpointValues(line-height, lineHeight)
  breakpointValues(color, color)

  breakpointValues(text-transform, transform)
  breakpointValues(text-align, align, false)
  breakpointValues(white-space, whiteSpace)
}
</style>
