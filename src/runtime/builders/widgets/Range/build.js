import generateTemplate from '@runtime/builders/generateTemplate'
import getDefinition from '@runtime/builders/getDefinition'

import configuration from './configuration'
import Widget from '@runtime/builders/widgets/Widget/template/Widget'
import Range from './template/Range'
import init from './template/init'

export const definition = () => {
  return [...getDefinition(Widget), ...getDefinition(Range)]
}

export default () => {
  const script = `
    config.widgets.ranges = ${generateTemplate(configuration())}
    ${generateTemplate(Range)}
    ${generateTemplate(init)}
  `
  const html = ''
  const css = ''

  return { script, html, css }
}
