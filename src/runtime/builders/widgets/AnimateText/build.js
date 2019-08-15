import generateTemplate from '../generateTemplate'

import configuration from './configuration'
import AnimateText from './template/AnimateText'
import init from './template/init'

export default () => {
  const script = `
    config.widgets.animateTexts = ${generateTemplate(configuration())}
    ${generateTemplate(AnimateText)}
    ${generateTemplate(init)}
  `
  const css = ''

  return { script, css }
}
