import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// Register Design System Components
import registerDesignComponents from '@/library-imports/basic-elements'
registerDesignComponents(Vue)

import '@/styles/styles.styl'

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
