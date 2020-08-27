import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)

Vue.filter('dataFormart', function (value) {
  let dt = new Date(value)
  const yyyy = dt.getFullYear();
  const mm = (dt.getMonth() + 1 + '').padStart(2, '0')
  const dd = (dt.getDate() + '').padStart(2, '0')

  // const hh = (dt.getHours() + '').padStart(2, '0')
  // const mi = (dt.getMinutes() + '').padStart(2, '0')
  // const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${yyyy}-${mm}-${dd}  `
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



