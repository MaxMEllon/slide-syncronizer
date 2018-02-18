import React from 'react'
import { Provider } from 'react-redux'
import createStore from '~/stores'

import App from './App'

const store = createStore()

export default class EntryPoint extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
