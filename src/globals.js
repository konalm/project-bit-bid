import cookies from 'js-cookie'

const apiUrl = 'http://localhost:8080/api/';
const stripePubKey = 'pk_test_1A7DT5FrpPtXH3gDJHgf5Epk';
const sendgridApiKey = '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';


export const getApiUrl = function () {
  return apiUrl;
}

export const getApiToken = function () {
  return cookies.get('bit_bid_key');
}

export const getStripePubKey = function () {
  return  stripePubKey;
}

export const getSendgridApiKey = function () {
  return sendgridApiKey; 
}
