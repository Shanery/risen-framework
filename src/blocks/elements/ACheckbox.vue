<template>
  <layout-row
    class="atom-checkbox"
    :justify="justify"
  >
    <div class="checkbox-wrapper">
      <input
        class="native-checkbox"
        type="checkbox"
        :checked="checked"

        @change="update"
      >

      <div
        class="custom-checkbox"
        :class="{'is-checked': checked}"
      >
        <slot name="checked"
          v-if="checked"
        >
          <span class="icon-check"/>
        </slot>

        <slot name="unchecked"
          v-if="checked"
        />
      </div>
    </div>

    <a-text v-if="label && label.length > 0"
      class="label"
    >
      <slot>
        {{ label }}
      </slot>
    </a-text>
  </layout-row>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'AtomCheckbox',
  inheritAttrs: false,
  model: {
    event: 'update:modelValue',
    prop: 'modelValue',
  },
  props: {
    modelValue: {
      required: false,
    },
    value: {
      type: [String, Boolean, Object],
      required: false,
      default: true,
    },
    uncheckedValue: {
      type: [String, Boolean, Object],
      required: false,
      default: false,
    },
    justify: {
      required: false,
      default: 'flex-start',
    },
    label: {
      type: String,
    },
  },
  computed: {
    checked () {
      if (Array.isArray(this.modelValue)) {
        return !!this.modelValue.find(value => this.isEqual(value, this.value))
      } else {
        return this.isEqual(this.modelValue, this.value)
      }
    },
  },
  methods: {
    update (event): void {
      if (this.checked) {
        this.$emit('update:modelValue', this.uncheckedValue)
        this.$emit('input', this.uncheckedValue)
      } else {
        this.$emit('update:modelValue', this.value)
        this.$emit('input', this.value)
      }
    },
    isEqual (valueA, valueB): boolean {
      return valueA === valueB || (valueA?.id && valueA?.id === valueB?.id)
    },
  },
})
</script>

<style lang="stylus" scoped>
.atom-checkbox {
  row(0.25em)
  .label {
    font-weight normal
  }

  // Overlay
  .checkbox-wrapper {
    position relative
    width 1.5rem
    height 1.5rem

    .native-checkbox {
      width 100%
      height 100%
      margin 0

      &:focus {
        outline none
      }

      cursor pointer
    }
    // Place on top of native
    .custom-checkbox {
      position absolute
      pointer-events none
      top 0
      left 0
      background-color #fff
      box-shadow var(--boxShadow-light)
    }

    // Focus Styling
    .native-checkbox:focus + .custom-checkbox {
      border 2px solid $color-secondary
    }
  }

  // Checkbox Styling
  .custom-checkbox {
    width 100%
    height 100%
    border-radius 2px
    border 1px solid $color-separator;

    cursor pointer
  }

  // Hover Check
  .custom-checkbox {
    position relative
  }
  .icon-check {
    // Positioning
    position absolute
    left 50%
    top 40%
    transform translate(-50%, -50%) rotate(-45deg)

    // Box Styling
    width 0.75em
    height 0.4em
    border-left 1.5px solid $grey-90
    border-bottom 1.5px solid $grey-90

    cursor pointer
  }

  // Add Transition
  .icon-check {
    opacity 0
    transition opacity 0.1s
  }
  .custom-checkbox.is-checked .icon-check{
    opacity 1
  }
}
</style>
