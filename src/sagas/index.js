import { fork, put, call, select, takeLatest } from 'redux-saga/effects'
import * as actions from '~/actions'
import { push } from 'react-router-redux'
import { isAdmin } from '~/utils'
import slideData from '~/constants/slide.json'

function* pageManageTask() {
  yield takeLatest(actions.pageNext, function*() {
    const { currentPage } = yield select()
    const index = currentPage.index + 1
    const page = _.get(slideData.pages, index, _.first(slideData.pages))
    yield { page, index } |> actions.changePage |> put
  })
  yield takeLatest(actions.pagePrev, function*() {
    const { currentPage } = yield select()
    const index = currentPage.index - 1
    const page = _.get(slideData.pages, index, _.last(slideData.pages))
    console.log(index, slideData)
    yield { page, index } |> actions.changePage |> put
  })
  yield takeLatest(actions.changePage, function*({ payload }) {
    const { router } = yield select()
    const pathname = `/${payload.page}`
    yield { pathname, search: router.location.search } |> push |> put
  })
}

export default function* rootSaga() {
  yield fork(pageManageTask)
}
