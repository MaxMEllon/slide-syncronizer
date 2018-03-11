import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import styled from 'styled-components'
import store from '~/stores'
import CommentList from '~/components/comment-stream'
import Canvas from '~/components/canvas'
import App from './App'

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
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

class EntryPoint extends React.Component {
  state = {
    width: 0,
    height: 0,
  }

  componentDidMount() {
    const $dom = ReactDOM.findDOMNode(this.wrapper)
    this.setState({
      width: $dom.offsetWidth,
      height: $dom.offsetHeight,
    })
  }

  render() {
    return (
      <Provider store={store}>
        <Background>
          <Wrapper ref={c => (this.wrapper = c)}>
            <Content>
              <CommentList />
              <App />
              <Canvas width={this.state.width} height={this.state.height} />
            </Content>
          </Wrapper>
        </Background>
      </Provider>
    )
  }
}

export default hot(module)(EntryPoint)
