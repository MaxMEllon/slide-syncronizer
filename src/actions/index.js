import { createAction } from 'redux-act'

// page
export const pageMove = createAction('change page')
export const changePage = createAction('handle change page event')
export const syncCurrentPage = createAction('synchronize current page')

// socket
export const connectToServer = createAction('connect to server')
export const reconnect = createAction('start reconnect')
