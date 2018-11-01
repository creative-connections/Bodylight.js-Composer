export default function updateValueListeners () {
  this.valueListeners.forEach(listener => {
    if (listener.index) {
      listener.target.setValues(
        listener.attribute,
        this.batch.values[listener.index],
        this.batch.time
      )
    } else if (listener.indicies) {
      const values = []
      for (i = 0; i < this.batch.time.length; i++) {
        values[i] = listener.indicies.map(index => this.batch.values[index][i])
      }

      listener.target.setArrays(
        listener.attribute,
        values,
        this.batch.time
      )
    }
  })
}
