import Api from '@/services/Api'

export default {
  postMail (form) {
    let formdata = new URLSearchParams()
    formdata.append('email', form.email)
    formdata.append('subject', form.subject)
    formdata.append('body', form.body)
    return Api().post('email', formdata, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }})
  }
}
