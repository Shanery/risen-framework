<template>
  <v-stack class="body"
    spacing="medium"
  >
    <a-heading level="1">
      Risen Framework
    </a-heading>

    <a-text>
      The risen framework is an opinionated boilerplate for creating complex front-end applications. It makes decisions on how to handle most common task of application building, allowing you jump straight into implementing business logic. It's designed to be edited to suit your project, not used as is.
    </a-text>

    <a-heading>
      Parts of the Framework
    </a-heading>

    <a-list>
      <li>
        <a-text tag="span">
          Semantic Design System
        </a-text>
      </li>
      <li>
        <a-text tag="span">
          Responsive Semantic Getters (In Progress)
        </a-text>
      </li>
      <li>
        <a-text tag="span">
          Backend Data Resource Module System (With optional local storage mocking)
        </a-text>
      </li>
    </a-list>
  </v-stack>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Home',
});
</script>

<style lang="stylus" scoped>

</style>
