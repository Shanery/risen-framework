<script>
export default {
  inheritAttrs: false,
  props: {
    limit: {
      type: [Array, String, Boolean],
      default: false,
    },
    boxProps: {
      type: Object,
    },
    layout: {
      type: [Array, String],
      required: true,
    },
  },
}
</script>

<template>
  <a-box
    v-bind="boxProps"
  >
    <layout-limit v-if="limit"
      :limit="typeof limit === 'boolean' ? 'large' : limit"
    >
      <component :is="layout"
        v-bind="$attrs"
      >
        <slot />
      </component>
    </layout-limit>

    <component v-else
      :is="layout"
      v-bind="$attrs"
    >
      <slot />
    </component>
  </a-box>
</template>

<style lang="stylus" scoped>

</style>
