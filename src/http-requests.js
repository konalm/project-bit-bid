import axios from 'axios';
import cookies from 'js-cookie'

const apiUrl = 'http://localhost:8080/api/';

export const http = axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: 'application/json',
    Authorization: `${cookies.get('bit_bid_key')}`
  }
})
