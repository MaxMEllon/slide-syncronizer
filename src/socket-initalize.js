import * as actions from '~/actions'
import store from '~/stores'

export default function socketInitalize(socket) {
  socket.on('page/update', payload => payload |> actions.changePage |> store.dispatch)
}
