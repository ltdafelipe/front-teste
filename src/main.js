import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from '@/store'
import moment from 'moment'
import axios from 'axios'
import Vuelidate from 'vuelidate'
import Toast from 'vue-toastification'
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css'

Vue.use(Vuelidate)
const options = {
  // You can set your default options here
}

Vue.use(Toast, options)
Vue.config.productionTip = false

Vue.filter('data', data =>
  data ? moment(data, 'YYYY-MM-DD').format('DD/MM/YYYY') : ''
)

Vue.prototype.$http = axios

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
