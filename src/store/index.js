import { createStore } from 'redux'
import bitBidStore from './reducers'

let store = createStore(bitBidStore);

export default store;
