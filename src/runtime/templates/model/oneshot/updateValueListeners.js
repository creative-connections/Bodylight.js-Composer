export default function updateValueListeners () {
  this.valueListeners.forEach(listener => {
    listener.target.setValues(
      listener.attribute,
      this.batch.values[listener.index],
      this.batch.time
    )
  })
}
