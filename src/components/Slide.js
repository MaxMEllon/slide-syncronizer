import React from 'react'
import styled from 'styled-components'

const combine = url => `${process.env.SERVER_IMAGE_URL}${url}`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

const Img = styled.img`
  width: 100%;
  height: auto;
`

export default class Slide extends React.unstable_AsyncComponent {
  render() {
    return (
      <Wrapper>
        <Img src={combine(this.props.url)} />
      </Wrapper>
    )
  }
}
