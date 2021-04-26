<template>
  <div 
    class="layout-columns"
    :style="cssVars"
  >
    <div class="columns">
      <slot />
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.layout-columns > .columns {
  columns() // _layout.styl

  align-items var(--column-align)

  flex-wrap var(--column-wrap)

  flex-direction var(--column-direction)

  max-width calc(100% + var(--column-spacing))
  // overflow auto

  > * {
    padding var(--column-padding) // Fallback to _layout.styl
    margin-right var(--column-spacing)
    margin-bottom var(--column-spacing)
    flex 1 0 1px
  }

  > .is-fullwidth {
    max-width 100%
    max-width calc(100% - var(--column-spacing))
    flex-basis 100%
  }
  > .is-halfwidth {
    max-width 50%
    max-width calc(50% - var(--column-spacing))
    flex-basis 50%
  }
  > .is-one-third {
    max-width 33.33%
    max-width calc(33.33% - var(--column-spacing))
    flex-basis 33.33%
  }
  > .is-two-thirds {
    max-width 66.66%
    max-width calc(66.66% - var(--column-spacing))
    flex-basis 66.66%
  }
  > .is-one-quarter {
    max-width 25%
    max-width calc(25% - var(--column-spacing))
    flex-basis 25%
  }
  > .is-three-quarters {
    max-width 75%
    max-width calc(75% - var(--column-spacing))
    flex-basis 75%
  }
  > .is-one-fifth {
    max-width 20%
    max-width calc(20% - var(--column-spacing))
    flex-basis 20%
  }
  > .is-two-fifths {
    max-width 40%
    max-width calc(40% - var(--column-spacing))
    flex-basis 40%
  }
  > .is-three-fifths {
    max-width 60%
    max-width calc(60% - var(--column-spacing))
    flex-basis 60%
  }
  > .is-four-fifths {
    max-width 80%
    max-width calc(80% - var(--column-spacing))
    flex-basis 80%
  }
  > .is-fifteen-percent {
    max-width 15%
    max-width calc(15% - var(--column-spacing))
    flex-basis 15%
  }
}

@css {
  .layout-columns > .columns {
    margin-right: calc(0px - var(--column-spacing));
    margin-bottom: calc(0px - var(--column-spacing));
  }
}
