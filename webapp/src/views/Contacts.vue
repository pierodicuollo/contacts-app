<template>
  <v-layout row>
    <v-flex xs12 sm12>
      <v-card v-if="showList">
        <v-list subheader>
          <v-list-tile
            v-for="item in items"
            :key="item._id"
            avatar
            @click="showItem(item._id)"
          >

            <v-list-tile-content>
              <v-list-tile-title v-html="item.first_name + ' ' + item.last_name"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-icon>email</v-icon>
            </v-list-tile-action>
            <v-list-tile-action>
              <v-icon>dialpad</v-icon>
            </v-list-tile-action>
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
                    <v-text-field label="Phone" type="number" v-model="currentItem.number" required></v-text-field>
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

              <v-btn @click="deleteItem(currentItem._id)" icon>
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

          <v-list-tile @click="">
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
        currentItem: '',
        dialog: false,
        items: [
          { first_name: 'Contacts', last_name: 'Loading', email:'michele@gmail.com', phone_number:'+123456789', notes:'Some notes', _id:"123"}
        ]
      }
    },
    created () {
      this.FetchContacts()
    },
    methods: {
      async FetchContacts() {
        let result = await ContactsService.fetchContacts()
        this.items = result.data
        this.$forceUpdate()
      },
      async DeleteContact(id) {
        let result = await ContactsService.DeleteContact(id)
        if(result.data === 'deleted')
        {
          this.items.splice(this.items.findIndex(x => x._id == id), 1)
          this.showList = true
        }
      },
      async UpdateContact() {
        let result = await ContactsService.UpdateContact(this.currentItem)
        if(result.data === 'updated')
        {
          this.dialog = false
        }
      },
      showItem(id){
        this.currentItem = this.items.find(x => x._id == id)
        this.showList = false
      },
      deleteItem(id){
        this.DeleteContact(id)
      },
      updateItem(){
        this.UpdateContact()
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
