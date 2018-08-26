import Vue from 'vue'
import Router from 'vue-router'
import Contact from './views/Contact.vue'
import Contacts from './views/Contacts.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Contacts
    },
    {
      path: '/',
      name: 'contact',
      component: Contact
    }
  ]
})
