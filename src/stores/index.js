import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import history from '~/utils/history'
import reducer from '~/reducers'
import rootSaga from '~/sagas'

const logger = createLogger()

const createMyStore = () => {
  const middlewares = []
  const sagaMiddleware = createSagaMiddleware()
  if (process.env.NODE_ENV !== 'production') middlewares.push(logger)
  middlewares.push(sagaMiddleware)
  middlewares.push(routerMiddleware(history))
  const store = compose(applyMiddleware(...middlewares))(createStore)(reducer)
  sagaMiddleware.run(rootSaga)
  return store
}

export default createMyStore()
