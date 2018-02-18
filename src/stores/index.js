import { createLogger } from 'redux-logger'
// import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from '~/reducers'

const logger = createLogger()

export default () => {
  const middlewares = []
  if (process.env.NODE_ENV !== 'production') middlewares.push(logger)
  const store = compose(applyMiddleware(...middlewares))(createStore)(reducer)
  return store
}
