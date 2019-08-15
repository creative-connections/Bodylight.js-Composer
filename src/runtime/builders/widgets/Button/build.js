import generateTemplate from '../generateTemplate'

import configuration from './configuration'
import Button from './template/Button'
import init from './template/init'

export default () => {
  const script = `
    config.widgets.buttons = ${generateTemplate(configuration())}
    ${generateTemplate(Button)}
    ${generateTemplate(init)}
  `
  const html = ''
  const css = ''

  return { script, html, css }
}
