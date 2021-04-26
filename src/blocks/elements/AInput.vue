<script lang="ts">
import Vue from 'vue'

import { cssVarProps, modifierProps } from '@/library-imports/css-variable-props'
import BaseElement from '../BaseElement.vue'
import { mapActions } from 'vuex'

import debounce from 'lodash/debounce'

export default Vue.extend({
  extends: BaseElement,
  inheritAttrs: false,
  mixins: [
    cssVarProps({

    }),
    modifierProps({
      size: {
        type: 'string',
        default: 'medium',
      },
      fullwidth: {
        type: 'boolean',
        default: true,
      },
    }),
  ],
  props: {
    value: {
      type: String,
    },
    boxProps: {
      type: Object,
      default: () => {
        return {
          variant: 'input',
        }
      },
    },
    emitEvent: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    blur () {
      this.$refs.input && this.$refs.input.blur()
    },
    focus () {
      this.$refs.input && this.$refs.input.focus()
    },
    update: debounce(function (input) {
      this.$emit('input', this.emitEvent ? input : input.target.value)
    }),
  },
})
</script>

<template>
  <a-box class="input-container"
    v-bind="boxProps"
  >
    <input type="text"
      class="input"
      :value="value"
      v-bind="{
        ...$attrs,
        ...elementBindings,
      }"
      v-on="{
        ...$listeners,
        input: update
      }"

      ref="input"
    >
  </a-box>
</template>

<style lang="stylus" scoped>
.input {
  display block
  width 100%
  min-width 150px

  background-color transparent

  font-size 1em
  border none

  outline none

  &.is-size-small {
    font-size 12px
  }
}
</style>
