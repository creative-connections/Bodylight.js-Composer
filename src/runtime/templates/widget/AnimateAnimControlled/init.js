export default function initAnimateAnimsControlled () {
  return new Promise(resolve => {
    const animatelist = config.widgets.animateAnims

    Object.entries(animatelist).forEach(([animateName, widgetlist]) => {
      const animate = animates[animateName]

      Object.entries(widgetlist.controlled).forEach(([name, configuration]) => {
        configuration.animate = animate

        try {
          widgets.push(new AnimateAnimControlled(configuration))
        } catch (e) {
          if (e instanceof ReferenceError) {
            console.warn(e.message)
          } else {
            throw e
          }
        }
      })
    })
    resolve()
  })
}
