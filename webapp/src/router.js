import Vue from 'vue'
import Router from 'vue-router'
import Contacts from './views/Contacts.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Contacts
    }
  ]
})
