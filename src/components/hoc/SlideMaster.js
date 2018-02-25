import React from 'react'
import styled from 'styled-components'
import AdminUI from './AdminUI'
import data from '~/constants/my.json'
import ReloadButton from '~/components/ui/ReloadButton'
import CommentButton from '~/components/ui/CommentButton'

const Header = styled.div`
  color: white;
  text-align: right;
  width: 100%;
  font-size: 1.5vw;
  padding-right: 2%;
`

export default Component =>
  class extends React.Component {
    render() {
      return (
        <div>
          <Header>
            {data.student_num} {data.event_ja} {data.date}
          </Header>
          <Component />
          <CommentButton />
          <ReloadButton />
        </div>
      )
    }
  } |> AdminUI
