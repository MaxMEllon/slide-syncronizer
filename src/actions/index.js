import { createAction } from 'redux-act'

// page
export const fetchPages = createAction('fetch pages')
export const pageMove = createAction('change page')
export const changePage = createAction('handle change page event')
export const syncCurrentPage = createAction('synchronize current page')

// socket
export const connectToServer = createAction('connect to server')
export const reconnect = createAction('start reconnect')

// comment
export const postComment = createAction('post comment to server')
export const recieveComment = createAction('recieve comment from server')
export const disposeComment = createAction('dispose comment')

// canvas
export const clearCanvas = createAction('crear canvas')
export const drawLineRemote = createAction('draw the remote canvas')
export const syncCanvas = createAction('sync remote canvas')

// error
export const failureConnectToServer = createAction('failure connect to server')
