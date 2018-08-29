<template>
  <v-layout row>
    <v-flex xs12 sm12>
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
            @click.native.stop="newdialog = !newdialog"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-toolbar>
    <v-layout row justify-center>
    <v-dialog v-model="newdialog" persistent max-width="500px">
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
                <v-text-field label="Phone" type="number" v-model="contact.phone" required></v-text-field>
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
          <v-btn color="blue darken-1" flat @click.native="newdialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="setNewContact">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
      <v-card v-if="showList">
        <v-list subheader>
          <v-list-tile
            v-for="item in filteredItems"
            :key="item._id"
            avatar
            @click="showItem(item._id)"
          >

            <v-list-tile-content>
              <v-list-tile-title v-html="item.first_name + ' ' + item.last_name"></v-list-tile-title>
            </v-list-tile-content>

          </v-list-tile>
        </v-list>
      </v-card>
      <v-card v-else>
        <v-dialog v-model="dialog" persistent max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Edit Contact</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md6>
                    <v-text-field label="First name" v-model="currentItem.first_name" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      label="Last name"
                      required
                      v-model="currentItem.last_name"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="Email" v-model="currentItem.email" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="Phone" type="number" v-model="currentItem.phone" required href="tel:+6494461709"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-textarea
                      label="Notes"
                      v-model="currentItem.notes"
                    ></v-textarea>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
              <v-btn color="blue darken-1" flat @click.native="updateItem">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
          <v-layout
            fill-height
          >
            <v-card-title @click="showList = true">
              <v-btn icon>
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-title class="black--text">
              <div class="display-1">{{currentItem.first_name}} {{currentItem.last_name}}</div>
            </v-card-title>
              <v-spacer></v-spacer>

              <v-btn @click="dialog = true" icon class="mr-3">
                <v-icon>edit</v-icon>
              </v-btn>

              <v-btn @click="deleteItem(currentItem)" icon>
                <v-icon>delete</v-icon>
              </v-btn>
          </v-layout>

        <v-list two-line>
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon color="indigo">phone</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{currentItem.phone}}</v-list-tile-title>
              <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile @click="mail(currentItem)">
            <v-list-tile-action>
              <v-icon color="indigo">mail</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{currentItem.email}}</v-list-tile-title>
              <v-list-tile-sub-title>Personal</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>


          <v-divider inset></v-divider>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon color="indigo">notes</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{currentItem.notes}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  import ContactsService from '../services/Contacts.js'
  export default {
    data () {
      return {
        showList: true,
        dialog: false,
        currentItem: '',
        searchText: '',
        title: 'Contacts Manager Application',
        contact: {
          first_name: '',
          last_name: '',
          phone: '',
          email: '',
          notes: ''
        },
        newdialog: false
      }
    },
    created () {
      this.$store.dispatch('loadContacts')
    },
    computed: {
      items () {
        return this.$store.getters.contacts.sort(function(a,b){
          return a.first_name.toLowerCase().localeCompare(b.first_name.toLowerCase());
        })
      },
      filteredItems () {
        let vm = this
        return this.items.filter(function(item){
          return item.first_name.includes(vm.searchText) || item.last_name.includes(vm.searchText)
        })
      }
    },
    methods: {
      showItem(id){
        this.currentItem = this.items.find(x => x._id == id)
        this.showList = false
      },
      deleteItem(contact){
        this.$store.dispatch('removeContact', contact)
        this.showList = true
      },
      updateItem(contact){
        this.$store.dispatch('updateContact', this.currentItem)
        this.dialog = false
        this.showList = true
      },
      setNewContact () {
        var newContact = new Object();
        newContact.first_name = this.contact.first_name
        newContact.last_name = this.contact.last_name
        newContact.phone = this.contact.phone
        newContact.email = this.contact.email
        newContact.notes = this.contact.notes
        this.$store.dispatch('addContact', newContact)
        this.resetNewContact()
        this.newdialog = false
      },
      resetNewContact () {
        this.contact.first_name = ''
        this.contact.last_name = ''
        this.contact.phone = ''
        this.contact.email = ''
        this.contact.notes = ''
      },
      mail (contact) {
        this.$router.push({path: '/email', query: { user: contact._id }})
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
