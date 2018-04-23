import React from 'react'
import styled from 'styled-components'
import AdminUI from './AdminUI'
import CommentButton from '~/components/ui/CommentButton'
import RefreshButton from '~/components/ui/RefreshButton'
import { isAdmin } from '~/utils'

export default Component =>
  AdminUI(
    class extends React.Component {
      render() {
        return (
          <>
            <Component />
            {process.env.COMMENT_MODE ? <CommentButton /> : null}
            {isAdmin(window.location.search) ? <RefreshButton /> : null}
          </>
        )
      }
    },
  )
