import _ from 'lodash'
import { fork, put, take, call, select, takeLatest } from 'redux-saga/effects'
import client from 'socket.io-client'
import { push } from 'react-router-redux'
import * as actions from '~/actions'
import { isAdmin } from '~/utils'
import slideData from '~/constants/slide.json'

const rotateIndexToLeft = currentIndex => {
  const index = currentIndex - 1
  if (index === -1) return slideData.pages.length - 1
  return index
}

function* pageManageTask() {
  yield takeLatest(actions.pageNext, function*() {
    const { currentPage } = yield select()
    console.log(slideData.pages.length)
    const index = (currentPage.index + 1) % slideData.pages.length
    const page = _.get(slideData.pages, index, _.first(slideData.pages))
    yield { page, index } |> actions.changePage |> put
  })
  yield takeLatest(actions.pagePrev, function*() {
    const { currentPage } = yield select()
    const index = rotateIndexToLeft(currentPage.index)
    const page = _.get(slideData.pages, index, _.last(slideData.pages))
    yield { page, index } |> actions.changePage |> put
  })
  yield takeLatest(actions.changePage, function*({ payload }) {
    const { router } = yield select()
    const pathname = `/${payload.page}`
    yield { pathname, search: router.location.search } |> push |> put
  })
}

function* connectToServerTask() {
  while (true) {
    const socket = client.connect(process.env.SERVER_URL)
    yield { instance: socket } |> actions.connectToServer |> put
    yield actions.reconnect |> take
  }
}

export default function* rootSaga() {
  yield fork(pageManageTask)
  yield fork(connectToServerTask)
}
