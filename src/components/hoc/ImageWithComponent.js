import React from 'react'
import styled from 'styled-components'

const Img = styled.div`
  background-image: ${({ url }) => url};
  width: 100%;
  height: 100%;
`

export default url => () => <Img url={url} />
