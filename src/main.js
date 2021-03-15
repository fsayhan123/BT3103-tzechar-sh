import Vue from 'vue'
import App from './App.vue'
import QuantitiyCounter from './components/QuantityCounter.vue'
import VueRouter from 'vue-router' 
import Routes from './routes.js'

Vue.config.productionTip = false
Vue.use(VueRouter) 

const myRouter = new VueRouter({
  routes: Routes,
  mode:'history',
})


Vue.config.productionTip = false
Vue.component('QuantityCounter', QuantitiyCounter)

new Vue({
  render: h => h(App),
  router: myRouter,
}).$mount('#app')
