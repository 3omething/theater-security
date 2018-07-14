import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import AtComponents from 'at-ui'
import 'at-ui-style'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import { TableComponent, TableColumn } from 'vue-table-component'
Vue.component('table-component', TableComponent)
Vue.component('table-column', TableColumn)

Vue.use(AtComponents)
Vue.use(ElementUI)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
