<template>
  <v-app>
    <v-content>
      <router-view/>
      
    </v-content>
  </v-app>
</template>

<script>
import ContactsService from './services/Contacts.js';
export default {
  name: 'App',
  data () {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>
