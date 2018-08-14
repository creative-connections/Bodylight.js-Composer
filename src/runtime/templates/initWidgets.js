/* global config */
/* global widgets */
/* global animates */

export default function initWidgets () {
  const initAnimateAnims = () => {
    return new Promise(resolve => {
      const animatelist = config.widgets.animateAnims

      // first we go trough parent animates
      Object.entries(animatelist).forEach(([animateName, widgetlist]) => {
        const animate = animates[animateName]
        // process AnimateAnimMode controlled
        Object.entries(widgetlist.controlled).forEach(([name, configuration]) => {
          widgets.push(new AnimateAnim(name, configuration, animate))
        })
      })
      resolve()
    })
  }

  const initAnimateTexts = () => {
    return new Promise(resolve => {
      const animatelist = config.widgets.animateTexts

      Object.entries(animatelist).forEach(([animateName, widgetlist]) => {
        const animate = animates[animateName]
        Object.entries(widgetlist).forEach(([name, configuration]) => {
          widgets.push(new AnimateText(name, configuration, animate))
        })
      })
      resolve()
    })
  }

  const initRanges = () => {
    return new Promise(resolve => {
      const ranges = config.widgets.ranges
      Object.entries(ranges).forEach(([name, configuration]) => {
        let range

        try {
          range = new Range(name, configuration)
        } catch (e) {
          if (e instanceof ReferenceError) {
            console.warn(e.message)
            return
          } else {
            throw e
          }
        }
        widgets.push(range)
      })
      resolve()
    })
  }

  const promises = []

  promises.push(initAnimateAnims())
  promises.push(initAnimateTexts())
  promises.push(initRanges())

  return promises
}
