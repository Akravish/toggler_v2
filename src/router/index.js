import Vue from 'vue'
import Router from 'vue-router'
import Toggler from '../modules/toggler/index.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Toggler',
      component: Toggler
    }
  ]
})
