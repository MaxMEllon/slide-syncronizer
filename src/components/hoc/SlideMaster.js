import React from 'react'
import styled from 'styled-components'
import AdminUI from './AdminUI'
import data from '~/constants/my.json'
import CommentButton from '~/components/ui/CommentButton'
import RefreshButton from '~/components/ui/RefreshButton'
import { isAdmin } from '~/utils'

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
        <>
          <Header>
            {data.student_num} {data.event_ja} {data.date}
          </Header>
          <Component />
          {isAdmin(window.location.search) ? <RefreshButton /> : null}
          <CommentButton />
        </>
      )
    }
  } |> AdminUI
