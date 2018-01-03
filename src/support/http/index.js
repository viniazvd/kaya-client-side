import axios from 'axios'
// import { api } from '../enviroment/baseUrl'

export const http = axios.create({
  baseURL: 'http://localhost:3000/api/'
})
