<script lang="ts">
import Vue from 'vue'

import { cssVarProps, modifierProps } from '@/library-imports/css-variable-props'
import BaseElement from '../BaseElement.vue'

export default Vue.extend({
  extends: BaseElement,
  props: {
    ordered: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [
    cssVarProps({
      listStyle: {
        default: 'initial',
      },
      spacing: {
        default: 'small',
      },
      padding: {
        constantKey: 'spacing',
        default: '0 0 0 1.5em',
      },
    }),
  ],
})
</script>

<template>
  <component
    :is="ordered ? 'ol' : 'ul'"
    class="atom-list"
    v-bind="elementBindings"
  >
    <layout-flexbox
      direction="column"
      align="stretch"
      :spacing="spacing"
    >
      <slot />
    </layout-flexbox>
  </component>
</template>

<style lang="stylus" scoped>
.atom-list {
  margin 0
  breakpointValues(padding, padding)
  breakpointValues(list-style-type, listStyle)
}
</style>
