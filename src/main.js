import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from '@/store'
import moment from 'moment'
import axios from 'axios'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
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
