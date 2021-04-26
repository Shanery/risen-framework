<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      links: [{
        text: 'Design System',
        route: 'design-system',
      },{
        text: 'Responsive Semantic Getters',
        route: 'responsive-getters',
      },{
        text: 'Backend Data Resource Module',
        route: 'resource-modules',
      }],
    }
  },
})
</script>

<template>
  <div id="app">
    <layout-hover
      position="fixed"
      left="0"
      top="0"

      width="300px"
      height="100%"
    >
      <a-box
        border-right="1px solid grey-30"
        padding="small"
        height="100%"
      >
        <v-stack>
          <a-text 
            weight="bold" 
            tag="span"
          >
            Risen Guide
          </a-text>

          <a-list list-style="none">
            <li v-for="link in links"
              :key="link.route"
            >
              <router-link 
                :to="link.route"
                v-text="link.text"
              />
            </li>
          </a-list>
        </v-stack>
      </a-box>
    </layout-hover>

    <a-box
      align="left"
    >
      <layout-limit limit="small">
        <router-view />
      </layout-limit>
    </a-box>
  </div>
</template>

<style lang="stylus">
html, body {
  margin 0
}

#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50

.body {
  padding-top 4rem
}

.body > .stack-item > .heading-container {
  padding-top 2.5em
  margin-top -1em
}
</style>
