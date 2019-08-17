import generateTemplate from '@runtime/builders/generateTemplate'

import configuration from './configuration'
import AnimateAnimContinuous from './template/continuous/AnimateAnimContinuous'
import AnimateAnimControlled from './template/controlled/AnimateAnimControlled'
import initAnimateAnimsContinuous from './template/continuous/init'
import initAnimateAnimsControlled from './template/controlled/init'

export default () => {
  const script = `
    config.widgets.animateAnims = ${generateTemplate(configuration())}
    ${generateTemplate(AnimateAnimContinuous)}
    ${generateTemplate(AnimateAnimControlled)}
    ${generateTemplate(initAnimateAnimsContinuous)}
    ${generateTemplate(initAnimateAnimsControlled)}
  `
  const html = ''
  const css = ''

  return { script, html, css }
}
