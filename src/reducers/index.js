import _ from 'lodash'
import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'
import { routerReducer as router } from 'react-router-redux'
import * as actions from '~/actions'
import data from '~/constants/slide.json'

export const initialState = {
  currentPage: {
    page: _.first(data.pages),
    index: 0,
  },
  socket: {
    instance: null,
  },
}

const currentPage = createReducer(
  {
    [actions.changePage]: (_1, payload) => payload,
  },
  initialState.currentPage,
)

const socket = createReducer(
  {
    [actions.connectToServer]: (state, payload) =>
      state.instance?.connected !== payload.instance?.connected ? payload : state,
  },
  initialState.socket,
)

export default combineReducers({
  currentPage,
  router,
  socket,
})
