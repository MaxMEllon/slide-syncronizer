import store from '~/stores'
import { changePage, recieveComment, syncCanvas } from '~/actions'

const json = string => JSON.parse(string)

export default function socketInitalize(socket) {
  socket.on('page/update', payload => payload |> json |> changePage |> store.dispatch)
  socket.on('comment/stream', payload => payload |> json |> recieveComment |> store.dispatch)
  socket.on('canvas/update', payload => payload |> json |> syncCanvas |> store.dispatch)
}
