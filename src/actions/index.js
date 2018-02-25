import { createAction } from 'redux-act'

// page
export const pageNext = createAction('change page to next')
export const pagePrev = createAction('change page to previous')
export const changePage = createAction('handle change page event')
export const syncCurrentPage = createAction('synchronize current page')

// socket
export const connectToServer = createAction('connect to server')
export const reconnect = createAction('start reconnect')
