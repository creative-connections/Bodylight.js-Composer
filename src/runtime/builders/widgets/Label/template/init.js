export default function initLabels () {
  return new Promise(resolve => {
    const labels = config.widgets.labels
    Object.entries(labels).forEach(([name, configuration]) => {
      let label
      try {
        label = new Label(configuration)
      } catch (e) {
        if (e instanceof ReferenceError) {
          console.warn(e.message)
          return
        } else {
          throw e
        }
      }
      widgets[label.id] = label
    })
    resolve()
  })
}
