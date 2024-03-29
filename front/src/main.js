import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from './router'
import store from '@/store'
import VueCookies from 'vue-cookies'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);
Vue.use(store);
Vue.use(VueCookies)

Vue.config.productionTip = false

Vue.directive('focus', {
  inserted: function(el){
    console.log(el)
    el.querySelector('input').focus()
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')