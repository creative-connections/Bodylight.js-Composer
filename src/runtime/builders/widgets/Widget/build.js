import generateTemplate from '@runtime/builders/generateTemplate'

import Widget from './template/Widget'

export default () => {
  const script = generateTemplate(Widget)
  const html = ''
  const css = ''

  return { script, html, css }
}
