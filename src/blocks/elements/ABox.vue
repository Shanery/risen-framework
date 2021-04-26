<script lang="ts">
import Vue from 'vue'

import { cssVarProps, modifierProps } from '@/library-imports/css-variable-props'
import BaseElement from '../BaseElement.vue'

const boxVariants = {
  default: {

  },
}

export default Vue.extend({
  extends: BaseElement,
  props: {
    tag: {
      type: String,
      default: 'div',
    },
  },
  mixins: [
    cssVarProps({
      position: {
        default: 'relative',
      },
      padding: {
        constantKey: 'spacing',
      },

      width: { constantKey: 'spacing' },
      height: { constantKey: 'spacing' },
      maxWidth: { constantKey: 'spacing' },
      maxHeight: { constantKey: 'spacing' },

      borderRadius: {},
      border: {
        constantKey: 'color',
      },
      borderTop: {
        constantKey: 'color',
        overwrite: false,
      },
      borderRight: {
        constantKey: 'color',
        overwrite: false,
      },
      borderBottom: {
        constantKey: 'color',
        overwrite: false,
      },
      borderLeft: {
        constantKey: 'color',
        overwrite: false,
      },

      overflow: {
        default: 'visible',
      },

      // Colors
      color: {
        constantKey: 'color',
      },
      bgColor: {
        constantKey: 'color',
      },

      align: {},
      boxShadow: {},
    }),
  ],
  computed: {
    variants () {
      return boxVariants
    },
  },

})
</script>

<template>
  <component
    class="atom-box"
    :is="tag"
    v-bind="elementBindings"
  >
    <slot />
  </component>
</template>

<style lang="stylus" scoped>
.atom-box {
  breakpointValues(position, position)

  breakpointValues(padding, padding)

  breakpointValues(width, width)
  breakpointValues(height, height)
  breakpointValues(max-width, maxWidth)
  breakpointValues(max-height, maxHeight)

  breakpointValues(box-shadow, boxShadow)

  breakpointValues(border-radius, borderRadius)
  breakpointValues(border, border)

  --borderTop-0 var(--border-0)
  --borderTop-1 var(--border-1)
  --borderTop-2 var(--border-2)

  --borderRight-0 var(--border-0)
  --borderRight-1 var(--border-1)
  --borderRight-2 var(--border-2)

  --borderBottom-0 var(--border-0)
  --borderBottom-1 var(--border-1)
  --borderBottom-2 var(--border-2)

  --borderLeft-0 var(--border-0)
  --borderLeft-1 var(--border-1)
  --borderLeft-2 var(--border-2)

  breakpointValues(border-top, borderTop, false)
  breakpointValues(border-right, borderRight, false)
  breakpointValues(border-bottom, borderBottom, false)
  breakpointValues(border-left, borderLeft, false)

  breakpointValues(text-align, align)

  // Colors
  breakpointValues(color, color)
  breakpointValues(background-color, bgColor)
  breakpointValues(overflow, overflow)
}
</style>
