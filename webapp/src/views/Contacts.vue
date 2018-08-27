<template>
  <v-layout row>
    <v-flex xs12 sm12>
      <v-card v-if="showList">
        <v-list subheader>
          <v-list-tile
            v-for="item in items"
            :key="item.phone_number"
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
          <v-layout
            fill-height
          >
            <v-card-title>
              <v-btn icon>
                <v-icon @click="showList = true">chevron_left</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-title class="black--text">
              <div class="display-1">{{currentItem.first_name}} {{currentItem.last_name}}</div>
            </v-card-title>
              <v-spacer></v-spacer>

              <v-btn icon class="mr-3">
                <v-icon>edit</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon @click="deleteItem(currentItem._id)">delete</v-icon>
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
        items: [
          { first_name: 'Jason Oner', last_name: 'Michelle', email:'michele@gmail.com', phone_number:'+123456789', notes:'Some notes'},
          { first_name: 'Jason Oner', last_name: 'Michelle', email:'michele@gmail.com', phone_number:'+123456789', notes:'Some notes'},
          { first_name: 'Jason Oner', last_name: 'Michelle', email:'michele@gmail.com', phone_number:'+123456789', notes:'Some notes'},
          { first_name: 'Jason Oner', last_name: 'Michelle', email:'michele@gmail.com', phone_number:'+123456789', notes:'Some notes'},
          { first_name: 'Jason Oner', last_name: 'Michelle', email:'michele@gmail.com', phone_number:'+123456789', notes:'Some notes'},
          { first_name: 'Jason Oner', last_name: 'Michelle', email:'michele@gmail.com', phone_number:'+123456789', notes:'Some notes'},
          { first_name: 'Jason Oner', last_name: 'Michelle', email:'michele@gmail.com', phone_number:'+123456789', notes:'Some notes'},
          { first_name: 'Jason Oner', last_name: 'Michelle', email:'michele@gmail.com', phone_number:'+123456789', notes:'Some notes'},
          { first_name: 'Jason Oner', last_name: 'Michelle', email:'michele@gmail.com', phone_number:'+123456789', notes:'Some notes'},
          { first_name: 'Jason Oner', last_name: 'Michelle', email:'michele@gmail.com', phone_number:'+123456789', notes:'Some notes'},
          { first_name: 'Jason Oner', last_name: 'Michelle', email:'michele@gmail.com', phone_number:'+123456789', notes:'Some notes'},
          { first_name: 'Jason Oner', last_name: 'Michelle', email:'michele@gmail.com', phone_number:'+123456789', notes:'Some notes'},
          { first_name: 'Jason Oner', last_name: 'Michelle', email:'michele@gmail.com', phone_number:'+123456789', notes:'Some notes'},
          { first_name: 'Jason Oner', last_name: 'Michelle', email:'michele@gmail.com', phone_number:'+123456789', notes:'Some notes'},
          { first_name: 'Jason Oner', last_name: 'Michelle', email:'michele@gmail.com', phone_number:'+123456789', notes:'Some notes'},
          { first_name: 'Jason Oner', last_name: 'Michelle', email:'michele@gmail.com', phone_number:'+123456789', notes:'Some notes'},
          { first_name: 'Jason Oner', last_name: 'Michelle', email:'michele@gmail.com', phone_number:'+123456789', notes:'Some notes'},
          { first_name: 'Jason Oner', last_name: 'Michelle', email:'michele@gmail.com', phone_number:'+123456789', notes:'Some notes'},
          { first_name: 'Jason Oner', last_name: 'Michelle', email:'michele@gmail.com', phone_number:'+123456789', notes:'Some notes'},
          { first_name: 'Jason Oner', last_name: 'Michelle', email:'michele@gmail.com', phone_number:'+123456789', notes:'Some notes'}
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
      showItem(id){
        this.currentItem = this.items.find(x => x._id == id)
        this.showList = false
      },
      deleteItem(id){
        this.DeleteContact(id)
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
