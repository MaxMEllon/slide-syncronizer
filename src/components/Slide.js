import React from 'react'
import styled from 'styled-components'

const combine = url => `${process.env.SERVER_IMAGE_URL}${url}`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items center;
  width: 100%;
  height: 96%;
`

const Img = styled.img`
  width: 85%;
  height: auto;
`

export default ({ url }) => (
  <Wrapper>
    <Img alt="slide-image" src={combine(url)} />
  </Wrapper>
)
