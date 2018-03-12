import store from '~/stores'
import { changePage, recieveComment, syncCanvas } from '~/actions'

const json = string => JSON.parse(string)

export default function socketInitalize(socket) {
  socket.on('page/update', payload => payload |> json |> changePage |> store.dispatch)
  socket.on('comment/stream', payload => payload |> json |> recieveComment |> store.dispatch)
  socket.on('canvas/update', payload => payload |> json |> syncCanvas |> store.dispatch)
  socket.on('canvas/clear', () => {
    setTimeout(() => {
      const $canvas = document.querySelector('canvas')
      const $context = $canvas?.getContext('2d')
      $context?.beginPath()
      $context?.clearRect(0, 0, $canvas?.width || 0, $canvas?.height || 0)
      $context?.closePath()
    }, 100)
  })
}
