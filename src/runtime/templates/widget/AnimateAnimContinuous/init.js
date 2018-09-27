export default function initAnimateAnimsContinuous () {
  return new Promise(resolve => {
    const animatelist = config.widgets.animateAnims

    Object.entries(animatelist).forEach(([animateId, widgetlist]) => {
      const animate = animates[animateId]

      Object.entries(widgetlist.continuous).forEach(([id, configuration]) => {
        configuration.animate = animate

        try {
          widgets[configuration.id] = new AnimateAnimContinuous(configuration)
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
