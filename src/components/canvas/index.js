import _ from 'lodash'
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
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  z-index: 500;
`

const drawLine = context => {
  context.beginPath()
  context.grobalAlpha = 0.01
  context.lineCap = 'round'
  context.strokeStyle = 'rgba(255, 247, 0, 0.01)'
  context.lineWidth = 4
  context.lineTo(x, y)
  context.stroke()
  context.endPath()
}

class Canvas extends React.unstable_AsyncComponent {
  constructor(props) {
    super(props)
    this.state = {
      dragging: false,
    }
    this.onDown = this.onDown.bind(this)
    this.onUp = this.onUp.bind(this)
    this.onMove = this.onMove.bind(this)
    this.drawLine = this.drawLine.bind(this)
    this.onMoveTouch = this.onMoveTouch.bind(this)
    this.resetMousePosition = this.resetMousePosition.bind(this)
    this.resetMousePosition()
  }

  componentDidMount() {
    this.canvas = ReactDOM.findDOMNode(this)
    this.context = this.canvas.getContext('2d')
    if (this.isAdmin) {
      this.canvas.addEventListener('mousedown', this.onDown, false)
      this.canvas.addEventListener('mouseup', this.onUp, false)
      this.canvas.addEventListener('mousemove', this.onMove, false)

      this.canvas.addEventListener('touchstart', this.onDown, false)
      this.canvas.addEventListener('touchmove', this.onMoveTouch, false)
      this.canvas.addEventListener('touchend', this.onUp, false)
      this.canvas.addEventListener('touchchancel', this.onUp, false)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { canvasData, socket, width, height } = nextProps
    this.drawLine(canvasData.x * width, canvasData.y * height)
    if (socket.instance && !this.once) {
      socket.instance.on('canvas/upPen', this.resetMousePosition)
      this.once = true
    }
    if (this.props.router?.location.pathname !== nextProps.router?.location.pathname) {
      this.resetMousePosition()
    }
  }

  get isAdmin() {
    return isAdmin(this.props.router.location.search)
  }

  drawLine(x, y) {
    if (this.x === '') {
      this.context.moveTo(x, y)
    } else {
      this.context.moveTo(this.x, this.y)
    }
    drawLine(this.context)
    this.updateLastMousePosition(x, y)
  }

  resetMousePosition() {
    this.x = ''
    this.y = ''
  }

  updateLastMousePosition(x, y) {
    this.x = x
    this.y = y
  }

  onDown() {
    this.setState({ dragging: true })
  }

  onMoveTouch(event) {
    for (const target of event.changedTouches) {
      this.onMove(target)
    }
  }

  onMove(event) {
    if (!this.state.dragging) return

    const { left, top } = this.canvas.getBoundingClientRect()
    const x = event.clientX - left
    const y = event.clientY - top

    this.drawLine(x, y)
    this.props.drawLineRemote({
      x: (x / this.props.width).toFixed(2),
      y: (y / this.props.height).toFixed(2),
    })
  }

  onUp(event) {
    this.setState({ dragging: false })
    this.resetMousePosition()
    this.props.socket.instance.emit('canvas/onUp')
  }

  render() {
    const { width, height } = this.props
    return <StyledCanvas id="canvas" width={width} height={height} />
  }
}

const mapToStateProps = state => ({
  canvasData: state.canvas,
  router: state.router,
  socket: state.socket,
})

export default connect(mapToStateProps, { drawLineRemote })(Canvas)
