import rootReducer from './reducers'
import { compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'


export default function configureStore() {
  const composedEnhancers = composeWithDevTools()

  const store = createStore(rootReducer, {}, composedEnhancers)

  return store
}
