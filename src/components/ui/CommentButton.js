import _ from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { classNames } from '~/utils'
import { postComment } from '~/actions'
import IconBasedButton from './IconBasedButton'

const Comment = styled(IconBasedButton)`
  right: 19vw;
  bottom: 6vw;
`

const Block = styled.div`
  position: absolute;
  bottom: 10vw;
  margin-left: 10vw;
  margin-right: 10vw;
  width: 80vw;
  height: 10vw;
  background-color: #272727;
  border-radius: 80vw;
  z-index: 530000;
`

const Input = styled.input`
  line-height: 5.3vw;
  margin-top: 1.3vw;
  margin-left: 6vw;
  font-size: 5.3vw;
  width: 55vw;
  background-color: white;
`

const CommentFormButton = styled.span`
  position: absolute;
  margin-top: 2.5vw;
  width: 5vw;
  height: 5vw;
  font-size: 5vw;
  color: #c2bfbf;
  &:hover {
    color: white;
  }
  &:active {
    color: white;
  }
`

const Submit = styled(CommentFormButton)`
  margin-left: 3vw;
`

const Close = styled(CommentFormButton)`
  margin-left: 11vw;
`

class CommentButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      xlass: '',
      comment: '',
      commentFormXlass: 'animated fadeIn',
      open: false,
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleEnterKey = this.handleEnterKey.bind(this)
    this.handlePost = this.handlePost.bind(this)
    this.handleCloseCommentForm = this.handleCloseCommentForm.bind(this)
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleClick)
  }

  componentDidUpdate() {
    this.input?.addEventListener('keyup', this.handleEnterKey)
  }

  handleClick() {
    const { onClick } = this.props
    if (_.isFunction(onClick)) onClick()
    if (!this.state.open) {
      this.setState({ open: true })
      window.removeEventListener('keyup', this.handleClick)
      setTimeout(() => this.input?.focus(), 50)
    }
  }

  handleCloseCommentForm() {
    this.setState({ commentFormXlass: 'animated fadeOut' })
    this.input.removeEventListener('keyup', this.handleEnterKey)
    window.addEventListener('keyup', this.handleClick)
    setTimeout(() => this.setState({ open: false, commentFormXlass: 'animated fadeIn' }), 500)
  }

  handleInput(e) {
    this.setState({ comment: e.target.value })
  }

  handleEnterKey(e) {
    e.preventDefault()
    if (open) {
      if (e.keyCode === 13) {
        this.handlePost()
        this.input.removeEventListener('keyup', this.handleEnterKey)
      }
    }
  }

  handlePost() {
    if (this.state.posted) return
    this.props.postComment({ comment: this.state.comment })
    this.setState({ commentFormXlass: 'animated fadeOut', posted: true })
    window.addEventListener('keyup', this.handleClick)
    setTimeout(
      () =>
        this.setState({
          open: false,
          comment: '',
          commentFormXlass: 'animated fadeIn',
          posted: false,
        }),
      500,
    )
  }

  render() {
    const xlass = classNames('fa fa-comment', this.state.xlass)
    return this.state.open ? (
      <>
        <Block className={this.state.commentFormXlass}>
          <Input
            type="text"
            innerRef={c => {
              this.input = c
            }}
            value={this.state.comment}
            onChange={this.handleInput}
          />
          <Submit className="fa fa-pencil" onClick={this.handlePost} />
          <Close className="fa fa-close" onClick={this.handleCloseCommentForm} />
        </Block>
        <Comment className={xlass} onClick={this.handleClick} />
      </>
    ) : (
      <Comment className={xlass} onClick={this.handleClick} />
    )
  }
}

const mapStateToProps = state => ({ socket: state.socket })

export default connect(mapStateToProps, { postComment })(CommentButton)
