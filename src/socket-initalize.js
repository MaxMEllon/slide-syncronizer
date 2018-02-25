import store from '~/stores'
import { changePage } from '~/actions'

const json = string => JSON.parse(string)

export default function socketInitalize(socket) {
  socket.on('page/update', payload => payload |> json |> changePage |> store.dispatch)
}
