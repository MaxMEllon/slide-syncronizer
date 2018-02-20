import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { isAdmin, isFirst } from '~/utils'
import { pageNext, pagePrev } from '~/actions'
import RerenderBlocker from '~/components/misc/RerenderBlocker'

const ButtonGroup = styled.div`
  position: absolute;
  bottom: 3%;
  width: 100%;
  height: 18%;
`

const Button = styled.button`
  width: 11.4%;
  height: 100%;
  position: absolute;
  border-radius: 100%;
  background-color: rgba(16, 255, 0, 0.42);
  box-shadow: 0 0 14px 10px #0c3f02;
  color: white;
  font-size: 5vw;
  &:active {
    background-color: rgba(16, 255, 0, 0.92);
  }
  &:hover {
    background-color: rgba(16, 255, 0, 0.92);
  }
  &:focus {
    outline: none;
  }
`

const Left = styled(Button)`
  left: 5%;
`
const Right = styled(Button)`
  right: 5%;
`

const mapToStateProps = state => ({ currentPage: state.currentPage })

const AdminUIGenerator = Component => ({ location, currentPage, ...props }) => {
  return isAdmin(location.search) ? (
    <div>
      <RerenderBlocker>
        <Component />
      </RerenderBlocker>
      <ButtonGroup>
        {isFirst() ? null : (
          <Left onClick={props.pagePrev}>
            <span className="fa fa-2x fa-angle-left" />
          </Left>
        )}
        <Right onClick={props.pageNext}>
          <span className="fa fa-2x fa-angle-right" />
        </Right>
      </ButtonGroup>
    </div>
  ) : (
    <RerenderBlocker>
      <Component />
    </RerenderBlocker>
  )
}

export default Component =>
  connect(mapToStateProps, { pageNext, pagePrev })(AdminUIGenerator(Component))
