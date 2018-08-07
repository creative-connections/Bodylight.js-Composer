export default function registerGetId (id) {
  if (Number.isInteger(id)) {
    if (typeof this.getIds === 'undefined') {
      this.getIds = []
      this.outputValuesLength = 0
    }
    this.getIds[this.outputValuesLength++] = id
    return this.outputValuesLength - 1
  } else {
    console.warn('Failed to register a get: ID ' + id + ' is not an integer')
  }
}
