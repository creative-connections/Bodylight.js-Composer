import generateTemplate from '@runtime/builders/generateTemplate'

import configuration from './configuration'
import Toggle from './template/Toggle'
import init from './template/init'

export default () => {
  const script = `
    config.widgets.toggles = ${generateTemplate(configuration())}
    ${generateTemplate(Toggle)}
    ${generateTemplate(init)}
  `
  const html = ''
  const css = ''

  return { script, html, css }
}
