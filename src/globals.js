import cookies from 'js-cookie'

const apiUrl = 'http://localhost:8080/api/';


export const getApiUrl = function () {
  return apiUrl;
}

export const getApiToken = function () {
  return cookies.get('bit_bid_key');
}
