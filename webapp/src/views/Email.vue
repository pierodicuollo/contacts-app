<template>
  <v-layout row>
    <v-flex xs12 sm12>
      <v-toolbar app>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
      <v-card>
          <v-form>
            <v-card-title>
                <v-text-field
            :value="'Email: ' + user.email"
            disabled
            ></v-text-field>
            </v-card-title>
            <v-card-title>
            <v-text-field
            :value="'Name: ' + user.first_name + ' ' + user.last_name"
            disabled
            ></v-text-field>
            </v-card-title>
            <v-card-title>
                <v-text-field
            v-model="message.subject"
            label="Subject"
            required
            ></v-text-field>
            </v-card-title>
            <v-card-title>
                <v-text-field
            v-model="message.body"
            label="Body"
            required
            ></v-text-field>
            </v-card-title>
            <v-card-title>
                <v-btn@click="send">send</v-btn>
                <v-btn @click="back">back</v-btn>
            </v-card-title>
          </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  import EmailService from '../services/Email.js'
  export default {
    data () {
      return {
        title: 'Contacts Application',
        user: {
            first_name: '',
            last_name: '',
            email: ''
        },
        message: {
            email: '',
            subject: '',
            body: ''
        }
      }
    },
    created () {
      this.user = this.items[this.items.findIndex(x => x._id === this.$route.query.user)]
    },
    computed: {
      items () {
        return this.$store.getters.contacts
      }
    },
    methods: {
      async send () {
        this.message.email = this.user.email
        let result = await EmailService.postMail(this.message)
        if (result.data.success){
          this.$router.push('/')
        }
      },
      back () {
          this.$router.push('/')
      }
    }
  }
</script>