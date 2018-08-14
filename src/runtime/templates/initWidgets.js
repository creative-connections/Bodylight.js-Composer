/* global config */
/* global widgets */
/* global animates */

export default function initWidgets () {
  const initAnimateAnims = () => {
    widgets.animateAnims = {}
    return new Promise(resolve => {
      const animatelist = config.widgets.animateAnims

      // first we go trough parent animates
      Object.entries(animatelist).forEach(([animateName, widgetlist]) => {
        widgets.animateAnims[animateName] = {controlled: {}}

        const animate = animates[animateName]
        // process AnimateAnimMode controlled
        Object.entries(widgetlist.controlled).forEach(([name, configuration]) => {
          widgets.animateAnims[animateName].controlled[name] = new AnimateAnim(name, configuration, animate)
        })
      })

      resolve()
    })
  }

  const initAnimateTexts = () => {
    widgets.animateTexts = {}
    return new Promise(resolve => {
      const animatelist = config.widgets.animateTexts

      Object.entries(animatelist).forEach(([animateName, widgetlist]) => {
        widgets.animateTexts[animateName] = {}

        const animate = animates[animateName]
        Object.entries(widgetlist).forEach(([name, configuration]) => {
          widgets.animateTexts[animateName][name] = new AnimateText(name, configuration, animate)
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
