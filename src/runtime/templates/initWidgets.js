/* global config */
/* global widgets */

export default function initWidgets () {
  const initAnimateAnims = () => {
    widgets.animateAnims = {}
    return new Promise(resolve => {
      const animates = config.widgets.animateAnims

      // first we go trough parent animates
      Object.entries(animates).forEach(([animateName, animate]) => {
        widgets.animateAnims[animateName] = {controlled: {}}

        // process AnimateAnimMode controlled
        Object.entries(animate.controlled).forEach(([name, configuration]) => {
          widgets.animateAnims[animateName].controlled[name] = new AnimateAnim(name, configuration, animate)
        })
      })

      resolve()
    })
  }

  const initAnimateTexts = () => {
    widgets.animateTexts = {}
    return new Promise(resolve => {
      const animates = config.widgets.animateTexts

      Object.entries(animates).forEach(([animateName, animate]) => {
        widgets.animateTexts[animateName] = {}

        Object.entries(animate).forEach(([name, configuration]) => {
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
