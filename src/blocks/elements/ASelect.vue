<script lang="ts">
import Vue from 'vue'

import { cssVarProps, modifierProps } from '@/library-imports/css-variable-props'

import BaseElement from '../BaseElement.vue'

export default Vue.extend({
  extends: BaseElement,
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  mixins: [
    cssVarProps({
    }),
    modifierProps({
      size: {
        type: 'string',
        default: 'medium',
      },
    }),
  ],
  props: {
    options: {
      type: Array,
      required: true,
    },
    textKey: {
      type: String,
      default: 'text',
    },
    valueKey: {
      type: String,
      default: 'value',
    },
    placeholder: {
      type: String,
      required: false,
    },
    modelValue: {
      type: [String, Object],
    },
    emitOption: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    modelValueOption () {
      const modelValue = this.modelValue

      return this.getOption(modelValue)
    },
  },
  methods: {
    getOption (value) {
      if (!value) return

      const valueKey = this.valueKey

      return this.options.find((option) => {
        // Use Double equals because sometimes id is string and sometimes number
        // eslint-disable-next-line eqeqeq
        return option === value || option[valueKey] == value
      })
    },
    getText (option) {
      if (option === undefined || option === null) {

      } else if (typeof option === 'number') {
        return String(option)
      } else if (typeof option === 'string') {
        return option
      } else {
        return option[this.textKey]
      }
    },
    getValue (option) {
      if (option === undefined || option === null) {

      } else if (typeof option === 'number') {
        return String(option)
      } else if (typeof option === 'string') {
        return option
      } else {
        return option[this.valueKey]
      }
    },
  },
})
</script>

<template>
  <div class="select-container">
    <select
      class="native-select"
      :value="getValue(modelValue)"
      @input="$emit('update:modelValue', emitOption ? getOption($event.target.value) : $event.target.value)"
      v-bind="$attrs"
    >
      <option
        disabled
      >
        {{ placeholder }}
      </option>

      <option
        v-for="(option, index) in options"
        :value="getValue(option)"
        :key="index"
      >
        {{ option[textKey] || option }}
      </option>
    </select>

    <layout-row
      class="select"
      v-bind="elementBindings"
      justify="space-between"
      spacing="xsmall"
    >
      <slot>
        <a-text tag="span">
          {{ getText(modelValueOption) || placeholder }}
        </a-text>
      </slot>

      <a-icon icon="angle-down"/>
    </layout-row>
  </div>
</template>

<style lang="stylus" scoped>
.select-container {
  position relative

  >>> .start {
    margin-right 0.5em
  }
  >>> .end {
    margin-left 0.5em
  }

  cursor pointer

}
.select {
  pointer-events none

  position relative
  padding 0.25em 0.5em;
  border-radius 5px
  color black
  // overlay()

  &.type-default {
    background-color white
  }

  &.type-dark {
    background-color $grey-70
    border 1px solid $grey-30
    color white
  }

  &.is-size-small {
    font-size 12px
  }
}

select {
  outline none
  appearance none
  border none
  width 100%
}
.native-select {
  position absolute
  overlay()
  cursor pointer
  background-color transparent
  width 100%
}
</style>
