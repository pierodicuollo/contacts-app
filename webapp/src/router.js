import Vue from 'vue'
import Router from 'vue-router'
import Contacts from './views/Contacts.vue'
import Email from './views/Email.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Contacts
    },
    {
      path: '/email',
      name: 'email',
      component: Email
    }
  ]
})
