import cookies from 'js-cookie'

const apiUrl = 'http://localhost:8080/api/';
const stripePubKey = 'pk_test_1A7DT5FrpPtXH3gDJHgf5Epk';


export const getApiUrl = function () {
  return apiUrl;
}

export const getApiToken = function () {
  return cookies.get('bit_bid_key');
}

export const getStripePubKey = function () {
  return  stripePubKey;
}
