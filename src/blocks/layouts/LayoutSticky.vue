<script>
export default {
  props: {
    fullwidth: {
      type: [Boolean, Array],
      default: true,
    },
    offset: {
      type: [Number, Array],
      default: 0,
    },
    useNative: {
      type: Boolean,
      default: false,
    },
  },
  mounted () {
    this.resizeListener = window.addEventListener('resize', this.updateSize)
    this.scrollListener = window.addEventListener('scroll', this.updateScrollPosition)

    this.$nextTick(() => {
      this.updateSize()
    })
    setTimeout(this.updateSize, 1000)
  },
  destroyed () {
    window.removeEventListener('resize', this.updateSize)
    window.removeEventListener('scroll', this.updateScrollPosition)
  },
  data () {
    return {
      // Width is set by parent container
      width: 0,
      // Height is set by internal container
      height: 100,
      // Left is set by parent container
      left: 0,
      // Top is set by Offset Prop

      isSticky: false,
    }
  },
  computed: {
    spacerStyles () {
      if (this.useNative) {
        return {
          top: `${this.currentOffset}px`,
        }
      } else {
        return {
          height: this.height + 'px',
        }
      }
    },
    stickyStyles () {
      if (this.useNative) {
        return {}
      }

      return [this.isSticky ? this.position : {}, this.fullwidth ? {
        width: '100%',
      } : {
        width: this.width +
        'px',
      }]
    },
    currentOffset () {
      return this.offset
    },
    position () {
      return {
        top: `${this.currentOffset}px`,
        left: `${this.left}px`,
      }
    },
  },
  methods: {
    updateSize () {
      this.width = this.$el.offsetWidth
      this.height = this.$refs.sticky.offsetHeight

      this.updateScrollPosition()
    },
    updateScrollPosition () {
      this.isSticky = this.$el.getBoundingClientRect().y < this.currentOffset
      this.left = this.$el.getBoundingClientRect().x
    },
  },
}
</script>

<template>
  <div class="layout-sticky-spacer"
    :class="{
      'native-sticky': useNative,
    }"
    :style="spacerStyles"
  >
    <div
      class="layout-sticky"
      :class="{
        'is-fullwidth': fullwidth,
        'is-sticky': isSticky && !useNative,
      }"
      :style="stickyStyles"
      ref="sticky"
    >
      <slot :isSticky="isSticky" />
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.layout-sticky-spacer {
  display block
  position relative
  &.native-sticky {
    position sticky
  }
}
.layout-sticky {
  z-index 1000
  position relative
  &.is-sticky {
    position fixed
  }

  &.is-fullwidth {
    width: 100%
  }

  > * {
    transition all 0.3s
  }
}
</style>
