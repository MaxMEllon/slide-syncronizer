import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import styled from 'styled-components'
import store from '~/stores'
import CommentList from '~/components/comment-stream'
import SlideMaster from '~/components/hoc/SlideMaster'
import AdminUI from '~/components/hoc/AdminUI'
import Canvas from '~/components/canvas'
import App from './App'

const Background = styled.div`
  position: static;
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
  width: calc(100% - 2vw);
  height: calc(100% - 1vw);
  margin-left: 1vw;
  margin-right: 1vw;
  margin-top: 1vw;
`

const UI = SlideMaster(() => <div />)

class EntryPoint extends React.Component {
  state = {
    width: 0,
    height: 0,
  }

  once = false

  constructor(props) {
    super(props)
    this.updateSize = this.updateSize.bind(this)
  }

  componentDidMount() {
    const $dom = ReactDOM.findDOMNode(this.wrapper)
    window.addEventListener('orientationchange', this.updateSize)
    window.addEventListener('resize', this.updateSize)
    if (!this.once) {
      this.setState({
        width: $dom.offsetWidth,
        height: $dom.offsetHeight,
      })
      this.once = true
    }
  }

  updateSize() {
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
              <UI />
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
