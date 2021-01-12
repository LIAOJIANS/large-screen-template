import { StoreEnhancer, applyMiddleware, StoreEnhancerStoreCreator, createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import thunk from 'redux-thunk'

import reducer from './reducers/index'

const storeEnhancer: StoreEnhancer = composeWithDevTools(applyMiddleware(thunk))

const storeEnhancerStoreCreator: StoreEnhancerStoreCreator = storeEnhancer(createStore)

const store: Store = storeEnhancerStoreCreator(reducer)

export default store

