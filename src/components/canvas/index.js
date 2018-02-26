import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { isAdmin } from '~/utils'
import { drawLineRemote } from '~/actions'

const StyledCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
`

class Canvas extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dragging: false,
    }
    this.onDown = this.onDown.bind(this)
    this.onUp = this.onUp.bind(this)
    this.onMove = this.onMove.bind(this)
    this.drawLine = this.drawLine.bind(this)
    this.resetMousePosition()
  }

  componentDidMount() {
    this.canvas = ReactDOM.findDOMNode(this)
    if (isAdmin(this.props.router.location.search)) {
      this.canvas.addEventListener('mousedown', this.onDown, false)
      this.canvas.addEventListener('mouseup', this.onUp, false)
      this.canvas.addEventListener('mousemove', this.onMove, false)
    }
    const context = this.canvas.getContext('2d')
    context.beginPath()
  }

  componentWillReceiveProps(nextProps) {
    const { canvasData } = nextProps
    const context = this.canvas.getContext('2d')
    this.drawLine(context, canvasData.x * window.innerWidth, canvasData.y * window.innerHeight)
  }

  drawLine(context, x, y) {
    context.beginPath()
    context.lineCap = 'round'
    context.strokeStyle = 'rgb(255, 0, 0)'
    context.lineWidth = 2
    if (this.x === '') {
      context.moveTo(x, y)
    } else {
      context.moveTo(this.x, this.y)
    }
    context.lineTo(x, y)
    context.stroke()
    this.updateLastMousePosition(this.x, this.y, x, y)
  }

  resetMousePosition() {
    this.x = ''
    this.y = ''
  }

  updateLastMousePosition(prevX, prevY, x, y) {
    this.x = x
    this.y = y
  }

  onDown(event) {
    this.setState({ dragging: true })
  }

  onMove(event) {
    const context = this.canvas.getContext('2d')
    const offsetX = this.canvas.getBoundingClientRect().left
    const offsetY = this.canvas.getBoundingClientRect().top
    const x = event.clientX - offsetX
    const y = event.clientY - offsetY
    if (this.state.dragging) {
      this.drawLine(context, x, y)
      // if (isAdmin(this.props.router.location.search)) {
      this.props.drawLineRemote({
        x: x / window.innerWidth,
        y: y / window.innerHeight,
      })
      // }
    }
  }

  onUp(event) {
    this.setState({ dragging: false })
    this.resetMousePosition()
  }

  render() {
    return <StyledCanvas id="canvas" width={window.innerWidth} height={window.innerHeight} />
  }
}

const mapToStateProps = state => ({ canvasData: state.canvas, router: state.router })

export default connect(mapToStateProps, { drawLineRemote })(Canvas)
