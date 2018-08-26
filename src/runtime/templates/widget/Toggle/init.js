export default function initToggles () {
  return new Promise(resolve => {
    const toggles = config.widgets.toggles
    Object.entries(toggles).forEach(([name, configuration]) => {
      let toggle
      try {
        toggle = new Toggle(configuration)
      } catch (e) {
        if (e instanceof ReferenceError) {
          console.warn(e.message)
          return
        } else {
          throw e
        }
      }
      widgets.push(toggle)
    })
    resolve()
  })
}
