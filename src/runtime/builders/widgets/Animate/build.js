import generateTemplate from '@runtime/builders/generateTemplate'
import configuration from './configuration'
import AnimateRuntime from './AnimateRuntime'
import createAnimateRuntime from './createAnimateRuntime'

export default () => {
  const script = `
    const animates = {}
    ${configuration()}
    ${generateTemplate(AnimateRuntime)}
    ${generateTemplate(createAnimateRuntime)}
  `
  const html = ''
  const css = ''

  return { script, html, css }
}
