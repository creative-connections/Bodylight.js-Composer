export default function initAnimateTexts () {
  return new Promise(resolve => {
    const animatelist = config.widgets.animateTexts

    Object.entries(animatelist).forEach(([animateName, widgetlist]) => {
      const animate = animates[animateName]
      Object.entries(widgetlist).forEach(([name, configuration]) => {
        configuration.animate = animate
        try {
          widgets.push(new AnimateText(configuration))
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
