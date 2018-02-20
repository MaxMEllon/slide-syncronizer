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
}

const currentPage = createReducer(
  {
    [actions.changePage]: (_1, payload) => payload,
  },
  initialState.currentPage,
)

export default combineReducers({
  currentPage,
  router,
})
