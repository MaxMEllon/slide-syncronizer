import React from 'react'
import { Provider } from 'react-redux'
import createStore from '~/stores'
import styled from 'styled-components'

import App from './App'

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  overflow: hidden;
`

const store = createStore()

export default class EntryPoint extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Background>
          <App />
        </Background>
      </Provider>
    )
  }
}
