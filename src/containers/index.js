import React from 'react'
import { Provider } from 'react-redux'
import styled from 'styled-components'
import store from '~/stores'
import CommentList from '~/components/comment-stream'
import Canvas from '~/components/canvas'
import App from './App'

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  overflow: hidden;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(16, 6.195vw);
  grid-auto-rows: 6.195vw;
  position: relative;
  width: 100%;
  background-color: black;
`

const Content = styled.div`
  grid-column: span 16;
  grid-row: span 10;
  width: calc(100% - 20px);
  height: calc(100% - 40px);
  margin: 20px;
`

export default class EntryPoint extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Background>
          <Wrapper>
            <Content>
              <CommentList />
              <App />
              <Canvas />
            </Content>
          </Wrapper>
        </Background>
      </Provider>
    )
  }
}
