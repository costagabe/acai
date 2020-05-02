import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://5eabd708a280ac00166576a9.mockapi.io/api/acai',
  timeout: 15000
})

export default instance
