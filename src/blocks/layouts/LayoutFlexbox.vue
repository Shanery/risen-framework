<script lang="ts">
import Vue from 'vue'

import { cssVarProps, modifierProps } from '@/library-imports/css-variable-props'
import BaseElement from '../BaseElement.vue'

export default Vue.extend({
  extends: BaseElement,
  props: {
    tag: {
      type: String,
      default: 'div',
    },
  },
  computed: {
    directionClass () {
      return Array.isArray(this.direction)
        ? (
          this.direction.map((dir, index) => `b${index}-${dir}`)
        )
        : (
          `b0-${this.direction}`
        )
    },
  },
  mixins: [
    cssVarProps({
      direction: {
        default: 'row',
      },
      spacing: {
        default: 'xsmall',
      },
      justify: {
        default: 'flex-start',
      },
      align: {
        default: 'center',
      },
    }),
    modifierProps({
      wrap: {
        type: 'boolean',
        default: false,
      },
    }),
  ],
})
</script>

<template>
  <component class="layout-flexbox"
    :class="[directionClass, elementBindings.class]"
    :is="tag"
    v-bind="elementBindings"
  >
    <template v-for="node in $slots.default">
      <div
        class="stack-item"
        v-if="node.tag"
        :key="node.id"
      >
        <v-nodes :nodes="node"/>
      </div>
    </template>
  </component>
</template>

<style lang="stylus" scoped>
.layout-flexbox {
  display flex
  align-items center

  .stack-item > * {
    width 100%
    height 100%
  }

  breakpointValues(flex-direction, direction)
  breakpointValues(align-items, align)
  breakpointValues(justify-content, justify)

  // Column Styling
  &.b0-column > * {
    margin 0
    margin-bottom var(--spacing-0)
  }
  @media $smaller-up {
    &.b1-column > * {
      margin 0
      margin-bottom var(--spacing-1, var(--spacing-0))
    }
  }
  @media $medium-up {
    &.b2-column > * {
      margin 0
      margin-bottom var(--spacing-2, var(--spacing-1, var(--spacing-0)))
    }
  }

  // Row Styling
  &.b0-row > * {
    margin 0
    margin-right var(--spacing-0)
  }
  @media $smaller-up {
    &.b1-row  > * {
      margin 0
      margin-right var(--spacing-1, var(--spacing-0))
    }
  }
  @media $medium-up {
    &.b2-row > * {
      margin 0
      margin-right var(--spacing-2, var(--spacing-1, var(--spacing-0)))
    }
  }
  &.b0-row-reverse > * {
    margin 0
    margin-left var(--spacing-0)
  }
  @media $smaller-up {
    &.b1-row-reverse  > * {
      margin 0
      margin-left var(--spacing-1, var(--spacing-0))
    }
  }
  @media $medium-up {
    &.b2-row-reverse > * {
      margin 0
      margin-left var(--spacing-2, var(--spacing-1, var(--spacing-0)))
    }
  }

  &:not(.is-wrap) > :last-child {
    margin-right 0 !important
    margin-bottom 0 !important
  }

  &.is-wrap {
    flex-wrap wrap
    margin-bottom var(--spacing-2, var(--spacing-1, var(--spacing-0)))

    // Column Styling
    &.b0-column > * {
      margin-right var(--spacing-0)
    }
    @media $smaller-up {
      &.b1-column > * {
        margin-right var(--spacing-1, var(--spacing-0))
      }
    }
    @media $medium-up {
      &.b2-column > * {
        margin-right var(--spacing-2, var(--spacing-1, var(--spacing-0)))
      }
    }

    // Row Styling
    &.b0-row > * {
      margin-bottom var(--spacing-0)
    }
    @media $smaller-up {
      &.b1-row  > * {
        margin-bottom var(--spacing-1, var(--spacing-0))
      }
    }
    @media $medium-up {
      &.b2-row > * {
        margin-bottom var(--spacing-2, var(--spacing-1, var(--spacing-0)))
      }
    }
    &.b0-row-reverse > * {
      margin-bottom var(--spacing-0)
    }
    @media $smaller-up {
      &.b1-row-reverse  > * {
        margin-bottom var(--spacing-1, var(--spacing-0))
      }
    }
    @media $medium-up {
      &.b2-row-reverse > * {
        margin-bottom var(--spacing-2, var(--spacing-1, var(--spacing-0)))
      }
    }
  }

}
</style>
