import generateTemplate from '@runtime/builders/generateTemplate'
import initWidgets from './initWidgets'

export default () => {
  const script = generateTemplate(initWidgets)
  const html = ''
  const css = ''

  return { script, html, css }
}
