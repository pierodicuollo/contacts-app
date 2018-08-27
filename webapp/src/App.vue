<template>
  <v-app>
    <v-toolbar
      app
    >
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchText"
        light solo placeholder="Search..." >
      </v-text-field>
      <v-btn
            fab
            small
            @click.native.stop="dialog = !dialog"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
      <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">New Contact</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field label="First name" v-model="contact.first_name" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  label="Last name"
                  required
                  v-model="contact.last_name"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email" v-model="contact.email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Phone" type="number" v-model="contact.number" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-textarea
                  label="Notes"
                  v-model="contact.notes"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="savenew">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
    </v-content>
  </v-app>
</template>

<script>
import ContactsService from './services/Contacts.js';
export default {
  name: 'App',
  data () {
    return {
      contact: {
        first_name: '',
        last_name: '',
        number: '',
        email: '',
        notes: ''
      },
      title: 'Contacts Application',
      searchText: '',
      dialog: false
    }
  },
  methods: {
    savenew(){
      ContactsService.postContact(this.contact)
    }
  }
}
</script>
