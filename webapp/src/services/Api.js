//axios HTTP client integration for node.js

import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `http://localhost:3000`
  })
}
