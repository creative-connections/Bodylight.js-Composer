export default function initAnimateAnimsContinuous() {
  return new Promise(resolve => {
    const animatelist = config.widgets.animateAnims

    Object.entries(animatelist).forEach(([animateId, widgetlist]) => {
      const animate = animates[animateId]

      Object.entries(widgetlist.continuous).forEach(([id, configuration]) => {
        configuration.animate = animate

        try {
          const widget = new AnimateAnimContinuous(configuration)
          if (widget.constructed === true) {
            widgets[configuration.id] = widget
          }
        } catch (e) {
          if (e instanceof ReferenceError) {
            console.warn(e.message)
          } else {
            console.warn(e)
          }
        }
      })
    })
    resolve()
  })
}