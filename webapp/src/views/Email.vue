<template>
  <v-layout row>
    <v-flex xs12 sm12>
      <v-toolbar app
      color="cyan" dark
      style="height:70px;">
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
      <v-card>
        <v-card-title :class="type">
          {{error}}
        </v-card-title>
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
                <v-btn color="cyan darken-1" @click="send">send</v-btn>
                <v-btn color="cyan darken-1" @click="back">back</v-btn>
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
        },
        error: '',
        type: '',
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
        if(this.message.subject === '' || this.message.body === '') {
          this.type = 'warning'
          this.error = 'Please supply both subject and body'
          return
        }
        this.message.email = this.user.email
        let result = await EmailService.postMail(this.message)
        if (result.data.success){
          this.type = 'success'
          this.error = 'Your message has been sent successfully'
        }else{
          this.type = 'warning'
          this.error = 'Cannot send email. Something has gone wrong!'
        }
      },
      back () {
          this.$router.push('/')
      }
    }
  }
</script>