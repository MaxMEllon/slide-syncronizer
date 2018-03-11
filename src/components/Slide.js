import React from 'react'
import styled from 'styled-components'

const combine = url => `${process.env.SERVER_REST_URL}${url}`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

const Img = styled.img`
  width: 100%;
  height: auto;
`

export default ({ url }) => {
  return (
    <Wrapper>
      <Img src={combine(url)} />
    </Wrapper>
  )
}
