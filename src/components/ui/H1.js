import _ from 'lodash'
import React from 'react'
import styled, { css } from 'styled-components'

const _H1 = styled.h1`
  display: inline-block;
  font-size: 4vw;
  margin-bottom: 3vh;
  ${props =>
    props.color &&
    css`
      color: ${props.color};
    `} ${props =>
      props.underline &&
      css`
        border-bottom: ${props.underline};
      `};
`

export default class H1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      underline: 'none',
      animate: false,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const { onClick } = this.props
    if (onClick |> _.isFunction) onClick()
    if (this.state.animate) return
    this.setState({ underline: '0.4vh solid red', animate: true })
    _.delay(() => this.setState({ underline: 'none', animate: false }), 1500)
  }

  render() {
    const { children, onClick, ...props } = this.props
    const { underline } = this.state
    const newProps = Object.assign({}, props, { underline })
    return (
      <>
        <_H1 {...props} underline={underline} onClick={this.handleClick}>
          {children}
        </_H1>
      </>
    )
  }
}
