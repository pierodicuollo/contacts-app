import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contacts: [],
    newContact: ''
  },
  mutations: {
    SET_CONTACTS (state, contacts) {
      state.contacts = contacts
    },
    ADD_CONTACT (state, contactsObject) {
      state.contacts.push(contactsObject)
    },
    CLEAR_NEW_CONTACT (state) {
      state.newContact = ''
    }
  },
  actions: {
    loadContacts ({ commit }) {
      axios
        .get('/contacts')
        .then(r => r.data)
        .then(contacts => {
          commit('SET_CONTACTS', contacts)
        })
    },
    addContact ({ commit, state }) {
      if (!state.newContact) {
        return
      }
      const contact = {
        title: state.newContact,
        completed: false,
        id: randomId()
      }
      axios.post('/contacts', contact).then(_ => {
        commit('ADD_CONTACT', contact)
      })
    },
    clearNewContact ({ commit }) {
      commit('CLEAR_NEW_CONTACT')
    }
  },
  getters: {
    newContact: state => state.newContact,
    contacts: state => state.contacts
  }
})
