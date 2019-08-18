import generateTemplate from '@runtime/builders/generateTemplate'

import configuration from './configuration'
import Label from './template/Label'
import init from './template/init'

export default () => {
  const script = `
    config.widgets.labels = ${generateTemplate(configuration())}
    ${generateTemplate(Label)}
    ${generateTemplate(init)}
  `
  const html = ''
  const css = ''

  return { script, html, css }
}
