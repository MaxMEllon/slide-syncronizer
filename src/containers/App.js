import React from 'react'
import { connect } from 'react-redux'
import { Switch, BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import Preloader from '~/components/preloader'
import Slide from '~/components/Slide'
import history from '~/utils/history'
import RouteCssTransitionGroup from './RouteCssTransitionGroup'

const MyRouting = ({ pages }) => {
  let result = []
  result.push(<Route key="title" exact path="/" component={Preloader} />)
  pages?.forEach((url, index) =>
    result.push(
      <Route key={index} path={`/${index}`} component={props => <Slide url={url} {...props} />} />,
    ),
  )
  return result
}

class App extends React.Component {
  render() {
    const { pages } = this.props
    return (
      <ConnectedRouter history={history}>
        <RouteCssTransitionGroup>
          <Switch>
            <MyRouting pages={pages} />
          </Switch>
        </RouteCssTransitionGroup>
      </ConnectedRouter>
    )
  }
}

const mapToStateProps = state => ({
  pages: state.currentPage.pages,
})

export default connect(mapToStateProps)(App)
