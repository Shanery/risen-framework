import Vue from 'vue'
import App from './DocsApp.vue'
import router from './docs-router'

// Register Design System Components
import registerDesignComponents from '@/library-imports/basic-elements'
registerDesignComponents(Vue)

// Import Highlighter
import registerVueLanguage from 'highlightjs-vue'
import hljs from 'highlight.js/lib/core'
registerVueLanguage(hljs)
import { vuePlugin } from 'highlight.js'
Vue.use(vuePlugin)

/*
* Import Highlight.js theme
* Find more: https://highlightjs.org/static/demo/
*/
import 'highlight.js/styles/night-owl.css';

import CodeBlock from './components/CodeBlock.vue'
Vue.component('CodeBlock', CodeBlock)

import '@/styles/styles.styl'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
