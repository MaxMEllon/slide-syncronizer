import _ from 'lodash'
import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { reconnect } from '~/actions'
import { classNames } from '~/utils'
import IconBasedButton from './IconBasedButton'

const Reload = styled(IconBasedButton)`
  right: 13vw;
  bottom: 6vw;
`

class ReloadButton extends React.unstable_AsyncComponent {
  constructor(props) {
    super(props)
    this.state = {
      xlass: '',
      moving: false,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillUnmount() {
    this.unmount = true
  }

  handleClick() {
    const { onClick } = this.props
    if (_.isFunction(onClick)) onClick()
    this.props.reconnect()
    if (this.state.moving) return
    this.setState({ xlass: 'fa-spin-reverse', moving: true })
    setTimeout(() => {
      this.unmount || this.setState({ xlass: '', moving: false })
    }, 2000)
  }

  render() {
    const xlass = classNames('fa fa-undo', this.state.xlass)
    return <Reload className={xlass} onClick={this.handleClick} />
  }
}

export default connect(state => ({ socket: state.socket }), { reconnect })(ReloadButton)
