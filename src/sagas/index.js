import _ from 'lodash'
import { fork, put, take, call, select, takeLatest, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import client from 'socket.io-client'
import { push } from 'react-router-redux'
import * as actions from '~/actions'
import { isAdmin } from '~/utils'
import slideData from '~/constants/slide.json'
import socketInitalize from '~/socket-initalize'

const rotateIndexToLeft = currentIndex => {
  const index = currentIndex - 1
  if (index === -1) return slideData.pages.length - 1
  return index
}

const rotatePage = (action, index) =>
  action === 'prev'
    ? _.get(slideData.pages, index, _.last(slideData.pages))
    : _.get(slideData.pages, index, _.first(slideData.pages))

function* pageManageTask() {
  yield takeLatest(actions.pageMove, function*(action) {
    const { currentPage, socket } = yield select()
    const { payload } = action
    const index =
      payload === 'prev'
        ? rotateIndexToLeft(currentPage.index)
        : (currentPage.index + 1) % slideData.pages.length
    const page = rotatePage(payload, index)
    const nextPayload = { page, index }
    socket.instance?.emit('page/update', nextPayload)
    yield nextPayload |> actions.changePage |> put
  })
  yield takeLatest(actions.changePage, function*({ payload }) {
    const { currentPage, router } = yield select()
    if (currentPage.index === payload.index) {
      const pathname = `/${payload.page}`
      yield { pathname, search: router.location?.search } |> push |> put
    }
  })
}

function* commentManageTask() {
  yield takeLatest(actions.postComment, function*(action) {
    const { socket } = yield select()
    const comment = action.payload.comment
    socket.instance?.emit('comment/post', { comment })
  })
}

function* connectToServerTask() {
  let once = false
  while (true) {
    const { socket } = yield select()
    const s =
      socket.instance || client.connect(process.env.SERVER_URL, { transports: ['websocket'] })
    if (!once) {
      socketInitalize(s)
      once = true
    }
    yield delay(100)
    s.emit('page/sync')
    yield { instance: s } |> actions.connectToServer |> put
    yield actions.reconnect |> take
  }
}

function* canvasTask() {
  yield takeEvery(actions.drawLineRemote, function*(action) {
    const { socket } = yield select()
    const { payload } = action
    socket.instance.emit('canvas/drawLine', payload)
  })
}

export default function* rootSaga() {
  yield fork(pageManageTask)
  yield fork(commentManageTask)
  yield fork(connectToServerTask)
  yield fork(canvasTask)
}
