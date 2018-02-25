import Model from './Model'

export default class Comment extends Model {
  constructor(comment) {
    super()
    this._comment = comment.slice(0, 75)
  }

  get comment() {
    return this._comment
  }
}
