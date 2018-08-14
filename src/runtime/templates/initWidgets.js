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

  const promises = []

  promises.push(initAnimateAnims())
  promises.push(initAnimateTexts())

  return promises
}
