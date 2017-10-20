import {http} from './http-requests'

const checkUserIsLoggedIn = () => {
  return new Promise ((resolve, reject) => {
    http.get('logged-in-status')
      .then(() => { resolve() })
      .catch(() => { reject() })
  })
}

export default checkUserIsLoggedIn;
