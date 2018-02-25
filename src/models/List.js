const parse = json => JSON.parse(json)

export default class List extends Array {
  [Symbol.toPrimitive](hint) {
    if (hint === 'string') {
      return `[${this.join(',')}]`
    }
    if (hint === 'number') {
      return NaN
    }
    return this.toString()
  }

  clone() {
    return new List(...super.map(i => i))
  }

  push(obj) {
    super.push(obj)
    return this
  }

  remove(id) {
    const index = this.findIndex(i => i.id === id)
    if (index !== -1) this.splice(index, 1)
    return this
  }

  pushFromJSON(json) {
    this.push(parse(json))
  }

  get json() {
    return JSON.stringify(this)
  }
}
