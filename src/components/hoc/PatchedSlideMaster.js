import React from 'react'
import styled from 'styled-components'
import SlideMaster from './SlideMaster'

const Title = styled.div`
  background-color: #424242;
  color: white;
  font-size: 2.5vw;
  text-align: left;
  margin-top: 1%;
  height: 10%;
  padding-left: 2%;
  margin-bottom: 2%;
`
const P = styled.p`
  padding-top: 1.6%;
`

const getSlideNum = () => window.location.pathname.replace('/', '')

export default (Component, title) =>
  class extends React.Component {
    render() {
      const slideNum = getSlideNum()
      return (
        <>
          <Title>
            <P>
              {slideNum} {title}
            </P>
          </Title>
          <Component />
        </>
      )
    }
  } |> SlideMaster
