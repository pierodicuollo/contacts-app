import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contacts: []
  },
  mutations: {
    DELETE_CONTACT (state, contact) {
      state.contacts.splice(state.contacts.findIndex(x => x._id == contact._id), 1)
    },
    SET_CONTACTS (state, contacts) {
      state.contacts = contacts
    },
    ADD_CONTACT (state, contactsObject) {
      state.contacts.push(contactsObject)
    },
    UPDATE_CONTACT (state, contactsObject) {
      state.contacts[state.contacts.findIndex(x => x._id == contactsObject._id)] = contactsObject
    }
  },
  actions: {
    loadContacts ({ commit }) {
      axios
        .get('http://localhost:3000/contacts')
        .then(r => r.data)
        .then(contacts => {
          commit('SET_CONTACTS', contacts)
        })
    },
    removeContact({ commit }, contact) {
      let formdata = new URLSearchParams()
      formdata.append('id', contact._id)
      axios.post('http://localhost:3000/deletecontact', formdata,  {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }}).then(_ => {
        commit('DELETE_CONTACT', contact)
      })
    },
    addContact ({ commit, state }, contact) {
      const newContact = contact
      let formdata = new URLSearchParams()
      formdata.append('first_name', contact.first_name)
      formdata.append('last_name', contact.last_name)
      formdata.append('phone', contact.phone)
      formdata.append('email', contact.email)
      formdata.append('notes', contact.notes)
      axios.post('http://localhost:3000/contacts', formdata,  {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }}).then(_ => {
        commit('ADD_CONTACT', newContact)
      })
    },
    updateContact ({ commit }, contact) {
      const newContact = contact
      let formdata = new URLSearchParams()
      formdata.append('id', contact._id)
      formdata.append('first_name', contact.first_name)
      formdata.append('last_name', contact.last_name)
      formdata.append('phone', contact.phone)
      formdata.append('email', contact.email)
      formdata.append('notes', contact.notes)
      axios.post('http://localhost:3000/updatecontact', formdata,  {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }}).then(_ => {
        commit('UPDATE_CONTACT', newContact)
      })
    }
  },
  getters: {
    newContact: state => state.newContact,
    contacts: state => state.contacts
  }
})
