//---css
import 'vuetify/dist/vuetify.min.css'
import 'normalize.css'
//---END css

import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import Vuetify from 'vuetify'


Vue.config.productionTip = true;
Vue.use(Vuetify);

let vuetify = new Vuetify({
  icons: {
    iconfont: 'md',
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
