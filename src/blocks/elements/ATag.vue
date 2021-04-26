<script lang="ts">
import Vue from 'vue'

import { cssVarProps, modifierProps } from '@/library-imports/css-variable-props'
import BaseElement from '../BaseElement.vue'
import { mapActions } from 'vuex'

const tagVariants = {
  default: {
    colorA: 'white',
    colorB: 'green-60',
    colorC: 'white',
    colorD: 'green-80',

    border: 'none',
    borderRadius: '5px',
  },
  neutral: {
    colorA: 'grey-30',
    colorB: 'grey-70',
    colorC: 'grey-50',
    colorD: 'grey-70',

    border: '1px solid grey-30',
    borderRadius: '5px',
  },
}

export default Vue.extend({
  extends: BaseElement,
  mixins: [
    cssVarProps({
      align: {},
      border: {
        constantKey: 'color',
      },
      borderRadius: {
        constantKey: 'borderRadius',
      },
      colorA: {
        constantKey: 'color',
      },
      colorB: {
        constantKey: 'color',
      },
      colorC: {
        constantKey: 'color',
      },
      colorD: {
        constantKey: 'color',
      },
    }),
    modifierProps({
      size: {
        type: 'string',
        default: 'small',
      },
      fullwidth: {
        type: 'boolean',
        default: false,
      },
    }),
  ],
  computed: {
    variants () {
      return tagVariants
    },
  },
  methods: {
  },
})
</script>

<template>
  <span
    class="tag"
    :class="[{'has-addons': $slots['tag-action']}, elementBindings.class]"
    v-bind="elementBindings"
    v-on="$listeners"
  >
    <div class="tag-content">
      <slot />
    </div>
    <slot name="tag-action"
      v-if="$slots['tag-action']"
    />
  </span>
</template>

<style lang="stylus" scoped>
.tag {
  display inline-flex
  align-items center

  breakpointValues(border, border)
  breakpointValues(border-radius, borderRadius)

  font-size 1rem

  transition color 0.3s, background-color 0.3s

  cursor pointer

  &.type-default {
    breakpointValues(border, border)
    breakpointValues(border-radius, borderRadius)

    breakpointValues(color, colorA)
    breakpointValues(background-color, colorB)

    transition filter 0.3s

    &:hover {
      breakpointValues(color, colorC)
      breakpointValues(background-color, colorD)

      filter brightness(0.8)
    }
  }

  &.type-neutral {
    breakpointValues(border, border)
    breakpointValues(border-radius, borderRadius)

    breakpointValues(color, colorA)
    breakpointValues(background-color, colorB)
  }

  &.type-transparent {

    breakpointValues(color, colorB)
    background-color transparent

  }

  &.is-size-xsmall {
    .tag-content {
      padding 4px 4px
    }
    font-size 12px
  }
  &.is-size-small {
    .tag-content {
      padding 5px 10px
    }
    font-size 12px
  }

  &.is-size-medium {
    .tag-content {
      padding: 0.5em 1em;
    }
  }

  &.is-fullwidth {
    width: 100%;
  }

  &.has-addons {

  }
}
</style>
