<script lang="ts">
import Vue from 'vue'

import { cssVarProps, modifierProps } from '@/library-imports/css-variable-props'
import BaseElement from '../BaseElement.vue'

export default Vue.extend({
  extends: BaseElement,
  props: {
    level: {
      type: [Number, String],
      default: '3',
    },
  },
  mixins: [
    cssVarProps({
      size: {
        constantKey: 'fontSize',
        usesComputed: true,
      },
      align: {},
      weight: {
        constantKey: 'fontWeight',
        default: 'heavy',
      },
      family: {
        constantKey: 'fontFamily',
        default: 'heading',
      },
      letterSpacing: {},
      lineHeight: {
        default: '1.5',
      },
      color: {},
      transform: {
        constantKey: 'textTransform',
      },
      whiteSpace: {},
    }),
  ],
  computed: {
    tag () {
      return 'h' + this.level
    },
    _size () {
      return this.size || this.level || '3'
    },
  },
})
</script>

<template>
  <div class="heading-container">
    <component
      :is="tag"
      class="atom-heading"
      v-bind="elementBindings"
    >
      <slot />
    </component>
  </div>
</template>

<style lang="stylus" scoped>

.atom-heading {
  breakpointValues(font-size, level)

  breakpointValues(font-size, size)breakpointValues(font-weight, weight)
  breakpointValues(font-family, family)
  breakpointValues(letter-spacing, letterSpacing)
  breakpointValues(line-height, lineHeight)
  breakpointValues(color, color)
  breakpointValues(text-transform, transform)
  breakpointValues(text-align, align)
  breakpointValues(white-space, whiteSpace)

  margin 0
  padding 0
  transform translateY(-0.35em)
  margin-bottom -0.8em
}
</style>
