import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'
import * as actions from '../actions'

export const initialState = {
  sample: null,
}

const sample = createReducer(
  {
    [actions.sample]: () => 'sample',
  },
  initialState.sample,
)

export default combineReducers({
  sample,
})
