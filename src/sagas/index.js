import _ from 'lodash'
import axios from 'axios'
import { fork, put, take, call, select, takeLatest, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import client from 'socket.io-client'
import { push } from 'react-router-redux'
import * as actions from '~/actions'
import { isAdmin } from '~/utils'
import socketInitalize from '~/socket-initalize'

const rotateIndexToLeft = currentPage => {
  const index = currentPage.index - 1
  if (index === -1) return currentPage.pages.length - 1
  return index
}

function* pageManageTask() {
  yield takeLatest(actions.pageMove, function*(action) {
    const { currentPage, socket } = yield select()
    const { payload } = action
    const index =
      payload === 'prev'
        ? rotateIndexToLeft(currentPage)
        : (currentPage.index + 1) % currentPage.pages.length
    const nextPayload = index
    socket.instance?.emit('page/update', nextPayload)
    yield nextPayload |> actions.changePage |> put
  })
  yield takeLatest(actions.changePage, function*({ payload }) {
    const { currentPage, router } = yield select()
    if (currentPage.index === payload) {
      const pathname = `/${payload}`
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
      socket.instance ||
      client.connect(process.env.SERVER_SOCKET_URL, { transports: ['websocket'] })
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

const fetchPages = () => {
  const url = `${process.env.SERVER_REST_URL}/pages`
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(res => resolve(res.data))
      .catch(err => reject(err))
  })
}

export default function* rootSaga() {
  try {
    const pages = yield call(fetchPages)
    yield pages |> actions.fetchPages |> put
    pages.forEach(
      (url, index) => (
        setTimeout(() => (new Image().src = `${process.env.SERVER_IMAGE_URL}${url}`)), 1 * index
      ),
    )
  } catch (err) {
    yield err |> actions.failureConnectToServer |> put
  }
  yield fork(pageManageTask)
  yield fork(commentManageTask)
  yield fork(connectToServerTask)
  yield fork(canvasTask)
}
