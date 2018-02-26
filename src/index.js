import 'react-fa'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import initReactFastclick from 'react-fastclick'
import EntryPoint from './containers'

injectTapEventPlugin()
initReactFastclick()

window.onload = () => ReactDOM.render(<EntryPoint />, document.getElementById('root'))
