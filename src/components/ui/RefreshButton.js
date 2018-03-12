import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import IconBasedButton from './IconBasedButton'

const Reload = styled(IconBasedButton)`
  right: 20vw;
  top: 6vw;
`

class RefreshButton extends React.unstable_AsyncComponent {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const { onClick } = this.props
    if (_.isFunction(onClick)) onClick()
    this.props.socket.emit('canvas/clear')
  }

  render() {
    return <Reload className="fa fa-refresh" onClick={this.handleClick} />
  }
}

const mapToStateProps = state => ({ socket: state.socket.instance })

export default connect(mapToStateProps)(RefreshButton)
