import React from 'react'
import styled from 'styled-components'

const Preloader = styled.span`
  font-size: 3vw;
  text-align: center;
  padding-top: calc(50% - 1.5vw);
`

export default () => <Preloader className="fa fa-spin fa-loading" />
