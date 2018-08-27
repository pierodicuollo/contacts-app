import Api from '@/services/Api'

export default {
  fetchContacts () {
    return Api().get('contacts')
  },
  postContact (form) {
    let formdata = new URLSearchParams()
    formdata.append('first_name', form.first_name)
    formdata.append('last_name', form.last_name)
    formdata.append('phone', form.phone)
    formdata.append('email', form.email)
    formdata.append('notes', form.notes)
    return Api().post('contacts', formdata, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }})
  },
  DeleteContact (id) {
    let formdata = new URLSearchParams()
    formdata.append('id', id)
    return Api().post('deletecontact', formdata, {
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }})
  },
  UpdateContact (form) {
    let formdata = new URLSearchParams()
    formdata.append('id', form._id)
    formdata.append('first_name', form.first_name)
    formdata.append('last_name', form.last_name)
    formdata.append('phone', form.phone)
    formdata.append('email', form.email)
    formdata.append('notes', form.notes)
    return Api().post('updatecontact', formdata, {
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }})
  }
}
