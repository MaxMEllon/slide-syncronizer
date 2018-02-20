import { createAction } from 'redux-act'

export const pageNext = createAction('change page to next')
export const pagePrev = createAction('change page to previous')
export const changePage = createAction('handle change page event')
