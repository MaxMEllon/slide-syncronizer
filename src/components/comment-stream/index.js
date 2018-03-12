import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { disposeComment } from '~/actions'
import { classNames } from '~/utils'

const Text = styled.span`
  position: absolute;
  font-size: 4vw;
  color: rgba(255, 255, 255, 0.6);
  height: 4vw;
  width: 500vw;
  left: -100%;
  top: calc(${({ top }) => top % 8} * 6vw);
  animation: moveToLeft 40s linear 0s 1;

  @keyframes moveToLeft {
    0% {
      left: 100%;
    }

    100% {
      left: -300vw;
    }
  }
`

class Comment extends React.unstable_AsyncComponent {
  constructor(props) {
    super(props)
    this.handleWillDispose = this.handleWillDispose.bind(this)
  }

  componentDidMount() {
    const $dom = ReactDOM.findDOMNode(this)
    $dom.addEventListener('animationend', this.handleWillDispose)
  }

  handleWillDispose() {
    const payload = { id: this.props._id }
    this.props.disposeComment(payload)
  }

  render() {
    return <Text top={this.props._id}>{this.props.children}</Text>
  }
}

const List = styled.div`
  position: absolute;
  width: 100vw;
  height: 80vh;
  overflow: hidden;
  top: 10vw;
  z-index: 10;
`

function CommentList({ comments, disposeComment }) {
  return (
    <List>
      {comments.list.map(c => (
        <Comment _id={c.id} key={c.id} disposeComment={disposeComment}>
          {c.comment}
        </Comment>
      ))}
    </List>
  )
}

const mapToStateProps = state => ({ comments: state.comments })

export default connect(mapToStateProps, { disposeComment })(CommentList)
