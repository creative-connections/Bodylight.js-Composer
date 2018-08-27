export default function initRanges () {
  return new Promise(resolve => {
    const ranges = config.widgets.ranges
    Object.entries(ranges).forEach(([name, configuration]) => {
      let range

      try {
        range = new Range(configuration)
      } catch (e) {
        if (e instanceof ReferenceError) {
          console.warn(e.message)
          return
        } else {
          throw e
        }
      }
      widgets[range.id] = range
    })
    resolve()
  })
}
