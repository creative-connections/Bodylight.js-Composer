export default function initButtons () {
  return new Promise(resolve => {
    const buttons = config.widgets.buttons
    Object.entries(buttons).forEach(([name, configuration]) => {
      let button

      try {
        button = new Button(configuration)
      } catch (e) {
        if (e instanceof ReferenceError) {
          console.warn(e.message)
          return
        } else {
          throw e
        }
      }
      widgets.push(button)
    })
    resolve()
  })
}
