import React from 'react'

export default class RerenderBlocker extends React.Component {
  shouldComponentUpdate(prevProps) {
    return false
  }

  render() {
    return this.props.children
  }
}
