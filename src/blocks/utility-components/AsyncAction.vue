<script lang="ts">
import Vue from 'vue'

enum AsyncState {
  Initial = 1,
  Pending,
  Fulfilled,
  Rejected,
}

export default Vue.extend({
  props: {
    action: {
      type: Function,
    },

  },
  data() {
    return {
      state: AsyncState.Initial,
      errorMessage: '',
    }
  },
  computed: {
    pending() {
      return this.state === AsyncState.Pending;
    },
    ready() {
      return !this.pending;
    },
  },
  methods: {
    async execute(params) {
      if (this.pending) return

      // Reset State
      this.state = AsyncState.Initial;
      this.errorMessage = ''
      
      if (!this.action) return

      this.state = AsyncState.Pending;
      console.log('Pending')
      try {
        await this.action(params)

        this.state = AsyncState.Fulfilled;
        console.log('Fulfilled')
      }
      catch {
        this.state = AsyncState.Rejected;
        console.log('Rejected')
      }
    },
  },
})
</script>

<template>
  <slot 
    :state="state"
    :pending="pending" 
    :ready="ready"
    :execute="execute"
  />
</template>

<style lang="stylus" scoped>

</style>
