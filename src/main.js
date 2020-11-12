import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Buefy from 'buefy'
import TextareaAutosize from 'vue-textarea-autosize'
import 'buefy/dist/buefy.css'
import './assets/css/style.css'

Vue.use(TextareaAutosize)

Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
