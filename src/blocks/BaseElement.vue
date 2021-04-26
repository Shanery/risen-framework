<script lang="ts">
import Vue from 'vue'

import constants from './constants'
import { Constructor } from 'vue/types/options'

const findAndReplaceConstants = (input, semanticConstants) => {
  if (!input) return

  const parts = input.split(' ')
  if (!semanticConstants) {
    return input
  } else if (parts.length === 1) return semanticConstants[input] || input

  return parts.map((part: string) => {
    return semanticConstants[part] || part
  }).join(' ')
}

export default {
  props: {
    variant: {
      type: String,
      default: 'default',
    },
  },
  computed: {
    constants () {
      return constants
    },
    variants () {
      return {}
    },

    cssVars () {
      const cssVars = {}

      const cssVarProps: {
        [propName: string]: {
          constantKey: string;
          default: string | string[];
          usesComputed: boolean;
          overwrite: boolean;
        };
      } = this.cssVarProps

      const variant = this.variants[this.variant]

      Object.entries(cssVarProps).forEach(([cssVarName, { constantKey, usesComputed, overwrite }]) => {
        const propValue = this[`${usesComputed ? '_' : ''}${cssVarName}`] || (variant && variant[cssVarName])

        this.propToVar(cssVarName, propValue, constantKey, cssVars, overwrite)
      })

      return cssVars
    },
    modifierClasses (): string | string[] {
      if (!this.modifierProps) return ''

      return Object.entries(this.modifierProps).map(([prop, { type = 'string' }]: [
          string,
          { type: string },
        ]) => {
        const propValue = this[prop]

        if (!propValue) return ''

        let modifier = ''

        if (type === 'boolean') {
          modifier = `is-${prop}`
        } else if (type === 'string') {
          modifier = `is-${prop}-${propValue}`
        }

        return modifier
      })
    },
    elementBindings () {
      return {
        class: [
          `type-${this.variant}`,
          this.modifierClasses,
        ],
        style: this.cssVars,
      }
    },
  },
  methods: {
    propToVar (
      cssVarName: string,
      propValue: string,
      constantKey = '',
      cssVars = {},
      overwrite = true,
    ) {
      const rConst = this.rConst
      if (Array.isArray(propValue)) {
        propValue.forEach((breakpointValue, breakpointIndex) => {
          cssVars[`--${cssVarName}-${breakpointIndex}`] = rConst(breakpointValue, constantKey || cssVarName)
        })
      } else {
        // Default Breakpoint index is 0;
        const override = overwrite ? 'invalid' : ''
        const value = rConst(propValue, constantKey || cssVarName) || override

        if (value) {
          cssVars[`--${cssVarName}-0`] = value
        }
      }

      return cssVars
    },
    rConst (inputs, constantKey) {
      const constants = this.constants
      return inputs && Array.isArray(inputs)
        ? inputs.map(value =>
          findAndReplaceConstants(value, constants[constantKey]))
        : findAndReplaceConstants(inputs, constants[constantKey])

      // const constants = this.constants;
      // return Array.isArray(inputs) ?
      //   inputs.map(value =>
      //   findAndReplaceConstants(value, constants[constantKey] || {})) :
      //   findAndReplaceConstants(inputs, constants[constantKey] || {})
    },
  },
}
</script>

<style scoped>

</style>
