/* global config */
/* global widgets */
/* global animates */

export default function initWidgets () {
  const initAnimates = () => {
    const promises = []
    Object.entries(animates).forEach(([name, source]) => {
      // find our canvas by name
      const element = document.getElementsByName(name)[0]
      if (typeof element === 'undefined') {
        return
      }

      const promise = new Promise(resolve => {
        createAnimateRuntime(name, source, element).then(animate => {
          animates[name] = animate
          resolve()
        })
      })
      promises.push(promise)
    })
    return promises
  }

  const initAnimateAnims = () => {
    widgets.animateAnims = {}
    return new Promise(resolve => {
      const animates = config.widgets.animateAnims

      // first we go trough parent animates
      Object.entries(animates).forEach(([animateName, animate]) => {
        widgets.animateAnims[animateName] = {controlled: {}}

        // process AnimateAnimMode controlled
        Object.entries(animate.controlled).forEach(([name, configuration]) => {
          widgets.animateAnims[animateName].controlled[name] = new AnimateAnim(name, configuration)
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
          widgets.animateTexts[animateName][name] = new AnimateText(name, configuration)
        })
      })

      resolve()
    })
  }

  const promises = []
  promises.push(initAnimates())
  promises.push(initAnimateAnims())
  promises.push(initAnimateTexts())

  return promises
}
