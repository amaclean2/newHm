import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'

import monitorReducersEnhancer from './enhancers/monitorReducer'
import ahApplication from './reducers'

const loggerMiddleware = createLogger()

export const configureStore = preloadedState => {
  const middlewares = [loggerMiddleware, thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  return createStore(ahApplication, preloadedState, composedEnhancers)
}