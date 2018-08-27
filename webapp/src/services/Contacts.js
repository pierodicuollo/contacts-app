import Api from '@/services/Api'

export default {
  fetchContacts () {
    return Api().get('contacts')
  },
  postContact (form) {
      return Api().post('contacts', {form})
  }
}
