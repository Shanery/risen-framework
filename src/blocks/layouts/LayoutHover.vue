<script lang="ts">
import Vue from 'vue'

import { cssVarProps, modifierProps } from '@/library-imports/css-variable-props'
import BaseElement from '../BaseElement.vue'

export default Vue.extend({
  extends: BaseElement,
  mixins: [
    cssVarProps({
      position: {
        default: 'absolute',
      },

      top: {},
      right: {},
      bottom: {},
      left: {},

      width: {},
      height: {},
    }),
  ],
  props: {
    align: {
      type: String,
    },
  },
  computed: {
    alignmentStyles () {
      if (!this.align) return {}
      const align = this.rProp(this.align)

      const hasCenter = align.match(/center/i)
      const hasMiddle = align.match(/middle/i)

      const styles: {
        [property: string]: string;
      } = {
        transform: `translate(${
          hasCenter ? '-50%' : '0'
        }, ${
          hasMiddle ? '-50%' : '0'
        })`,
      }

      if (hasCenter) {
        styles.left = '50%'
      }

      if (hasMiddle) {
        styles.top = '50%'
      }

      return styles
    },
  },
})
</script>

<template>
  <div class="layout-hover"
    v-bind="elementBindings"
  >
    <slot />
  </div>
</template>

<style lang="stylus" scoped>
.layout-hover {
  // position absolute
  breakpointValues(position, position)

  breakpointValues(top, top)
  breakpointValues(right, right)
  breakpointValues(bottom, bottom)
  breakpointValues(left, left)

  breakpointValues(width, width)
  breakpointValues(height, height)

  z-index 10
}

.hover-contents {
  
  // position absolute

  z-index 10
}
</style>
