import React from 'react'
import { hot } from 'react-hot-loader'
import styled from 'styled-components'
import RouteCSSTransitionGroup from './RouteCSSTransitionGroup'
import { Switch, BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import Title from '~/components/title'
import Slide1_1 from '~/components/section1/Slide1'
import SlideMaster from '~/components/hoc/SlideMaster'
import PSM from '~/components/hoc/PatchedSlideMaster'
import history from '~/utils/history'

class App extends React.Component {
  render() {
    return (
      <ConnectedRouter history={history}>
        <RouteCSSTransitionGroup>
          <Switch>
            <Route exact path="/" component={SlideMaster(Title)} />
            <Route path="/1-1" component={PSM(Slide1_1, 'ほげほげ')} />
            <Route component={SlideMaster(Title)} />
          </Switch>
        </RouteCSSTransitionGroup>
      </ConnectedRouter>
    )
  }
}

export default hot(module)(App)
