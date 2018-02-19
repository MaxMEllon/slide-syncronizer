import React from 'react'
import { hot } from 'react-hot-loader'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(16, 6.025vw);
  grid-auto-rows: 6.025vw;
  position: relative;
  width: 100%;
  background-color: white;
`

const Content = styled.div`
  grid-column: span 16;
  grid-row: span 10;
  width: calc(100% - 20px);
  height: calc(100% - 40px);
  margin: 20px;
`

class App extends React.Component {
  render() {
    return (
      <Wrapper>
        <Content>Hello</Content>
      </Wrapper>
    )
  }
}

export default hot(module)(App)
