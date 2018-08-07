export default function registerGetId (id) {
  if (Number.isInteger(id)) {
    if (typeof this.getIds === 'undefined') {
      this.getIds = []
      this.getCounter = 0
    }
    this.getIds[this.getCounter++] = id
    return this.getCounter - 1
  } else {
    console.warn('Failed to register a get: ID ' + id + ' is not an integer')
  }
}
