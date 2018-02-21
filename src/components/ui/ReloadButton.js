import _ from 'lodash'
import React from 'react'
import styled from 'styled-components'
import { classNames } from '~/utils'

const Reload = styled.span`
  position: absolute;
  color: rgba(255, 255, 255, 0.6);
  right: 1vw;
  bottom: 1vw;
  width: 5vw;
  height: 5vw;
  text-align: center;
  line-height: 5vw;
  font-size: 4vw;
  text-shadow: 0 0 1px #000, 0 0 1px rgba(255, 255, 255, 0.2), 0 0 2px rgba(255, 255, 255, 0.2),
    0 0 4px rgba(255, 255, 255, 0.2), 0 0 7px rgba(255, 255, 255, 0.2),
    0 0 8px rgba(255, 255, 255, 0.2), 0 0 10px rgba(255, 255, 255, 0.2),
    0 0 15px rgba(255, 255, 255, 0.2);

  &:hover {
    color: #fff;
  }
`

const Message = styled.span`
  position: absolute;
  right: 6vw;
  bottom: 1vw;
  color: white;
  font-size: 2vw;
`

export default class ReloadButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      xlass: '',
      moving: false,
      message: '',
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const { onClick } = this.props
    if (_.isFunction(onClick)) onClick()
    if (this.state.moving) return
    this.setState({ xlass: 'fa-spin-reverse', moving: true, message: '同期中...' })
    setTimeout(() => this.setState({ xlass: '', moving: false, message: '' }), 2000)
  }

  render() {
    const xlass = classNames('fa fa-undo', this.state.xlass)
    return (
      <div>
        <Reload className={xlass} onClick={this.handleClick} />
        <Message className="animated infinite flash">{this.state.message}</Message>
      </div>
    )
  }
}
